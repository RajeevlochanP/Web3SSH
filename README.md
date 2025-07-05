# 📚 Decentralized Book Publishing and Storage Platform

A Web3 platform for authors to publish and distribute books securely using smart contracts, token payments, and decentralized file storage. Built with Ethereum, IPFS-like storage simulation, and ERC1155 tokens.

---

## 🚀 Features

- ✅ Authors can **mint books as NFTs** with metadata (name, genre, price).
- ✅ Users can **buy access** using platform tokens.
- ✅ Book files are uploaded to **node operators**.
- ✅ Only authorized users can **download/view** books.
- ✅ Smart contracts **confirm delivery** and **reward nodes** based on file size.

---

## 🧠 Tech Stack

| Layer        | Technologies |
|--------------|--------------|
| **Frontend** | React, Vite, Ethers.js |
| **Smart Contracts** | Solidity, Hardhat, ERC1155, ERC20 |
| **Backend (Node Operator)** | Express.js, Multer, Ethers.js |
| **Blockchain** | Hardhat (Anvil local network) |
| **Wallet** | MetaMask |

---

## 🏗️ Architecture Overview

```
User ↔️ React Frontend ↔️ Smart Contracts ↔️ Node Operator Server
                      ↘️                  ↗️
                     Book Metadata   File Storage + Verification
```

---

## 🛠️ Setup Instructions

### 📦 Prerequisites

- Node.js v18+
- Metamask extension
- Hardhat (with Anvil installed)
- Yarn or npm

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/DecentralizedBookPlatform.git
cd DecentralizedBookPlatform
```

---

### 2. Install dependencies

```bash
cd frontend
npm install
cd ../nodeOperator
npm install
```

---

### 3. Configure environment

Create a `.env` file in both `frontend` and `nodeOperator` folders:

**frontend/.env**

```
VITE_COINS_CONTRACT=0xYourCoinsAddress
BOOK_ACCESS_ADDR=0xYourBookContract
STORAGE_REGISTRY_ADDR=0xYourRegistryAddress
```

**nodeOperator/.env**

```
PRIVATE_KEY=your_local_private_key
RPC_URL=http://127.0.0.1:8545
PORT=3000
REGISTRY_CONTRACT=0xYourRegistryAddress
```

---

### 4. Start local anvil network

```bash
anvil
```

Deploy contracts using:

```bash
forge script script/deploy.s.sol --broadcast --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

---

### 5. Run frontend and node operator

**Frontend:**

```bash
cd frontend
npm run dev
```

**Node Operator:**

```bash
cd nodeOperator
node index.js
```

---

## ✅ Final Notes

- Works on localhost with Anvil/Hardhat.
- Each book file is verified and served only to authorized users.
- Tokens must be approved before calling `buyAccess`.

---

## 📞 Contact

For issues or queries, feel free to raise an issue or pull.
