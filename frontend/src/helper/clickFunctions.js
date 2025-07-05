import { ethers } from "ethers";

export async function handleGetCoins(cost) {
    try {
        const { contract } = await getCoinsContract();
        const tx = await contract.getCoins({ value: ethers.parseEther(`${cost}`) });
        await tx.wait();
        return '';
    } catch (err) {
        console.error("Error buying coins:", err.message);
        return err.message;
    }
}

// export async function checkBalance() {
//     try {
//         const { contract, signer } = await getCoinsContract();
//         const userAddress = await signer.getAddress();
//         const bal = await contract.balanceOf(userAddress);
//         return bal;
//     } catch (err) {
//         console.error("Error checking balance:", err);
//         return -1
//     }
// }

//Updated checkBalance()
export async function checkBalance() {
    try {
        const { contract, signer } = await getCoinsContract();
        const userAddress = await signer.getAddress();
        const bal = await contract.balanceOf(userAddress); // likely BigNumber
        const formatted = ethers.formatEther(bal); // convert to string ether value
        return parseFloat(formatted).toFixed(2); // return as number
    } catch (err) {
        console.error("Error checking balance:", err);
        return -1;
    }
}

export async function withdraw(coins){
    try {
        const { contract } = await getCoinsContract();
        // const userAddress = await signer.getAddress();
        await contract.withdrawCoin(coins);
        return '';
    } catch (err) {
        console.error("Error withdrawing balance:", err.message);
        return err.message
    }
}