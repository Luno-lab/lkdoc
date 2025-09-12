# Custom ConnectButton

Learn how to create completely custom wallet connection buttons while leveraging LunoKit's connection logic.

## Overview

While LunoKit's default `ConnectButton` covers most use cases, you might want to create a completely custom UI. LunoKit provides the underlying hooks and logic to build your own connect button from scratch.

## Basic Custom Button

```tsx
import { useConnect, useAccount, useDisconnect, type ConnectionStatus } from '@luno-kit/react'

function CustomConnectButton() {
  const { connect, connectors, status } = useConnect()
  const { account } = useAccount()
  const { disconnect } = useDisconnect()
  
  // If connected, show account info
  if (status === ConnectionStatus.Connected && account) {
    return (
      <div className="custom-wallet-info">
        <div className="account-details">
          <span className="account-name">{account.name}</span>
          <span className="account-address">{account.formattedAddress}</span>
        </div>
        <button onClick={() => disconnect()} className="disconnect-btn">
          Disconnect
        </button>
      </div>
    )
  }
  
  // If not connected, show wallet options
  return (
    <div className="custom-connect-modal">
      <h3>Connect Wallet</h3>
      <div className="wallet">
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect({ connectorId: connector.id })}
            className="wallet-option"
            disabled={!connector.installed}
          >
            <img src={connector.icon} alt={connector.name} />
            <span>{connector.name}</span>
            {!connector.installed && <span className="not-installed">Not Installed</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
```

## Using LunoKit UI Modals with Custom Buttons

If you want to create a custom connect button but still use LunoKit's pre-built modal components, you can leverage the modal hooks to control the UI modals while maintaining your custom button design.

### Example with Modal Hooks

```tsx
import { useConnectModal, useAccountModal, useChainModal } from '@luno-kit/ui'
import { useAccount, useStatus, type ConnectionStatus } from '@luno-kit/react'

function CustomButtonWithModals() {
  const { open: openConnectModal, close: closeConnectModal, isOpen: isConnectModalOpen } = useConnectModal()
  const { open: openAccountModal, close: closeAccountModal, isOpen: isAccountModalOpen } = useAccountModal()
  const { open: openChainModal, close: closeChainModal, isOpen: isChainModalOpen } = useChainModal()
  
  const { account } = useAccount()
  const { status } = useStatus()

  if (status === ConnectionStatus.Connected && account) {
    return (
      <div className="custom-connected-state">
        <button onClick={() => openAccountModal?.()} className="account-button">
          {account.name || 'Account'}
        </button>
        <button onClick={() => openChainModal?.()} className="chain-button">
          Switch Chain
        </button>
      </div>
    )
  }

  return (
    <button onClick={() => openConnectModal?.()} className="custom-connect-btn">
      Connect Wallet
    </button>
  )
}
```

### Modal Hooks Behavior

The modal hooks provide different functionality based on the connection status:

- **`useConnectModal`** - `open` is available when **not connected**, `undefined` when connected
- **`useAccountModal`** - `open` is available when **connected**, `undefined` when not connected
- **`useChainModal`** - `open` is available when **connected**, `undefined` when not connected

This design ensures that:
- Users can only open the connect modal when they're not connected
- Users can only open account/chain modals when they have an active connection
- The `open` method will be `undefined` when the modal shouldn't be accessible

## Using LunoProvider Instead of LunoKitProvider

If you prefer to use only the core functionality from `@luno-kit/react` without the UI components from `@luno-kit/ui`, you can use `LunoProvider` directly. However, you must manually set up the `QueryClientProvider` since it's not included in the `LunoProvider`.

### Example with LunoProvider

```tsx
import { LunoProvider, createConfig } from '@luno-kit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a config
const config = createConfig({
  // Your configuration here
})

// Create a query client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LunoProvider config={config}>
        {/* Your app content */}
        <CustomConnectButton />
      </LunoProvider>
    </QueryClientProvider>
  )
}
```

::: warning
When using `LunoProvider` directly from `@luno-kit/react` instead of `LunoKitProvider` from `@luno-kit/ui`, you must manually wrap your application with `QueryClientProvider` from `@tanstack/react-query`. Without this, hooks that depend on React Query will not function properly.
:::

