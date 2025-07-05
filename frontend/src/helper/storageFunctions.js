import { appr } from "./clickFunctions";
import { getStorageRegistryContract } from "./contractHelper";
export async function getAllNodes() {
    const { contract } = await getStorageRegistryContract();
    const storageNodes = await contract.getAllNodes();

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

export async function getAllBooks() {
    const { contract } = await getStorageRegistryContract();
    const storageBooks = await contract.getAllBooks();
    return storageBooks;
}

export async function getUserBooks() {
    const { contract } = await getStorageRegistryContract();
    const nodeBooks = await contract.getFilesForNode();
    return nodeBooks;
}

export async function registeNode(url, maxStorage) {
    await appr();
    const { contract,signer } = await getStorageRegistryContract();
    // console.log("inside register");
    const tx = await contract.registerNode(url, maxStorage);
    await tx.wait();
}



export async function uploadFile(tokenId, nodeAddress, fileSize) {
    const { contract,signer } = await getStorageRegistryContract();
    const tx = await contract.assignNode(tokenId, nodeAddress, fileSize);
    await tx.wait();
    // post request to the right url
}


export async function readfile(tokenId) {
    const { contract,signer } = await getStorageRegistryContract();
    const { nodeAddress, url, cid, fileSize } = await contract.getFileLocation(tokenId);
    const userAddress=await signer.getAddress();
    try {
        const response = await fetch(`${url}/file/${cid}/${tokenId}/${userAddress}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Unknown error");
        }

        const blob = await response.blob();

        await contract.confirmFile(tokenId);

        // Automatically download the PDF
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${ cid }.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        alert("File downloaded successfully.");
    } catch (err) {
        console.error("Failed to fetch file:", err);
        alert("Failed to fetch file. Check console for details.");
    }
}

