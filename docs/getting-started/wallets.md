# Wallets

LunoKit supports all major Polkadot ecosystem wallets through a unified connector system. This guide shows you how to configure wallet support for your application.

## Supported Wallets

LunoKit provides built-in support for these popular Polkadot wallets:

| Wallet | Type | Platforms | Import |
|--------|------|-----------|--------|
| Polkadot{.js} | Browser Extension | Desktop | `polkadotjs()` |
| SubWallet | Browser Extension + Mobile | All | `subwallet()` |
| Talisman | Browser Extension | Desktop | `talisman()` |
| Nova Wallet | Mobile App | Mobile | `nova()` |
| PolkaGate | Browser Extension | Desktop | `polkagate()` |
| WalletConnect | Protocol | Mobile via QR | `walletconnect()` |

## Basic Configuration

Import and configure the wallets you want to support:

```tsx
import { 
  createConfig, 
  polkadotjs, 
  subwallet, 
  talisman 
} from '@luno-kit/react'

const config = createConfig({
  appName: 'My Polkadot App',
  chains: [polkadot, kusama],
  connectors: [
    polkadotjs(),
    subwallet(), 
    talisman(),
  ],
})
```

## Individual Wallet Setup

### Polkadot{.js} Extension

The original Polkadot wallet extension:

```tsx
import { polkadotjs } from '@luno-kit/react'

const config = createConfig({
  // ...
  connectors: [polkadotjs()],
})
```

**Features:**
- Account management
- Transaction signing
- Message signing
- Multi-chain support

**Installation:** [Chrome Web Store](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd)

### SubWallet

Comprehensive wallet for Polkadot and Substrate ecosystems:

```tsx
import { subwallet } from '@luno-kit/react'

const config = createConfig({
  // ...
  connectors: [subwallet()],
})
```

**Features:**
- Multi-chain support
- NFT management
- Staking support
- DeFi integrations
- Mobile app available

