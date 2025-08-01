# Custom Chains

Learn how to add support for custom Substrate-based chains and configure them for use with LunoKit.

## Overview

LunoKit supports any Substrate-based blockchain. This guide shows you how to define custom chains, configure their properties, and integrate them with your application.

## Basic Custom Chain

```tsx
import { defineChain, createConfig } from '@luno-kit/react'

const myCustomChain = defineChain({
  genesisHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  name: 'My Custom Chain',
  nativeCurrency: {
    name: 'Custom Token',
    symbol: 'CUSTOM',
    decimals: 12,
  },
  rpcUrls: {
    webSocket: ['wss://rpc.mycustomchain.com'],
    http: ['https://rpc.mycustomchain.com'],
  },
  ss58Format: 42,
})

const config = createConfig({
  appName: 'My App',
  chains: [myCustomChain],
  connectors: [polkadotjs()],
})
```

## Complete Chain Configuration

```tsx
const advancedCustomChain = defineChain({
  // Required fields
  genesisHash: '0xabcdef...',
  name: 'Advanced Custom Chain',
  nativeCurrency: {
    name: 'Advanced Token',
    symbol: 'ADV',
    decimals: 18,
  },
  rpcUrls: {
    webSocket: [
      'wss://primary-rpc.example.com',
      'wss://backup-rpc.example.com',
    ],
    http: [
      'https://primary-rpc.example.com',
      'https://backup-rpc.example.com',
    ],
  },
  ss58Format: 25,
  
  // Optional fields
  blockExplorers: {
    default: { 
      name: 'Custom Explorer', 
      url: 'https://explorer.example.com' 
    },
    subscan: {
      name: 'Subscan',
      url: 'https://customchain.subscan.io'
    },
  },
  chainIconUrl: 'https://example.com/chain-icon.svg',
  testnet: false,
  
  // Advanced configuration
  customTypes: {
    // Custom type definitions
    MyCustomType: {
      field1: 'u32',
      field2: 'Vec<u8>',
      field3: 'Option<AccountId>',
    },
  },
  
  customRpc: {
    // Custom RPC methods
    myModule: {
      customMethod: 'myModule_customMethod',
      anotherMethod: 'myModule_anotherMethod',
    },
  },
})
```

## Parachain Configuration

```tsx
// Acala parachain example
const acalaChain = defineChain({
  genesisHash: '0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c',
  name: 'Acala',
  nativeCurrency: {
    name: 'Acala',
    symbol: 'ACA',
    decimals: 12,
  },
  rpcUrls: {
    webSocket: ['wss://acala-rpc-0.aca-api.network'],
    http: ['https://acala-rpc-0.aca-api.network'],
  },
  ss58Format: 10,
  blockExplorers: {
    default: { name: 'Subscan', url: 'https://acala.subscan.io' },
  },
  chainIconUrl: 'https://icons.llamao.fi/icons/chains/rsz_acala.jpg',
  
  // Parachain-specific configuration
  paraId: 2000,
  relayChain: 'polkadot',
})

// Moonbeam parachain example
const moonbeamChain = defineChain({
  genesisHash: '0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d',
  name: 'Moonbeam',
  nativeCurrency: {
    name: 'Glimmer',
    symbol: 'GLMR',
    decimals: 18, // Moonbeam uses 18 decimals like Ethereum
  },
  rpcUrls: {
    webSocket: ['wss://wss.api.moonbeam.network'],
    http: ['https://rpc.api.moonbeam.network'],
  },
  ss58Format: 1284,
  blockExplorers: {
    default: { name: 'Moonscan', url: 'https://moonscan.io' },
    subscan: { name: 'Subscan', url: 'https://moonbeam.subscan.io' },
  },
  chainIconUrl: 'https://moonbeam.network/wp-content/uploads/2021/01/Moonbeam-Logo.png',
  
  // EVM compatibility
  evmCompatible: true,
  paraId: 2004,
  relayChain: 'polkadot',
})
```

## Testnet Configuration

