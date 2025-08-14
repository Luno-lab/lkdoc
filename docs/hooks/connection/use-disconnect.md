# useDisconnect

The `useDisconnect` hook provides functionality to disconnect from the currently connected wallet.

## Import

```tsx
import { useDisconnect } from '@luno-kit/react'
import type { ConnectionStatus } from '@luno-kit/react'
```

## Usage

### Basic Disconnection

::: code-group

```tsx [index.tsx]
import { useDisconnect, useConnect } from '@luno-kit/react'
import type { ConnectionStatus } from '@luno-kit/react'

function DisconnectWallet() {
  const { disconnect, isPending } = useDisconnect()
  const { status } = useConnect()

  if (status !== ConnectionStatus.Connected) {
    return null
  }

  return (
    <button onClick={() => disconnect()} disabled={isPending}>
      {isPending ? 'Disconnecting...' : 'Disconnect'}
    </button>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

### Async Disconnection

::: code-group

```tsx [index.tsx]
function AsyncDisconnect() {
  const { disconnectAsync, isPending, error } = useDisconnect()

  const handleDisconnect = async () => {
    try {
      await disconnectAsync()
      console.log('Disconnected successfully!')
    } catch (err) {
      console.error('Disconnection failed:', err)
    }
  }

  return (
    <div>
      <button onClick={handleDisconnect} disabled={isPending}>
        {isPending ? 'Disconnecting...' : 'Disconnect Wallet'}
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
| `onSuccess` | `() => void` | No | Callback when disconnection succeeds |
| `onError` | `(error: Error) => void` | No | Callback when disconnection fails |
| `onSettled` | `() => void` | No | Callback when disconnection attempt completes |

## Return Value

The hook returns an object with the following properties:

### Methods
These are the functions you can call to initiate and manage disconnections.

| Property | Type | Description |
|----------|------|-------------|
| `disconnect` | `(options?: { onSuccess?: () => void; onError?: (error: Error) => void; onSettled?: () => void }) => void` | Disconnect from wallet |
| `disconnectAsync` | `(options?: { onSuccess?: () => void; onError?: (error: Error) => void; onSettled?: () => void }) => Promise<void>` | Async version of disconnect |
| `reset` | `() => void` | Reset the disconnection state |

### Data & State
These properties provide information about the current state of the disconnection.

| Property | Type | Description |
|----------|------|-------------|
| `status` | `ConnectionStatus` | The current connection status. Possible values are `disconnected`, `connecting`, `connected`, and `disconnecting`. |
| `data` | `void \| undefined` | Disconnection result data |
| `error` | `Error \| null` | Disconnection error if any |
| `isError` | `boolean` | Whether there's an error |
| `isIdle` | `boolean` | Whether the hook is idle |
| `isPending` | `boolean` | Whether disconnection is in progress |
| `isSuccess` | `boolean` | Whether disconnection was successful |
| `variables` | `void \| undefined` | Last used disconnection variables |

## Related Hooks

- [`useConnect`](/hooks/connection/use-connect) - Connect to wallet
- [`useStatus`](/hooks/connection/use-status) - Get connection status
- [`useActiveConnector`](/hooks/connection/use-active-connector) - Get active connector
