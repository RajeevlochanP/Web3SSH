require("dotenv").config();
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");

const app = express();
const upload = multer({ dest: "uploads/" });

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAbi = require(process.env.STORAGE_REGISTRY_ABI);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractAbi, wallet);

// Ensure storage folder exists
if (!fs.existsSync("stored")) fs.mkdirSync("stored");

app.post("/store", upload.single("file"), async (req, res) => {
    try {
        const { tokenId, fileSize } = req.body;
        const file = req.file;

        if (!file || !tokenId || !fileSize) {
            return res.status(400).json({ error: "Missing file, tokenId, or fileSize" });
        }

        const fileCid = path.basename(file.path);
        const tx = await contract.storeFile(tokenId, fileCid);
        const receipt = await tx.wait();

        if (receipt.status !== 1) {
            fs.unlinkSync(file.path);
            return res.status(500).json({ error: "storeFile failed" });
        }

        const finalPath = path.join("stored", fileCid);
        fs.renameSync(file.path, finalPath);

        return res.json({ cid: fileCid });
    } catch (err) {
        console.error(err);
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/retrieve", async (req, res) => {
    const { tokenId, user } = req.query;

    if (!tokenId || !user) {
        return res.status(400).json({ error: "Missing tokenId or user" });
    }

    try {
        const tx = await contract.serveFile(tokenId, user);
        const receipt = await tx.wait();

        if (receipt.status !== 1) {
            return res.status(403).json({ error: "serveFile failed" });
        }

        const fileLocation = await contract.fileLocation(tokenId);
        const cid = fileLocation.cid;
        const filePath = path.join("stored", cid);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "File not found" });
        }

        res.sendFile(path.resolve(filePath));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
