import express from "express";
import multer from "multer";
import { ethers } from "ethers";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import StorageRegistryABI from "./abi/StorageRegistry.json" assert { type: "json" };

dotenv.config();
const app = express();
const upload = multer({ dest: "uploads/" });
app.use(express.json());

import { ethers } from "ethers";
import StorageRegistryABI from "./StorageRegistryABI.json";

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const registry = new ethers.Contract(
  process.env.REGISTRY_CONTRACT,
  StorageRegistryABI.abi,
  wallet
);


//upload and register CID
app.post("/store", upload.single("file"), async (req, res) => {
  const { tokenId } = req.body;
  const file = req.file;

  if (!file || !tokenId) {
    return res.status(400).json({ error: "Missing file or tokenId" });
  }

  try {
    const cid = file.filename; // for demo, using filename as CID
    const tx = await registry.storeFile(tokenId, cid);
    await tx.wait();

    res.json({ success: true, cid, tokenId });
  } catch (err) {
    console.error("Error in storeFile:", err);
    res.status(500).json({ error: "Failed to store file" });
  }
});

//serving file
app.get("/file/:cid/:tokenId/:user", async (req, res) => {
  const { cid, tokenId, user } = req.params;

  try {
    const tx = await registry.serveFile(tokenId, user);
    await tx.wait();

    const filePath = path.resolve("uploads", cid);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ error: "File not found" });
    }
  } catch (err) {
    console.error("Error in serveFile:", err);
    res.status(403).json({ error: "Not authorized to serve this file" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Node operator running on port ${process.env.PORT}`);
});
