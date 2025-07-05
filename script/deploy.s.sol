// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.30;

import "forge-std/Script.sol";
import "../src/coin.sol";
import "../src/bookAccess.sol";
import "../src/storageRegistry.sol";
import "forge-std/console.sol";

contract Deploy is Script {
    function run() external returns (
        Coins coin,
        BookAccess bookAccess,
        StorageRegistry storageRegistry
    ) {
        uint256 privateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address sender = vm.addr(privateKey);
        
        console.log("using address:", sender);

        vm.startBroadcast(privateKey);

        coin = new Coins();
        console.log("Coins deployed at:", address(coin));

        bookAccess = new BookAccess(address(coin));
        console.log("BookAccess deployed at:", address(bookAccess));

        storageRegistry = new StorageRegistry(address(bookAccess), address(bookAccess));
        console.log("StorageRegistry deployed at:", address(storageRegistry));

        vm.stopBroadcast();
    }
}
