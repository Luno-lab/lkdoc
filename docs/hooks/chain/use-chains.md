# useChains

The `useChains` hook provides access to all available chains configured in the application.

## Import

```tsx
import { useChains } from '@luno-kit/react'
import type { Chain } from '@luno-kit/react/types'
```

## Usage

### List All Chains

::: code-group

```tsx [index.tsx]
import { useChains } from '@luno-kit/react'

function ChainList() {
  const chains = useChains()
  
  if (chains.length === 0) {
    return <div>No chains configured</div>
  }
  
  return (
    <div>
      <h3>Available Chains ({chains.length})</h3>
      {chains.map((chain) => (
        <div key={chain.genesisHash}>
          <h4>{chain.name}</h4>
          <p>Symbol: {chain.nativeCurrency.symbol}</p>
          <p>Decimals: {chain.nativeCurrency.decimals}</p>
          <p>SS58 Format: {chain.ss58Format}</p>
        </div>
      ))}
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

## Return Value

The hook returns an array of `Chain` objects:

| Property | Type | Description |
|----------|------|-------------|
| `chains` | [`Chain[]`](#chain-object) | Array of all available chains configured in the application |

### Chain Object

The `chain` object contains:

| Property | Type | Description |
|----------|------|-------------|
| `genesisHash` | `string` | Chain genesis hash |
| `name` | `string` | Chain display name |
| `nativeCurrency` | `{ name: string; symbol: string; decimals: number }` | Native token information |
| `rpcUrls` | `{ webSocket: readonly string[]; http?: readonly string[] }` | RPC endpoint URLs |
| `ss58Format` | `number` | SS58 address format |
| `blockExplorers` | `{ default?: { name: string; url: string }; [key: string]: { name: string; url: string } \| undefined } \| undefined` | Block explorer information |
| `testnet` | `boolean` | Whether this is a testnet |
| `chainIconUrl` | `string` | URL to chain icon |

## Related Hooks

- [`useChain`](/hooks/chain/use-chain) - Get current selected chain
- [`useSwitchChain`](/hooks/chain/use-switch-chain) - Switch between chains
- [`useConnect`](/hooks/connection/use-connect) - Connect to wallet
- [`useActiveConnector`](/hooks/connection/use-active-connector) - Get active connector
