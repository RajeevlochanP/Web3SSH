//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.30;

import "forge-std/Script.sol";
import "../src/coin.sol";
import "../src/bookAccess.sol";
import "forge-std/console.sol";

contract Interact is Script {
     
      function run() public {
        uint256 privateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address sender = vm.addr(privateKey);
        console.log("Using address:", sender);

        address coinsAddr=0x5FbDB2315678afecb367f032d93F642f64180aa3;
        address bookAccessAddr=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512;
        vm.startBroadcast(privateKey);
        Coins coins=Coins(payable(coinsAddr));
        // BookAccess bookAccess=BookAccess(bookAccessAddr);
        coins.getCoins{value:100}();
        vm.stopBroadcast();
    }
}