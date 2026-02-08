# 🌙 Midnight Counter DApp

A fully functional decentralized counter application built on the Midnight Network, featuring zero-knowledge private state management and a modern React frontend.

## 🎯 What This Is

This is a complete smart contract DApp that demonstrates:
- **Zero-Knowledge Privacy**: Private counter state that only you can see
- **Public State**: Shared counter visible to all users on the blockchain
- **Circuit Execution**: Increment both counters with a single ZK-proof-verified transaction
- **Real-time Updates**: Reactive state management using RxJS observables
- **Modern UI**: Built with React, Vite, and Tailwind CSS

The implementation showcases Midnight Network's unique approach to data privacy, where you can have both transparent, public state and encrypted, private state in the same smart contract.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│          React Frontend (Vite)                  │
│  ┌──────────────────────────────────────────┐   │
│  │  Counter Page                             │   │
│  │  - View public counter (blockchain state)│   │
│  │  - View private counter (ZK-encrypted)   │   │
│  │  - Increment button (calls circuit)       │   │
│  └──────────────────────────────────────────┘   │
│                     ↓                            │
│  ┌──────────────────────────────────────────┐   │
│  │  Contract Controller                      │   │
│  │  - increment() circuit                    │   │
│  │  - RxJS state observables                │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│      Midnight Network (Local or Preview)        │
│  ┌──────────────┬──────────────┬──────────────┐ │
│  │  Node        │  Indexer     │  Proof Server│ │
│  │  :9944       │  :8088       │  :6300       │ │
│  └──────────────┴──────────────┴──────────────┘ │
└─────────────────────────────────────────────────┘
                      ↓
        Deployed Counter Contract
        (Compact Smart Contract)
```

### How It Works

1. **Smart Contract (Compact)**: Written in Midnight's Compact language, the contract defines:
   - `round`: A public counter (visible on-chain to everyone)
   - `privateCounter`: A private counter (ZK-encrypted, only visible to the owner)
   - `increment()`: A circuit that increments both counters atomically

2. **Contract Deployment**: The CLI tool deploys the contract to either:
   - **Local Network**: Running in Docker containers for development
   - **Preview Network**: Midnight's public testnet

3. **Frontend Integration**: The React app:
   - Connects to your Lace wallet using the DApp Connector API
   - Subscribes to contract state changes via the Indexer
   - Executes circuits by generating ZK proofs locally
   - Updates UI reactively as state changes

4. **Zero-Knowledge Proofs**: When you click "Increment":
   - The browser generates a ZK proof that you're executing the circuit correctly
   - The proof is verified by the Proof Server
   - The transaction is submitted to the blockchain
   - Both counters increment, but only you can see your private counter value

---

## 📦 Prerequisites

- **[Node.js](https://nodejs.org/)** v23+ and **[npm](https://www.npmjs.com/)** v11+
- **[Docker](https://docs.docker.com/get-docker/)** (for local network)
- **[Git LFS](https://git-lfs.com/)** (for large contract files)
- **[Compact Tools](https://docs.midnight.network/relnotes/compact-tools)** (Midnight compiler)
- **[Lace Wallet](https://chromewebstore.google.com/detail/hgeekaiplokcnmakghbdfbgnlfheichg)** (Browser extension)

---

## 🚀 Quick Start

### 1. Install Dependencies

#### Install Git LFS
```bash
# Windows (using Chocolatey)
choco install git-lfs

# macOS
brew install git-lfs

# Linux (Fedora/RHEL)
sudo dnf install git-lfs

# Initialize
git lfs install
```

#### Install Compact Tools
```bash
# Install Compact compiler toolchain
curl --proto '=https' --tlsv1.2 -LsSf \
  https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh

# Install version 0.27.0+ (required)
compact update +0.27.0
```

#### Verify Installation
```bash
node -v       # Should be v23+
npm -v        # Should be v11+
docker -v     # Should show Docker version
git lfs version
compact check # Should show version 0.27.0+
```

### 2. Build the Project

```bash
# Install all workspace dependencies
npm install

# Compile the smart contract
npm run build
```

This will:
- Build the Compact smart contract in `counter-contract/`
- Generate TypeScript bindings for the contract API
- Prepare all packages for deployment

### 3. Deploy the Contract

#### Option A: Local Network (Recommended for Development)

```bash
# Start local Midnight network using Docker
npm run setup-standalone
```

This starts:
- **Node** (port 9944): Blockchain node
- **Indexer** (port 8088): GraphQL API for contract state
- **Proof Server** (port 6300): ZK proof generation/verification

The contract will be automatically deployed, and the address will be saved in `counter-cli/deployment.json`.

#### Option B: Preview Network (Public Testnet)

1. Get test tokens from the [Midnight Faucet](https://faucet.preview.midnight.network/)
2. Update `counter-cli/.env` with Preview Network configuration
3. Deploy:
   ```bash
   cd counter-cli
   npm run deploy
   ```

### 4. Configure Frontend

The contract address is automatically written to `frontend-vite-react/.env`:

```env
VITE_CONTRACT_ADDRESS="<your-deployed-contract-address>"
```

### 5. Start the Frontend

```bash
npm run dev:frontend
```

Open http://localhost:5173/ in your browser.

### 6. Use the DApp

1. **Connect Wallet**: Click the wallet button (install Lace if needed)
2. **Navigate to Counter**: Click "Counter" in the navigation menu
3. **View State**:
   - See the public counter (visible to everyone)
   - See your private counter (only visible to you)
4. **Increment**: Click "Increment Counter" to execute the circuit
5. **Watch Updates**: State updates in real-time as transactions confirm

---

## 📁 Project Structure

```
├── counter-contract/        # Compact smart contract
│   ├── src/
│   │   └── counter.compact  # Contract source code
│   └── package.json         # Build scripts
│
├── counter-cli/             # Deployment and interaction tools
│   ├── src/
│   │   ├── config.ts        # Network configuration
│   │   ├── deploy.ts        # Deployment script
│   │   └── contractController.ts  # Contract API wrapper
│   ├── deployment.json      # Deployed contract address
│   └── .env                 # Environment variables
│
└── frontend-vite-react/     # React frontend application
    ├── src/
    │   ├── pages/counter/   # Counter UI component
    │   ├── providers/       # Contract context provider
    │   └── App.tsx          # Main application
    ├── .env                 # Contract address config
    └── package.json         # Dependencies
