import { ethers } from "ethers";
import CoinsABI from "../ABI/Coins.json";

export async function getCoinsContract() {
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  const signer = provider.getSigner(0);

  const contract = new ethers.Contract(process.env.COINS_ADDR, CoinsABI.abi, signer);

  return contract;
}