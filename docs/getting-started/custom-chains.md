# Custom Chains

Learn how to add support for custom Substrate-based chains and configure them for use with LunoKit.

## Overview

LunoKit supports almost any Substrate-based blockchain. This guide shows you how to define custom chains, configure their properties, and integrate them with your application.

## Basic Custom Chain

```tsx
import { defineChain, createConfig } from '@luno-kit/react'

const myCustomChain = defineChain({
  genesisHash: '0x123...',
  name: 'My Custom Chain',
  nativeCurrency: {
    name: 'Custom Token',
    symbol: 'CUSTOM',
    decimals: 12,
  },
  rpcUrls: {
    webSocket: ['wss://rpc.mycustomchain.com'],
  },
  ss58Format: 42,
  testnet: true,
  chainIconUrl: 'https://example.com/icon.png',
})

const config = createConfig({
  appName: 'My App',
  chains: [myCustomChain],
  connectors: [polkadotjsConnector()],
})
```

## Parachain Configuration

```tsx
// Acala parachain example
const acalaChain = defineChain({
  genesisHash: '0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c',
  name: 'Acala',
  nativeCurrency: {
    name: 'Acala',
    symbol: 'ACA',
    decimals: 12,
  },
  rpcUrls: {
    webSocket: ['wss://acala-rpc-0.aca-api.network'],
    http: ['https://acala-rpc-0.aca-api.network'],
  },
  ss58Format: 10,
  testnet: false,
  chainIconUrl: 'https://icons.llamao.fi/icons/chains/rsz_acala.jpg',
  blockExplorers: {
    default: { name: 'Subscan', url: 'https://acala.subscan.io' },
  },
})

// Moonbeam parachain example
const moonbeamChain = defineChain({
  genesisHash: '0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d',
  name: 'Moonbeam',
  nativeCurrency: {
    name: 'Glimmer',
    symbol: 'GLMR',
    decimals: 18,
  },
  rpcUrls: {
    webSocket: ['wss://wss.api.moonbeam.network'],
    http: ['https://rpc.api.moonbeam.network'],
  },
  ss58Format: 1284,
  testnet: false,
  chainIconUrl: 'https://moonbeam.network/wp-content/uploads/2021/01/Moonbeam-Logo.png',
  blockExplorers: {
    default: { name: 'Moonscan', url: 'https://moonscan.io' },
  },
})
```

## Chain Properties Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `genesisHash` | `string` | Yes | Unique identifier for the chain |
| `name` | `string` | Yes | Human-readable chain name |
| `nativeCurrency` | `{ name: string; symbol: string; decimals: number }` | Yes | Native token configuration |
| `rpcUrls` | `{ webSocket: readonly string[]; http?: readonly string[] }` | Yes | RPC endpoint URLs |
| `ss58Format` | `number` | Yes | Address format for the chain |
| `testnet` | `boolean` | Yes | Whether the chain is a testnet |
| `chainIconUrl` | `string` | Yes | URL to chain icon |
| `blockExplorers` | `{ default?: { name: string; url: string }; [key: string]: { name: string; url: string } \| undefined }` | No | Block explorer configuration |
