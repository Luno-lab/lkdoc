# useConnect

The `useConnect` hook manages wallet connections, providing methods to connect to wallets and access connection state.

## Import

```tsx
import { useConnect } from '@luno-kit/react'
import type { ConnectionStatus } from '@luno-kit/react'
```

## Usage

### Basic Connection

::: code-group

```tsx [index.tsx]
import { useConnect } from '@luno-kit/react'
import type { ConnectionStatus } from '@luno-kit/react'

function ConnectWallet() {
  const { connect, connectors, status } = useConnect()
  
  const handleConnect = (connectorId: string) => {
    connect({ connectorId })
  }
  
  if (status === ConnectionStatus.Connected) {
    return <div>✅ Connected</div>
  }
  
  return (
    <div>
      <h3>Choose a wallet:</h3>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => handleConnect(connector.id)}
          disabled={isPending}
        >
          <img src={connector.icon} alt={connector.name} width={24} height={24} />
          {connector.name}
        </button>
      ))}
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::


### Async Connection

::: code-group
```tsx [index.tsx]
function AsyncConnect() {
  const { connectAsync, isPending, error } = useConnect()
  
  const handleConnect = async () => {
    try {
      await connectAsync({ connectorId: 'polkadot-js' })
      console.log('Connected successfully!')
    } catch (err) {
      console.error('Connection failed:', err)
    }
  }
  
  return (
    <div>
      <button onClick={handleConnect} disabled={isPending}>
        {isPending ? 'Connecting...' : 'Connect Polkadot{.js}'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

## Parameters

The hook accepts an optional configuration object:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `onSuccess` | `() => void` | No | Callback when connection succeeds |
| `onError` | `(error: Error) => void` | No | Callback when connection fails |
| `onSettled` | `() => void` | No | Callback when connection attempt completes |


## Return Value

The hook returns an object with the following properties:

### Methods
These are the functions you can call to initiate and manage connections.

| Property | Type                                                                    | Description |
|----------|-------------------------------------------------------------------------|-------------|
| `connect` | `(variables: { connectorId: string; targetChainId?: string; }, options?: { onSuccess?: () => void; onError?: (error: Error) => void; onSettled?: () => void }) => void` | Connect to a wallet |
| `connectAsync` | `(variables: { connectorId: string; targetChainId?: string; }, options?: { onSuccess?: () => void; onError?: (error: Error) => void; onSettled?: () => void }) => void) => Promise<void>`                        | Async version of connect |
| `reset` | `() => void`                                                            | Reset the connection state |

### Data & State

These properties provide information about the current state of the connection.

| Property | Type | Description                                                                                         |
|----------|------|-----------------------------------------------------------------------------------------------------|
| `connectors` | `Connector[]` | Array of available wallet connectors                                                                |
| `activeConnector` | `Connector \| undefined` | Currently active connector                                                                          |
| `status` | `ConnectionStatus` | The current connection status. Possible values are `disconnected`, `connecting`, `connected`, and `disconnecting`. |
| `data` | `void \| undefined` | Connection result data                                                                              |
| `variables` | `{ connectorId: string; targetChainId?: string; } \| undefined` | Last used connection variables                                                                      |
| `error` | `Error \| null` | Connection error if any |
| `isError` | `boolean` | Whether there's an error |
| `isIdle` | `boolean` | Whether the hook is idle |
| `isPending` | `boolean` | Whether connection is in progress |
| `isSuccess` | `boolean` | Whether connection was successful |

## Related Hooks

- [`useDisconnect`](/hooks/connection/use-disconnect) - Disconnect from wallet
- [`useConnectors`](/hooks/connection/use-connectors) - Get available connectors
- [`useStatus`](/hooks/connection/use-status) - Get connection status
- [`useActiveConnector`](/hooks/connection/use-active-connector) - Get active connector
