# useSignMessage

The `useSignMessage` hook provides functionality to sign messages using the connected wallet account.

## Import

```tsx
import { useSignMessage } from '@luno-kit/react'
```

## Usage

### Basic Usage

::: code-group
```tsx [index.tsx]
import { useSignMessage } from '@luno-kit/react'

function SignMessageButton() {
  const { signMessage, isPending, error, data } = useSignMessage()

  const handleSign = () => {
    signMessage({
      message: 'Hello, this is a test message to sign!'
    })
  }

  return (
    <div>
      <button onClick={handleSign} disabled={isPending}>
        {isPending ? 'Signing...' : 'Sign Message'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <p>Signature: {data.signature}</p>
          <p>Address: {data.addressUsed}</p>
        </div>
      )}
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

### Async Usage with Callbacks

::: code-group
```tsx [AsyncSignMessage.tsx]
import { useSignMessage } from '@luno-kit/react'

function AsyncSignMessageButton() {
  const { signMessageAsync, isPending } = useSignMessage()

  const handleSignAsync = async () => {
    try {
      const result = await signMessageAsync({
        message: 'Hello, this is a test message to sign!'
      })

      console.log('Message signed successfully!')
      console.log('Signature:', result.signature)
      console.log('Address used:', result.addressUsed)
    } catch (error) {
      console.error('Signing failed:', error)
    }
  }

  return (
    <button onClick={handleSignAsync} disabled={isPending}>
      Sign Message (Async)
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
| `onSuccess` | `(data: SignMessageData) => void` | No | Callback when message is signed successfully |
| `onError` | `(error: Error) => void` | No | Callback when signing fails |
| `onSettled` | `() => void` | No | Callback when signing completes (success or failure) |

## Return Value

The hook returns an object with the following properties:

### Methods
These are the functions you can call to sign messages.

| Property | Type | Description |
|----------|------|-------------|
| `signMessage` | `(variables: { message: string }, options?: { onSuccess?: () => void; onError?: (error: Error) => void; onSettled?: () => void }) => void` | Sign message synchronously |
| `signMessageAsync` | `(variables: { message: string }, options?: { onSuccess?: () => void; onError?: (error: Error) => void; onSettled?: () => void }) => Promise<SignMessageData>` | Sign message asynchronously |
| `reset` | `() => void` | Reset the signing state |

### Data & State
These properties provide information about the current state of the signing process.

| Property | Type | Description |
|----------|------|-------------|
| `data` | [`SignMessageData`](#signmessagedata) \| `undefined` | Signing result data |
| `error` | `Error \| null` | Signing error if any |
| `isError` | `boolean` | Whether there's an error |
| `isIdle` | `boolean` | Whether the hook is idle |
| `isPending` | `boolean` | Whether signing is in progress |
| `isSuccess` | `boolean` | Whether signing was successful |
| `status` | `'idle' \| 'pending' \| 'error' \| 'success'` | Overall signing status |
| `variables` | [`SignMessageVariables`](#signmessagevariables) \| `undefined` | Last used signing variables |

## Related Types

### SignMessageVariables

```tsx
interface SignMessageVariables {
  message: string;  // The message to sign
}
```

### SignMessageData

```tsx
interface SignMessageData {
  signature: string;      // The signature of the message
  rawMessage: string;     // The original message that was signed
  addressUsed: string;    // The address used for signing
}
```

> [!TIP]
> This hook requires an active wallet connection and account. The signature is generated using the private key associated with the connected account. The signed message can be verified later using the public key and signature.

## Related Hooks

- [`useAccount`](/hooks/account/use-account) - Get current account information
- [`useSendTransaction`](/hooks/transaction/use-send-transaction) - Send transactions to the blockchain
- [`useSigner`](/hooks/transaction/use-signer) - Get transaction signer
