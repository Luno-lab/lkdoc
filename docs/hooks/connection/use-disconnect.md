# useDisconnect

The `useDisconnect` hook provides functionality to disconnect from the currently connected wallet.

## Import

```tsx
import { useDisconnect } from '@luno-kit/react'
```

## Usage

### Basic Disconnection

```tsx
import { useDisconnect, useConnect, ConnectionStatus } from '@luno-kit/react'

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

### Async Disconnection

```tsx
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

## Parameters

The hook accepts an optional configuration object:

```tsx
const { disconnect } = useDisconnect({
  onSuccess: () => {
    console.log('Disconnected!')
  },
  onError: (error) => {
    console.error('Disconnection failed:', error)
  },
})
```

## Return Value

The hook returns an object with the following properties:

### Methods

| Property | Type | Description |
|----------|------|-------------|
| `disconnect` | `() => void` | Disconnect from wallet |
| `disconnectAsync` | `() => Promise<void>` | Async version of disconnect |
| `reset` | `() => void` | Reset the disconnection state |

### State

| Property | Type | Description |
|----------|------|-------------|
| `data` | `void \| undefined` | Disconnection result data |
| `error` | `Error \| null` | Disconnection error if any |
| `isError` | `boolean` | Whether there's an error |
| `isIdle` | `boolean` | Whether the hook is idle |
| `isPending` | `boolean` | Whether disconnection is in progress |
| `isSuccess` | `boolean` | Whether disconnection was successful |
| `variables` | `void \| undefined` | Last used disconnection variables |

## Examples

### Confirmation Dialog

```tsx
function DisconnectWithConfirmation() {
  const { disconnect } = useDisconnect()
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  const handleDisconnect = () => {
    if (window.confirm('Are you sure you want to disconnect?')) {
      disconnect()
    }
  }
  
  return (
    <button onClick={handleDisconnect}>
      Disconnect
    </button>
  )
}
```

### Disconnect Button with Status

```tsx
function DisconnectButton() {
  const { disconnect, isPending, isSuccess, error } = useDisconnect()
  
  if (isSuccess) {
    return <div>✅ Disconnected successfully</div>
  }
  
  if (error) {
    return <div>❌ Failed to disconnect: {error.message}</div>
  }
  
  return (
    <button onClick={() => disconnect()} disabled={isPending}>
      {isPending ? (
        <>
          <Spinner />
          Disconnecting...
        </>
      ) : (
        'Disconnect Wallet'
      )}
    </button>
  )
}
```

### Auto-disconnect

```tsx
function AutoDisconnect() {
  const { disconnect } = useDisconnect()
  
  useEffect(() => {
    // Auto-disconnect after 1 hour of inactivity
    const timer = setTimeout(() => {
      disconnect()
    }, 60 * 60 * 1000)
    
    return () => clearTimeout(timer)
  }, [disconnect])
  
  return null
}
```

### Disconnect with Cleanup

```tsx
function DisconnectWithCleanup() {
  const { disconnectAsync } = useDisconnect()
  
  const handleDisconnect = async () => {
    try {
      // Clear local state
      localStorage.removeItem('userPreferences')
      
      // Disconnect wallet
      await disconnectAsync()
      
      // Redirect to home page
      window.location.href = '/'
    } catch (error) {
      console.error('Cleanup failed:', error)
    }
  }
  
  return (
    <button onClick={handleDisconnect}>
      Sign Out
    </button>
  )
}
```

## Error Handling

### Common Errors

```tsx
function ErrorHandling() {
  const { disconnect, error, reset } = useDisconnect()
  
  if (error) {
    return (
      <div>
        <p>Disconnection failed: {error.message}</p>
        <button onClick={reset}>Try Again</button>
      </div>
    )
  }
  
  return (
    <button onClick={() => disconnect()}>
      Disconnect
    </button>
  )
}
```

## Integration with Other Hooks

### With Connection Status

```tsx
import { useConnect, useActiveConnector } from '@luno-kit/react'

function WalletControls() {
  const { status } = useConnect()
  const { connector } = useActiveConnector()
  const { disconnect, isPending } = useDisconnect()
  
  if (status !== ConnectionStatus.Connected || !connector) {
    return <ConnectButton />
  }
  
  return (
    <div>
      <div>Connected to {connector.name}</div>
      <button onClick={() => disconnect()} disabled={isPending}>
        {isPending ? 'Disconnecting...' : 'Disconnect'}
      </button>
    </div>
  )
}
```

### With Account Information

```tsx
import { useAccount } from '@luno-kit/react'

function AccountDisconnect() {
  const { account } = useAccount()
  const { disconnect } = useDisconnect()
  
  if (!account) {
    return <ConnectButton />
  }
  
  return (
    <div>
      <div>
        <strong>{account.name}</strong>
        <p>{account.formattedAddress}</p>
      </div>
      <button onClick={() => disconnect()}>
        Disconnect
      </button>
    </div>
  )
}
```

## Best Practices

### Graceful Disconnection

```tsx
function GracefulDisconnect() {
  const { disconnectAsync } = useDisconnect()
  const [isDisconnecting, setIsDisconnecting] = useState(false)
  
  const handleDisconnect = async () => {
    setIsDisconnecting(true)
    
    try {
      // Show user feedback
      toast.info('Disconnecting wallet...')
      
      // Perform disconnection
      await disconnectAsync()
      
      // Success feedback
      toast.success('Wallet disconnected')
      
      // Optional: redirect or clear app state
      // navigate('/')
    } catch (error) {
      toast.error('Failed to disconnect')
      console.error(error)
    } finally {
      setIsDisconnecting(false)
    }
  }
  
  return (
    <button onClick={handleDisconnect} disabled={isDisconnecting}>
      {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
    </button>
  )
}
```

### Conditional Disconnect

```tsx
function ConditionalDisconnect() {
  const { disconnect } = useDisconnect()
  const [hasPendingTransactions, setHasPendingTransactions] = useState(false)
  
  const handleDisconnect = () => {
    if (hasPendingTransactions) {
      const confirmed = window.confirm(
        'You have pending transactions. Disconnecting may cause them to fail. Continue?'
      )
      if (!confirmed) return
    }
    
    disconnect()
  }
  
  return (
    <button onClick={handleDisconnect}>
      Disconnect
    </button>
  )
}
```

## Related Hooks

- [`useConnect`](/hooks/connection/use-connect) - Connect to wallet
- [`useStatus`](/hooks/connection/use-status) - Get connection status
- [`useActiveConnector`](/hooks/connection/use-active-connector) - Get active connector