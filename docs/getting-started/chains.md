# Chains

LunoKit supports almost all Substrate-based chains including Polkadot, Kusama, parachains, and custom chains. This guide shows you how to configure and use different chains in your application.

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
  appName: 'My Lunokit App',
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
  appName: 'My Lunokit App',
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

## Next Steps

- Learn about [wallet configuration](/getting-started/wallets)
- Explore [account management](/getting-started/account-management)
- Check out [chain-related hooks](/hooks/chain/use-chain)