```

---

## 🔧 Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install all workspace dependencies |
| `npm run build` | Compile the Compact contract |
| `npm run setup-standalone` | Deploy to local Docker network |
| `npm run dev:frontend` | Start the React development server |

---

## 🧪 Contract Details

### State Variables

| Variable | Type | Visibility | Description |
|----------|------|------------|-------------|
| `round` | `Ledger<Uint64>` | Public | Global counter visible to all users |
| `privateCounter` | `Uint64` | Private | Your personal counter (ZK-encrypted) |

### Circuits

#### `increment()`
- **Access**: Public (anyone can call)
- **Effect**: Increments both `round` and `privateCounter` by 1
- **ZK Proof**: Yes (privacy-preserving proof that you executed correctly)
- **Usage**:
  ```typescript
  await deployedContractAPI.increment();
  ```

---

## 🛠️ Windows Compatibility

This project includes Windows-specific fixes:

- **Build Scripts**: Uses PowerShell commands instead of Unix `rm`
- **Path Handling**: Proper Windows path resolution with `fileURLToPath()`
- **Log Files**: Windows-compatible filenames (no colons in timestamps)
- **Tailwind CSS**: Downgraded to v3 to avoid native binding issues on Windows

All commands work seamlessly in PowerShell or Command Prompt.

---

## 🌐 Network Configuration

### Local Network (Default)
```typescript
indexer: 'http://localhost:8088/api/v3/graphql'
indexerWS: 'ws://localhost:8088/api/v3/graphql/ws'
node: 'ws://localhost:9944'
proofServer: 'http://localhost:6300'
```

### Preview Network
```typescript
indexer: 'https://indexer.preview.midnight.network/api/v3/graphql'
indexerWS: 'wss://indexer.preview.midnight.network/api/v3/graphql/ws'
node: 'wss://rpc.preview.midnight.network'
proofServer: 'http://127.0.0.1:6300'  // Local proof server
```

---

## ☁️ Deploy to Vercel

This project is ready for instant deployment to Vercel.

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/midnight-starter-template)

### Manual Deployment

1. **Deploy Contract to Preview Network**
   ```powershell
   cd counter-cli
   npm run deploy
   ```

2. **Push to GitHub** (if not already done)
   ```powershell
   git push origin main
   ```

3. **Deploy to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Set environment variable: `VITE_CONTRACT_ADDRESS` (from deployment.json)
   - Click "Deploy"

4. **Access Your DApp**
   - Your app will be live at `https://your-project.vercel.app`
   - Connect Lace wallet and start using the counter!

**📖 [Full Deployment Guide](./VERCEL_DEPLOYMENT.md)** - Complete step-by-step instructions

---

## 📋 Project Files

### Configuration Files

- **`vercel.json`**: Vercel deployment configuration with build settings and CORS headers
- **`.env.vercel.template`**: Environment variable template for Vercel deployment
- **`package.json`**: Workspace configuration and npm scripts
- **`turbo.json`**: Turborepo build configuration

### Documentation

- **`README.md`**: This file - project overview and quick start
- **`VERCEL_DEPLOYMENT.md`**: Complete Vercel deployment guide
- **`DEPLOYMENT_SUCCESS.md`**: Local deployment success documentation
- **`INTEGRATION_COMPLETE.md`**: Technical integration details

---

## 📚 Learn More

- **[Midnight Documentation](https://docs.midnight.network/)**: Official Midnight Network docs
- **[Compact Language Guide](https://docs.midnight.network/develop/compact/)**: Learn the smart contract language
- **[Lace Wallet](https://www.lace.io/)**: Download the wallet extension
- **[Midnight Faucet](https://faucet.preview.midnight.network/)**: Get testnet tokens

---

## 🐛 Troubleshooting

### Contract won't load in frontend
- **Check**: Docker containers are running (`docker ps`)
- **Check**: All services show "healthy" status
- **Try**: Restart the frontend server

### Increment transaction fails
- **Check**: Wallet is connected and has balance
- **Check**: Proof server is running on port 6300
- **Check**: Browser console for detailed errors

### Build errors
- **Check**: Compact version is 0.27.0+ (`compact check`)
- **Try**: Delete `node_modules` and reinstall (`npm install`)

---

## 📄 License

This project is open source and available for educational purposes.
