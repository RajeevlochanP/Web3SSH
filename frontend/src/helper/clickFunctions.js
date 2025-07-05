import { getCoinsContract,getBookAccessCOntract } from "./contractHelper";
import { ethers } from "ethers";
const StorageRegistryAddress = import.meta.env.VITE_STORAGE_REGISTRY_ADDR;
export async function handleGetCoins(cost) {
    try {
        // console.log("cost :" + cost);
        const { contract } = await getCoinsContract();
        const tx = await contract.getCoins({ value: ethers.parseEther(cost) });
        await tx.wait();
        return "successfull";
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
        return parseFloat(bal).toFixed(0); // return as number
    } catch (err) {
        console.error("Error checking balance:", err);
        return -1;
    }
}

export async function appr(){
    const { contract, signer } = await getCoinsContract();
    const tx = await contract.approve(StorageRegistryAddress, ethers.parseUnits("1000", 18));
    await tx.wait();
}

export async function withdraw(coins){
    try {
        console.log("coins : "+coins);
        const { contract } = await getCoinsContract();
        // const userAddress = await signer.getAddress();
        const tx=await contract.withdrawCoin(coins);
        tx.wait();
        return "successfull";
    } catch (err) {
        // console.log("fdhjfd sdfjksdf dsfjk");
        console.error("Error withdrawing balance:", err.message);
        return err.message;
    }
}

export async function getAllBooks(){
    const {contract,signer}=await getBookAccessCOntract();
    // console.log("fjdkl");
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

export async function registerBook(name, desc, price, genre, author) {
  try {
    const { contract, signer } = await getBookAccessCOntract();
    const tx = await contract.register(name, desc, price, genre, author, tokenId);
    await tx.wait();
    alert("Book registered successfully!");
  } catch (err) {
    console.error("Error registering book:", err);
    alert("Book registration failed.");
  }
}