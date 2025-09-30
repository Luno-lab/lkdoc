# API Choices

LunoKit provides flexible integration options depending on your blockchain API preferences.

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

## Alternative: Papi Integration

If you prefer to use [Papi](https://papi.how/) for blockchain interactions, you can use LunoKit for wallet connections only:

### What You Can Use
- Wallet connection hooks (`useConnect`, `useAccount`, etc.)
- Signer hooks (`usePapiSigner`)
- UI components (`ConnectButton`, modals)

### What You Cannot Use
- LunoKit's transaction hooks (`useSendTransaction`, `useSendTransactionHash`)
- LunoKit's API hooks (`useApi`, `useBalance`, etc.)
- Built-in chain management

### Configuration
When using Papi, configure LunoKit without chains:

```tsx
const config = createConfig({
  appName: 'My App',
  // No chains required
  connectors: [/* your connectors */],
})
```

## Choosing Your Approach

| Feature | Dedot (Default) | Papi Integration |
|---------|----------------|------------------|
| Wallet Connections | ✅ Full support | ✅ Full support |
| Transaction Handling | ✅ Built-in | ❌ Use Papi directly |
| Chain Management | ✅ Built-in | ❌ Use Papi directly |
| Data Queries | ✅ Built-in | ❌ Use Papi directly |
| Signer Access | ✅ useSigner | ✅ usePapiSigner |
| UI Components | ✅ Full support | ✅ Full support |
| Setup Complexity | Simple | Requires Papi setup |

## Migration Guide

### From Dedot to Papi
1. Remove chains from your LunoKit config
2. Replace `useSendTransaction` with Papi's transaction methods
3. Replace `useApi` with Papi client initialization
4. Use `usePapiSigner` instead of `useSigner`

### From Papi to Dedot
1. Add chains to your LunoKit config
2. Replace Papi transaction methods with `useSendTransaction`
3. Replace Papi client with `useApi`
4. Use `useSigner` instead of `usePapiSigner`

## Examples

- [Complete Dedot Integration](/examples/vite) - Full LunoKit features
- [Papi Integration](/examples/vite-papi) - Wallet connections only
