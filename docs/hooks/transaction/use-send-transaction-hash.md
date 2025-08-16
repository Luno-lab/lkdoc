# useSendTransactionHash

The `useSendTransactionHash` hook provides functionality to send transactions to the blockchain and immediately return the transaction hash.

## Import

```tsx
import { useSendTransactionHash } from '@luno-kit/react'
```

## Usage

### Basic Usage

::: code-group
```tsx [index.tsx]
import { useSendTransactionHash } from '@luno-kit/react'

function SendTransactionHashButton() {
  const { api } = useApi();
  const { sendTransaction, isPending, error, data: txHash } = useSendTransactionHash()

  const handleSend = () => {
    const transferExtrinsic = api.tx.balances.transferKeepAlive(to, amount)

    sendTransaction({
      extrinsic: transferExtrinsic
    })
  }

  return (
    <div>
      <button onClick={handleSend} disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Transaction'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {txHash && <p>Transaction Hash: {txHash}</p>}
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

### Async Usage with Callbacks

::: code-group
```tsx [AsyncTransactionHash.tsx]
import { useSendTransactionHash } from '@luno-kit/react'

function AsyncTransactionHashButton() {
  const { api } = useApi();
  const { sendTransactionAsync, isPending } = useSendTransactionHash()

  const handleSendAsync = async () => {
    try {
      const transferExtrinsic = api.tx.balances.transferKeepAlive(to, amount)

      const txHash = await sendTransactionAsync({
        extrinsic: transferExtrinsic
      })

      console.log('Transaction hash:', txHash)
      // Note: This only returns the hash, not the final result
    } catch (error) {
      console.error('Transaction error:', error)
    }
  }

  return (
    <button onClick={handleSendAsync} disabled={isPending}>
      Send Transaction (Async)
    </button>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

## Parameters

The hook accepts an optional configuration object:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `onSuccess` | `(data: HexString) => void` | No | Callback when transaction hash is received |
| `onError` | `(error: Error) => void` | No | Callback when transaction fails |
| `onSettled` | `() => void` | No | Callback when transaction completes (success or failure) |

## Return Value

The hook returns an object with the following properties:

### Methods
These are the functions you can call to send transactions.

| Property | Type | Description |
|----------|------|-------------|
| `sendTransaction` | `(variables: { extrinsic: ISubmittableExtrinsic }, options?: { onSuccess?: () => void; onError?: (error: Error) => void; onSettled?: () => void }) => void` | Send transaction synchronously |
| `sendTransactionAsync` | `(variables: { extrinsic: ISubmittableExtrinsic }, options?: { onSuccess?: () => void; onError?: (error: Error) => void; onSettled?: () => void }) => Promise<HexString>` | Send transaction asynchronously |
| `reset` | `() => void` | Reset the transaction state |

### Data & State
These properties provide information about the current state of the transaction.

| Property | Type | Description |
|----------|------|-------------|
| `data` | [`HexString`](#hexstring) \| `undefined` | Transaction hash after sending |
| `error` | `Error \| null` | Transaction error if any |
| `isError` | `boolean` | Whether there's an error |
| `isIdle` | `boolean` | Whether the hook is idle |
| `isPending` | `boolean` | Whether transaction is in progress |
| `isSuccess` | `boolean` | Whether transaction was successful |
| `status` | `'idle' \| 'pending' \| 'error' \| 'success'` | Overall transaction status |
| `variables` | [`SendTransactionHashVariables`](#sendtransactionhashvariables) \| `undefined` | Last used transaction variables |

## Related Types

### SendTransactionHashVariables

```tsx
interface SendTransactionHashVariables {
  extrinsic: ISubmittableExtrinsic;  // The transaction to send
}
```

### HexString

```tsx
type HexString = `0x${string}`;  // Hexadecimal string starting with 0x
```

> [!TIP]
> This hook is similar to `useSendTransaction` but returns the transaction hash immediately after the transaction is signed and sent, without waiting for the transaction to be included in a block or finalized. Use this when you only need the transaction hash.

> [!WARNING]
> In Polkadot, transaction hashes are not guaranteed to be unique across the entire chain, although they are generally unique within a block. This means you cannot reliably query transaction information by hash alone. For more information, refer to the [Polkadot.js documentation](https://polkadot.js.org/docs/api/FAQ/#which-api-can-i-use-to-query-by-transaction-hash).

## Related Hooks

- [`useSendTransaction`](/hooks/transaction/use-send-transaction) - Send transaction with full status tracking
- [`useSignMessage`](/hooks/transaction/use-sign-message) - Sign messages with the connected account
- [`useSigner`](/hooks/transaction/use-signer) - Get transaction signer
