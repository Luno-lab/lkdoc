# useBalance

The `useBalance` hook fetches and monitors account balance information for any Substrate-based address.

## Import

```tsx
import { useBalance } from '@luno-kit/react'
```

## Usage

### Basic Balance

```tsx
import { useAccount, useBalance } from '@luno-kit/react'

function AccountBalance() {
  const { account } = useAccount()
  const { data: balance, isLoading, error } = useBalance({
    address: account?.address,
  })
  
  if (isLoading) return <div>Loading balance...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!balance) return <div>No balance data</div>
  
  return (
    <div>
      <h3>Balance</h3>
      <p>Transferable: {balance.formattedTransferable}</p>
      <p>Total: {balance.formattedTotal}</p>
      <p>Reserved: {balance.formattedReserved}</p>
    </div>
  )
}
```

### Balance for Any Address

```tsx
function AddressBalance({ address }: { address: string }) {
  const { data: balance, isLoading } = useBalance({ address })
  
  if (isLoading) {
    return <div className="balance-loading">Loading...</div>
  }
  
  return (
    <div className="balance-display">
      <span>{balance?.formattedTransferable || '0'}</span>
      <small>{balance?.symbol}</small>
    </div>
  )
}
```

## Parameters

The hook accepts a configuration object:

| Parameter | Type | Required | Description |
|-----------|------|---------- |-------------|
| `address` | `string` | Yes | The account address to fetch balance for |

```tsx
const { data: balance } = useBalance({
  address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
})
```

## Return Value

The hook returns a React Query result object:

### Data

| Property | Type | Description |
|----------|------|-------------|
| `data` | `Balance \| undefined` | Balance information |
| `isLoading` | `boolean` | Whether balance is being fetched |
| `isFetching` | `boolean` | Whether balance is being fetched/refetched |
| `isError` | `boolean` | Whether there was an error |
| `error` | `Error \| null` | Error object if fetch failed |
| `isSuccess` | `boolean` | Whether fetch was successful |

### Balance Object

The `data` object contains:

| Property | Type | Description |
|----------|------|-------------|
| `total` | `bigint` | Total balance in Planck units |
| `transferable` | `bigint` | Transferable balance in Planck units |
| `reserved` | `bigint` | Reserved balance in Planck units |
| `bonded` | `bigint` | Bonded balance in Planck units |
| `formattedTotal` | `string` | Formatted total balance for display |
| `formattedTransferable` | `string` | Formatted transferable balance |
| `formattedReserved` | `string` | Formatted reserved balance |
| `formattedBonded` | `string` | Formatted bonded balance |
| `symbol` | `string` | Token symbol (e.g., "DOT", "KSM") |
| `decimals` | `number` | Token decimal places |

## Examples

### Complete Balance Card

```tsx
function BalanceCard() {
  const { account } = useAccount()
  const { data: balance, isLoading, error } = useBalance({ 
    address: account?.address 
  })
  
  if (!account) {
    return <div className="balance-card">Connect wallet to view balance</div>
  }
  
  if (isLoading) {
    return (
      <div className="balance-card">
        <div className="balance-skeleton">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="balance-card error">
        <p>Failed to load balance</p>
        <small>{error.message}</small>
      </div>
    )
  }
  
  if (!balance) {
    return <div className="balance-card">No balance data available</div>
  }
  
  return (
    <div className="balance-card">
      <h3>Account Balance</h3>
      
      <div className="balance-item primary">
        <label>Available</label>
        <span className="amount">
          {balance.formattedTransferable} {balance.symbol}
        </span>
      </div>
      
      <div className="balance-item">
        <label>Total</label>
        <span className="amount">
          {balance.formattedTotal} {balance.symbol}
        </span>
      </div>
      
      {balance.formattedReserved !== '0' && (
        <div className="balance-item">
          <label>Reserved</label>
          <span className="amount">
            {balance.formattedReserved} {balance.symbol}
          </span>
        </div>
      )}
      
      {balance.formattedBonded !== '0' && (
        <div className="balance-item">
          <label>Bonded</label>
          <span className="amount">
            {balance.formattedBonded} {balance.symbol}
          </span>
        </div>
      )}
    </div>
  )
}
```

### Balance Comparison

```tsx
function BalanceComparison({ addresses }: { addresses: string[] }) {
  const balanceQueries = addresses.map(address => ({
    address,
    ...useBalance({ address })
  }))
  
  return (
    <div className="balance-comparison">
      <h3>Balance Comparison</h3>
      {balanceQueries.map(({ address, data: balance, isLoading }) => (
        <div key={address} className="balance-row">
          <div className="address">{formatAddress(address)}</div>
          <div className="balance">
            {isLoading ? (
              'Loading...'
            ) : balance ? (
              `${balance.formattedTransferable} ${balance.symbol}`
            ) : (
              'No data'
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
```

