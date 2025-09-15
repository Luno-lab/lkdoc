# Chains

LunoKit supports almost all Substrate-based chains including Polkadot, Kusama, parachains, and custom chains. This guide shows you how to configure and use different chains in your application.

## Built-in Chains

LunoKit provides pre-configured support for major Polkadot ecosystem chains:

```tsx
import { createConfig } from '@luno-kit/react'
import { polkadot, kusama, westend, paseo } from '@luno-kit/react/chains'
import { polkadotjsConnector } from '@luno-kit/react/connectors'

const config = createConfig({
  appName: 'My Lunokit App',
  chains: [polkadot, kusama, westend, paseo],
  connectors: [polkadotjsConnector()],
})
```

### Available Chains

| Chain | Description | Network Type | SS58 Format | Token Symbol | Decimals |
|-------|-------------|--------------|-------------|------------|----------|
| `polkadot` | Polkadot relay chain | Mainnet | 0           | DOT | 10       |
| `polkadotAssetHub` | Polkadot's primary parachain for assets | Mainnet | 0           | DOT | 10       |
| `polkadotCoretime` | Parachain for Polkadot's coretime functionality | Mainnet | 0           | DOT | 10       |
| `polkadotCollectives` | Parachain for on-chain governance collectives | Mainnet | 0           | DOT | 10       |
| `polkadotPeople` | Identity and reputation parachain for Polkadot | Mainnet | 0           | DOT | 10       |
| `kusama` | Kusama canary network | Mainnet | 2           | KSM | 12       |
| `kusamaAssetHub` | Kusama's primary parachain for assets | Mainnet | 2           | KSM | 12       |
| `kusamaPeople` | Identity and reputation parachain for Kusama | Mainnet | 2           | KSM | 12       |
| `kusamaCoretime` | Parachain for Kusama's coretime functionality | Mainnet | 2           | KSM | 12       |
| `westend` | Polkadot testnet | Testnet | 42          | WND | 12       |
| `westendAssetHub` | Asset hub parachain for Westend testnet | Testnet | 42          | WND | 12       |
| `paseo` | Community testnet | Testnet | 0           | PAS | 10       |
| `paseoAssetHub` | Asset hub parachain for Paseo testnet | Testnet | 0           | PAS | 10       |
| `paseoPassetHub` | Secondary asset parachain for Paseo testnet | Testnet | 42          | PAS | 10       |


## Next Steps

- Learn about [custom chains](/getting-started/custom-chains) - Add support for custom Substrate chains
- Explore [wallet configuration](/getting-started/wallets) - Configure wallet connectors
- Check out [chain-related hooks](/hooks/chain/use-chain) - Use chain management hooks
