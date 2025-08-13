# ConnectButton

The `ConnectButton` is the primary component for wallet connections in LunoKit. It handles the entire wallet connection flow and adapts its appearance based on the connection state.

## Basic Usage

```tsx
import { LunoKitProvider, ConnectButton } from '@luno-kit/ui'
import { createConfig, polkadot, polkadotjs } from '@luno-kit/react'
import '@luno-kit/ui/styles.css'

const config = createConfig({
  appName: 'My Polkadot App',
  chains: [polkadot],
  connectors: [polkadotjs()],
})

function App() {
  return (
    <LunoKitProvider config={config}>
      <ConnectButton />
    </LunoKitProvider>
  )
}
```

## States

The `ConnectButton` automatically adapts to different connection states:

### Disconnected State
When no wallet is connected, shows a simple connect button:

```tsx
<ConnectButton label="Connect Wallet" />
```

### Connected State  
When connected, displays account info, balance, and chain selector:

- **Account section**: Shows wallet icon, formatted address
- **Balance section**: Displays transferable balance (optional)
- **Chain section**: Shows current chain with icon (optional)

## Props

### `label`
- **Type**: `string`
- **Default**: `'Connect Wallet'`
- **Description**: Text shown on the connect button when disconnected

```tsx
<ConnectButton label="Connect to Polkadot" />
```

### `accountStatus`
- **Type**: `'full' | 'address'`
- **Default**: `'full'`
- **Description**: Controls how account information is displayed

```tsx
{/* Shows wallet icon + address */}
<ConnectButton accountStatus="full" />

{/* Shows only address */}
<ConnectButton accountStatus="address" />
```

### `chainStatus`
- **Type**: `'full' | 'icon' | 'name' | 'none'`
- **Default**: `'full'`
- **Description**: Controls chain display in connected state

```tsx
{/* Shows chain icon + name */}
<ConnectButton chainStatus="full" />

{/* Shows only chain icon */}
<ConnectButton chainStatus="icon" />

{/* Shows only chain name */}
<ConnectButton chainStatus="name" />

{/* Hides chain selector */}
<ConnectButton chainStatus="none" />
```

### `showBalance`
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Whether to display account balance

```tsx
{/* Shows balance */}
<ConnectButton showBalance={true} />

{/* Hides balance */}
<ConnectButton showBalance={false} />
```

### `className`
- **Type**: `string`
- **Description**: Additional CSS classes for styling

```tsx
<ConnectButton className="custom-connect-btn" />
```

## Examples

### Minimal Button
```tsx
<ConnectButton 
  chainStatus="none" 
  showBalance={false}
  accountStatus="address"
/>
```

## Behavior

### Click Actions

**Disconnected State:**
- Clicking opens the wallet connection modal
- Users can select from available wallets
- Handles connection errors gracefully

**Connected State:**
- Clicking account section opens the account details modal
- Clicking chain section (if visible) opens the chain selection modal
- Supports account switching and chain switching

### Loading States

The button shows loading indicators during:
- Initial wallet connection
- Account switching
- Chain switching
- Balance fetching

### Error Handling

Automatically handles common errors:
- Wallet not installed
- Connection rejected by user
- Network connection issues
- Account access denied

[//]: # (## ``Accessibility)

[//]: # (``)

[//]: # (The `ConnectButton` includes proper accessibility features:)

[//]: # ()
[//]: # (- **ARIA labels**: Descriptive labels for screen readers)

[//]: # (- **Keyboard navigation**: Full keyboard support)

[//]: # (- **Focus management**: Proper focus handling in modals)

[//]: # (- **Color contrast**: Meets WCAG guidelines)

## Styling

### CSS Variables

Customize the button appearance using CSS variables:

```css
:root {
  --connectButtonBackground: #1a1b23;
  --connectButtonText: #ffffff;
  --connectButtonInnerBackground: #2a2d3a;
  --currentNetworkButtonBackground: #2a2d3a;
}
```

### Custom Classes

Apply custom styling:

```tsx
<ConnectButton className="my-custom-button" />
```

```css
.my-custom-button {
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
}
```

## Integration with Hooks

The `ConnectButton` works seamlessly with LunoKit hooks:

```tsx
import { useAccount, useConnect } from '@luno-kit/react'
import type { ConnectionStatus } from '@luno-kit/react'

function CustomComponent() {
  const { account } = useAccount()
  const { status } = useConnect()
  
  return (
    <div>
      <ConnectButton />
      {status === ConnectionStatus.Connected && (
        <p>Connected as {account?.name}</p>
      )}
    </div>
  )
}
```

## Next Steps

- Learn about [configuring chains](/getting-started/chains)  
- Explore [wallet configuration](/getting-started/wallets)
- Check out [theming options](/getting-started/theming)