```tsx
const testnetChain = defineChain({
  genesisHash: '0x...',
  name: 'My Testnet',
  nativeCurrency: {
    name: 'Test Token',
    symbol: 'TEST',
    decimals: 12,
  },
  rpcUrls: {
    webSocket: ['wss://testnet-rpc.example.com'],
  },
  ss58Format: 42,
  testnet: true, // Mark as testnet
  
  // Testnet-specific settings
  faucetUrl: 'https://faucet.example.com',
  docsUrl: 'https://docs.example.com/testnet',
  
  blockExplorers: {
    default: { 
      name: 'Testnet Explorer', 
      url: 'https://testnet-explorer.example.com' 
    },
  },
})
```

## Multi-Environment Chain Setup

```tsx
// Different configurations for different environments
const getChainConfig = (env: 'development' | 'staging' | 'production') => {
  const baseConfig = {
    name: 'My Chain',
    nativeCurrency: {
      name: 'My Token',
      symbol: 'MTK',
      decimals: 12,
    },
    ss58Format: 42,
  }
  
  switch (env) {
    case 'development':
      return defineChain({
        ...baseConfig,
        genesisHash: '0xdev...',
        name: 'My Chain (Dev)',
        rpcUrls: {
          webSocket: ['ws://localhost:9944'],
        },
        testnet: true,
      })
    
    case 'staging':
      return defineChain({
        ...baseConfig,
        genesisHash: '0xstaging...',
        name: 'My Chain (Staging)',
        rpcUrls: {
          webSocket: ['wss://staging-rpc.example.com'],
        },
        testnet: true,
      })
    
    case 'production':
      return defineChain({
        ...baseConfig,
        genesisHash: '0xprod...',
        rpcUrls: {
          webSocket: [
            'wss://primary-rpc.example.com',
            'wss://backup-rpc.example.com',
          ],
        },
        blockExplorers: {
          default: { name: 'Explorer', url: 'https://explorer.example.com' },
        },
      })
  }
}

const myChain = getChainConfig(process.env.NODE_ENV as any)
```

## Custom Types Integration

```tsx
const chainWithCustomTypes = defineChain({
  genesisHash: '0x...',
  name: 'Chain with Custom Types',
  nativeCurrency: { name: 'Token', symbol: 'TKN', decimals: 12 },
  rpcUrls: { webSocket: ['wss://rpc.example.com'] },
  ss58Format: 42,
  
  customTypes: {
    // Custom struct
    UserProfile: {
      name: 'Vec<u8>',
      age: 'u32',
      active: 'bool',
    },
    
    // Custom enum
    Status: {
      _enum: ['Active', 'Inactive', 'Pending'],
    },
    
    // Complex nested type
    Transaction: {
      from: 'AccountId',
      to: 'AccountId',
      amount: 'Balance',
      metadata: 'Vec<u8>',
      timestamp: 'Moment',
    },
  },
  
  customRpc: {
    userModule: {
      getProfile: 'userModule_getProfile',
      updateProfile: 'userModule_updateProfile',
    },
    transactionModule: {
      getHistory: 'transactionModule_getHistory',
    },
  },
})
```

## Chain Validation and Health Checks

```tsx
import { ApiPromise, WsProvider } from '@polkadot/api'

const validateChain = async (chain: Chain): Promise<boolean> => {
  try {
    // Test WebSocket connection
    const wsProvider = new WsProvider(chain.rpcUrls.webSocket[0])
    const api = await ApiPromise.create({ 
      provider: wsProvider,
      types: chain.customTypes,
    })
    
    // Verify genesis hash
    const genesisHash = api.genesisHash.toHex()
    if (genesisHash !== chain.genesisHash) {
      console.error('Genesis hash mismatch')
      return false
    }
    
    // Check if chain is reachable
    const header = await api.rpc.chain.getHeader()
    console.log(`Chain ${chain.name} is healthy. Latest block: ${header.number}`)
    
    await api.disconnect()
    return true
    
  } catch (error) {
    console.error(`Chain ${chain.name} validation failed:`, error)
    return false
  }
}

// Usage
const healthyChains = await Promise.all(
  chains.map(async (chain) => ({
    chain,
    healthy: await validateChain(chain),
  }))
)

const validChains = healthyChains
  .filter(({ healthy }) => healthy)
  .map(({ chain }) => chain)
```

## Dynamic Chain Loading