**Installation:** [Chrome Web Store](https://chrome.google.com/webstore/detail/subwallet-polkadot-wallet/onhogfjeacnfoofkfgppdlbmlmnplgbn)

### Talisman

Beautiful, user-friendly Polkadot wallet:

```tsx
import { talisman } from '@luno-kit/react'

const config = createConfig({
  // ...
  connectors: [talisman()],
})
```

**Features:**
- Intuitive interface
- Portfolio tracking
- Multi-chain support
- Advanced account management

**Installation:** [Chrome Web Store](https://chrome.google.com/webstore/detail/talisman-polkadot-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld)

### Nova Wallet

Mobile-first Polkadot wallet:

```tsx
import { nova } from '@luno-kit/react'

const config = createConfig({
  // ...
  connectors: [nova()],
})
```

**Features:**
- Mobile app
- WalletConnect support
- Staking features
- DeFi integrations

**Installation:** [iOS App Store](https://apps.apple.com/app/nova-polkadot-kusama-wallet/id1597119355) | [Google Play](https://play.google.com/store/apps/details?id=io.novasama.novawallet)

### PolkaGate

Feature-rich Polkadot wallet extension:

```tsx
import { polkagate } from '@luno-kit/react'

const config = createConfig({
  // ...
  connectors: [polkagate()],
})
```

**Features:**
- Advanced staking
- Governance participation
- Multi-chain support
- Portfolio management

**Installation:** [Chrome Web Store](https://chrome.google.com/webstore/detail/polkagate-the-gateway-to/ginchbkmljhldofnbjabmeophlhdldgp)

### WalletConnect

Protocol for connecting mobile wallets:

```tsx
import { walletconnect } from '@luno-kit/react'

const config = createConfig({
  // ...
  connectors: [
    walletconnect({
      projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
      metadata: {
        name: 'My Polkadot App',
        description: 'My app description',
        url: 'https://myapp.com',
        icons: ['https://myapp.com/icon.png'],
      },
    }),
  ],
})
```

**Setup Requirements:**
1. Create a project at [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Get your project ID
3. Configure metadata for your app

## Multi-Wallet Configuration

Configure multiple wallets to give users choice:

```tsx
import { 
  createConfig, 
  polkadotjs, 
  subwallet, 
  talisman, 
  nova,
  polkagate 
} from '@luno-kit/react'

const config = createConfig({
  appName: 'Multi-Wallet App',
  chains: [polkadot, kusama],
  connectors: [
    polkadotjs(),
    subwallet(),
    talisman(),
    nova(),
    polkagate(),
  ],
})
```

Users will see all available wallets in the connection modal and can choose their preferred one.

## Wallet Detection

LunoKit automatically detects which wallets are installed:

```tsx
import { useConnectors } from '@luno-kit/react'

function WalletList() {
  const { connectors } = useConnectors()
  
  return (
    <div>
      <h3>Available Wallets:</h3>
      {connectors.map((connector) => (
        <div key={connector.id}>
          <img src={connector.icon} alt={connector.name} width={24} height={24} />
          <span>{connector.name}</span>
          <span>{connector.installed ? '✅' : '❌'}</span>
        </div>
      ))}
    </div>
  )
}
```

## Connection Management

### Manual Connection

Connect to a specific wallet programmatically:

```tsx
import { useConnect } from '@luno-kit/react'

function ConnectSpecificWallet() {
  const { connect, connectors } = useConnect()
  
  const connectToSubWallet = () => {
    const subwalletConnector = connectors.find(c => c.id === 'subwallet')
    if (subwalletConnector) {
      connect({ connectorId: subwalletConnector.id })
    }
  }
  
  return (
    <button onClick={connectToSubWallet}>
      Connect SubWallet
    </button>
  )
}
```

### Connection Status

Check connection status and active wallet:

```tsx
import { useConnect, useActiveConnector, ConnectionStatus } from '@luno-kit/react'

function WalletStatus() {
  const { status } = useConnect()
  const { connector } = useActiveConnector()
  
  if (status === ConnectionStatus.Connected && connector) {
    return (
      <div>
        Connected to {connector.name}
        <img src={connector.icon} alt={connector.name} width={20} height={20} />
      </div>
    )
  }
  
  return <div>Not connected</div>
}
```

## Custom Wallet Integration

Add support for custom or new wallets:

```tsx
import { BaseConnector } from '@luno-kit/core'

class CustomWalletConnector extends BaseConnector {
  constructor() {
    super({
      id: 'custom-wallet',
      name: 'Custom Wallet',
      icon: 'data:image/svg+xml;base64,...', // Your wallet icon
    })
  }
  
  async connect() {
    // Implement connection logic
  }
  
  async disconnect() {
    // Implement disconnection logic
  }
  
  // ... other required methods
}

const customWallet = () => new CustomWalletConnector()

const config = createConfig({
  // ...
  connectors: [customWallet()],
})
```

## Best Practices

### Wallet Ordering

Order wallets by popularity or your preference:

```tsx
const config = createConfig({
  // ...
  connectors: [
    polkadotjs(),    // Most common
    subwallet(),     // Popular mobile option
    talisman(),      // Good UX
    // ... others
  ],
})
```

### Fallback Handling

Handle cases where no wallets are installed:

```tsx
import { useConnectors } from '@luno-kit/react'

function WalletCheck() {
  const { connectors } = useConnectors()
  const installedWallets = connectors.filter(c => c.installed)
  
  if (installedWallets.length === 0) {
    return (
      <div>
        <p>No Polkadot wallets detected.</p>
        <p>Please install one of these wallets:</p>
        <ul>
          <li><a href="https://polkadot.js.org/extension/">Polkadot{.js}</a></li>
          <li><a href="https://subwallet.app/">SubWallet</a></li>
          <li><a href="https://talisman.xyz/">Talisman</a></li>
        </ul>
      </div>
    )
  }
  
  return <ConnectButton />
}
```

### Error Handling

Handle connection errors gracefully:

```tsx
import { useConnect } from '@luno-kit/react'

function ConnectHandler() {
  const { connect, error, isPending } = useConnect()
  
  if (error) {
    return <div>Connection failed: {error.message}</div>
  }
  
  if (isPending) {
    return <div>Connecting...</div>
  }
  
  return <ConnectButton />
}
```

## Troubleshooting

### Common Issues

**Wallet not detected:**
- Ensure the browser extension is installed and enabled
- Check if the wallet supports the current website
- Try refreshing the page

**Connection failed:**
- User may have rejected the connection request
- Wallet may be locked
- Check browser console for specific errors

**Multiple wallets conflict:**
- Some wallets may interfere with each other
- Ask users to disable unused wallet extensions
- Use wallet-specific connection methods when needed

## Next Steps

- Learn about [account management](/getting-started/account-management)
- Explore [theming options](/getting-started/theming)
- Check out [connection hooks](/hooks/connection/use-connect)