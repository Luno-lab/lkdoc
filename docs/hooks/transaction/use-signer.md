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
  const { data: signer, isLoading } = useSigner()

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


### Data & Status

| Property    | Type | Description |
|-------------|------|-------------|
| `data`      | [`Signer`](#signer) \| `undefined` | The transaction signer from the connected wallet |
| `isLoading` | `boolean` | Whether the signer is currently being loaded |

## Related Types

### Signer

```tsx
import type { InjectedSigner } from 'dedot/types';

interface Signer extends InjectedSigner {
  // Inherits all properties and methods from InjectedSigner
}
```

The `Signer` interface provides methods for:
- `signPayload`: Signs transaction payloads for submission to the blockchain
- `signRaw`: Signs arbitrary messages or data with the connected account

> [!TIP]
> This hook automatically manages the signer lifecycle. It will attempt to retrieve the signer whenever the active connector or account changes. The signer is required for most transaction-related operations in LunoKit.

## Differences from usePapiSigner

The `useSigner` hook provides a LunoKit-compatible signer for use with LunoKit's transaction hooks, while the [`usePapiSigner`](/hooks/transaction/use-papi-signer) hook provides a signer that's compatible with the Polkadot API (papi).

| Feature | `useSigner` | `usePapiSigner`                          |
|---------|------------|------------------------------------------|
| Compatibility | LunoKit transaction hooks | PAPI                                     |
| Use case | When using LunoKit for transactions | When integrating with existing papi code |
| Return value | Includes only the signer | Includes only the signer                 |
| Required setup | Needs chains in config | Works with chains-free config            |

Choose `useSigner` when using LunoKit's transaction hooks like `useSendTransaction`, and choose `usePapiSigner` when you need to integrate with existing code that uses the PAPI directly.

## Related Hooks

- [`usePapiSigner`](/hooks/transaction/use-papi-signer) - Get a papi-compatible signer
- [`useSendTransaction`](/hooks/transaction/use-send-transaction) - Send transactions using the signer
- [`useSignMessage`](/hooks/transaction/use-sign-message) - Sign messages using the signer
