# Architecture

LunoKit is designed with a modular architecture that allows for flexible integration with different blockchain APIs. This page explains the architectural choices and API options available.

## Core Architecture

LunoKit is built with a modular approach:

- **@luno-kit/core** - Core connectors and chain configurations
- **@luno-kit/react** - React hooks and providers for state management
- **@luno-kit/ui** - Pre-built UI components with theming support

## Blockchain API Options

LunoKit offers two main options for interacting with blockchain networks:

### Default: Dedot Integration

By default, LunoKit uses [Dedot](https://docs.dedot.dev/) as its blockchain API. When using the default configuration with chains specified, LunoKit leverages Dedot for:

- Chain connections and state management
- Transaction creation and submission
- Data queries and subscriptions
- Account balances and other on-chain data

```tsx
// Default configuration with Dedot
import { createConfig } from '@luno-kit/react'
import { polkadot } from '@luno-kit/react/chains'

const config = createConfig({
  appName: 'My App',
  chains: [polkadot], // Specifying chains enables full Dedot functionality
  connectors: [/* your connectors */],
})
```

### Alternative: Papi Integration

If you prefer to use [Papi](https://papi.how/) for blockchain interactions, you can use LunoKit solely for wallet connections. In this mode, LunoKit provides:

- Wallet connection management
- Account management
- Papi-compatible signers

To use LunoKit with Papi, configure LunoKit without specifying chains:

```tsx
// Papi integration configuration
import { createConfig } from '@luno-kit/react'

const config = createConfig({
  appName: 'My App',
  // No chains specified - only wallet connection features will be available
  connectors: [/* your connectors */],
})
```

## Feature Availability by API Choice

| Feature | With Dedot (Default) | With Papi |
|---------|----------------------|-----------|
| **Wallet Connections** | ✅ Full support | ✅ Full support |
| **Account Management** | ✅ Full support | ✅ Full support |
| **UI Components** | ✅ Full support | ✅ Full support |
| **Transaction Hooks** | ✅ Available<br>`useSendTransaction`<br>`useSendTransactionHash` | ❌ Not available |
| **Signer Hooks** | ✅ Available<br>`useSigner` | ✅ Available<br>`usePapiSigner` |
| **API Hooks** | ✅ Available<br>`useApi`<br>`useBalance`<br>etc. | ❌ Not available |
| **Chain Management** | ✅ Built-in | ❌ Manual with Papi |
| **Data Queries** | ✅ Built-in | ❌ Manual with Papi |

## Important Notes

1. **When using Papi:**
   - You cannot use LunoKit's transaction hooks (`useSendTransaction`, etc.)
   - You cannot use LunoKit's API hooks (`useApi`, `useBalance`, etc.)
   - You must use `usePapiSigner` to get a Papi-compatible signer
   - You must handle chain connections and transactions using Papi directly

2. **When using Dedot (default):**
   - All LunoKit hooks and features are available
   - Chain management is handled automatically
   - Transaction and data hooks provide a streamlined experience

## When to Choose Each Option

### Choose Dedot (Default) When:

- You're starting a new project
- You want a complete solution with minimal setup
- You prefer React hooks for all blockchain interactions
- You need simplified chain management

### Choose Papi When:

- You have an existing Papi-based application
- You need specific Papi features not available in Dedot
- You want more direct control over blockchain interactions
- You're familiar with Papi's API and prefer its approach

## Examples

- [Complete Dedot Integration](/examples/vite) - Full LunoKit features
- [Papi Integration](/examples/vite-papi) - Wallet connections only 