# Wallets

LunoKit supports all major Polkadot ecosystem wallets through a unified connector system. This guide shows you how to configure wallet support for your application.

## Supported Wallets

LunoKit provides built-in support for these popular Polkadot wallets:

| Wallet        | Type | Platforms     | Import |
|---------------|------|---------------|--------|
| Polkadot{.js}            | Browser Extension | Desktop       | `polkadotjsConnector()` |
| SubWallet     | Browser Extension + Mobile | All           | `subwalletConnector()` |
| Talisman      | Browser Extension | Desktop       | `talismanConnector()` |
| PolkaGate     | Browser Extension | Desktop       | `polkagateConnector()` |
| Nova Wallet   | Mobile App | Mobile via QR       | `novaConnector()` |
| WalletConnect | Protocol | Mobile via QR | `walletConnectConnector()` |
| Enkrypt       | Browser Extension | Desktop       | `enkryptConnector()` |
| Fearless      | Browser App | Mobile        | `fearlessConnector()` |
| Mimir         | Multisig Extension | Desktop       | `mimirConnector()` |

## Basic Configuration

Import and configure the wallets you want to support:

```tsx
import { polkadot, kusama } from '@luno-kit/react/chains'
import { 
  polkagateConnector, 
  subwalletConnector, 
  talismanConnector, 
  polkadotjsConnector, 
  walletConnectConnector, 
  novaConnector, 
  fearlessConnector, 
  mimirConnector, 
  enkryptConnector,
} from '@luno-kit/react/connectors'

const config = createConfig({
  appName: 'My Lunokit App',
  chains: [polkadot, kusama],
  connectors: [
    // InjectConnector type - no parameters required
    polkadotjsConnector(),
    subwalletConnector(),
    talismanConnector(),
    polkagateConnector(),
    enkryptConnector(),
    fearlessConnector(),
    mimirConnector(),

    // WalletConnectConnector type - requires projectId
    walletConnectConnector({ projectId: YOUR_WALLETCONNECT_PROJECT_ID }),
    novaConnector({ projectId: YOUR_WALLETCONNECT_PROJECT_ID }),
  ],
})
```

## Connector Types

LunoKit provides two main types of wallet connectors:

### InjectConnector

These connectors interact with browser extensions or injected providers and don't require additional parameters:

| Connector | Wallet |
|-----------|--------|
| `polkadotjsConnector()` | Polkadot{.js} |
| `subwalletConnector()` | SubWallet |
| `talismanConnector()` | Talisman |
| `polkagateConnector()` | PolkaGate |
| `enkryptConnector()` | Enkrypt |
| `fearlessConnector()` | Fearless |
| `mimirConnector()` | Mimir |

### WalletConnectConnector

QR-based connectors that require additional configuration:

| Connector | Wallet |
|-----------|--------|
| `walletConnectConnector()` | WalletConnect |
| `novaConnector()` | Nova Wallet |

#### Configuration Options

| Property | Type | Description                                                                                                        |
|----------|------|--------------------------------------------------------------------------------------------------------------------|
| `projectId` | `string` | **Required**. Project ID from WalletConnect Cloud                                                                  |
| `relayUrl` | `string` | Optional. Custom relay server URL                                                                                  |
| `metadata` | [`Metadata`](#metadata) | Optional. Application metadata                                                                                     |
| `supportedChains` | `HexString[]` | Optional. If you don't want to use the chain-related functions of LunoKit, but you still want to use walletconnect |
| `links` | [`ConnectorLinks`](#connectorlinks) | Optional. Links to browser extension and deep link |

> Note: You must register a project at [WalletConnect Cloud](https://cloud.walletconnect.com/) to obtain a projectId.

### Related Types

#### Metadata

```ts
interface Metadata {
  name: string;
  description: string;
  url: string;
  icons: string[];
  verifyUrl?: string;
  redirect?: {
    native?: string;
    universal?: string;
    linkMode?: boolean;
  };
}
```

#### ConnectorLinks

```tsx
interface ConnectorLinks {
  browserExtension?: string; 
  deepLink?: string;
}
```


## Wallet Detection

LunoKit automatically detects which wallets are installed:

```tsx
import { useConnectors } from '@luno-kit/react'

function WalletList() {
  const { connectors } = useConnectors()
  
  return (
    <div>
      <h3>Available Wallets:</h3>
      {connectors.map((connector) => (
        <div key={connector.id}>
          <img src={connector.icon} alt={connector.name} width={24} height={24} />
          <span>{connector.name}</span>
          <span>{connector.installed ? '✅' : '❌'}</span>
        </div>
      ))}
    </div>
  )
}
```

## Troubleshooting

### Common Issues

**Wallet not detected:**
- Ensure the browser extension is installed and enabled
- Check if the wallet supports the current website
- Try refreshing the page

**Connection failed:**
- User may have rejected the connection request
- Wallet may be locked
- Check browser console for specific errors

**Multiple wallets conflict:**
- Some wallets may interfere with each other
- Ask users to disable unused wallet extensions
- Use wallet-specific connection methods when needed

## Next Steps

- Explore [theming options](/getting-started/theming)
- Check out [connection hooks](/hooks/connection/use-connect)
