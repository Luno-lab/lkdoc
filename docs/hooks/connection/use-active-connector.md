# useActiveConnector

The `useActiveConnector` hook provides access to the currently active wallet connector.

## Import

```tsx
import { useActiveConnector } from '@luno-kit/react'
import type { Connector } from '@luno-kit/core'
```

## Usage

::: code-group

```tsx [index.tsx]
import { useActiveConnector } from '@luno-kit/react'
import type { Connector } from '@luno-kit/react'

function ActiveConnectorDisplay() {
  const activeConnector = useActiveConnector()
  
  if (!activeConnector) {
    return <div>No wallet connected</div>
  }
  
  return (
    <div>
      <img src={activeConnector.icon} alt={activeConnector.name} width={24} height={24} />
      <span>Connected to {activeConnector.name}</span>
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

## Return Value

The hook returns the currently active connector or undefined:

| Property | Type | Description |
|----------|------|-------------|
| `activeConnector` | `Connector \| undefined` | The currently active wallet connector, or `undefined` if no wallet is connected |

### Connector Interface

When a connector is active, it provides the following properties and methods:

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier for the connector |
| `name` | `string` | Display name of the wallet |
| `icon` | `string` | URL or path to the wallet icon |
| `links` | `ConnectorLinks` | Links to browser extension and deep link |
| `isAvailable()` | `() => Promise<boolean>` | Check if the connector is available |
| `isInstalled` | `() => boolean` | Check if the wallet extension is installed |
| `connect()` | `(appName: string, chains?: Chain[], targetChainId?: string) => Promise<Array<Account>>` | Connect to the wallet |
| `disconnect()` | `() => Promise<void>` | Disconnect from the wallet |
| `getAccounts()` | `() => Promise<Array<Account>>` | Get connected accounts |
| `getSigner()` | `() => Promise<Signer \| undefined>` | Get the signer for transactions |
| `signMessage()` | `(message: string, address: string, chainId?: string) => Promise<string \| undefined>` | Sign a message |
| `hasConnectionUri()` | `() => boolean` | Check if connection URI is available |
| `getConnectionUri()` | `() => Promise<string \| undefined>` | Get connection URI for mobile wallets |
| `updateAccountsForChain()` | `(chainId: string) => Promise<Account[]>` | Update accounts for a specific chain |

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
  testnet?: boolean;
  chainIconUrl: string
}
```

## Related Hooks

- [`useConnect`](/hooks/connection/use-connect) - Connect to wallet
- [`useDisconnect`](/hooks/connection/use-disconnect) - Disconnect from wallet
- [`useConnectors`](/hooks/connection/use-connectors) - Get all available connectors
- [`useStatus`](/hooks/connection/use-status) - Get connection status
