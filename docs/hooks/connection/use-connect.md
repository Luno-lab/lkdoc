# useConnect

The `useConnect` hook manages wallet connections, providing methods to connect to wallets and access connection state.

## Import

```tsx
import { useConnect } from '@luno-kit/react'
```

## Usage

### Basic Connection

```tsx
import { useConnect, ConnectionStatus } from '@luno-kit/react'

function ConnectWallet() {
  const { connect, connectors, status, isPending } = useConnect()
  
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

### Async Connection

```tsx
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

### Chain-specific Connection

```tsx
function ConnectToSpecificChain() {
  const { connect } = useConnect()
  
  const connectToPolkadot = () => {
    connect({ 
      connectorId: 'polkadot-js',
      targetChainId: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' // Polkadot
    })
  }
  
  return (
    <button onClick={connectToPolkadot}>
      Connect to Polkadot
    </button>
  )
}
```

## Parameters

The hook accepts an optional configuration object:

```tsx
const { connect } = useConnect({
  onSuccess: () => {
    console.log('Connected!')
  },
  onError: (error) => {
    console.error('Connection failed:', error)
  },
})
```

### ConnectVariables

The `connect` function accepts these parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connectorId` | `string` | Yes | ID of the wallet connector to use |
| `targetChainId` | `string` | No | Genesis hash of the chain to connect to |

## Return Value

The hook returns an object with the following properties:

### Methods

| Property | Type | Description |
|----------|------|-------------|
| `connect` | `(variables: ConnectVariables) => void` | Connect to a wallet |
| `connectAsync` | `(variables: ConnectVariables) => Promise<void>` | Async version of connect |
| `reset` | `() => void` | Reset the connection state |

### Data

| Property | Type | Description |
|----------|------|-------------|
| `connectors` | `Connector[]` | Array of available wallet connectors |
| `activeConnector` | `Connector \| undefined` | Currently active connector |
| `status` | `ConnectionStatus` | Current connection status |
| `data` | `void \| undefined` | Connection result data |
| `variables` | `ConnectVariables \| undefined` | Last used connection variables |

### State

| Property | Type | Description |
|----------|------|-------------|
| `error` | `Error \| null` | Connection error if any |
| `isError` | `boolean` | Whether there's an error |
| `isIdle` | `boolean` | Whether the hook is idle |
| `isPending` | `boolean` | Whether connection is in progress |
| `isSuccess` | `boolean` | Whether connection was successful |

## Connection Status

The `status` property can have these values:

```tsx
enum ConnectionStatus {
  Disconnected = 'disconnected',
  Connecting = 'connecting', 
  Connected = 'connected',
  Reconnecting = 'reconnecting',
}
```

### Status-based Rendering

```tsx
function ConnectionStatus() {
  const { status } = useConnect()
  
  switch (status) {
    case ConnectionStatus.Disconnected:
      return <span>🔴 Disconnected</span>
    case ConnectionStatus.Connecting:
      return <span>🟡 Connecting...</span>
    case ConnectionStatus.Connected:
      return <span>🟢 Connected</span>
    case ConnectionStatus.Reconnecting:
      return <span>🟡 Reconnecting...</span>
    default:
      return <span>❓ Unknown</span>
  }
}
```

## Connector Information

### Available Connectors

```tsx
function WalletList() {
  const { connectors } = useConnectors()
  
  return (
    <div>
      {connectors.map((connector) => (
        <div key={connector.id}>
          <img src={connector.icon} alt={connector.name} />
          <span>{connector.name}</span>
          <span>{connector.installed ? '✅' : '❌'}</span>
        </div>
      ))}
    </div>
  )
}
```

### Active Connector

```tsx
function ActiveWallet() {
  const { activeConnector } = useConnect()
  
  if (!activeConnector) {
    return <div>No wallet connected</div>
  }
  
  return (
    <div>
      <img src={activeConnector.icon} alt={activeConnector.name} />
      <span>Connected to {activeConnector.name}</span>
    </div>
  )
}
```

## Error Handling

### Connection Errors

```tsx
function ErrorHandling() {
  const { connect, error, reset } = useConnect()
  
  if (error) {
    return (
      <div>
        <p>Connection failed: {error.message}</p>
        <button onClick={reset}>Try Again</button>
      </div>
    )
  }
  
  return <ConnectButton />
}
```

### Common Error Types

```tsx
function DetailedErrorHandling() {
  const { error } = useConnect()
  
  if (error) {
    if (error.message.includes('User rejected')) {
      return <div>Connection was cancelled by user</div>
    }
    if (error.message.includes('Not installed')) {
      return <div>Please install the wallet extension</div>
    }
    if (error.message.includes('permissions')) {
      return <div>Please grant wallet permissions</div>
    }
    return <div>Connection error: {error.message}</div>
  }
  
  return null
}
```

## Advanced Usage

### Connection with Callbacks

```tsx
function AdvancedConnect() {
  const { connect } = useConnect({
    onSuccess: () => {
      toast.success('Wallet connected!')
    },
    onError: (error) => {
      toast.error(`Connection failed: ${error.message}`)
    },
  })
  
  return <ConnectButton />
}
```

### Conditional Connection

```tsx
function ConditionalConnect() {
  const { connect, connectors } = useConnect()
  
  const connectWithFallback = () => {
    const polkadotjs = connectors.find(c => c.id === 'polkadot-js')
    const subwallet = connectors.find(c => c.id === 'subwallet')
    
    if (polkadotjs?.installed) {
      connect({ connectorId: 'polkadot-js' })
    } else if (subwallet?.installed) {
      connect({ connectorId: 'subwallet' })
    } else {
      alert('Please install a Polkadot wallet')
    }
  }
  
  return (
    <button onClick={connectWithFallback}>
      Connect Best Available Wallet
    </button>
  )
}
```

### Multi-step Connection

```tsx
function MultiStepConnect() {
  const [step, setStep] = useState<'select' | 'connecting' | 'connected'>('select')
  const { connect, status, error } = useConnect()
  
  useEffect(() => {
    if (status === ConnectionStatus.Connecting) {
      setStep('connecting')
    } else if (status === ConnectionStatus.Connected) {
      setStep('connected')
    }
  }, [status])
  
  if (step === 'connecting') {
    return <div>Please approve the connection in your wallet...</div>
  }
  
  if (step === 'connected') {
    return <div>✅ Successfully connected!</div>
  }
  
  return (
    <div>
      <h3>Select a wallet to connect:</h3>
      {/* Wallet selection UI */}
    </div>
  )
}
```

## Best Practices

### Check Installation Status

```tsx
function SmartConnect() {
  const { connectors, connect } = useConnect()
  
  const availableConnectors = connectors.filter(c => c.installed)
  const unavailableConnectors = connectors.filter(c => !c.installed)
  
  return (
    <div>
      {availableConnectors.length > 0 ? (
        <div>
          <h3>Available Wallets:</h3>
          {availableConnectors.map(connector => (
            <button
              key={connector.id}
              onClick={() => connect({ connectorId: connector.id })}
            >
              {connector.name}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <p>No wallets installed</p>
          <h4>Install one of these wallets:</h4>
          {unavailableConnectors.map(connector => (
            <a key={connector.id} href={connector.downloadUrl} target="_blank">
              Install {connector.name}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
```

### Loading States

```tsx
function ConnectWithLoading() {
  const { connect, isPending, connectors } = useConnect()
  
  return (
    <div>
      {connectors.map(connector => (
        <button
          key={connector.id}
          onClick={() => connect({ connectorId: connector.id })}
          disabled={isPending}
          className={isPending ? 'loading' : ''}
        >
          {isPending ? 'Connecting...' : connector.name}
        </button>
      ))}
    </div>
  )
}
```

## Related Hooks

- [`useDisconnect`](/hooks/connection/use-disconnect) - Disconnect from wallet
- [`useConnectors`](/hooks/connection/use-connectors) - Get available connectors
- [`useStatus`](/hooks/connection/use-status) - Get connection status
- [`useActiveConnector`](/hooks/connection/use-active-connector) - Get active connector