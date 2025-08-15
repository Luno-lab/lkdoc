# useGenesisHash

The `useGenesisHash` hook provides access to the genesis hash of the connected chain.

## Import

```tsx
import { useGenesisHash } from '@luno-kit/react'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useGenesisHash } from '@luno-kit/react'

function GenesisHashDisplay() {
  const { data: genesisHash, isLoading, error } = useGenesisHash()
  
  if (isLoading) {
    return <div>Loading genesis hash...</div>
  }
  
  if (error) {
    return <div>Error: {error.message}</div>
  }
  
  if (!genesisHash) {
    return <div>No genesis hash available</div>
  }
  
  return (
    <div>
      <h3>Genesis Hash</h3>
      <p>Hash: {genesisHash}</p>
      <p>Short: {genesisHash.slice(0, 10)}...</p>
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

## Return Value

The hook returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `data` | `HexString \| undefined` | The genesis hash of the chain |
| `error` | `Error \| null` | Any error that occurred during the query |
| `isLoading` | `boolean` | Whether the query is currently loading |

**Note**: The `data` property is of type `HexString` from the dedot library, which represents a `0x${string}`.

**Note**: The genesis hash is fetched using React Query and cached indefinitely. The hook will only refetch when the chain changes or when the cache is invalidated.

## Related Hooks

- [`useBlockNumber`](/hooks/data/use-block-number) - Get current block number
- [`useRuntimeVersion`](/hooks/data/use-runtime-version) - Get runtime version information
- [`useSs58Format`](/hooks/data/use-ss58-format) - Get SS58 format information
- [`useSubscription`](/hooks/data/use-subscription) - Base hook for subscriptions
