export async function handleGetCoins(cost) {
    try {
        const { contract } = await getCoinsContract();
        const tx = await contract.getCoins({ value: ethers.parseEther(`${cost}`) });
        await tx.wait();
        alert("Coins bought successfully!");
    } catch (err) {
        console.error("Error buying coins:", err);
        alert("Transaction failed. See console for details.");
    }
}
async function checkBalance() {
    try {
        const { contract, signer } = await getCoinsContract();
        const userAddress = await signer.getAddress();
        const bal = await contract.balanceOf(userAddress);
        setBalance(ethers.formatEther(bal));
    } catch (err) {
        console.error("Error checking balance:", err);
        alert("Failed to fetch balance.");
    }
}