```tsx
const loadChainFromRegistry = async (chainId: string): Promise<Chain> => {
  // Fetch chain info from a registry
  const response = await fetch(`https://chain-registry.example.com/chains/${chainId}`)
  const chainInfo = await response.json()
  
  return defineChain({
    genesisHash: chainInfo.genesisHash,
    name: chainInfo.name,
    nativeCurrency: {
      name: chainInfo.token.name,
      symbol: chainInfo.token.symbol,
      decimals: chainInfo.token.decimals,
    },
    rpcUrls: {
      webSocket: chainInfo.rpcUrls.websocket,
      http: chainInfo.rpcUrls.http,
    },
    ss58Format: chainInfo.ss58Format,
    blockExplorers: chainInfo.explorers,
    chainIconUrl: chainInfo.iconUrl,
    customTypes: chainInfo.types,
  })
}

// Usage
const dynamicChains = await Promise.all([
  loadChainFromRegistry('my-chain-1'),
  loadChainFromRegistry('my-chain-2'),
])

const config = createConfig({
  chains: [...builtInChains, ...dynamicChains],
  connectors: [polkadotjs()],
})
```

## Chain-specific Hooks

```tsx
// Custom hook for chain-specific functionality
const useChainSpecificFeatures = (chainId: string) => {
  const { chain } = useChain()
  const { data: api } = useApi()
  
  const isMyCustomChain = chain?.genesisHash === chainId
  
  const customMethod = useCallback(async (param: string) => {
    if (!api || !isMyCustomChain) return null
    
    try {
      const result = await api.rpc.myModule.customMethod(param)
      return result.toJSON()
    } catch (error) {
      console.error('Custom method failed:', error)
      return null
    }
  }, [api, isMyCustomChain])
  
  return {
    isMyCustomChain,
    customMethod,
  }
}

// Usage in component
function ChainSpecificComponent() {
  const { isMyCustomChain, customMethod } = useChainSpecificFeatures(
    '0x1234567890abcdef...'
  )
  
  if (!isMyCustomChain) {
    return <div>This feature is only available on My Custom Chain</div>
  }
  
  return (
    <div>
      <button onClick={() => customMethod('test')}>
        Call Custom Method
      </button>
    </div>
  )
}
```

## Best Practices

### 1. Genesis Hash Verification
Always verify the genesis hash matches your chain:

```tsx
const verifyChain = (expectedGenesisHash: string, actualGenesisHash: string) => {
  if (expectedGenesisHash !== actualGenesisHash) {
    throw new Error(
      `Chain genesis hash mismatch. Expected: ${expectedGenesisHash}, Got: ${actualGenesisHash}`
    )
  }
}
```

### 2. Fallback RPC URLs
Provide multiple RPC endpoints for reliability:

```tsx
const reliableChain = defineChain({
  // ...
  rpcUrls: {
    webSocket: [
      'wss://primary-rpc.example.com',    // Primary endpoint
      'wss://backup-rpc.example.com',     // Backup endpoint
      'wss://fallback-rpc.example.com',   // Fallback endpoint
    ],
  },
})
```

### 3. Environment-specific Configuration
Use environment variables for different deployments:

```tsx
const myChain = defineChain({
  genesisHash: process.env.REACT_APP_GENESIS_HASH!,
  name: process.env.REACT_APP_CHAIN_NAME!,
  rpcUrls: {
    webSocket: [process.env.REACT_APP_RPC_URL!],
  },
  // ...
})
```

### 4. Type Safety
Define proper TypeScript interfaces:

```tsx
interface ChainConfig {
  genesisHash: string
  name: string
  rpcUrl: string
  ss58Format: number
  decimals: number
  symbol: string
}

const createChainFromConfig = (config: ChainConfig): Chain => {
  return defineChain({
    genesisHash: config.genesisHash,
    name: config.name,
    nativeCurrency: {
      name: config.name,
      symbol: config.symbol,
      decimals: config.decimals,
    },
    rpcUrls: {
      webSocket: [config.rpcUrl],
    },
    ss58Format: config.ss58Format,
  })
}
```

## Related Documentation

- [Built-in Chains](/getting-started/chains) - Pre-configured chains
- [Custom Wallets](/advanced/custom-wallets) - Add custom wallet support
- [useChain Hook](/hooks/chain/use-chain) - Chain management