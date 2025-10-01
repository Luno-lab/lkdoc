# usePapiSigner

The `usePapiSigner` hook provides a signer object compatible with the Polkadot API (papi), allowing you to use LunoKit's wallet connection features with your existing papi implementation.

## Import

```tsx
import { usePapiSigner } from '@luno-kit/react'
```

## Usage

### Basic Usage

::: code-group
```tsx [ConditionalPapiSigner.tsx]
import { usePapiSigner } from '@luno-kit/react'

function ConditionalPapiSigner() {
  const { data: papiSigner, isLoading } = usePapiSigner()

  if (isLoading) {
    return <div>⏳ Loading signer...</div>
  }

  if (!papiSigner) {
    return <div>ℹ️ Please connect a wallet to access the papiSigner</div>
  }

  return (
    <div>
      <h3>✅ papiSigner Ready</h3>
      <p>You can now sign transactions and messages</p>
    </div>
  )
}
```
<<< ../../../snippets/config-nochains.ts[config.ts]
:::

## Configuration

### Minimal Setup

To use `usePapiSigner`, you need to set up LunoKit with just the wallet connection features:

```tsx
import { createConfig } from '@luno-kit/react'
import { LunoKitProvider } from '@luno-kit/ui';
import { polkadotjsConnector } from '@luno-kit/react/connectors'

// Create a config without chains
const config = createConfig({
  appName: 'My papi Dapp',
  connectors: [polkadotjsConnector()],
})

function App() {
  return (
    <LunoKitProvider config={config}>
      <ConditionalPapiSigner />
    </LunoKitProvider>
  )
}
```

## Return Value

The hook returns an object with the following properties:

### Data & Status

| Property    | Type                 | Description |
|-------------|----------------------|-------------|
| `data`      | [`PapiSigner`](#papisigner) \| `undefined` | A papi-compatible signer object |
| `isLoading` | `boolean`            | Whether the signer is being loaded |

## Related Types

### PapiSigner

```tsx
import type { PolkadotSigner as PapiSigner } from '@polkadot-api/pjs-signer';

export type { PapiSigner };
```

> [!TIP]
> **Inherits from**: `PolkadotSigner` from papi. For more details, see the [papi signers documentation](https://papi.how/signers).

The `PapiSigner` interface provides:
- `publicKey`: The public key of the signer
- `signBytes`: Method for signing arbitrary bytes/messages
- `signTx`: Method for signing transactions

> [!TIP]
> This hook automatically manages the signer lifecycle. It will attempt to retrieve a papi-compatible signer whenever the active connector or account changes.

## Differences from useSigner

The `usePapiSigner` hook provides a signer that's compatible with the PAPI, while the [`useSigner`](/hooks/transaction/use-signer) hook provides a LunoKit-compatible signer for use with LunoKit's transaction hooks.

| Feature | `usePapiSigner` | `useSigner` |
|---------|-----------------|-------------|
| Compatibility | PAPI | LunoKit transaction hooks |
| Use case | When integrating with existing papi code | When using LunoKit for transactions |
| Return value | Includes only the signer | Includes only the signer |
| Required setup | Works with chains-free config | Needs chains in config |

Choose `usePapiSigner` when you need to integrate with existing code that uses the PAPI directly, and choose `useSigner` when using LunoKit's transaction hooks like `useSendTransaction`.

## Related Hooks

- [`useSigner`](/hooks/transaction/use-signer) - Get a general-purpose transaction signer
- [`useConnect`](/hooks/connection/use-connect) - Connect to wallets
- [`useAccount`](/hooks/account/use-account) - Get the connected account information 
