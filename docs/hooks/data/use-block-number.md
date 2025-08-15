# useBlockNumber

The `useBlockNumber` hook provides access to the current block number of the connected chain with real-time updates.

## Import

```tsx
import { useBlockNumber } from '@luno-kit/react'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useBlockNumber } from '@luno-kit/react'

function BlockNumberDisplay() {
  const { data: blockNumber, isLoading, error } = useBlockNumber()
  
  if (isLoading) {
    return <div>Loading block number...</div>
  }
  
  if (error) {
    return <div>Error: {error.message}</div>
  }
  
  if (!blockNumber) {
    return <div>No block number available</div>
  }
  
  return (
    <div>
      <h3>Current Block</h3>
      <p>Block Number: {blockNumber.toString()}</p>
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

## Return Value

The hook returns an object with the following properties:

| Property | Type                  | Description |
|----------|-----------------------|-------------|
| `data` | `number \| undefined` | Current block number from the chain |
| `error` | `Error \| undefined`  | Any error that occurred during subscription |
| `isLoading` | `boolean`             | Whether the subscription is currently loading |


**Note**: The block number automatically updates in real-time as new blocks are produced on the chain. `useBlockNumber` internally uses `useSubscription` to subscribe to block number updates from the chain.

## Related Hooks

- [`useRuntimeVersion`](/hooks/data/use-runtime-version) - Get runtime version information
- [`useGenesisHash`](/hooks/chain/use-genesis-hash) - Get genesis hash information
- [`useSs58Format`](/hooks/chain/use-ss58-format) - Get SS58 format information
- [`useSubscription`](/hooks/data/use-subscription) - Base hook for subscriptions
