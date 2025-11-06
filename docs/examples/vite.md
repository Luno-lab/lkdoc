# Vite Integration

Learn how to integrate LunoKit with Vite for a fast, modern development experience.

## Environment Setup

Before running the example, you need to configure your WalletConnect ID:

1. Copy the environment file:
   ```bash
   cd examples/with-vite
   cp .env.example .env
   ```

2. Edit `.env` and replace the environment variables with your own values:
   ```bash
   VITE_WALLET_CONNECT_ID=your_walletconnect_id
   VITE_SUBSCAN_API_KEY=your_subscan_api_key
   ```

You can get a WalletConnect ID from [WalletConnect Cloud](https://dashboard.reown.com/).

For Subscan API Key, register at [Subscan](https://www.subscan.io/) and create an API key in your account dashboard.

## Quick Start

```bash
git clone https://github.com/Luno-lab/LunoKit.git
cd LunoKit

# Install dependencies
pnpm install

# Build packages
pnpm build

# Start with-vite example
pnpm --filter with-vite dev
```

## What You'll See

The example demonstrates:
- Basic LunoKit setup with Vite
- Multiple chains (Polkadot, Kusama, Westend, Paseo)
- Multiple wallets (Polkadot{.js}, SubWallet, Talisman, Polkagate, Walletconnect, NovaWallet)
- Account connection and balance display
- Theme color switching
- SignMessage functionality
- Transfer transaction

## Live Demo

Try the live demo: [Vite Example](https://demo.lunolab.xyz)

## Source Code

View the complete source code: [GitHub - with-vite](https://github.com/Luno-lab/LunoKit/tree/main/examples/with-vite)
