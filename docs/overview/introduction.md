# Introduction

LunoKit is a React library that makes it easy to add Polkadot wallet connection to your dapp.

## What is LunoKit?

LunoKit provides a fast, easy and highly customizable way for developers to add wallet connectivity to their Polkadot and Kusama applications. We handle the hard stuff so developers and teams can focus on building amazing products and experiences.

Out of the box, LunoKit provides:

- 🔌 **Multi-wallet Support** - Support for major Polkadot ecosystem wallets with unified API
- ⚡ **TypeScript First** - Full type safety and IntelliSense support out of the box  
- 🎨 **Customizable UI** - Beautiful components with flexible theming and styling options
- 📱 **Responsive Design** - Mobile-first UI components that work perfectly on all devices
- 🌐 **Multi-chain Ready** - Polkadot, Kusama, parachains and custom chain support
- ⚙️ **React Hooks** - Modern React patterns with comprehensive hook library

## Supported Wallets

LunoKit supports all major Polkadot ecosystem wallets:

- **Polkadot{.js}**
- **SubWallet**
- **Talisman**
- **Nova Wallet**
- **PolkaGate**
- **WalletConnect**
- **Enkrypt**
- **Fearless**
- **Mimir**

For wallet installation links, see the [Installation](/getting-started/installation.html#wallet-extensions-required) section.

## Supported Chains

Works with all Substrate-based chains:

- **Polkadot** - The main Polkadot relay chain
  - **Polkadot Asset Hub** - Polkadot's primary parachain for assets
  - **Polkadot Coretime** - Parachain for Polkadot's coretime functionality
  - **Polkadot Collectives** - Parachain for on-chain governance collectives
  - **Polkadot People** - Identity and reputation parachain for Polkadot
- **Kusama** - Polkadot's canary network
  - **Kusama Asset Hub** - Kusama's primary parachain for assets
  - **Kusama People** - Identity and reputation parachain for Kusama
  - **Kusama Coretime** - Parachain for Kusama's coretime functionality
- **Westend** - Polkadot testnet
  - **Westend Asset Hub** - Asset hub parachain for Westend testnet
- **Paseo** - Community testnet
  - **Paseo Asset Hub** - Asset hub parachain for Paseo testnet
  - **Paseo Passet Hub** - Secondary asset parachain for Paseo testnet
- **Custom Chains** - Any Substrate-based blockchain

## Architecture

LunoKit is built with a modular architecture:

- **@luno-kit/core** - Core connectors and chain configurations
- **@luno-kit/react** - React hooks and providers for state management
- **@luno-kit/ui** - Pre-built UI components with theming support

This modular approach allows you to use only what you need:

- Use `@luno-kit/ui` for a complete solution with beautiful UI components
- Use `@luno-kit/react` alone if you want to build custom UI with our hooks
- Extend `@luno-kit/core` to add custom wallets or chains

## Getting Started

Ready to get started? Check out our [installation guide](/getting-started/installation) or try our [live demo](https://demo.lunolab.xyz/).

## Community & Support

- **GitHub**: [Luno-lab/LunoKit](https://github.com/Luno-lab/LunoKit)
- **Issues**: [Report bugs or request features](https://github.com/Luno-lab/LunoKit/issues)
- **License**: [MIT License](https://github.com/Luno-lab/LunoKit/blob/main/LICENSE)

## Contributing

LunoKit is open source and we welcome contributions! Check out our [GitHub repository](https://github.com/Luno-lab/LunoKit) to get started.
