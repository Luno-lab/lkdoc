# API Reference

LunoKit provides a comprehensive set of components and hooks for integrating Polkadot wallet functionality into your React applications.

## Package Overview

### `@luno-kit/ui`
Pre-built UI components with beautiful design and built-in functionality.

- [`<ConnectButton />`](/api/connect-button) - Main wallet connection component
- [`<LunoKitProvider />`](/api/provider) - Context provider for your app

### `@luno-kit/react` 
React hooks for advanced wallet integration and custom UI development.

## React Hooks by Category

### Account Management
- [`useAccount()`](/api/account#useaccount) - Get current connected account information
- [`useAccounts()`](/api/account#useaccounts) - Get all available accounts from connected wallet
- [`useActiveConnector()`](/api/account#useactiveconnector) - Get currently active wallet connector

### Connection Management
- [`useConnect()`](/api/connection#useconnect) - Connect to wallets and manage connection state
- [`useConnectors()`](/api/connection#useconnectors) - Get available connectors
- [`useDisconnect()`](/api/connection#usedisconnect) - Disconnect from wallet
- [`useStatus()`](/api/connection#usestatus) - Get connection status

### Chain & Network
- [`useChain()`](/api/chain#usechain) - Get current chain information
- [`useChains()`](/api/chain#usechains) - Get all available chains
- [`useSwitchChain()`](/api/chain#useswitchchain) - Switch between chains
- [`useGenesisHash()`](/api/chain#usegenesishash) - Get chain genesis hash
- [`useSs58Format()`](/api/chain#usess58format) - Get chain SS58 format

### Blockchain Data
- [`useApi()`](/api/blockchain#useapi) - Get Polkadot API instance
- [`useBalance()`](/api/blockchain#usebalance) - Get account balance
- [`useBlockNumber()`](/api/blockchain#useblocknumber) - Get current block number
- [`useRuntimeVersion()`](/api/blockchain#useruntimeversion) - Get runtime version
- [`useSubscription()`](/api/blockchain#usesubscription) - Subscribe to blockchain data

### Transactions & Signing
- [`useSendTransaction()`](/api/transactions#usesendtransaction) - Send transactions and get full result
- [`useSendTransactionHash()`](/api/transactions#usesendtransactionhash) - Send transactions and get hash only
- [`useSignMessage()`](/api/transactions#usesignmessage) - Sign messages
- [`useSigner()`](/api/transactions#usesigner) - Get signer instance

### Configuration
- [`useConfig()`](/api/configuration#useconfig) - Get LunoKit configuration

## Quick Examples

### Basic Connection
```tsx
import { useConnect, useAccount, ConnectionStatus } from '@luno-kit/react'

function MyComponent() {
  const { connect, connectors, status } = useConnect()
  const { account } = useAccount()

  if (status === ConnectionStatus.Connected) {
    return <div>Connected: {account?.name}</div>
  }

  return (
    <button onClick={() => connect({ connectorId: connectors[0].id })}>
      Connect Wallet
    </button>
  )
}
```

### Get Balance
```tsx
import { useAccount, useBalance } from '@luno-kit/react'

function Balance() {
  const { account } = useAccount()
  const { data: balance, isLoading } = useBalance({ 
    address: account?.address 
  })

  if (isLoading) return <div>Loading...</div>
  
  return <div>Balance: {balance?.formattedTransferable}</div>
}
```

### Send Transaction
```tsx
import { useSendTransaction } from '@luno-kit/react'

function SendButton() {
  const { sendTransaction, isPending } = useSendTransaction()

  const handleSend = () => {
    sendTransaction({
      to: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      value: '1000000000000' // 1 DOT in planck
    })
  }

  return (
    <button onClick={handleSend} disabled={isPending}>
      {isPending ? 'Sending...' : 'Send 1 DOT'}
    </button>
  )
}
```

## Error Handling

All hooks return error states that you can handle in your UI:

```tsx
import { useBalance } from '@luno-kit/react'

function Balance() {
  const { data: balance, error, isLoading } = useBalance({ 
    address: account?.address 
  })

  if (error) {
    return <div>Error loading balance: {error.message}</div>
  }

  if (isLoading) {
    return <div>Loading balance...</div>
  }

  return <div>Balance: {balance?.formattedTransferable}</div>
}
```

## TypeScript Support

LunoKit is built with TypeScript and provides full type safety:

```tsx
import type { Account, Chain, Connector } from '@luno-kit/react'

// All types are exported and available for use
const handleAccountChange = (account: Account | null) => {
  if (account) {
    console.log(`Connected to ${account.name} (${account.address})`)
  }
}
```

For detailed documentation on each hook and component, navigate to the specific API pages using the sidebar.