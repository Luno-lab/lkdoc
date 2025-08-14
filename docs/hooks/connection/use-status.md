# useStatus

The `useStatus` hook provides the current connection status of the wallet.

## Import

```tsx
import { useStatus } from '@luno-kit/react'
import type { ConnectionStatus } from '@luno-kit/react'
```

## Usage

### Basic Status Check

::: code-group

```tsx [index.tsx]
import { useStatus } from '@luno-kit/react'
import type { ConnectionStatus } from '@luno-kit/react'

function ConnectionStatusDisplay() {
  const status = useStatus()
  
  switch (status) {
    case ConnectionStatus.Disconnected:
      return <span>�� Disconnected</span>
    case ConnectionStatus.Connecting:
      return <span>🟡 Connecting...</span>
    case ConnectionStatus.Connected:
      return <span>🟢 Connected</span>
    case ConnectionStatus.Disconnecting:
      return <span>🟡 Disconnecting...</span>
    default:
      return <span>❓ Unknown</span>
  }
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

### Conditional Rendering

::: code-group

```tsx [index.tsx]
function ConditionalComponent() {
  const status = useStatus()
  
  if (status === ConnectionStatus.Connected) {
    return <div>Wallet is connected!</div>
  }
  
  if (status === ConnectionStatus.Connecting) {
    return <div>Connecting to wallet...</div>
  }
  
  return <div>Please connect your wallet</div>
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

## Parameters

This hook does not accept any parameters.

## Return Value

The hook returns a `ConnectionStatus` value:

| Property | Type | Description |
|----------|------|-------------|
| `status` | `ConnectionStatus` | The current connection status. Possible values are `disconnected`, `connecting`, `connected`, and `disconnecting`. |

## Related Hooks

- [`useConnect`](/hooks/connection/use-connect) - Connect to wallet
- [`useDisconnect`](/hooks/connection/use-disconnect) - Disconnect from wallet
- [`useActiveConnector`](/hooks/connection/use-active-connector) - Get active connector
