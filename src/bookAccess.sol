// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.30;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "forge-std/console.sol";

contract BookAccess is ERC1155, Ownable {
    uint nextTokenId;
    IERC20 public coins;

    constructor(address _tokenAddress) ERC1155("BookId") Ownable(msg.sender) {
        coins = IERC20(_tokenAddress);
        nextTokenId=0;
    }

    struct BookMetaData {
        string name;
        string description;
        string genre;
        uint price;
        address author;
        bool isActive;
        uint tokenId;  //uneccesary but i cant think of other way now
    }

    mapping(uint => BookMetaData) public bookMetaDatas; // tokenId → metadata
    mapping(address => uint[]) public booksByAuthor;     // author → tokenIds
    uint[] public allTokens;

    function register(
        string memory _name,
        string memory _desc,
        uint _price,
        string memory _genre,
        address _author
        // uint _tokenId
    ) external returns (uint) {
        uint _tokenId=nextTokenId++;
        allTokens.push(_tokenId);
        bookMetaDatas[_tokenId] = BookMetaData({
            name: _name,
            description: _desc,
            genre: _genre,
            price: _price,
            author: msg.sender,
            isActive: true,
            tokenId: _tokenId
        });

        booksByAuthor[msg.sender].push(_tokenId);
        _mint(_author, _tokenId, 1, "");
        return _tokenId;
    }

    function getAllBooks() public view returns (BookMetaData[] memory) {
        uint length = allTokens.length;
        BookMetaData[] memory books = new BookMetaData[](length);
        for (uint i = 0; i < length; i++) {
            books[i] = bookMetaDatas[allTokens[i]];
        }
        return books;
    }

    function buyAccess(uint _tokenId) public {
        BookMetaData memory b = bookMetaDatas[_tokenId];
        require(b.isActive, "Book does not exist");
        require(balanceOf(msg.sender, _tokenId) == 0, "Already have access");
        require(coins.balanceOf(msg.sender) >= b.price, "Insufficient balance");

        bool success = coins.transferFrom(msg.sender, b.author, b.price);
        require(success, "Token transfer failed");

        _mint(msg.sender, _tokenId, 1, "");
    }
    
    function isAllowed(address user,uint tokenId) public view returns(bool){
        return (balanceOf(user,tokenId)>0);
    }
}
