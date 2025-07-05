// contractHelper.js
import { ethers } from "ethers";
import CoinsABI from "../ABI/Coins.json";
import BookAccessABI from "../ABI/BookAccess.json";
import StorageRegistryABI from "../ABI/StorageRegistry.json";


const coinsContractAddress = import.meta.env.VITE_COINS_CONTRACT;
const BookAccessAddress = import.meta.env.BOOK_ACCESS_ADDR;
const StorageRegistryAddress = import.meta.env.STORAGE_REGISTRY_ADDR;


export async function getCoinsContract() {
  // Check if MetaMask is available
  if (!window.ethereum) {
    throw new Error("MetaMask not detected");
  }

  // Ask user to connect wallet
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // Create provider and signer from MetaMask
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Create contract instance with signer
  const contract = new ethers.Contract(coinsContractAddress, CoinsABI.abi, signer);

  return { contract, signer };
}

export async function getBookAccessCOntract() {
  // Check if MetaMask is available
  if (!window.ethereum) {
    throw new Error("MetaMask not detected");
  }

  // Ask user to connect wallet
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // Create provider and signer from MetaMask
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Create contract instance with signer
  const contract = new ethers.Contract(BookAccessAddress, BookAccessABI.abi, signer);

  return { contract, signer };
}

export async function getStorageRegistryContract() {
  // Check if MetaMask is available
  if (!window.ethereum) {
    throw new Error("MetaMask not detected");
  }

  // Ask user to connect wallet
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // Create provider and signer from MetaMask
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Create contract instance with signer
  const contract = new ethers.Contract(StorageRegistryAddress, StorageRegistryABI.abi, signer);

  return { contract, signer };
}