# Custom Wallets

Learn how to add support for custom wallet connectors in LunoKit.

## Overview

LunoKit provides two main connector types for integrating custom wallets:
- **Window Inject Wallets** - Browser extensions that inject into the `window` object
- **WalletConnect Wallets** - Mobile wallets that use WalletConnect protocol

## Window Inject Wallets

For browser extension wallets that inject into the `window` object, use the `InjectConnector`:

```tsx
import { InjectConnector } from '@luno-kit/react/connectors'

export const customWalletConnector = () => {
  return new InjectConnector({
    id: 'inject-wallet',
    name: 'Inject Wallet',
    icon: '...', // Your wallet's icon
    links: {
      browserExtension: 'https://your-wallet.com/download',
      deepLink: 'https://your-wallet.com/deepLink'
    }
  })
}
```

> [!IMPORTANT]
> The `id` must match the key in `window.injectWeb3[id]`. For example:
> - `'polkadot-js'` → `window.injectWeb3['polkadot-js']`
> - `'subwallet-js'` → `window.injectWeb3['subwallet-js']`

### Example: Polkadot.js Extension

```tsx
import { InjectConnector } from '@luno-kit/react/connectors'
import { polkadotjsSVG } from '../config/logos/generated'

export const polkadotjsConnector = () => {
  return new InjectConnector({
    id: 'polkadot-js',
    name: 'Polkadot{.js}',
    icon: polkadotjsSVG,
    links: {
      browserExtension: 'https://polkadot.js.org/extension'
    }
  })
}
```

## WalletConnect Wallets

For mobile wallets that use WalletConnect protocol, use the `WalletConnectConnector`:

```tsx
import { WalletConnectConnector } from '@luno-kit/react/connectors'
import type { Metadata } from '@walletconnect/universal-provider'

type WalletConnectConfig = {
  projectId: string;
  relayUrl?: string;
  metadata?: Metadata;
}

export const customMobileWalletConnector = (config: WalletConnectConfig) => {
  return new WalletConnectConnector({
    id: 'custom-mobile',
    name: 'Custom Mobile Wallet',
    icon: '...',
    links: {
      browserExtension: 'https://your-wallet.com/download',
      deepLink: 'https://your-wallet.com/deepLink'
    },
    ...config
  })
}
```

### Example: Nova Wallet

```tsx
import { WalletConnectConnector } from '@luno-kit/react'
import { novaSVG } from '../config/logos/generated'

type WalletConnectConfig = {
  projectId: string;
  relayUrl?: string;
  metadata?: Metadata;
}

export const novaConnector = (config: WalletConnectConfig) => {
  return new WalletConnectConnector({
    id: 'nova',
    name: 'Nova Wallet',
    icon: novaSVG,
    links: {
      browserExtension: 'https://novawallet.io',
    },
    ...config,
  })
}
```

## Integration with Config

Add your custom connectors to the LunoKit configuration:

```tsx
import { createConfig } from '@luno-kit/react'
import { polkadot, kusama } from '@luno-kit/react/chains'
import { polkadotjsConnector } from '@luno-kit/react/connectors'
import { customWalletConnector } from './connectors/customWallet'
import { customMobileWalletConnector } from './connectors/customMobileWallet'

const config = createConfig({
  appName: 'My App',
  chains: [polkadot, kusama],
  connectors: [
    customWalletConnector(),           // Custom window inject wallet
    customMobileWalletConnector({      // Custom walletConnect wallet
      projectId: 'your-project-id',
      metadata: {
        name: 'My App',
        description: 'My Polkadot App',
        url: 'https://myapp.com',
        icons: ['https://myapp.com/icon.png']
      }
    }),
    // Built-in wallets
    polkadotjsConnector(),
  ],
})
```

## Required Configuration

### CommonConnector (Window Inject)

| Property | Type | Required | Description                                                                             |
|----------|------|----------|-----------------------------------------------------------------------------------------|
| `id` | `string` | Yes | Must match the key in `window.injectWeb3[id]` (e.g., `'polkadot-js'`, `'subwallet-js'`) |
| `name` | `string` | Yes | Display name for the wallet                                                             |
| `icon` | `string` | Yes | Image URL or base64-encoded image string                                                                       |
| `links` | `ConnectorLinks` | Yes | Links object (always present)                                                           |

### WalletConnectConnector

| Property | Type | Required | Description                      |
|----------|------|----------|----------------------------------|
| `id` | `string` | Yes | Unique identifier for the wallet |
| `name` | `string` | Yes | Display name for the wallet      |
| `icon` | `string` | Yes | Image URL or base64-encoded image string              |
| `links` | `ConnectorLinks` | Yes | Links object (always present)    |
| `projectId` | `string` | Yes | Your WalletConnect project ID    |
| `relayUrl` | `string` | No | Custom relay URL                 |
| `metadata` | `Metadata` | No | App metadata for WalletConnect   |

### ConnectorLinks Interface

```tsx
interface ConnectorLinks {
  browserExtension?: string;  // Download URL for the extension (optional)
  deepLink?: string;          // Deep link for mobile wallets (optional)
}
```

> [!TIP]
> The `links` object is always required, but its properties `browserExtension` and `deepLink` are optional and can be empty.
