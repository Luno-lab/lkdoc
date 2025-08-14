# useAccount

The `useAccount` hook provides access to the currently connected account information including address, name, and formatted display address.

## Import

```tsx
import { useAccount } from '@luno-kit/react'
```

## Usage

::: code-group

```tsx [index.tsx]
import { useAccount } from '@luno-kit/react'

function AccountInfo() {
  const { account, address } = useAccount()
  
  if (!account) {
    return <div>No account connected</div>
  }
  
  return (
    <div>
      <h3>{account.name || 'Unnamed Account'}</h3>
      <p>Address: {address}</p>
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
| `account` | `Account \| undefined` | Current account information |
| `address` | `string \| undefined` | Address converted to match the current chain's SS58 format, or undefined if no account is connected |
### Account Object

The `account` object contains:

| Property | Type | Description |
|----------|------|-------------|
| `address` | `string` | Account address |
| `name` | `string \| undefined` | Account name (optional) |
| `publicKey` | `HexString \| undefined` | Account's public key (optional) |
| `meta` | `{ source?: string; genesisHash?: string \| null; [key: string]: any } \| undefined` | Account metadata (optional) |
| `type` | `KeypairType \| undefined` | Account type (optional) |


**Note**: The address is automatically converted to match the current chain's SS58 format when available.

## Related Hooks

- [`useAccounts`](/hooks/account/use-accounts) - Get all available accounts
- [`useBalance`](/hooks/account/use-balance) - Get account balance
