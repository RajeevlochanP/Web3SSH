import { getStorageRegistryContract} from "./contractHelper";

export async function getAllNodes(){
    const {contract}=await getStorageRegistryContract();
    const storageNodes=await contract.getAllNodes();
   
    /*
    storageNodes is an array of  {
        address nodeAddress;
        string url; 
        uint256 maxStorage; 
        uint256 stakedAmount; 
        bool isActive;
    }
    */


    return storageNodes; 
}

export async function getAllBooks(){
    const {contract}=await getStorageRegistryContract();
    const storageBooks=await contract.getAllBooks();
    return storageBooks; 
}

export async function getUserBooks(){
    const {contract}=await getStorageRegistryContract();
    const nodeBooks=await contract.getFilesForNode();
    return nodeBooks; 
}

export async function registeNode(url, maxStorage) {
    const {contract}=await getStorageRegistryContract();
    const tx=await contract.registerNode(url, maxStorage);
    await tx.wait();
}



export async function uploadFile(tokenId, nodeAddress, fileSize){
    const {contract}=await getStorageRegistryContract();
    const tx = await contract.assignNode(tokenId, nodeAddress, fileSize);
    await tx.wait();


    // post request to the right url
}


export async function readfile(tokenId) {
    
    const {nodeAddress, url, cid, fileSize} = await contract.getFileLocation(tokenId);

    // fetch request to the right url, cid
    // await getFile(tokenId, url, cid);
    
    const {contract}=await getStorageRegistryContract();
    const tx = await contract.confirmFile(tokenId);
    await tx.wait();

}

