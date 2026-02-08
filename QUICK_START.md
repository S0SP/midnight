# 🚀 Quick Start Guide

## Frontend Integration Complete! ✅

Your Midnight Counter Contract is now fully integrated with the React frontend.

### Contract Details
- **Address**: `1437076a20488f24e4474636f1c04490a9dbbe7852fd96b954970e4795af5057`
- **Network**: Local Midnight Network
- **Status**: ✅ Deployed & Ready

---

## Start the Application

### 1. Start the Frontend Dev Server

```powershell
cd d:\midnight\midnight-starter-template\frontend-vite-react
npm run dev
```

The application will start on http://localhost:5173 (or another port if 5173 is busy).

### 2. Prerequisites

Make sure your **Local Midnight Network** is running:

```powershell
cd d:\midnight\midnight-local-network
docker ps
```

You should see these containers running:
- ✅ Proof server (port 6300)
- ✅ Indexer (ports 8088)
- ✅ Node (port 9944)

If not running, start them:
```powershell
docker compose up -d
```

---

## Using the Application

### Step 1: Connect Your Wallet
1. Open http://localhost:5173 in your browser
2. Click the wallet button in the top-right corner
3. Connect using your Lace wallet or create a new one

### Step 2: Navigate to Counter
1. Click "Counter" in the navigation menu
2. The app will automatically join your deployed contract

### Step 3: Interact with the Contract
- **View Counter**: See the public counter value
- **View Private Counter**: See your private ZK counter value  
- **Increment**: Click "Increment Counter" to call the contract
- **Deploy New**: Optionally deploy a new instance of the contract

---

## What's Integrated

✅ **Contract Address**: Loaded from `.env` file  
✅ **Auto-Join Contract**: Automatically connects to deployed contract  
✅ **Increment Circuit**: Fully functional with ZK proof generation  
✅ **Real-time Updates**: State syncs automatically via RxJS  
✅ **Private State**: ZK private counter tracked locally  

---

## Troubleshooting

### Contract doesn't load
- **Check**: Local network is running (`docker ps`)
- **Check**: All services are healthy
- **Try**: Refresh the page after connecting wallet

### Increment fails
- **Check**: Wallet is connected
- **Check**: Proof server is running on port 6300
- **Check**: Browser console for error messages

### Can't connect wallet
- **Install**: [Lace Wallet browser extension](https://www.lace.io/)
- **Check**: Extension is enabled in your browser

---

## Architecture

```
Frontend (React + Vite)
    ↓
Environment Variable (.env)
    ↓
App.tsx (loads contract address)
    ↓
CounterAppProvider (context)
    ↓
Counter Page (UI)
    ↓
useContractSubscription (hook)
    ↓
ContractController (API)
    ↓
Midnight Network (deployed contract)
```

---

## Files Modified for Integration

1. ✅ `.env` - Contract address configuration
2. ✅ `App.tsx` - Loads address from environment
3. ✅ `contractController.ts` - Handles circuit calls
4. ✅ `counter-deployment-class.ts` - Contract join logic
5. ✅ All hooks properly reference the environment variable

---

## Next Steps

### Development
- Customize the Counter UI in `src/pages/counter/index.tsx`
- Add more circuits to `contractController.ts`
- Extend private state in `counter-contract`

### Deployment to Testnet
When ready to deploy to Midnight Preview Network:
1. Update `.env` with preview network configuration
2. Redeploy contract using `npm run deploy` in `counter-cli`
3. Update contract address in `.env`

---

**Status**: 🎉 **READY TO USE!**

Run `npm run dev` in the frontend directory and start interacting with your Midnight contract!
