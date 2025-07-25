// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.30;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "forge-std/console.sol";
import "./bookAccess.sol";

contract StorageRegistry is Ownable {
    IERC20 public coins; 
    BookAccess public bookAccess;
    uint256 public constant MINIMUM_STAKE = 1000; 
    uint256 public totalRewardableWork;

    struct StorageNode {
        address nodeAddress;
        string url; 
        uint256 maxStorage; 
        uint256 stakedAmount; 
        bool isActive;
    }

    struct FileLocation {
        address nodeAddress; 
        string url; 
        string cid;
        uint256 fileSize;
    }

    struct Transmission {
        address user;
        bool isRequested; 
        bool isConfirmed; 
    }

    mapping(address => StorageNode) public nodes; 
    mapping(uint256 => FileLocation) public fileLocation;
    mapping(uint256 => Transmission) public transmissions; 
    mapping(address => uint256) public nodeWork;
    mapping(address => uint256[]) public nodeToFiles;
    address[] public nodeAddresses;
    uint256[] public assignedTokenIds;



    event NodeRegistered(address indexed nodeAddress, string url, uint256 maxStorage, uint256 stakedAmount);
    event FileAssigned(uint256 indexed tokenId, address indexed user, address indexed nodeAddress, string url);
    event FileVerified(uint256 indexed tokenId, string cid);
    event FileServed(uint256 indexed tokenId, address indexed user, address indexed nodeAddress);
    event FileConfirmed(uint256 indexed tokenId, address indexed user);


    constructor(address _tokenAddress, address _bookAccess) Ownable(msg.sender) {
        coins = IERC20(_tokenAddress);
        bookAccess = BookAccess(_bookAccess);
    }

    function registerNode(string memory _url, uint256 _maxStorage) external {
        require(bytes(_url).length > 0, "URL cannot be empty");
        require(_maxStorage > 0, "Max storage must be greater than zero");
        require(coins.balanceOf(msg.sender) >= MINIMUM_STAKE, "Insufficient token balance for stake");
        require(!nodes[msg.sender].isActive,"already registered");
        // Staking Minimum stake amount
        require(coins.transferFrom(msg.sender, address(this), MINIMUM_STAKE), "Stake transfer failed");

        nodes[msg.sender] = StorageNode({
            nodeAddress: msg.sender, 
            url: _url,
            maxStorage: _maxStorage,
            stakedAmount: MINIMUM_STAKE,
            isActive: true
        });
        nodeAddresses.push(msg.sender);
        emit NodeRegistered(msg.sender, _url, _maxStorage, MINIMUM_STAKE);
    } 

    function assignNode(uint256 _tokenId, address _nodeAddress, uint256 _fileSize) external {
        require(nodes[_nodeAddress].isActive, "Node is not active or does not exist");
        require(_fileSize > 0, "File size must be greater than zero");
        require(nodes[_nodeAddress].maxStorage >= _fileSize, "Insufficient storage capacity");
        require(bytes(fileLocation[_tokenId].url).length == 0, "Token already assigned");

        fileLocation[_tokenId] = FileLocation({
            nodeAddress: _nodeAddress,
            url: nodes[_nodeAddress].url,
            cid: "",
            fileSize: _fileSize
        });

        assignedTokenIds.push(_tokenId);
        emit FileAssigned(_tokenId, msg.sender, _nodeAddress, nodes[_nodeAddress].url);
    }

    function storeFile(uint256 _tokenId, string memory _cid) external returns (bool) {
        if (bytes(fileLocation[_tokenId].url).length == 0) {
            return false;
        }
        require(msg.sender == fileLocation[_tokenId].nodeAddress, "Only assigned node can verify");
        require(bytes(_cid).length > 0, "CID cannot be empty");

        // Update CID
        fileLocation[_tokenId].cid = _cid;
        nodes[msg.sender].maxStorage -= fileLocation[_tokenId].fileSize;
        nodeToFiles[msg.sender].push(_tokenId);
        emit FileVerified(_tokenId, _cid);
        return true;
    }


    function serveFile(uint256 _tokenId, address _user) external returns (bool) {

        require(bytes(fileLocation[_tokenId].cid).length > 0, "File not stored");
        require(msg.sender == fileLocation[_tokenId].nodeAddress, "Only assigned node can serve");

        if (!bookAccess.isAllowed(_user, _tokenId)) {
           return false;
        }

        transmissions[_tokenId] = Transmission({
            user: _user,
            isRequested: true,
            isConfirmed: false
        });

        emit FileServed(_tokenId, _user, msg.sender);
        return true;
    }


    function confirmFile(uint256 _tokenId) external {
        require(transmissions[_tokenId].isRequested, "No transmission requested");
        require(msg.sender == transmissions[_tokenId].user, "Only requested user can confirm");
        require(!transmissions[_tokenId].isConfirmed, "Already confirmed");

        transmissions[_tokenId].isConfirmed = true;

        address node = fileLocation[_tokenId].nodeAddress;
        uint256 fileSize = fileLocation[_tokenId].fileSize;

        uint256 rewardWork = fileSize;  
        nodeWork[node] += rewardWork;
        totalRewardableWork += rewardWork;

        emit FileConfirmed(_tokenId, msg.sender);
    }

    function isFileConfirmed(uint256 _tokenId, address _user) external view returns (bool) {
        return transmissions[_tokenId].isConfirmed && transmissions[_tokenId].user == _user;
    }

    function getAllNodes() external view returns (StorageNode[] memory) {
            uint length = nodeAddresses.length;
            StorageNode[] memory allNodes = new StorageNode[](length);
            for (uint256 i = 0; i < length; i++) {
                allNodes[i] = nodes[nodeAddresses[i]];
            }
            return allNodes;
        }

    function getAllBooks() external view returns (uint256[] memory, FileLocation[] memory) {
        uint length = assignedTokenIds.length;
        FileLocation[] memory files = new FileLocation[](length);
        for (uint256 i = 0; i < length; i++) {
            files[i] = fileLocation[assignedTokenIds[i]];
        }
        return (assignedTokenIds, files);
    }

    function getFilesForNode() external view returns (uint256[] memory) {
        return nodeToFiles[msg.sender];
    }

    function getFileLocation(uint256 _tokenId) external view returns (FileLocation memory) {
        return fileLocation[_tokenId];
    }

}
