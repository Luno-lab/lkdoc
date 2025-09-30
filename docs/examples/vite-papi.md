# Vite + PAPI Integration

Learn how to integrate LunoKit's wallet connection features with PAPI in a Vite project.

## Overview

This example demonstrates how to use LunoKit for wallet connections while using PAPI for blockchain interactions. This approach is ideal when:

- You already have an existing PAPI-based application
- You need more direct control over blockchain interactions
- You want to use specific PAPI features while leveraging LunoKit's wallet connection capabilities

## Environment Setup

Before running the example, you need to configure your WalletConnect ID:

1. Copy the environment file:
   ```bash
   cd examples/with-vite-papi
   cp .env.example .env
   ```

2. Edit `.env` and replace `VITE_WALLET_CONNECT_ID` with your own WalletConnect ID:
   ```bash
   VITE_WALLET_CONNECT_ID=your_walletconnect_id
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

# Start with-vite-papi example
pnpm --filter with-vite-papi dev
```

## Key Integration Points

This example showcases two main integration aspects:

1. **LunoKit Configuration without Chains**
   - Setting up LunoKit without specifying chains
   - Configuring only wallet connectors

2. **Using usePapiSigner with PAPI**
   - Retrieving a PAPI-compatible signer from connected wallets
   - Using the signer with PAPI's transaction methods

## What You'll See

The example demonstrates:
- Basic LunoKit setup with Vite
- Multiple wallet support (Polkadot{.js}, SubWallet, Talisman, Polkagate, Walletconnect, NovaWallet)
- Account connection using LunoKit
- Blockchain interactions using PAPI
- Balance queries using PAPI's native methods
- Transaction signing using LunoKit's usePapiSigner
- Theme color switching

## Live Demo

Try the live demo: [Vite + PAPI Example](https://luno-kit-with-papi.vercel.app)

## Source Code

View the complete source code: [GitHub - with-vite-papi](https://github.com/Luno-lab/LunoKit/tree/main/examples/with-vite-papi)

## Further Reading

- [usePapiSigner Hook Documentation](/hooks/transaction/use-papi-signer)
- [PAPI Documentation](https://papi.how/)
