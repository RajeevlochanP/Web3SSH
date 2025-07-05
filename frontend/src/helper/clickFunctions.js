import { getCoinsContract,getBookAccessCOntract,getStorageRegistryContract } from "./contractHelper";
import { ethers } from "ethers";
import { getAllNodes } from "./storageFunctions";
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
    const mappedBooks = books.map(([name, description, genre, price, author,_,tokenId]) => ({
    name,description,author,genre,price,tokenId}));
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
    return mappedBooks;
    // ee function call try catch lo undali 
}

export async function buyAccess(pr,tokenId){
    const data = await getCoinsContract();
    const {contract,signer}=await getBookAccessCOntract();
    const t = await data.contract.approve(contract.target, ethers.parseUnits(pr, 18));
    await t.wait();
    // console.log(tokenId);
    //   console.log("hhdsh");
   const tx=await contract.buyAccess(tokenId);
//    console.log("hhdsh");
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
    const tx = await contract.register(name, desc, price, genre, author);
    await tx.wait();
    const token=await contract.getNextTokenId();
    // console.log(token);
    // alert("Book registered successfully!");
    token=parseFloat(token).toFixed(0)-1;
  } catch (err) {
    console.error("Error registering book:", err);
    // alert("Book registration failed.");
  }
}

export async function registerBookPipeline(formData){
    const { contract, signer } = await getBookAccessCOntract();
    const author=await signer.getAddress();
    console.log(author+": autor "+"form Daata : "+formData);
    
    const {name, description, price, genre,selectedNode}=formData;
    console.log(name, description, price, genre,selectedNode);
    const tx = await contract.register(name, description, price, genre, author);
    console.log("hii");
    await tx.wait();
    let token=await contract.getNextTokenId();
    // console.log(token);
    // alert("Book registered successfully!");
    token=parseFloat(token).toFixed(0)-1;
    const nodess=await getAllNodes();
    console.log(nodess);
    const node=nodess.find(nod=>nod.nodeAddress==selectedNode);
    console.log(node);
    const dat = await getStorageRegistryContract();
    const t = await dat.contract.assignNode(token,node.nodeAddress, 256);
    await t.wait();
    const uploadFormData = new FormData();
    uploadFormData.append("file", formData.file);
    uploadFormData.append("tokenId", token.toString());
    console.log(uploadFormData.tokenId,uploadFormData.file);
    console.log(node.url);

    const response = await fetch(`${node.url}/store`, {
      method: "POST",
      body: uploadFormData,
    });

    const data = await response.json();
}