# useRuntimeVersion

The `useRuntimeVersion` hook provides access to the current runtime version of the connected chain.

## Import

```tsx
import { useRuntimeVersion } from '@luno-kit/react'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useRuntimeVersion } from '@luno-kit/react'

function RuntimeVersionDisplay() {
  const { data: runtimeVersion, isLoading, error } = useRuntimeVersion()
  
  if (isLoading) {
    return <div>Loading runtime version...</div>
  }
  
  if (error) {
    return <div>Error: {error.message}</div>
  }
  
  if (!runtimeVersion) {
    return <div>No runtime version available</div>
  }
  
  return (
    <div>
      <h3>Runtime Version</h3>
      <p>Spec Version: {runtimeVersion.specVersion}</p>
      <p>Impl Version: {runtimeVersion.implVersion}</p>
      <p>Impl Name: {runtimeVersion.implName}</p>
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
| `data` | `SubstrateRuntimeVersion \| undefined` | Current runtime version information |
| `error` | `Error \| null` | Any error that occurred during the query |
| `isLoading` | `boolean` | Whether the query is currently loading |
| `isError` | `boolean` | Whether there's an error |
| `isSuccess` | `boolean` | Whether the query was successful |

### SubstrateRuntimeVersion Object

The `data` property is of type `SubstrateRuntimeVersion` from the dedot library, which contains runtime version information.

| Property | Type | Description |
|----------|------|-------------|
| `specVersion` | `number` | The specification version of the runtime |
| `implVersion` | `number` | The implementation version of the runtime |
| `implName` | `string` | The name of the runtime implementation |
| `authoringVersion` | `number` | The authoring version of the runtime |
| `specName` | `string` | The name of the runtime specification |

**Note**: The runtime version is fetched using React Query and automatically cached. The hook will only refetch when the chain changes or when the cache is invalidated.

## Related Hooks

- [`useBlockNumber`](/hooks/data/use-block-number) - Get current block number
- [`useGenesisHash`](/hooks/chain/use-genesis-hash) - Get genesis hash information
- [`useSs58Format`](/hooks/chain/use-ss58-format) - Get SS58 format information
- [`useSubscription`](/hooks/data/use-subscription) - Base hook for subscriptions
