# Installation

Get started with LunoKit by installing the packages you need for your project.

## Choose Your Installation

LunoKit offers flexible installation options depending on your needs:

### Option 1: Complete Solution (Recommended)

Install both UI components and React hooks for a complete solution:

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

### Option 2: Hooks Only

If you want to build custom UI with our React hooks:

::: code-group

```bash [pnpm]
pnpm add @luno-kit/react @tanstack/react-query
```

```bash [yarn]
yarn add @luno-kit/react @tanstack/react-query
```

```bash [npm]
npm install @luno-kit/react @tanstack/react-query
```

:::

### Option 3: Core Only

For advanced users who want to build custom connectors:

::: code-group

```bash [pnpm]
pnpm add @luno-kit/core
```

```bash [yarn]
yarn add @luno-kit/core
```

```bash [npm]
npm install @luno-kit/core
```

:::

## Package Overview

### @luno-kit/ui
- Pre-built React components (`ConnectButton`, `LunoKitProvider`)
- Complete theming system with CSS variables
- Responsive design optimized for mobile and desktop

### @luno-kit/react  
- React hooks for wallet management (`useConnect`, `useAccount`, etc.)
- Provider components for state management
- TypeScript definitions and type safety
- Integration with React Query for data fetching

### @luno-kit/core
- Core wallet connectors (Polkadot{.js}, SubWallet, Talisman, etc.)
- Chain configurations (Polkadot, Kusama, parachains)
- Utility functions and type definitions
- Framework-agnostic functionality

## Integration Patterns

LunoKit offers flexible integration patterns to suit different project needs:

### Full API Integration

Use LunoKit's complete API capabilities with built-in chain support:

```tsx
import { createConfig } from '@luno-kit/react'
import { polkadot } from '@luno-kit/react/chains'
import { polkadotjsConnector } from '@luno-kit/react/connectors'

const config = createConfig({
  appName: 'My Dapp',
  chains: [polkadot],
  connectors: [polkadotjsConnector()],
})
```

### Wallet Connection Only

Use LunoKit solely for wallet connections without chain integration:

```tsx
import { createConfig } from '@luno-kit/react'
import { polkadotjsConnector } from '@luno-kit/react/connectors'

const config = createConfig({
  appName: 'My Dapp',
  // No chains required
  connectors: [polkadotjsConnector()],
})
```

### Integration with papi

Get a papi-compatible signer from the connected wallet:

```tsx
import { usePapiSigner } from '@luno-kit/react'
import { ApiPromise } from '@polkadot/api'

function MyComponent() {
  const { signer, isLoading } = usePapiSigner()
  const [api, setApi] = useState<ApiPromise>()
  
  useEffect(() => {
    // Initialize your papi instance
    // ...
    
    // Use the signer with your papi instance when available
    if (signer && api) {
      // Now you can use the signer with papi transactions
      // api.tx.balances.transfer(...).signAndSend(address, { signer })
    }
  }, [signer, api])
  
  // Your component UI
}
```

## Peer Dependencies

LunoKit requires these peer dependencies:

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "@tanstack/react-query": "^5.0.0"
}
```

### Why React Query?

LunoKit uses React Query for:
- Efficient data fetching and caching
- Background data synchronization  
- Optimistic updates
- Error handling and retry logic

## Framework Integration

### Next.js

LunoKit works seamlessly with Next.js. For App Router projects, make sure to use client components:

```tsx
'use client'

import { LunoKitProvider } from '@luno-kit/ui'
```

### Vite

No additional configuration needed. LunoKit works out of the box with Vite.

### Create React App

LunoKit is fully compatible with Create React App projects.

### Remix

For Remix projects, ensure client-side rendering for wallet components:

```tsx
import { ClientOnly } from 'remix-utils'

const queryClient = new QueryClient();

export default function App() {
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      {() => <QueryClientProvider client={queryClient}><LunoKitProvider config={config}>...</LunoKitProvider></QueryClientProvider>}
    </ClientOnly>
  )
}
```

## TypeScript Support

LunoKit is built with TypeScript and provides full type safety out of the box. No additional setup required.

### Type Imports

Import types when needed:

```tsx
import type { Account, Chain, Connector } from '@luno-kit/react'
```

## Browser Support

LunoKit supports all modern browsers:

- Chrome/Chromium 90+
- Firefox 90+  
- Safari 14+
- Edge 90+

## Wallet Extensions Required

Users need to install wallet browser extensions to connect:

- **Polkadot{.js}** - [https://polkadot.js.org/extension/](https://polkadot.js.org/extension/)
- **SubWallet** - [https://subwallet.app](https://subwallet.app)
- **Talisman** - [https://talisman.xyz](https://talisman.xyz)
- **Nova Wallet** - [https://novawallet.io](https://novawallet.io)
- **PolkaGate** - [https://polkagate.xyz](https://polkagate.xyz)
- **WalletConnect** - [https://reown.com/](https://reown.com/)
- **Enkrypt** - [https://www.enkrypt.com](https://www.enkrypt.com)
- **Fearless** - [https://fearlesswallet.io](https://fearlesswallet.io)
- **Mimir** - [https://mimir.global](https://mimir.global)

## Next Steps

Now that you have LunoKit installed, let's [create your first ConnectButton](/getting-started/connect-button)!

## Need Help?

If you encounter installation issues:

1. Make sure you're using a supported Node.js version (20.18.0+)
2. Clear your package manager cache and reinstall
3. Check for conflicting dependencies
4. [Open an issue](https://github.com/Luno-lab/LunoKit/issues) if problems persist
