# Next.js Pages Router

Integrate LunoKit with Next.js Pages Router for traditional React development.

## Environment Setup

Before running the example, you need to configure your WalletConnect ID:

1. Copy the environment file:
   ```bash
   cd examples/with-nextjs-pages
   cp .env.example .env
   ```

2. Edit `.env` and replace `NEXT_PUBLIC_WALLET_CONNECT_ID` with your own WalletConnect ID:
   ```bash
   NEXT_PUBLIC_WALLET_CONNECT_ID=your_walletconnect_id
   ```

You can get a WalletConnect ID from [WalletConnect Cloud](https://dashboard.reown.com/).

## Quick Start

```bash
git clone https://github.com/Luno-lab/LunoKit.git
cd LunoKit

# Install dependencies
pnpm install

# Start with-nextjs-pages example
pnpm --filter with-nextjs-pages dev
```

## What You'll See

The example demonstrates:
- Basic LunoKit setup with Next.js Pages Router
- Traditional routing approach
- Wallet connection and account management

## Source Code

View the complete source code: [GitHub - with-nextjs-pages](https://github.com/Luno-lab/LunoKit/tree/main/examples/with-nextjs-pages)
