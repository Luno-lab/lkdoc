# useApi

Hook for accessing the Polkadot chain API client.

## Import

```ts
import { useApi } from '@luno-kit/react'
```

## Usage

### Basic Usage

::: code-group

```tsx [index.tsx]
import { useApi } from '@luno-kit/react'

function App() {
  const { api, isApiReady, apiError } = useApi()

  if (apiError) {
    return <div>API Error: {apiError.message}</div>
  }

  if (!isApiReady) {
    return <div>Loading API...</div>
  }

  return <div>API is ready!</div>
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

### Using API Methods

::: code-group

```tsx [index.tsx]
import { useApi } from '@luno-kit/react'

function BalanceChecker() {
  const { api, isApiReady } = useApi()

  const checkBalance = async (address: string) => {
    if (!api || !isApiReady) return

    try {
      // Query account balance
      const balance = await api.query.system.account(address)
      console.log('Balance:', balance.data.free.toString())
      
      // Get chain properties
      const properties = await api.rpc.system_properties()
      console.log('Chain properties:', properties)
      
      // Get current block
      const block = await api.rpc.chain_getBlock()
      console.log('Current block:', block.block.header.number.toString())
    } catch (error) {
      console.error('API call failed:', error)
    }
  }

  return (
    <button 
      onClick={() => checkBalance('your-address-here')}
      disabled={!isApiReady}
    >
      Check Balance
    </button>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

## Return Value
The hook returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `api` | `LegacyClient \| undefined` | The Polkadot chain API client instance |
| `isApiReady` | `boolean` | Whether the API is ready for use |
| `apiError` | `Error \| null` | Any error that occurred during API initialization |

## API Client Type

The `api` property is of type `LegacyClient` from the [dedot library](https://docs.dedot.dev/clients-and-providers/clients#legacyclient).

### LegacyClient Interface

The `LegacyClient` provides high-level APIs for interacting with Substrate-based blockchains:

#### Query Methods

```tsx
// Query account Balance
const balanceInfo = await api.query.system.account(address)

// Query balance locks
const balance = await api.query.balances.locks
```

#### RPC Methods

```tsx
// Get chain information
const chain = await api.rpc.system.chain()
const properties = await api.rpc.system_properties()
const version = await api.rpc.system_version()

// Get block information
const block = await api.rpc.chain_getBlock()
const blockHash = await api.rpc.chain_getBlockHash(blockNumber)
const genesisHash = await api.rpc.chain_getBlockHash(0)

// Get metadata
const metadata = await api.rpc.state_getMetadata()
```

#### Transaction Methods

```tsx
// Create transfer transaction
const transferTx = api.tx.balances.transferKeepAlive(address, amount)
```

## Notes

- The API client is automatically initialized when a chain is selected
- Always check `isApiReady` before making API calls
- Handle `apiError` appropriately in your UI
- The `LegacyClient` provides both query methods and RPC methods
- For more advanced usage, refer to the [dedot documentation](https://docs.dedot.dev/clients-and-providers/clients#legacyclient)
