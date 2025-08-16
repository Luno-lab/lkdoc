# useSigner

The `useSigner` hook provides access to the transaction signer from the connected wallet, which is required for signing and submitting transactions.

## Import

```tsx
import { useSigner } from '@luno-kit/react'
```

## Usage

### Basic Usage

::: code-group
```tsx [ConditionalSigner.tsx]
import { useSigner } from '@luno-kit/react'

function ConditionalSigner() {
  const { signer, isLoading } = useSigner()

  if (isLoading) {
    return <div>⏳ Loading signer...</div>
  }

  if (!signer) {
    return <div>ℹ️ Please connect a wallet to access the signer</div>
  }

  return (
    <div>
      <h3>✅ Signer Ready</h3>
      <p>You can now sign transactions and messages</p>
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

## Return Value

The hook returns an object with the following properties:

### Methods
This hook doesn't provide any methods.

### Data & Status

| Property    | Type | Description |
|-------------|------|-------------|
| `data`      | [`Signer`](#signer) \| `undefined` | The transaction signer from the connected wallet |
| `isLoading` | `boolean` | Whether the signer is currently being loaded |

## Related Types

### Signer

```tsx
interface Signer extends InjectedSigner {
  // Inherits all properties and methods from InjectedSigner
}
```

> [!TIP]
> **Inherits from**: `InjectedSigner` (dedot library)

The `Signer` interface provides methods for:
- Signing transactions
- Signing messages
- Managing cryptographic operations
- Interacting with the wallet's signing capabilities

> [!TIP]
> This hook automatically manages the signer lifecycle. It will attempt to retrieve the signer whenever the active connector or account changes. The signer is required for most transaction-related operations in LunoKit.

## Related Hooks

- [`useAccount`](/hooks/account/use-account) - Get current account information
- [`useSendTransaction`](/hooks/transaction/use-send-transaction) - Send transactions using the signer
- [`useSignMessage`](/hooks/transaction/use-sign-message) - Sign messages using the signer
