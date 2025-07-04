// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.30;

import "forge-std/Script.sol";
import "../src/coin.sol";
import "../src/bookAccess.sol";
import "forge-std/console.sol";

contract Deploy is Script {
    function run() external returns (
        Coins coin,
        BookAccess bookAccess
    ) {
        uint256 privateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address sender = vm.addr(privateKey);
        
        console.log("using address:", sender);

        vm.startBroadcast(privateKey);

        coin = new Coins();
        console.log("Coins deployed at:", address(coin));

        bookAccess = new BookAccess(address(coin));
        console.log("BookAccess deployed at:", address(bookAccess));

        vm.stopBroadcast();
    }
}
