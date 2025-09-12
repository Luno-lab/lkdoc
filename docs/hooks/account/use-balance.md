# useBalance

The `useBalance` hook provides access to account balance information including free, reserved, frozen, and transferable amounts.

## Import

```tsx
import { useBalance } from '@luno-kit/react'
import type { AccountBalance } from '@luno-kit/react/types'
```

## Usage

### Basic Balance Display

::: code-group

```tsx [index.tsx]
import { useBalance } from '@luno-kit/react'

function BalanceDisplay() {
  const { data: balance, isLoading, error } = useBalance({ 
    address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY' 
  })
  
  if (isLoading) {
    return <div>Loading balance...</div>
  }
  
  if (error) {
    return <div>Error loading balance: {error.message}</div>
  }
  
  if (!balance) {
    return <div>No balance data</div>
  }
  
  return (
    <div>
      <h3>Account Balance</h3>
      <p>Transferable: {balance.formattedTransferable}</p>
      <p>Total: {balance.formattedTotal}</p>
      <p>Reserved: {balance.reserved}</p>
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

### Balance with Locks

::: code-group

```tsx [index.tsx]
function BalanceWithLocks() {
  const { data: balance, isLoading } = useBalance({ 
    address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY' 
  })
  
  if (isLoading || !balance) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      <h3>Balance Details</h3>
      <div className="balance-summary">
        <p>Transferable: {balance.formattedTransferable}</p>
        <p>Total: {balance.formattedTotal}</p>
      </div>
      
      {balance.locks.length > 0 && (
        <div className="balance-locks">
          <h4>Balance Locks</h4>
          {balance.locks.map((lock, index) => (
            <div key={index}>
              <p>Lock {lock.id}: {lock.lockHuman}</p>
              <p>Reason: {lock.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

## Parameters

The hook accepts a configuration object:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | `string` | No | Account address to query balance for |

## Return Value

The hook returns an object with the following properties:

| Property | Type                                               | Description |
|----------|----------------------------------------------------|-------------|
| `data` | [`AccountBalance`](#accountbalance) \| `undefined` | Account balance information |
| `error` | `Error \| undefined`                               | Error if balance query failed |
| `isLoading` | `boolean`                                          | Whether the balance query is in progress |

### Related Types

#### AccountBalance

The `data` object contains:

| Property | Type                            | Description |
|----------|---------------------------------|-------------|
| `free` | `bigint`                        | Free balance amount |
| `total` | `bigint`                        | Total balance (free + reserved) |
| `reserved` | `bigint`                        | Reserved balance amount |
| `transferable` | `bigint`                        | Transferable balance (free - frozen) |
| `formattedTransferable` | `string`                        | Human-readable transferable balance |
| `formattedTotal` | `string`                        | Human-readable total balance |
| `locks` | [`BalanceLock[]`](#balancelock) | Array of balance locks |

#### BalanceLock

Each lock object contains:

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Lock identifier |
| `amount` | `bigint` | Locked amount |
| `reason` | `string` | Reason for the lock |
| `lockHuman` | `string` | Human-readable locked amount |

## Related Hooks

- [`useAccount`](/hooks/account/use-account) - Get current selected account
- [`useAccounts`](/hooks/account/use-accounts) - Get all available accounts
