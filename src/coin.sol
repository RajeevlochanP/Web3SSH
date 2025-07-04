// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.30;

import "forge-std/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Coins is ERC20, Ownable {

    // uint256 public constant INITIAL_SUPPLY = 1e27;
    uint256 public constant weii=3; //for adding coins
    uint256 public constant weif=4; // for withdrawing 
    uint256 public constant MINIMUM_STAKE_VALUE=1000;
    mapping(address => uint256)stakedAmounts;

    event coinsBought(address recipient, uint256 amount);
    event withdrawn(address recipient, uint256 amount);
    event staked(address user, uint256 amount);
    event unStaked(address user, uint256 amount);

    constructor() ERC20("COIN", "COIN") Ownable(msg.sender) {
        console.log(address(this));
    }

    function getCoins() external payable {
        console.log("msg.value:", msg.value);
        console.log("will mint:", msg.value * weii);
        uint amount=msg.value*weii;
        // require(balanceOf(address(this))>=amount,"Insufficient amount in contract");
        _mint(msg.sender, amount);
        emit coinsBought(msg.sender,amount);
    }

    function withdrawCoin(uint noOfCoins) external {
        require(balanceOf(msg.sender) >= noOfCoins, "Insufficient tokens");
        require(noOfCoins%weif==0,"only divisible by weif can be withdrawn");
        uint amount =noOfCoins/weif;
        require(address(this).balance >= amount, "insufficient Ether in contract");
        _burn(msg.sender, noOfCoins);
        payable(msg.sender).transfer(amount);
        emit withdrawn(msg.sender,amount);
    }

    //ragavan use these functions for node operators staking
    function stake(uint amount) external{
        require(amount>=MINIMUM_STAKE_VALUE,"minimum stake value");
        _transfer(msg.sender,address(this) ,amount);
        stakedAmounts[msg.sender]+=amount;
        emit staked(msg.sender, amount);
    }

    function unStake() external{
        // require(amount>=MINIMUM_STAKE_VALUE,"minimum stake value is 1000");
        _transfer(address(this),msg.sender,stakedAmounts[msg.sender]);
        emit unStaked(msg.sender, stakedAmounts[msg.sender]);
        stakedAmounts[msg.sender]=0;
    }
    
    fallback() external payable {}
    receive() external payable {}
}