# Quick Start

This guide will help you integrate LunoKit into your React application in just a few minutes.

## Prerequisites

Before getting started, make sure you have:

- Node.js 16 or higher
- A React 18+ application
- Basic knowledge of React hooks

## Basic Setup

### 1. Install LunoKit

::: code-group

```bash [pnpm]
pnpm add @luno-kit/ui @luno-kit/react @tanstack/react-query
```

```bash [yarn]
yarn add @luno-kit/ui @luno-kit/react @tanstack/react-query
```

```bash [npm]
npm install @luno-kit/ui @luno-kit/react @tanstack/react-query
```

:::

### 2. Import Styles

Add the LunoKit styles to your application:

```tsx
import '@luno-kit/ui/styles.css'
```

### 3. Create Configuration

Create a LunoKit configuration with your preferred chains and connectors:

```tsx
import { createConfig, polkadot, kusama, westend, polkadotjs, subwallet } from '@luno-kit/react'

const config = createConfig({
  appName: 'My Polkadot App',
  chains: [polkadot, kusama, westend],
  connectors: [polkadotjs(), subwallet()],
  autoConnect: true,
})
```

### 4. Wrap Your App

Wrap your application with the `LunoKitProvider`:

```tsx
import { LunoKitProvider, ConnectButton } from '@luno-kit/ui'
import { createConfig, polkadot, kusama, westend, polkadotjs, subwallet } from '@luno-kit/react'
import '@luno-kit/ui/styles.css'

const config = createConfig({
  appName: 'My Polkadot App',
  chains: [polkadot, kusama, westend],
  connectors: [polkadotjs(), subwallet()],
  autoConnect: true,
})

function App() {
  return (
    <LunoKitProvider config={config}>
      <div className="App">
        <header>
          <h1>My Polkadot App</h1>
          <ConnectButton />
        </header>
        {/* Your app content */}
      </div>
    </LunoKitProvider>
  )
}

export default App
```

That's it! You now have a fully functional wallet connection button in your app.

## Using React Hooks

For more advanced functionality, you can use LunoKit's React hooks directly:

```tsx
import { useAccount, useBalance, useConnect, ConnectionStatus } from '@luno-kit/react'

function WalletInfo() {
  const { account } = useAccount()
  const { data: balance } = useBalance({ address: account?.address })
  const { connect, connectors, status } = useConnect()

  if (status !== ConnectionStatus.Connected) {
    return (
      <div>
        <h3>Connect Your Wallet</h3>
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect({ connectorId: connector.id })}
          >
            Connect {connector.name}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h3>Wallet Connected</h3>
      <p><strong>Account:</strong> {account?.name}</p>
      <p><strong>Address:</strong> {account?.address}</p>
      <p><strong>Balance:</strong> {balance?.formattedTransferable}</p>
    </div>
  )
}
```

## Custom Chain Support

You can easily add support for custom Substrate-based chains:

```tsx
import { defineChain } from '@luno-kit/react'

const myCustomChain = defineChain({
  genesisHash: '0x1234...', // Your chain's genesis hash
  name: 'My Custom Chain',
  nativeCurrency: { 
    name: 'Custom Token', 
    symbol: 'CUSTOM', 
    decimals: 12 
  },
  rpcUrls: { 
    webSocket: ['wss://my-chain-rpc.example.com'] 
  },
  ss58Format: 42,
  blockExplorers: { 
    default: { 
      name: 'Explorer', 
      url: 'https://explorer.example.com' 
    } 
  },
  chainIconUrl: 'https://example.com/icon.png',
  testnet: true
})

const config = createConfig({
  appName: 'My App',
  chains: [myCustomChain], // Use your custom chain
  connectors: [polkadotjs(), subwallet()],
})
```

## Next Steps

Now that you have LunoKit set up, explore these topics:

- **[Configuration](/guide/configuration)** - Learn about all configuration options
- **[Connectors](/guide/connectors)** - Understand different wallet connectors
- **[API Reference](/api/)** - Explore all available hooks and components
- **[Examples](/examples/)** - See framework-specific examples

## Need Help?

- Check out our [Examples](/examples/) for framework-specific implementations
- Visit our [GitHub repository](https://github.com/Luno-lab/LunoKit) for issues and discussions
- Try the [live demo](https://demo.lunolab.xyz/) to see LunoKit in action