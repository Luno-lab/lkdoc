# Wallets

LunoKit supports all major Polkadot ecosystem wallets through a unified connector system. This guide shows you how to configure wallet support for your application.

## Supported Wallets

LunoKit provides built-in support for these popular Polkadot wallets:

| Wallet | Type | Platforms | Import |
|--------|------|-----------|--------|
| Polkadot{.js} | Browser Extension | Desktop | `polkadotjsConnector()` |
| SubWallet | Browser Extension + Mobile | All | `subwalletConnector()` |
| Talisman | Browser Extension | Desktop | `talismanConnector()` |
| PolkaGate | Browser Extension | Desktop | `polkagateConnector()` |
| Nova Wallet | Mobile App | Mobile | `novaConnector()` |
| WalletConnect | Protocol | Mobile via QR | `walletConnectConnector()` |

## Basic Configuration

Import and configure the wallets you want to support:

```tsx
import { polkadot, kusama, polkagateConnector, subwalletConnector, talismanConnector, polkadotjsConnector, walletConnectConnector, novaConnector } from '@luno-kit/react'

const config = createConfig({
  appName: 'My Lunokit App',
  chains: [polkadot, kusama],
  connectors: [
    polkadotjsConnector(),
    subwalletConnector(),
    talismanConnector(),
    polkagateConnector(),
    walletConnectConnector({ projectId: xxx }),
    novaConnector({ projectId: xxx }),
  ],
})
```

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
