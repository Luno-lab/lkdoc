# useSs58Format

The `useSs58Format` hook provides access to the SS58 address format prefix of the connected chain.

## Import

```tsx
import { useSs58Format } from '@luno-kit/react'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSs58Format } from '@luno-kit/react'

function Ss58FormatDisplay() {
  const { data: ss58Format, isLoading } = useSs58Format()
  
  if (isLoading) {
    return <div>Loading SS58 format...</div>
  }
  
  if (!ss58Format) {
    return <div>No SS58 format available</div>
  }
  
  return (
    <div>
      <h3>SS58 Format</h3>
      <p>Prefix: {ss58Format}</p>
    </div>
  )
}

function getSs58Description(format: number): string {
  switch (format) {
    case 0: return 'Polkadot (0)'
    case 2: return 'Kusama (2)'
    case 42: return 'Substrate (42)'
    default: return `Custom (${format})`
  }
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

## Return Value

The hook returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `data` | `number \| undefined` | The SS58 address format prefix |
| `isLoading` | `boolean` | Whether the SS58 format is currently loading |

### SS58 Format Values

The `data` property represents the SS58 address format prefix used by the chain.

| Value | Description | Example Chain |
|-------|-------------|---------------|
| `0` | Polkadot | Polkadot mainnet |
| `2` | Kusama | Kusama mainnet |
| `42` | Substrate | Substrate development chains |
| `Custom` | Chain-specific | Other networks |

**Note**: The hook first attempts to fetch the SS58 format from the chain's runtime constants. If that fails, it falls back to the chain configuration or defaults to 42 (Substrate format).

## Related Hooks

- [`useBlockNumber`](/hooks/data/use-block-number) - Get current block number
- [`useRuntimeVersion`](/hooks/data/use-runtime-version) - Get runtime version information
- [`useGenesisHash`](/hooks/data/use-genesis-hash) - Get genesis hash information
- [`useSubscription`](/hooks/data/use-subscription) - Base hook for subscriptions
