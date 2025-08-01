# Chains

LunoKit supports all Substrate-based chains including Polkadot, Kusama, parachains, and custom chains. This guide shows you how to configure and use different chains in your application.

## Built-in Chains

LunoKit provides pre-configured support for major Polkadot ecosystem chains:

```tsx
import { 
  polkadot, 
  kusama, 
  westend, 
  paseo 
} from '@luno-kit/react'

const config = createConfig({
  appName: 'My App',
  chains: [polkadot, kusama, westend, paseo],
  connectors: [polkadotjs()],
})
```

### Available Chains

| Chain | Description | Network Type |
|-------|-------------|--------------|
| `polkadot` | Polkadot relay chain | Mainnet |
| `kusama` | Kusama canary network | Mainnet |
| `westend` | Polkadot testnet | Testnet |
| `paseo` | Community testnet | Testnet |

## Chain Configuration

Each built-in chain includes:

```tsx
// Example: Polkadot chain configuration
{
  genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
  name: 'Polkadot',
  nativeCurrency: { name: 'Polkadot', symbol: 'DOT', decimals: 10 },
  rpcUrls: {
    webSocket: ['wss://rpc.polkadot.io', 'wss://polkadot.api.onfinality.io/public-ws'],
    http: ['https://rpc.polkadot.io'],
  },
  ss58Format: 0,
  blockExplorers: { default: { name: 'Subscan', url: 'https://polkadot.subscan.io' } },
  chainIconUrl: '...' // SVG icon data
}
```

## Multi-chain Setup

Configure multiple chains for users to switch between:

```tsx
import { createConfig, polkadot, kusama, westend } from '@luno-kit/react'

const config = createConfig({
  appName: 'Multi-chain App',
  chains: [
    polkadot,    // Main production network
    kusama,      // Canary network
    westend,     // Testing
  ],
  connectors: [polkadotjs(), subwallet()],
})
```

Users can then switch between chains using the ConnectButton or programmatically:

```tsx
import { useSwitchChain } from '@luno-kit/react'

function ChainSwitcher() {
  const { switchChain, chains } = useSwitchChain()
  
  return (
    <div>
      {chains.map((chain) => (
        <button
          key={chain.genesisHash}
          onClick={() => switchChain({ chainId: chain.genesisHash })}
        >
          Switch to {chain.name}
        </button>
      ))}
    </div>
  )
}
```

## Custom Chains

Add support for any Substrate-based chain using `defineChain`:

```tsx
import { defineChain, createConfig } from '@luno-kit/react'

const myCustomChain = defineChain({
  genesisHash: '0x1234567890abcdef...', // Your chain's genesis hash
  name: 'My Custom Chain',
  nativeCurrency: { 
    name: 'Custom Token', 
    symbol: 'CUSTOM', 
    decimals: 12 
  },
  rpcUrls: {
    webSocket: ['wss://my-chain-rpc.example.com'],
    http: ['https://my-chain-rpc.example.com']
  },
  ss58Format: 42,
  blockExplorers: { 
    default: { 
      name: 'Custom Explorer', 
      url: 'https://explorer.example.com' 
    } 
  },
  chainIconUrl: 'https://example.com/icon.png', // Optional
  testnet: true // Optional: mark as testnet
})

const config = createConfig({
  appName: 'Custom Chain App',
  chains: [myCustomChain],
  connectors: [polkadotjs()],
})
```

### Required Fields

When defining a custom chain, these fields are required:

- `genesisHash`: Unique identifier for the chain
- `name`: Human-readable chain name
- `nativeCurrency`: Native token configuration
- `rpcUrls`: WebSocket and/or HTTP endpoints
- `ss58Format`: Address format for the chain

### Optional Fields

- `blockExplorers`: Block explorer configuration
- `chainIconUrl`: Chain icon (SVG/PNG URL or data URI)
- `testnet`: Boolean to mark as testnet
- `customTypes`: Custom type definitions
- `customRpc`: Custom RPC methods

## Parachains

Configure parachains the same way as custom chains:

```tsx
const acala = defineChain({
  genesisHash: '0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c',
  name: 'Acala',
  nativeCurrency: { name: 'Acala', symbol: 'ACA', decimals: 12 },
  rpcUrls: {
    webSocket: ['wss://acala-rpc.aca-api.network'],
  },
  ss58Format: 10,
  blockExplorers: { default: { name: 'Subscan', url: 'https://acala.subscan.io' } },
})

const moonbeam = defineChain({
  genesisHash: '0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d',
  name: 'Moonbeam',
  nativeCurrency: { name: 'Glimmer', symbol: 'GLMR', decimals: 18 },
  rpcUrls: {
    webSocket: ['wss://wss.api.moonbeam.network'],
  },
  ss58Format: 1284,
  blockExplorers: { default: { name: 'Moonscan', url: 'https://moonscan.io' } },
})
```

## Chain Switching

### Programmatic Switching

```tsx
import { useSwitchChain } from '@luno-kit/react'

function MyComponent() {
  const { switchChain, isPending } = useSwitchChain()
  
  const handleSwitch = async () => {
    try {
      await switchChain({ 
        chainId: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' // Polkadot
      })
    } catch (error) {
      console.error('Failed to switch chain:', error)
    }
  }
  
  return (
    <button onClick={handleSwitch} disabled={isPending}>
      {isPending ? 'Switching...' : 'Switch to Polkadot'}
    </button>
  )
}
```

### Current Chain Information

```tsx
import { useChain } from '@luno-kit/react'

function ChainDisplay() {
  const { chain } = useChain()
  
  if (!chain) return <div>No chain selected</div>
  
  return (
    <div>
      <img src={chain.chainIconUrl} alt={chain.name} width={24} height={24} />
      <span>{chain.name}</span>
      <span>({chain.nativeCurrency.symbol})</span>
    </div>
  )
}
```

## Advanced Configuration

### Custom RPC Methods

Add custom RPC methods for specific chains:

```tsx
const customChain = defineChain({
  // ... basic config
  customRpc: {
    myModule: {
      customMethod: 'myModule_customMethod',
    },
  },
})
```

### Custom Types

Define custom types for chains with non-standard runtime:

```tsx
const customChain = defineChain({
  // ... basic config
  customTypes: {
    CustomStruct: {
      field1: 'u32',
      field2: 'Vec<u8>',
    },
  },
})
```

### Transport Configuration

Override default transport settings:

```tsx
const config = createConfig({
  chains: [polkadot],
  connectors: [polkadotjs()],
  transports: {
    [polkadot.genesisHash]: 'wss://my-custom-polkadot-rpc.com',
  },
})
```

## Best Practices

### Chain Organization

```tsx
// Group by network type
const mainnetChains = [polkadot, kusama]
const testnetChains = [westend, paseo]

// Use appropriate chains for development
const config = createConfig({
  chains: process.env.NODE_ENV === 'production' 
    ? mainnetChains 
    : [...mainnetChains, ...testnetChains],
  // ...
})
```

### Error Handling

```tsx
import { useSwitchChain } from '@luno-kit/react'

function ChainSwitcher() {
  const { switchChain, error } = useSwitchChain()
  
  if (error) {
    return <div>Error switching chain: {error.message}</div>
  }
  
  // ... rest of component
}
```

## Next Steps

- Learn about [wallet configuration](/getting-started/wallets)
- Explore [account management](/getting-started/account-management)
- Check out [chain-related hooks](/hooks/chain/use-chain)