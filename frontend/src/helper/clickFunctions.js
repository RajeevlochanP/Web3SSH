import { getCoinsContract,getBookAccessCOntract } from "./contractHelper";
import { ethers } from "ethers";
export async function handleGetCoins(cost) {
    try {
        // console.log("cost :" + cost);
        const { contract } = await getCoinsContract();
        const tx = await contract.getCoins({ value: ethers.parseEther(cost) });
        await tx.wait();
        return '';
    } catch (err) {
        console.error("Error buying coins:", err.message);
        return err.message;
    }
}

export async function checkBalance() {
    try {
        const { contract, signer } = await getCoinsContract();
        const userAddress = await signer.getAddress();
        const bal = await contract.balanceOf(userAddress);
        return bal;
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

export async function getAllBooks(){
    const {contract,signer}=await getBookAccessCOntract();
    const books=await contract.getAllBooks();
    /*
    books is an array of  {
        string name;
        string description;
        string genre;
        uint price;
        address author;
        bool isActive;
        uint tokenId;
    }
    */
    return books;
    // ee function call try catch lo undali 
}

export async function buyAccess(tokenId){
   const {contract,signer}=await getBookAccessCOntract();
   const tx=await contract.buyAccess(tokenId);
   await tx.wait();
}

//vaadu book page ki ochinappudu buy or view(if already bought) 
export async function isBought(tokenId){
    const {contract,signer}=await getBookAccessCOntract();
    const user = await signer.getAddress();
    return await contract.isAllowed(user,tokenId);
}