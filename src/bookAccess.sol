// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.30;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "forge-std/console.sol";

contract BookAccess is ERC1155, Ownable {
    uint public nextTokenId;

    IERC20 public coins;

    constructor(address _tokenAddress) ERC1155("BookId") Ownable(msg.sender) {
        coins = IERC20(_tokenAddress);
    }

    struct BookMetaData {
        string name;
        string description;
        address author;
        uint price;
    }

    mapping(uint => string) public tokenURIs;   // tokenId →  CID
    mapping(uint => BookMetaData) public bookMetaDatas; // tokenId → metadata
    mapping(address => uint[]) public booksByAuthor; //books by author → tokenIds

    function upload(string memory _cid,string memory _name,string memory _desc,uint _price) external returns (uint tokenId) {
        tokenId = nextTokenId++;
        tokenURIs[tokenId] = _cid;

        bookMetaDatas[tokenId] = BookMetaData({
            name: _name,
            description: _desc,
            author: msg.sender,
            price: _price
        });
        booksByAuthor[msg.sender].push(tokenId);
        _mint(msg.sender, tokenId,1, "");
    }

    function buyBook(uint tokenId) external {
        require(bytes(tokenURIs[tokenId]).length != 0, "Book does not exist");
        BookMetaData memory book = bookMetaDatas[tokenId];
        require(coins.balanceOf(msg.sender) >= book.price, "Insufficient token balance");
        require(coins.transferFrom(msg.sender, book.author, book.price),"Payment failed");
        _mint(msg.sender, tokenId, 1, "");
    }
}
