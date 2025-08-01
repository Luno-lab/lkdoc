# Vite Integration

Learn how to integrate LunoKit with Vite for a fast, modern development experience.

## Overview

The `with-vite` example demonstrates how to use LunoKit in a Vite-powered React application with TypeScript support.

## Quick Start

```bash
git clone https://github.com/Luno-lab/LunoKit.git
cd LunoKit

# Install dependencies
pnpm install

# Start with-vite example
pnpm --filter with-vite dev
```

## Project Structure

```
with-vite/
├── src/
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Vite entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

## Configuration

### vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['@polkadot/api', '@polkadot/util', '@polkadot/util-crypto']
  }
})
```

### package.json

```json
{
  "name": "with-vite",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@luno-kit/ui": "workspace:*",
    "@luno-kit/react": "workspace:*",
    "@tanstack/react-query": "^5.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

## Implementation

### main.tsx

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### App.tsx

```tsx
import { LunoKitProvider, ConnectButton } from '@luno-kit/ui'
import { 
  createConfig, 
  polkadot, 
  kusama, 
  westend, 
  paseo,
  polkadotjs, 
  subwallet,
  talisman 
} from '@luno-kit/react'
import '@luno-kit/ui/styles.css'

const config = createConfig({
  appName: 'Vite Example',
  chains: [polkadot, kusama, westend, paseo],
  connectors: [
    polkadotjs(),
    subwallet(),
    talisman(),
  ],
  autoConnect: true,
})

function App() {
  return (
    <LunoKitProvider config={config}>
      <div className="app">
        <header>
          <h1>LunoKit + Vite</h1>
          <ConnectButton />
        </header>
        
        <main>
          <AccountInfo />
        </main>
      </div>
    </LunoKitProvider>
  )
}

function AccountInfo() {
  const { account } = useAccount()
  const { data: balance } = useBalance({ address: account?.address })
  
  if (!account) {
    return (
      <div className="welcome">
        <h2>Welcome to LunoKit!</h2>
        <p>Connect your wallet to get started.</p>
      </div>
    )
  }
  
  return (
    <div className="account-info">
      <h2>Account Information</h2>
      <p><strong>Name:</strong> {account.name || 'Unnamed'}</p>
      <p><strong>Address:</strong> {account.formattedAddress}</p>
      {balance && (
        <p><strong>Balance:</strong> {balance.formattedTransferable} {balance.symbol}</p>
      )}
    </div>
  )
}

export default App
```

### index.css

```css
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}

.welcome, .account-info {
  background: #f9f9f9;
  color: #333;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 2rem;
}

.account-info p {
  margin: 0.5rem 0;
  text-align: left;
}

@media (prefers-color-scheme: dark) {
  .welcome, .account-info {
    background: #1a1a1a;
    color: #fff;
  }
}
```

## Features Demonstrated

- ✅ **Basic Setup** - LunoKit configuration with Vite
- ✅ **Multiple Chains** - Polkadot, Kusama, Westend, Paseo
- ✅ **Multiple Wallets** - Polkadot{.js}, SubWallet, Talisman
- ✅ **Account Management** - Display connected account information
- ✅ **Balance Display** - Show account balance
- ✅ **Auto-connect** - Automatically reconnect on page load
- ✅ **TypeScript** - Full TypeScript support
- ✅ **Responsive Design** - Works on desktop and mobile

## Development Experience

### Hot Module Replacement (HMR)

Vite's HMR works seamlessly with LunoKit components:

```tsx
// Changes to this component will hot reload
function WalletStatus() {
  const { status } = useConnect()
  
  return <div>Status: {status}</div>
}
```

### Fast Builds

Vite's fast build times make development smooth:

```bash
# Development build (instant)
pnpm dev

# Production build (optimized)
pnpm build

# Preview production build
pnpm preview
```

## Optimization Tips

### Bundle Size

Optimize your bundle by importing only what you need:

```tsx
// Tree-shake unused chains and connectors
import { polkadot, kusama } from '@luno-kit/react' // Only import needed chains
import { polkadotjs } from '@luno-kit/react' // Only import needed wallets
```

### Performance

Use React Query's built-in optimizations:

```tsx
const config = createConfig({
  // ... other config
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 60_000, // 1 minute
        gcTime: 300_000,   // 5 minutes
      },
    },
  },
})
```

## Common Issues

### Global is not defined

Add this to your `vite.config.ts`:

```ts
export default defineConfig({
  define: {
    global: 'globalThis',
  },
})
```

### Polkadot Dependencies

Add Polkadot packages to `optimizeDeps`:

```ts
export default defineConfig({
  optimizeDeps: {
    include: ['@polkadot/api', '@polkadot/util', '@polkadot/util-crypto']
  }
})
```

## Next Steps

- Explore the [Next.js App Router example](/examples/nextjs-app)
- Learn about [custom theming](/getting-started/theming)
- Check out [advanced hooks usage](/hooks/)

## Live Demo

Try the live demo: [Vite Example](https://demo.lunolab.xyz/vite)

## Source Code

View the complete source code: [GitHub - with-vite](https://github.com/Luno-lab/LunoKit/tree/main/examples/with-vite)