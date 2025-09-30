# useEstimatePaymentInfo

The `useEstimatePaymentInfo` hook provides functionality to estimate the transaction fee before sending a transaction to the blockchain.

## Import

```tsx
import { useEstimatePaymentInfo } from '@luno-kit/react'
```

## Usage

### Basic Usage

::: code-group
```tsx [index.tsx]
import { useEstimatePaymentInfo } from '@luno-kit/react'
import { useApi } from '@luno-kit/react'

function FeeEstimationExample() {
  const { api } = useApi()
  const { estimate, data, isLoading, error } = useEstimatePaymentInfo()
  
  const handleEstimate = async () => {
    // Create a transfer transaction
    const transferExtrinsic = api.tx.balances.transferKeepAlive('RECIPIENT_ADDRESS', 1_000_000_000n)
    
    // Estimate the fee
    await estimate(transferExtrinsic)
  }
  
  return (
    <div>
      <button onClick={handleEstimate} disabled={isLoading}>
        Estimate Fee
      </button>
      
      {isLoading && <p>Estimating fee...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <p>Estimated fee: {data.partialFeeFormatted}</p>
          <p>Weight: {data.weight.toString()}</p>
        </div>
      )}
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

### With Custom Sender Address

::: code-group
```tsx [CustomSender.tsx]
import { useEstimatePaymentInfo } from '@luno-kit/react'
import { useApi } from '@luno-kit/react'

function CustomSenderExample() {
  const { api } = useApi()
  const { estimate, data, isLoading } = useEstimatePaymentInfo()
  
  const handleEstimateWithCustomSender = async () => {
    const transferExtrinsic = api.tx.balances.transferKeepAlive('RECIPIENT_ADDRESS', 1_000_000_000n)
    
    // Provide a custom sender address
    await estimate(transferExtrinsic, 'CUSTOM_SENDER_ADDRESS')
  }
  
  return (
    <div>
      <button onClick={handleEstimateWithCustomSender} disabled={isLoading}>
        Estimate Fee for Custom Sender
      </button>
      
      {data && <p>Estimated fee: {data.partialFeeFormatted}</p>}
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

## Return Value

The hook returns an object with the following properties:

### Methods

| Property | Type | Description |
|----------|------|-------------|
| `estimate` | `(extrinsic: ISubmittableExtrinsic, senderAddress?: string) => Promise<PaymentInfo \| undefined>` | Estimates the fee for the given extrinsic |

### Data & State

| Property | Type | Description |
|----------|------|-------------|
| `data` | [`PaymentInfo`](#paymentinfo) \| `null` | The estimated payment information |
| `isLoading` | `boolean` | Whether the estimation is in progress |
| `error` | `Error \| null` | Error if estimation fails |

## Related Types

### PaymentInfo

```tsx
import type { TxPaymentInfo } from 'dedot/types';

interface PaymentInfo extends TxPaymentInfo {
  partialFeeFormatted: string;
}
```

The `PaymentInfo` interface provides:
- `partialFee`: The estimated transaction fee in smallest unit (e.g., Planck)
- `partialFeeFormatted`: The estimated fee formatted with proper decimals and units
- `weight`: The transaction weight information

## Notes

- The hook automatically uses the currently connected account's address if no `senderAddress` is provided
- The fee estimation requires an active connection to the blockchain
- The formatted fee takes into account the current chain's native currency decimals
- This hook is useful for displaying estimated transaction costs to users before they confirm a transaction

## Related Hooks

- [`useSendTransaction`](/hooks/transaction/use-send-transaction) - Send transactions to the blockchain
- [`useSendTransactionHash`](/hooks/transaction/use-send-transaction-hash) - Send transaction and get hash
- [`useApi`](/hooks/api/use-api) - Access the blockchain API 
