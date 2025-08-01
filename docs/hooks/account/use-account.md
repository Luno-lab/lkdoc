# useAccount

The `useAccount` hook provides access to the currently connected account information including address, name, and formatted display address.

## Import

```tsx
import { useAccount } from '@luno-kit/react'
```

## Usage

### Basic Account Information

```tsx
import { useAccount } from '@luno-kit/react'

function AccountInfo() {
  const { account } = useAccount()
  
  if (!account) {
    return <div>No account connected</div>
  }
  
  return (
    <div>
      <h3>{account.name || 'Unnamed Account'}</h3>
      <p>Address: {account.address}</p>
      <p>Display: {account.formattedAddress}</p>
      <p>Source: {account.source}</p>
    </div>
  )
}
```

### Account Display Card

```tsx
function AccountCard() {
  const { account } = useAccount()
  
  if (!account) {
    return (
      <div className="account-card">
        <ConnectButton />
      </div>
    )
  }
  
  return (
    <div className="account-card">
      <div className="account-header">
        <h3>{account.name || 'Unnamed Account'}</h3>
        <span className="account-source">{account.source}</span>
      </div>
      <div className="account-address">
        <code>{account.formattedAddress}</code>
        <button onClick={() => navigator.clipboard.writeText(account.address)}>
          Copy Full Address
        </button>
      </div>
    </div>
  )
}
```

## Return Value

The hook returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `account` | `Account \| undefined` | Current account information |

### Account Object

The `account` object contains:

| Property | Type | Description |
|----------|------|-------------|
| `address` | `string` | Full SS58 address |
| `formattedAddress` | `string` | Shortened display format (e.g., "0x1234...5678") |
| `name` | `string \| undefined` | Account name from wallet |
| `source` | `string` | Wallet connector ID that provided the account |
| `type` | `string \| undefined` | Account type (if supported by wallet) |

## Examples

### Account Avatar

