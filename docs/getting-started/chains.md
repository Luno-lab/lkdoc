# Chains

LunoKit supports almost all Substrate-based chains including Polkadot, Kusama, parachains, and custom chains. This guide shows you how to configure and use different chains in your application.

## Built-in Chains

LunoKit provides pre-configured support for major Polkadot ecosystem chains:

```tsx
import {
  polkadot,
  kusama,
  westend,
  paseo
} from '@luno-kit/react'

const config = createConfig({
  appName: 'My Lunokit App',
  chains: [polkadot, kusama, westend, paseo],
  connectors: [polkadotjs()],
})
```

### Available Chains

| Chain | Description | Network Type | SS58 Format | Token Symbol | Decimals |
|-------|-------------|--------------|-------------|--------------|----------|
| `polkadot` | Polkadot relay chain | Mainnet | 0 | DOT | 10 |
| `kusama` | Kusama canary network | Mainnet | 2 | KSM | 12 |
| `westend` | Polkadot testnet | Testnet | 42 | WND | 12 |
| `paseo` | Community testnet | Testnet | 42 | PASEO | 12 |


## Next Steps

- Learn about [custom chains](/getting-started/custom-chains) - Add support for custom Substrate chains
- Explore [wallet configuration](/getting-started/wallets) - Configure wallet connectors
- Check out [chain-related hooks](/hooks/chain/use-chain) - Use chain management hooks
