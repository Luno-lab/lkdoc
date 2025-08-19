# Create React App

Integrate LunoKit with Create React App for a quick start with React development.

## Environment Setup

Before running the example, you need to configure your WalletConnect ID:

1. Copy the environment file:
   ```bash
   cd examples/with-cra
   cp .env.example .env
   ```

2. Edit `.env` and replace `REACT_APP_WALLET_CONNECT_ID` with your own WalletConnect ID:
   ```bash
   REACT_APP_WALLET_CONNECT_ID=your_walletconnect_id
   ```

You can get a WalletConnect ID from [WalletConnect Cloud](https://dashboard.reown.com/).

## Quick Start

```bash
git clone https://github.com/Luno-lab/LunoKit.git
cd LunoKit

# Install dependencies
pnpm install

# Build packages
pnpm build

# Start with-cra example
pnpm --filter with-cra start
```

## What You'll See

The example demonstrates:
- Basic LunoKit setup with Create React App
- Wallet connection and account information
- Balance display for connected accounts

## Source Code

View the complete source code: [GitHub - with-cra](https://github.com/Luno-lab/LunoKit/tree/main/examples/with-cra)
