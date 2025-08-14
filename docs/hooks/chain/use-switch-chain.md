# useSwitchChain

The `useSwitchChain` hook provides functionality to switch between different chains and access chain switching state.

## Import

```tsx
import { useSwitchChain } from '@luno-kit/react'
import type { Chain } from '@luno-kit/react'
```

## Usage

### Basic Chain Switching

::: code-group

```tsx [index.tsx]
import { useSwitchChain } from '@luno-kit/react'

function ChainSwitcher() {
  const { switchChain, chains, currentChain, isPending } = useSwitchChain()
  
  const handleSwitchChain = (chainId: string) => {
    switchChain({ chainId })
  }
  
  return (
    <div>
      <h3>Current Chain: {currentChain?.name}</h3>
      <div>
        {chains.map((chain) => (
          <button
            key={chain.genesisHash}
            onClick={() => handleSwitchChain(chain.genesisHash)}
            disabled={chain.genesisHash === currentChain?.genesisHash}
          >
            {chain.name} ({chain.nativeCurrency.symbol})
          </button>
        ))}
      </div>
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

### Async Chain Switching

::: code-group

```tsx [index.tsx]
function AsyncChainSwitcher() {
  const { switchChainAsync, isPending, error } = useSwitchChain()
  
  const handleSwitchChain = async (chainId: string) => {
    try {
      await switchChainAsync({ chainId })
      console.log('Chain switched successfully!')
    } catch (err) {
      console.error('Chain switching failed:', err)
    }
  }
  
  return (
    <div>
      <button onClick={() => handleSwitchChain('0x91b171bb158e2d8b7')} disabled={isPending}>
        {isPending ? 'Switching...' : 'Switch to Polkadot'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

## Parameters

The hook accepts an optional configuration object:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `onSuccess` | `() => void` | No | Callback when chain switching succeeds |
| `onError` | `(error: Error) => void` | No | Callback when chain switching fails |
| `onSettled` | `() => void` | No | Callback when chain switching attempt completes |

## Return Value

The hook returns an object with the following properties:

### Methods

| Property | Type                                                                                                                                                          | Description |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| `switchChain` | `(variables: { chainId: string }, options?: options?: { onSuccess?: () => void; onError?: (error: Error) => void; onSettled?: () => void }) => void`          | Switch to a different chain |
| `switchChainAsync` | `(variables: { chainId: string }, options?: options?: { onSuccess?: () => void; onError?: (error: Error) => void; onSettled?: () => void }) => Promise<void>` | Async version of switchChain |
| `reset` | `() => void`                                                                                                                                                  | Reset the chain switching state |

### Data & State

| Property | Type                               | Description |
|----------|------------------------------------|-------------|
| `chains` | `Chain[]`                          | Array of all available chains |
| `currentChain` | `Chain \| undefined`               | Currently selected chain |
| `currentChainId` | `string \| undefined`              | Currently selected chain ID |
| `data` | `void`                             | Chain switching result data |
| `variables` | `{ chainId: string } \| undefined` | Last used chain switching variables |
| `error` | `Error \| null`                    | Chain switching error if any |
| `isError` | `boolean`                          | Whether there's an error |
| `isIdle` | `boolean`                          | Whether the hook is idle |
| `isPending` | `boolean`                          | Whether chain switching is in progress |
| `isSuccess` | `boolean`                          | Whether chain switching was successful |

## Related Hooks

- [`useChain`](/hooks/chain/use-chain) - Get current selected chain
- [`useChains`](/hooks/chain/use-chains) - Get all available chains
- [`useConnect`](/hooks/connection/use-connect) - Connect to wallet
- [`useActiveConnector`](/hooks/connection/use-active-connector) - Get active connector
