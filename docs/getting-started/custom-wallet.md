# Custom Wallets

Learn how to add support for custom wallet connectors in LunoKit.

## Overview

LunoKit provides two main connector types for integrating custom wallets:
- **Window Inject Wallets** - Browser extensions that inject into the `window` object
- **WalletConnect Wallets** - Mobile wallets that use WalletConnect protocol

## Window Inject Wallets

For browser extension wallets that inject into the `window` object, use the `CommonConnector`:

```tsx
import { CommonConnector } from '@luno-kit/react'

export const customWalletConnector = () => {
  return new CommonConnector({
    id: 'custom-wallet',
    name: 'Custom Wallet',
    icon: 'data:image/svg+xml;base64,...', // Your wallet's icon
    links: {
      browserExtension: 'https://your-wallet.com/download',
      deepLink: 'https://your-wallet.com/deepLink'
    }
  })
}
```

### Example: Polkadot.js Extension

```tsx
import { CommonConnector } from '@luno-kit/react'
import { polkadotjsSVG } from '../config/logos/generated'

export const polkadotjsConnector = () => {
  return new CommonConnector({
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
import { WalletConnectConnector } from '@luno-kit/react'

export const customMobileWalletConnector = (config: WalletConnectConfig) => {
  return new WalletConnectConnector({
    id: 'custom-mobile',
    name: 'Custom Mobile Wallet',
    icon: 'data:image/svg+xml;base64,...',
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

export const novaConnector = (config: NovaConnectorConfig) => {
  return new WalletConnectConnector({
    id: 'nova',
    name: 'Nova Wallet',
    icon: novaSVG,
    links: {
      browserExtension: 'https://novawallet.io',
    },
    ...config as WalletConnectConfig,
  })
}
```

## Integration with Config

Add your custom connectors to the LunoKit configuration:

```tsx
import { createConfig, polkadot, kusama } from '@luno-kit/react'
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
    polkadotjs(),
    subwallet(),
  ],
})
```

## Required Configuration

### CommonConnector (Window Inject)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the wallet |
| `name` | `string` | Yes | Display name for the wallet |
| `icon` | `string` | Yes | SVG icon or image URL |
| `links` | `ConnectorLinks` | Yes | Links object (always present) |

### WalletConnectConnector

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the wallet |
| `name` | `string` | Yes | Display name for the wallet |
| `icon` | `string` | Yes | SVG icon or image URL |
| `links` | `ConnectorLinks` | Yes | Links object (always present) |
| `projectId` | `string` | Yes | Your WalletConnect project ID |
| `relayUrl` | `string` | No | Custom relay URL |
| `metadata` | `Metadata` | No | App metadata for WalletConnect |

### ConnectorLinks Interface

```tsx
interface ConnectorLinks {
  browserExtension?: string;  // Download URL for the extension (optional)
  deepLink?: string;          // Deep link for mobile wallets (optional)
}
```

**Note**: The `links` object is always required, but its properties `browserExtension` and `deepLink` are optional and can be empty.