```tsx
import { useAccount } from '@luno-kit/react'

function AccountAvatar() {
  const { account } = useAccount()
  
  if (!account) return null
  
  // Generate avatar based on address
  const avatarUrl = `https://avatars.githubusercontent.com/${account.address}`
  
  return (
    <div className="account-avatar">
      <img 
        src={avatarUrl} 
        alt={account.name || 'Account avatar'}
        width={40}
        height={40}
      />
      <div>
        <div className="account-name">{account.name}</div>
        <div className="account-address">{account.formattedAddress}</div>
      </div>
    </div>
  )
}
```

### Copy Address Button

```tsx
function CopyAddressButton() {
  const { account } = useAccount()
  const [copied, setCopied] = useState(false)
  
  if (!account) return null
  
  const copyAddress = async () => {
    await navigator.clipboard.writeText(account.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <button onClick={copyAddress} className="copy-button">
      {copied ? '✅ Copied!' : '📋 Copy Address'}
    </button>
  )
}
```

### Account Selector

```tsx
import { useAccount, useAccounts } from '@luno-kit/react'

function AccountSelector() {
  const { account } = useAccount()
  const { accounts } = useAccounts()
  const { connect } = useConnect()
  
  if (accounts.length <= 1) {
    return <AccountInfo />
  }
  
  const switchAccount = (selectedAccount: Account) => {
    // Reconnect with the same connector to trigger account selection
    connect({ connectorId: selectedAccount.source })
  }
  
  return (
    <div className="account-selector">
      <div className="current-account">
        <AccountInfo />
      </div>
      
      <details>
        <summary>Switch Account ({accounts.length} available)</summary>
        <div className="account-list">
          {accounts.map((acc) => (
            <button
              key={acc.address}
              onClick={() => switchAccount(acc)}
              className={acc.address === account?.address ? 'active' : ''}
            >
              <div>{acc.name || 'Unnamed'}</div>
              <div>{acc.formattedAddress}</div>
            </button>
          ))}
        </div>
      </details>
    </div>
  )
}
```

### Account with Balance

```tsx
import { useAccount, useBalance } from '@luno-kit/react'

function AccountWithBalance() {
  const { account } = useAccount()
  const { data: balance, isLoading } = useBalance({ 
    address: account?.address 
  })
  
  if (!account) {
    return <ConnectButton />
  }
  
  return (
    <div className="account-balance">
      <div className="account-info">
        <h3>{account.name}</h3>
        <p>{account.formattedAddress}</p>
      </div>
      
      <div className="balance-info">
        {isLoading ? (
          <div>Loading balance...</div>
        ) : balance ? (
          <div>
            <p>Balance: {balance.formattedTransferable}</p>
            <small>Total: {balance.formattedTotal}</small>
          </div>
        ) : (
          <div>Balance unavailable</div>
        )}
      </div>
    </div>
  )
}
```

## Integration with Other Hooks

### With Chain Information

```tsx
import { useAccount, useChain } from '@luno-kit/react'

function AccountWithChain() {
  const { account } = useAccount()
  const { chain } = useChain()
  
  if (!account || !chain) return null
  
  return (
    <div className="account-chain">
      <div className="account-section">
        <h4>Account</h4>
        <p>{account.name}</p>
        <p>{account.formattedAddress}</p>
      </div>
      
      <div className="chain-section">
        <h4>Network</h4>
        <div className="chain-info">
          <img src={chain.chainIconUrl} alt={chain.name} width={20} height={20} />
          <span>{chain.name}</span>
        </div>
      </div>
    </div>
  )
}
```

### With Connection Status

```tsx
import { useAccount, useConnect, ConnectionStatus } from '@luno-kit/react'

function AccountStatus() {
  const { account } = useAccount()
  const { status } = useConnect()
  
  switch (status) {
    case ConnectionStatus.Connecting:
      return <div>🟡 Connecting...</div>
      
    case ConnectionStatus.Connected:
      return account ? (
        <div>
          🟢 Connected as {account.name || account.formattedAddress}
        </div>
      ) : (
        <div>🟢 Connected (no account info)</div>
      )
      
    case ConnectionStatus.Disconnected:
      return <div>🔴 Not connected</div>
      
    default:
      return <div>❓ Unknown status</div>
  }
}
```

## Conditional Rendering

### Protected Component

```tsx
function ProtectedComponent({ children }: { children: React.ReactNode }) {
  const { account } = useAccount()
  
  if (!account) {
    return (
      <div className="connect-prompt">
        <h3>Connect your wallet to continue</h3>
        <ConnectButton />
      </div>
    )
  }
  
  return <>{children}</>
}

// Usage
function App() {
  return (
    <ProtectedComponent>
      <Dashboard />
    </ProtectedComponent>
  )
}
```

### Account-specific Content

```tsx
function AccountSpecificContent() {
  const { account } = useAccount()
  
  if (!account) {
    return <LandingPage />
  }
  
  return (
    <div>
      <header>
        <h1>Welcome back, {account.name}!</h1>
      </header>
      <main>
        <UserDashboard account={account} />
      </main>
    </div>
  )
}
```

## Address Validation

### Validate Input Against Connected Account

```tsx
function ValidateAddress() {
  const { account } = useAccount()
  const [inputAddress, setInputAddress] = useState('')
  
  const isOwnAddress = account && inputAddress === account.address
  
  return (
    <div>
      <input
        type="text"
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
        placeholder="Enter address"
      />
      {isOwnAddress && (
        <p>⚠️ This is your own address</p>
      )}
    </div>
  )
}
```

## Best Practices

### Safe Account Access

```tsx
function SafeAccountComponent() {
  const { account } = useAccount()
  
  // Always check if account exists before using
  if (!account) {
    return <ConnectButton />
  }
  
  // Safe to use account properties
  return (
    <div>
      {/* Always provide fallbacks for optional properties */}
      <h3>{account.name || 'Unnamed Account'}</h3>
      <p>{account.formattedAddress}</p>
    </div>
  )
}
```

### Loading States

```tsx
function AccountWithLoading() {
  const { account } = useAccount()
  const { status } = useConnect()
  
  if (status === ConnectionStatus.Connecting) {
    return <div>Loading account...</div>
  }
  
  if (!account) {
    return <ConnectButton />
  }
  
  return <AccountInfo />
}
```

### Error Boundaries

```tsx
import { ErrorBoundary } from 'react-error-boundary'

function AccountErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary 
      fallback={<div>Error loading account information</div>}
      onError={(error) => console.error('Account error:', error)}
    >
      {children}
    </ErrorBoundary>
  )
}

function App() {
  return (
    <AccountErrorBoundary>
      <AccountInfo />
    </AccountErrorBoundary>
  )
}
```

## Related Hooks

- [`useAccounts`](/hooks/account/use-accounts) - Get all available accounts
- [`useBalance`](/hooks/account/use-balance) - Get account balance
- [`useConnect`](/hooks/connection/use-connect) - Connect to wallet
- [`useActiveConnector`](/hooks/connection/use-active-connector) - Get active connector