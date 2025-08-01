# Account Management

LunoKit provides comprehensive account management features including account switching, balance display, and address formatting. This guide covers everything you need to know about managing user accounts.

## Account Information

### Getting Current Account

```tsx
import { useAccount } from '@luno-kit/react'

function AccountDisplay() {
  const { account } = useAccount()
  
  if (!account) {
    return <div>No account connected</div>
  }
  
  return (
    <div>
      <h3>{account.name}</h3>
      <p>Address: {account.address}</p>
      <p>Formatted: {account.formattedAddress}</p>
    </div>
  )
}
```

### Account Properties

The `account` object contains:

```tsx
type Account = {
  address: string           // Full SS58 address
  formattedAddress: string  // Shortened display format (0x1234...5678)
  name?: string            // Account name from wallet
  source: string           // Wallet that provided the account
  type?: string            // Account type (if supported by wallet)
}
```

## Multiple Accounts

### Getting All Accounts

```tsx
import { useAccounts } from '@luno-kit/react'

function AccountList() {
  const { accounts } = useAccounts()
  
  return (
    <div>
      <h3>Available Accounts ({accounts.length})</h3>
      {accounts.map((account) => (
        <div key={account.address}>
          <strong>{account.name || 'Unnamed'}</strong>
          <p>{account.formattedAddress}</p>
          <small>Source: {account.source}</small>
        </div>
      ))}
    </div>
  )
}
```

### Account Switching

Users can switch between accounts through the ConnectButton modal, or you can implement custom account switching:

```tsx
import { useConnect, useAccounts } from '@luno-kit/react'

function AccountSwitcher() {
  const { accounts } = useAccounts()
  const { connect } = useConnect()
  
  const switchToAccount = (account: Account) => {
    // Reconnect with specific account
    connect({ 
      connectorId: account.source,
      // Most wallets will show account selection
    })
  }
  
  return (
    <div>
      <h3>Switch Account</h3>
      {accounts.map((account) => (
        <button
          key={account.address}
          onClick={() => switchToAccount(account)}
        >
          <div>{account.name}</div>
          <div>{account.formattedAddress}</div>
        </button>
      ))}
    </div>
  )
}
```

## Balance Management

### Getting Account Balance

```tsx
import { useAccount, useBalance } from '@luno-kit/react'

function BalanceDisplay() {
  const { account } = useAccount()
  const { data: balance, isLoading, error } = useBalance({
    address: account?.address,
  })
  
  if (isLoading) return <div>Loading balance...</div>
  if (error) return <div>Error loading balance</div>
  if (!balance) return <div>No balance data</div>
  
  return (
    <div>
      <h3>Account Balance</h3>
      <p>Total: {balance.formattedTotal}</p>
      <p>Transferable: {balance.formattedTransferable}</p>
      <p>Reserved: {balance.formattedReserved}</p>
      <p>Bonded: {balance.formattedBonded}</p>
    </div>
  )
}
```

### Balance Properties

The `balance` object contains:

```tsx
type Balance = {
  // Raw values (in Planck units)
  total: bigint
  transferable: bigint
  reserved: bigint
  bonded: bigint
  
  // Formatted for display
  formattedTotal: string
  formattedTransferable: string
  formattedReserved: string
  formattedBonded: string
  
  // Token info
  symbol: string
  decimals: number
}
```

### Balance Monitoring

Balance updates automatically when:
- Account changes
- Chain changes  
- New blocks are produced
- Transactions are completed

```tsx
import { useBalance, useBlockNumber } from '@luno-kit/react'

function LiveBalance() {
  const { account } = useAccount()
  const { data: balance } = useBalance({ address: account?.address })
  const { data: blockNumber } = useBlockNumber()
  
  return (
    <div>
      <p>Balance: {balance?.formattedTransferable} DOT</p>
      <p>Block: #{blockNumber}</p>
      <small>Updates automatically</small>
    </div>
  )
}
```

## Address Formatting

### SS58 Address Format

LunoKit handles SS58 address formatting automatically based on the current chain:

```tsx
import { useChain, useSs58Format } from '@luno-kit/react'

function AddressInfo() {
  const { account } = useAccount()
  const { chain } = useChain()
  const { data: ss58Format } = useSs58Format()
  
  return (
    <div>
      <p>Chain: {chain?.name}</p>
      <p>SS58 Format: {ss58Format}</p>
      <p>Address: {account?.address}</p>
      <p>Display: {account?.formattedAddress}</p>
    </div>
  )
}
```

### Custom Address Display

```tsx
import { formatAddress } from '@luno-kit/core'

function CustomAddressDisplay({ address }: { address: string }) {
  const shortAddress = formatAddress(address, 4, 4) // 4 chars each side
  const veryShortAddress = formatAddress(address, 2, 2) // 2 chars each side
  
  return (
    <div>
      <p>Full: {address}</p>
      <p>Short: {shortAddress}</p>
      <p>Tiny: {veryShortAddress}</p>
    </div>
  )
}
```

## Account Validation

### Address Validation

