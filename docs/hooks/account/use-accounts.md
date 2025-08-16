# useAccounts

The `useAccounts` hook provides access to all available accounts and allows selecting a specific account.

## Import

```tsx
import { useAccounts } from '@luno-kit/react'
import type { Account } from '@luno-kit/react'
```

## Usage

### List All Accounts

::: code-group

```tsx [index.tsx]
import { useAccounts } from '@luno-kit/react'

function AccountList() {
  const { accounts } = useAccounts()
  
  if (accounts.length === 0) {
    return <div>No accounts available</div>
  }
  
  return (
    <div>
      <h3>Available Accounts ({accounts.length})</h3>
      {accounts.map((account) => (
        <div key={account.address}>
          <h4>{account.name || 'Unnamed Account'}</h4>
          <p>Address: {account.address}</p>
          <p>Type: {account.type || 'Unknown'}</p>
        </div>
      ))}
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

### Account Selection

::: code-group

```tsx [index.tsx]
function AccountSelector() {
  const { accounts, selectAccount } = useAccounts()
  
  const handleAccountSelect = (account: Account) => {
    selectAccount(account)
  }
  
  return (
    <div>
      <h3>Select Account</h3>
      {accounts.map((account) => (
        <button
          key={account.address}
          onClick={() => handleAccountSelect(account)}
        >
          {account.name || 'Unnamed'} - {account.address}
        </button>
      ))}
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
| `accounts` | `Account[]` | Array of all available accounts with addresses formatted for the current chain |
| `selectAccount` | `(accountOrPublicKey?: Account \| HexString) => void` | Function to select a specific account |

> [!TIP]
> When using `selectAccount` with a `HexString` (publicKey), ensure the account has a valid `publicKey`. If an account is missing its `publicKey`, the selection may fail.

### Account Object

The `account` object contains:

| Property | Type | Description |
|----------|------|-------------|
| `address` | `string` | Address converted to match the current chain's SS58 format |
| `name` | `string \| undefined` | Account name (optional) |
| `publicKey` | `HexString \| undefined` | Account's public key (optional) |
| `meta` | `{ source?: string; genesisHash?: string \| null; [key: string]: any } \| undefined` | Account metadata (optional) |
| `type` | `KeypairType \| undefined` | Account type (optional) |


> [!TIP]
> Account addresses are automatically converted to match the current chain's SS58 format when available.

## Related Hooks

- [`useAccount`](/hooks/account/use-account) - Get current selected account
- [`useBalance`](/hooks/account/use-balance) - Get account balance
