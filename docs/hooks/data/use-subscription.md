# useSubscription

The `useSubscription` hook provides a way to subscribe to real-time data from the blockchain using dedot's subscription system.

## Import

```tsx
import { useSubscription } from '@luno-kit/react'
```

## Usage

### Basic Usage

::: code-group
```tsx [index.tsx]
import { useSubscription } from '@luno-kit/react'

interface AccountData {
  data: {
    free: bigint | string | number;
    reserved: bigint | string | number;
    frozen: bigint | string | number;
  };
}

function BalanceSubscription() {
  const { data: balance, isLoading, error } = useSubscription<[string], AccountData, string>({
    queryKey: '/balance-subscription',
    factory: (api) => api.query.system.account,
    params: ['your-address-here'],
    options: {
      enabled: true,
      transform: (result) => result.data.free.toString()
    }
  })
  
  if (isLoading) {
    return <div>Subscribing to balance...</div>
  }
  
  if (error) {
    return <div>Subscription error: {error.message}</div>
  }
  
  return (
    <div>
      <h3>Live Balance</h3>
      <p>Balance: {balance || 'Loading...'}</p>
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

### Multiple Query Subscription

::: code-group
```tsx [MultiQuerySubscription.tsx]
import { useSubscription } from '@luno-kit/react'
import type { AccountBalance } from '@luno-kit/react';

interface AccountData {
  data: {
    free: bigint | string | number;
    reserved: bigint | string | number;
    frozen: bigint | string | number;
  };
}

interface BalanceLock {
  id: string | number;
  amount: bigint | string | number;
  reasons?: string | number;
}

function MultiQuerySubscription() {
  const { data: accountData, isLoading, error } = useSubscription<
    { fn: any, args: any[] }[],
    [AccountData, BalanceLock[]],
    AccountBalance
  >({
    queryKey: '/multi-query',
    factory: (api) => api.queryMulti,
    params: (api) => [
      { fn: api.query.system.account, args: ['address'] },
      { fn: api.query.balances.locks, args: ['address'] }
    ],
    options: {
      transform: (results) => ({
        balance: results[0].data.free.toString(),
        locks: results[1].map(lock => lock.amount.toString())
      })
    }
  })
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <p>Balance: {accountData?.balance}</p>
      <p>Locks: {accountData?.locks?.length || 0}</p>
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

## Parameters

The hook takes a configuration object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `queryKey` | `string \| number` | Unique identifier for the subscription |
| `factory` | `(api: LegacyClient) => SubscriptionFn` | Function that creates the subscription |
| `params` | `TArgs \| (api: LegacyClient) => QueryMultiItem[]` | Parameters for the subscription or function to generate them |
| `options` | `UseSubscriptionOptions<TData, TTransformed>` | Optional configuration options |

### UseSubscriptionOptions

| Property | Type | Description |
|----------|------|-------------|
| `enabled` | `boolean` | Whether the subscription is enabled (default: `true`) |
| `transform` | `(data: TData) => TTransformed` | Function to transform the subscription data |
| `defaultValue` | `TTransformed` | Default value to use before subscription data arrives |

### QueryMultiItem

| Property | Type | Description |
|----------|------|-------------|
| `fn` | `GenericStorageQuery` | The query function to call |
| `args` | `any[]` | Arguments to pass to the query function |

## Return Value

The hook returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `data` | `TTransformed \| undefined` | The transformed subscription data |
| `error` | `Error \| undefined` | Any error that occurred during subscription |
| `isLoading` | `boolean` | Whether the subscription is currently loading |

**Note**: This hook internally manages subscription lifecycle, automatically subscribing when enabled and unsubscribing when the component unmounts or when the query key changes. `useSubscription` automatically listens for value changes, but only for query-based subscriptions. For RPC-based queries, please refer to the examples in [`useApi`](/hooks/api/use-api).

## Related Hooks

- [`useBlockNumber`](/hooks/data/use-block-number) - Subscribe to block number updates
- [`useRuntimeVersion`](/hooks/data/use-runtime-version) - Get runtime version information
- [`useGenesisHash`](/hooks/data/use-genesis-hash) - Get genesis hash information
- [`useSs58Format`](/hooks/data/use-ss58-format) - Get SS58 format information
