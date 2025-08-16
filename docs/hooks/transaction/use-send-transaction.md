# useSendTransaction

The `useSendTransaction` hook provides functionality to send transactions to the blockchain with comprehensive status tracking and error handling.

## Import

```tsx
import { useSendTransaction } from '@luno-kit/react'
```

## Usage

### Basic Usage

::: code-group
```tsx [index.tsx]
import { useSendTransaction } from '@luno-kit/react'

function SendTransactionButton() {
  const { api } = useApi();
  const { sendTransaction, isPending, error, detailedStatus } = useSendTransaction()

  const handleSend = () => {
    const transferExtrinsic = api.tx.balances.transferKeepAlive(to, amount)

    sendTransaction({
      extrinsic: transferExtrinsic
    })
  }

  return (
    <div>
      <button onClick={handleSend} disabled={isPending}>
        {'Send Transaction'}
      </button>
      {error && <p>Error: {error.message}</p>}
      <p>Status: {detailedStatus}</p>
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

### Async Usage with Callbacks

::: code-group
```tsx [AsyncTransaction.tsx]
import { useSendTransaction } from '@luno-kit/react'

function AsyncTransactionButton() {
  const { api } = useApi();
  const { sendTransactionAsync, isPending } = useSendTransaction()

  const handleSendAsync = async () => {
    try {
      const transferExtrinsic = api.tx.balances.transferKeepAlive(to, amount)

      const receipt = await sendTransactionAsync({
        extrinsic: transferExtrinsic
      })

      if (receipt.status === 'success') {
        console.log('Transaction successful:', receipt.transactionHash)
      } else {
        console.log('Transaction failed:', receipt.errorMessage)
      }
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
| `onSuccess` | `(data: TransactionReceipt) => void` | No | Callback when transaction succeeds |
| `onError` | `(error: Error) => void` | No | Callback when transaction fails |
| `onSettled` | `() => void` | No | Callback when transaction completes (success or failure) |

## Return Value

The hook returns an object with the following properties:

### Methods
These are the functions you can call to send transactions.

| Property | Type | Description |
|----------|------|-------------|
| `sendTransaction` | `(variables: { extrinsic: ISubmittableExtrinsic }, options?: { onSuccess?: () => void; onError?: (error: Error) => void; onSettled?: () => void }) => void` | Send transaction synchronously |
| `sendTransactionAsync` | `(variables: { extrinsic: ISubmittableExtrinsic }, options?: { onSuccess?: () => void; onError?: (error: Error) => void; onSettled?: () => void }) => Promise<TransactionReceipt>` | Send transaction asynchronously |
| `reset` | `() => void` | Reset the transaction state |

### Data & State
These properties provide information about the current state of the transaction.

| Property | Type                                                                   | Description |
|----------|------------------------------------------------------------------------|-------------|
| `data` | [`TransactionReceipt`](#transactionreceipt) \| `undefined`             | Transaction receipt after completion |
| `error` | `Error \| null`                                                        | Transaction error if any |
| `isError` | `boolean`                                                              | Whether there's an error |
| `isIdle` | `boolean`                                                              | Whether the hook is idle |
| `isPending` | `boolean`                                                              | Whether transaction is in progress |
| `isSuccess` | `boolean`                                                              | Whether transaction was successful |
| `status` | `'idle' \| 'pending' \| 'error' \| 'success'`                          | Overall transaction status |
| `variables` | [`SendTransactionVariables`](#sendtransactionvariables) \| `undefined` | Last used transaction variables |
| `txStatus` | [`TxStatus`](#txstatus)                                                | High-level transaction status |
| `detailedStatus` | [`DetailedTxStatus`](#detailedtxstatus)                                | Detailed transaction status |

## Related Types

### SendTransactionVariables

```tsx
interface SendTransactionVariables {
  extrinsic: ISubmittableExtrinsic;  // The transaction to send
}
```

### TransactionReceipt

```tsx
interface TransactionReceipt {
  transactionHash: HexString;         // Transaction hash, `0x${string}`
  blockHash: HexString;               // Block hash where transaction was included
  blockNumber?: number;               // Block number
  readonly events: EventRecord[];     // Events emitted during transaction
  status: 'failed' | 'success';      // Transaction result
  dispatchError?: DispatchError;      // Dispatch error if failed
  errorMessage?: string;              // Human-readable error message
  dispatchInfo?: DispatchInfo;        // Dispatch information
}
```

### TxStatus

```tsx
type TxStatus = 'idle' | 'signing' | 'success' | 'failed';
```

### DetailedTxStatus

```tsx
type DetailedTxStatus = 'idle' | 'broadcasting' | 'inBlock' | 'finalized' | 'invalid' | 'dropped';
```

> [!WARNING]
> In Polkadot, transaction hashes are not guaranteed to be unique across the entire chain, although they are generally unique within a block. This means you cannot reliably query transaction information by hash alone. For more information, refer to the [Polkadot.js documentation](https://polkadot.js.org/docs/api/FAQ/#which-api-can-i-use-to-query-by-transaction-hash).

## Related Hooks

- [`useSendTransactionHash`](/hooks/transaction/use-send-transaction-hash) - Send transaction and get hash
- [`useSignMessage`](/hooks/transaction/use-sign-message) - Sign messages with the connected account
- [`useSigner`](/hooks/transaction/use-signer) - Get transaction signer