### Auto-refreshing Balance

```tsx
function LiveBalance() {
  const { account } = useAccount()
  const { data: balance, dataUpdatedAt } = useBalance({ 
    address: account?.address 
  })
  
  const lastUpdated = new Date(dataUpdatedAt).toLocaleTimeString()
  
  return (
    <div className="live-balance">
      <div className="balance-amount">
        {balance?.formattedTransferable || '0'} {balance?.symbol}
      </div>
      <div className="last-updated">
        Last updated: {lastUpdated}
      </div>
    </div>
  )
}
```

### Balance with USD Value

```tsx
function BalanceWithUSD() {
  const { account } = useAccount()
  const { data: balance } = useBalance({ address: account?.address })
  const [usdPrice, setUsdPrice] = useState<number | null>(null)
  
  useEffect(() => {
    if (balance?.symbol) {
      // Fetch USD price from API
      fetchTokenPrice(balance.symbol).then(setUsdPrice)
    }
  }, [balance?.symbol])
  
  if (!balance) return null
  
  const usdValue = usdPrice 
    ? (parseFloat(balance.formattedTransferable) * usdPrice).toFixed(2)
    : null
  
  return (
    <div className="balance-usd">
      <div className="token-balance">
        {balance.formattedTransferable} {balance.symbol}
      </div>
      {usdValue && (
        <div className="usd-value">
          ≈ ${usdValue} USD
        </div>
      )}
    </div>
  )
}
```

## Balance Monitoring

The hook automatically updates balance when:
- New blocks are produced
- Transactions are finalized
- Chain switches occur
- Account changes

### Custom Refresh Interval

```tsx
function CustomRefreshBalance() {
  const { account } = useAccount()
  const { data: balance, refetch } = useBalance({ 
    address: account?.address 
  })
  
  // Manual refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [refetch])
  
  return <BalanceDisplay balance={balance} />
}
```

## Error Handling

### Balance with Error Recovery

```tsx
function ResilientBalance() {
  const { account } = useAccount()
  const { data: balance, error, refetch, isLoading } = useBalance({ 
    address: account?.address 
  })
  
  if (error) {
    return (
      <div className="balance-error">
        <p>Failed to load balance</p>
        <button onClick={() => refetch()} disabled={isLoading}>
          {isLoading ? 'Retrying...' : 'Retry'}
        </button>
      </div>
    )
  }
  
  return <BalanceDisplay balance={balance} />
}
```

## Integration with Transactions

### Check Sufficient Balance

```tsx
function TransferForm() {
  const { account } = useAccount()
  const { data: balance } = useBalance({ address: account?.address })
  const [amount, setAmount] = useState('')
  
  const hasInsufficientBalance = balance && parseFloat(amount) > parseFloat(balance.formattedTransferable)
  
  return (
    <form>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to transfer"
      />
      
      {balance && (
        <p>Available: {balance.formattedTransferable} {balance.symbol}</p>
      )}
      
      {hasInsufficientBalance && (
        <p className="error">Insufficient balance</p>
      )}
      
      <button disabled={hasInsufficientBalance}>
        Transfer
      </button>
    </form>
  )
}
```

## Best Practices

### Safe Balance Access

```tsx
function SafeBalanceDisplay() {
  const { account } = useAccount()
  const { data: balance, isLoading } = useBalance({ 
    address: account?.address 
  })
  
  // Always check if balance exists
  if (!balance) {
    return isLoading ? <div>Loading...</div> : <div>No balance</div>
  }
  
  // Safe to access balance properties
  return (
    <div>
      {balance.formattedTransferable} {balance.symbol}
    </div>
  )
}
```

### Loading States

```tsx
function BalanceWithStates() {
  const { account } = useAccount()
  const { data: balance, isLoading, isFetching } = useBalance({ 
    address: account?.address 
  })
  
  return (
    <div className="balance-container">
      <div className={`balance-amount ${isFetching ? 'updating' : ''}`}>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          balance?.formattedTransferable || '0'
        )}
      </div>
      {isFetching && <div className="update-indicator">Updating...</div>}
    </div>
  )
}
```

## Related Hooks

- [`useAccount`](/hooks/account/use-account) - Get current account
- [`useSendTransaction`](/hooks/transaction/use-send-transaction) - Send transactions
- [`useChain`](/hooks/chain/use-chain) - Get current chain info