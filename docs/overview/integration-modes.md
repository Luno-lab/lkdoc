# Integration Modes

LunoKit provides flexible integration options depending on your dapp's technical requirements.


## Default: Dedot Integration

LunoKit uses [Dedot](https://docs.dedot.dev/) as its default blockchain API. This provides:

- Complete transaction handling
- Built-in chain support
- Optimized performance
- Full TypeScript support

When using Dedot (default), you have access to all LunoKit features including:
- Complete API hooks (`useApi`, `useSendTransaction`, etc.)
- Chain management
- Transaction handling
- Data queries

## Alternative: PAPI Integration

If you prefer to use [PAPI](https://papi.how/) for blockchain interactions, you can use LunoKit for wallet connections only:

### What You Can Use
- Wallet connection hooks (`useConnect`, `useAccount`, `useSignMessage`, etc.)
- Signer hooks (`usePapiSigner`)
- UI components (`ConnectButton`, modals)

### What You Cannot Use
- LunoKit's transaction hooks (`useSendTransaction`, `useSendTransactionHash`)
- LunoKit's API hooks (`useApi`, `useBalance`, etc.)
- Built-in chain management

### Configuration
When using PAPI, configure LunoKit without chains:

```tsx
const config = createConfig({
  appName: 'My App',
  // No chains required
  connectors: [
    polkadotjsConnector(),
    subwalletConnector(),

    /* your connectors */
    walletConnectConnector({
      projectId: 'YOUR_PROJECT_ID',
      // Required when not using LunoKit's chain management
      supportedChains: ['0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'] // Polkadot GenesisHash
    }),
  ],
})
```
> [!IMPORTANT]
> When using PAPI or @polkadot/api integration (without LunoKit's chain management), you **must** configure the `supportedChains` parameter for WalletConnect-based connectors. This parameter should contain an array of chain genesis hashes.

## Alternative: @polkadot/api Integration

LunoKit can also be integrated with [@polkadot/api](https://polkadot.js.org/docs/api/), similar to the PAPI integration approach:

### What You Can Use
- Wallet connection hooks (`useConnect`, `useAccount`, `useSignMessage`, etc.)
- Signer hooks (`useSigner`)
- UI components (`ConnectButton`, modals)

### What You Cannot Use
- LunoKit's transaction hooks (`useSendTransaction`, `useSendTransactionHash`)
- LunoKit's API hooks (`useApi`, `useBalance`, etc.)
- Built-in chain management

### Configuration
When using @polkadot/api, configure LunoKit without chains:

```tsx
const config = createConfig({
  appName: 'My App',
  // No chains required
  connectors: [
    polkadotjsConnector(),
    subwalletConnector(),

    /* your connectors */
    walletConnectConnector({
      projectId: 'YOUR_PROJECT_ID',
      // Required when not using LunoKit's chain management
      supportedChains: ['0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'] // Polkadot GenesisHash
    }),
  ],
})
```
> [!IMPORTANT]
> When using PAPI or @polkadot/api integration (without LunoKit's chain management), you **must** configure the `supportedChains` parameter for WalletConnect-based connectors. This parameter should contain an array of chain genesis hashes.


## Feature Comparison

| Feature | Dedot (Default) | PAPI Integration | @polkadot/api Integration |
|---------|----------------|------------------|--------------------------|
| Wallet Connections | ✅ Full support | ✅ Full support | ✅ Full support |
| Account Management | ✅ Full support | ✅ Full support | ✅ Full support |
| Chain Switching | ✅ Built-in | ❌ Use PAPI directly | ❌ Use @polkadot/api directly |
| Balance Queries | ✅ Built-in | ❌ Use PAPI directly | ❌ Use @polkadot/api directly |
| Transaction Handling | ✅ Built-in | ❌ Use PAPI directly | ❌ Use @polkadot/api directly |
| Chain Management | ✅ Built-in | ❌ Use PAPI directly | ❌ Use @polkadot/api directly |
| Data Queries | ✅ Built-in | ❌ Use PAPI directly | ❌ Use @polkadot/api directly |
| Signer Access | ✅ useSigner | ✅ usePapiSigner | ✅ useSigner |
| Message Signing | ✅ Full support | ✅ Full support | ✅ Full support |
| UI Components | ✅ Full support | ✅ Full support | ✅ Full support |
| Setup Complexity | Simple | Requires PAPI setup | Requires @polkadot/api setup |

## Migration Guide

### From Dedot to PAPI
1. Remove chains from your LunoKit config
2. Replace `useSendTransaction` with PAPI's transaction methods
3. Replace `useApi` with PAPI client initialization
4. Use `usePapiSigner` instead of `useSigner`

### From PAPI to Dedot
1. Add chains to your LunoKit config
2. Replace PAPI transaction methods with `useSendTransaction`
3. Replace PAPI client with `useApi`
4. Use `useSigner` instead of `usePapiSigner`

## Examples

- [Complete Dedot Integration](/examples/vite) - Full LunoKit features
- [PAPI Integration](/examples/vite-papi) - Wallet connections only
