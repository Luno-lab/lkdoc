# useConnectors

The `useConnectors` hook provides access to all available wallet connectors configured in the application.

## Import

```tsx
import { useConnectors } from '@luno-kit/react'
import type { Connector } from '@luno-kit/react'
```

## Usage

### List Available Connectors

::: code-group

```tsx [index.tsx]
import { useConnectors } from '@luno-kit/react'
import type { Connector } from '@luno-kit/react'

function ConnectorList() {
  const connectors = useConnectors()
  
  return (
    <div>
      <h3>Available Wallets:</h3>
      {connectors.map((connector: Connector) => (
        <div key={connector.id}>
          <img src={connector.icon} alt={connector.name} width={24} height={24} />
          <span>{connector.name}</span>
          <span>{connector.isInstalled() ? '✅' : '❌'}</span>
        </div>
      ))}
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

### Filter Available Connectors

::: code-group

```tsx [index.tsx]
function AvailableConnectors() {
  const connectors = useConnectors()
  
  const availableConnectors = connectors.filter(connector => connector.isInstalled())
  const unavailableConnectors = connectors.filter(connector => !connector.isInstalled())
  
  return (
    <div>
      {availableConnectors.length > 0 ? (
        <div>
          <h3>Available Wallets:</h3>
          {availableConnectors.map(connector => (
            <button key={connector.id}>
              {connector.name}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <p>No wallets installed</p>
          <h4>Install one of these wallets:</h4>
          {unavailableConnectors.map(connector => (
            <a key={connector.id} href={connector.links.browserExtension} target="_blank">
              Install {connector.name}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

## Return Value

The hook returns an array of `Connector` objects:

| Property | Type | Description |
|----------|------|-------------|
| `connectors` | `Connector[]` | Array of all available wallet connectors configured in the application |

### Connector Interface

Each connector object has the following properties:

| Property | Type                                                                                     | Description |
|----------|------------------------------------------------------------------------------------------|-------------|
| `id` | `string`                                                                                 | Unique identifier for the connector |
| `name` | `string`                                                                                 | Display name of the wallet |
| `icon` | `string`                                                                                 | URL or path to the wallet icon |
| `links` | [`ConnectorLinks`](#connectorlinks)                                                      | Links to browser extension and deep link |
| `isAvailable()` | `() => Promise<boolean>`                                                                 | Check if the connector is available |
| `isInstalled` | `() => boolean`                                                                          | Check if the wallet extension is installed |
| `connect()` | `(appName: string, chains?: Chain[], targetChainId?: string) => Promise<Array<Account>>` | Connect to the wallet |
| `disconnect()` | `() => Promise<void>`                                                                    | Disconnect from the wallet |
| `getAccounts()` | `() => Promise<Array<Account>>`                                                          | Get connected accounts |
| `getSigner()` | `() => Promise<Signer \| undefined>`                                                     | Get the signer for transactions |
| `signMessage()` | `(message: string, address: string, chainId?: string) => Promise<string \| undefined>`   | Sign a message |
| `hasConnectionUri()` | `() => boolean`                                                                          | Check if connection URI is available |
| `getConnectionUri()` | `() => Promise<string \| undefined>`                                                     | Get connection URI for mobile wallets |

### Related Types

#### ConnectorLinks

```tsx
interface ConnectorLinks {
  browserExtension?: string; 
  deepLink?: string;
}
```

#### Account

```tsx
interface Account {
  address: string;
  name?: string;
  publicKey?: HexString;
  meta?: {
    source?: string;
    genesisHash?: string | null;
    [key: string]: any;
  };
  type?: KeypairType;
}
```

#### Signer

```tsx
interface Signer extends InjectedSigner {}
```

**Note**: The `Signer` interface extends `InjectedSigner` from the `dedot` library. For complete type information, refer to the [dedot documentation](https://docs.dedot.dev).

#### Chain

```tsx
interface Chain {
  genesisHash: string;
  name: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    webSocket: readonly string[];
    http?: readonly string[];
  };
  ss58Format: number;
  blockExplorers?: {
    default?: { name: string; url: string };
    [key: string]: { name: string; url: string } | undefined;
  };
  testnet: boolean;
  chainIconUrl: string
}
```

## Related Hooks

- [`useConnect`](/hooks/connection/use-connect) - Connect to wallet
- [`useDisconnect`](/hooks/connection/use-disconnect) - Disconnect from wallet
- [`useStatus`](/hooks/connection/use-status) - Get connection status
- [`useActiveConnector`](/hooks/connection/use-active-connector) - Get active connector
