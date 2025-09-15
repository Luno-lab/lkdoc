# useChain

The `useChain` hook provides access to the currently selected chain information including chain details and chain ID.

## Import

```tsx
import { useChain } from '@luno-kit/react'
import type { Chain } from '@luno-kit/react/types'
```

## Usage

### Basic Chain Information

::: code-group

```tsx [index.tsx]
import { useChain } from '@luno-kit/react'

function ChainInfo() {
  const { chain, chainId } = useChain()
  
  if (!chain) {
    return <div>No chain selected</div>
  }
  
  return (
    <div>
      <h3>Current Chain</h3>
      <p>Name: {chain.name}</p>
      <p>Chain ID: {chainId}</p>
      <p>Symbol: {chain.nativeCurrency.symbol}</p>
      <p>Decimals: {chain.nativeCurrency.decimals}</p>
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
| `chain` | [`Chain`](#chain-object) \| `undefined` | Current chain information |
| `chainId` | `string \| undefined` | Current chain ID (genesis hash) |

### Chain Object

The `chain` object contains:

| Property | Type                                                                                                                  | Description |
|----------|-----------------------------------------------------------------------------------------------------------------------|-------------|
| `genesisHash` | `string`                                                                                                              | Chain genesis hash |
| `name` | `string`                                                                                                              | Chain display name |
| `nativeCurrency` | `{ name: string; symbol: string; decimals: number }`                                                                  | Native token information |
| `rpcUrls` | `{ webSocket: readonly string[]; http?: readonly string[] }`                                                          | RPC endpoint URLs |
| `ss58Format` | `number`                                                                                                              | SS58 address format |
| `blockExplorers` | `{ default?: { name: string; url: string }; [key: string]: { name: string; url: string } \| undefined } \| undefined` | Block explorer information |
| `testnet` | `boolean`                                                                                                             | Whether this is a testnet |
| `chainIconUrl` | `string`                                                                                                              | URL to chain icon |

## Related Hooks

- [`useChains`](/hooks/chain/use-chains) - Get all available chains
- [`useSwitchChain`](/hooks/chain/use-switch-chain) - Switch between chains
- [`useConnect`](/hooks/connection/use-connect) - Connect to wallet
- [`useActiveConnector`](/hooks/connection/use-active-connector) - Get active connector