```tsx
import { isValidAddress } from '@luno-kit/core'

function AddressInput() {
  const [address, setAddress] = useState('')
  const [isValid, setIsValid] = useState(false)
  
  useEffect(() => {
    setIsValid(isValidAddress(address))
  }, [address])
  
  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter Polkadot address"
      />
      <p>Valid: {isValid ? '✅' : '❌'}</p>
    </div>
  )
}
```

### Network Compatibility

Check if an address is compatible with the current network:

```tsx
import { useChain } from '@luno-kit/react'
import { isAddressCompatible } from '@luno-kit/core'

function AddressChecker({ address }: { address: string }) {
  const { chain } = useChain()
  const isCompatible = chain ? isAddressCompatible(address, chain.ss58Format) : false
  
  return (
    <div>
      <p>Address: {address}</p>
      <p>Network: {chain?.name}</p>
      <p>Compatible: {isCompatible ? '✅' : '❌'}</p>
    </div>
  )
}
```

## Account Persistence

### Auto-reconnection

LunoKit automatically reconnects to the last used account:

```tsx
const config = createConfig({
  appName: 'My App',
  chains: [polkadot],
  connectors: [polkadotjs()],
  autoConnect: true, // Enable auto-reconnection
})
```

### Storage Management

Control how account data is stored:

```tsx
import { createStorage } from '@luno-kit/core'

const customStorage = createStorage({
  storage: window.sessionStorage, // Use session storage instead of localStorage
  keyPrefix: 'myapp.wallet.',      // Custom key prefix
})

const config = createConfig({
  // ...
  storage: customStorage,
})
```

## Account Events

### Connection Status

```tsx
import { useConnect, ConnectionStatus } from '@luno-kit/react'

function ConnectionStatus() {
  const { status, error } = useConnect()
  
  switch (status) {
    case ConnectionStatus.Connecting:
      return <div>Connecting to wallet...</div>
    case ConnectionStatus.Connected:
      return <div>✅ Connected</div>
    case ConnectionStatus.Disconnected:
      return <div>❌ Disconnected</div>
    case ConnectionStatus.Reconnecting:
      return <div>🔄 Reconnecting...</div>
    default:
      return <div>Unknown status</div>
  }
}
```

### Account Changes

React to account changes:

```tsx
import { useAccount } from '@luno-kit/react'

function AccountWatcher() {
  const { account } = useAccount()
  
  useEffect(() => {
    if (account) {
      console.log('Account changed:', account.address)
      // Perform actions when account changes
    }
  }, [account])
  
  return <div>Watching for account changes...</div>
}
```

## Security Considerations

### Account Verification

Always verify account ownership for sensitive operations:

```tsx
import { useSignMessage } from '@luno-kit/react'

function AccountVerification() {
  const { signMessage, data: signature, isPending } = useSignMessage()
  const message = 'Verify account ownership'
  
  const verifyAccount = () => {
    signMessage({ message })
  }
  
  if (signature) {
    return <div>✅ Account verified</div>
  }
  
  return (
    <button onClick={verifyAccount} disabled={isPending}>
      {isPending ? 'Signing...' : 'Verify Account'}
    </button>
  )
}
```

### Permission Handling

Handle wallet permission requests:

```tsx
import { useConnect } from '@luno-kit/react'

function PermissionAwareConnect() {
  const { connect, error } = useConnect()
  
  if (error?.message.includes('permission')) {
    return (
      <div>
        <p>Wallet access denied</p>
        <button onClick={() => connect({ connectorId: 'polkadot-js' })}>
          Try Again
        </button>
      </div>
    )
  }
  
  return <ConnectButton />
}
```

## Best Practices

### Account Display

```tsx
function AccountCard({ account }: { account: Account }) {
  return (
    <div className="account-card">
      <div className="account-header">
        <h3>{account.name || 'Unnamed Account'}</h3>
        <span className="account-source">{account.source}</span>
      </div>
      <div className="account-address">
        {account.formattedAddress}
      </div>
    </div>
  )
}
```

### Error Boundaries

```tsx
import { ErrorBoundary } from 'react-error-boundary'

function AccountManager() {
  return (
    <ErrorBoundary fallback={<div>Error loading account</div>}>
      <AccountDisplay />
      <BalanceDisplay />
    </ErrorBoundary>
  )
}
```

### Loading States

```tsx
function AccountWithLoading() {
  const { account } = useAccount()
  const { data: balance, isLoading } = useBalance({ address: account?.address })
  
  if (!account) {
    return <ConnectButton />
  }
  
  return (
    <div>
      <h3>{account.name}</h3>
      <p>{account.formattedAddress}</p>
      {isLoading ? (
        <div>Loading balance...</div>
      ) : (
        <p>Balance: {balance?.formattedTransferable}</p>
      )}
    </div>
  )
}
```

## Next Steps

- Learn about [transaction signing](/hooks/transaction/use-send-transaction)
- Explore [chain switching](/hooks/chain/use-switch-chain)
- Check out [balance monitoring](/hooks/account/use-balance)