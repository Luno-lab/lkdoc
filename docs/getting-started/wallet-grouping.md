# Wallet Grouping

Organize wallets into custom groups to improve user experience and wallet discovery in LunoKit.

## Overview

LunoKit allows you to organize wallets into custom groups using `ConnectorGroup`. This helps users find and select wallets more easily by categorizing them (e.g., "Recommended", "Browser Extensions", "Hardware Wallets").

## Basic Usage

The `connectors` field in `createConfig` accepts either an array of `Connector[]` or `ConnectorGroup[]`:

```tsx
import { createConfig } from '@luno-kit/react'
import { polkadot, kusama } from '@luno-kit/react/chains'
import { 
  subwalletConnector, 
  talismanConnector, 
  polkadotjsConnector, 
  enkryptConnector,
  ledgerConnector 
} from '@luno-kit/react/connectors'

const chains = [polkadot, kusama]

const config = createConfig({
  appName: 'My App',
  chains,
  connectors: [
    {
      groupName: 'Recommended',
      wallets: [subwalletConnector(), talismanConnector()],
    },
    {
      groupName: 'Browser Extensions',
      wallets: [polkadotjsConnector(), enkryptConnector()],
    },
    {
      groupName: 'Hardware',
      wallets: [ledgerConnector({ chains })],
    },
  ],
})
```

## ConnectorGroup Interface

```tsx
interface ConnectorGroup {
  groupName: string;
  wallets: Connector[];
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `groupName` | `string` | Yes | Display name for the wallet group |
| `wallets` | `Connector[]` | Yes | Array of connectors belonging to this group |

## Installed Wallets Group

By default, LunoKit automatically creates an "Installed" group that contains all detected installed wallet extensions. This group appears at the top of the wallet list to help users quickly find their installed wallets.

You can disable this automatic grouping by setting `showInstalledGroup` to `false` in the `LunoKitProvider` config:

```tsx
import { LunoKitProvider, ConnectButton } from '@luno-kit/ui'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LunoKitProvider
        config={{
          ...config,
          showInstalledGroup: false,  // Hide the automatic "Installed" group
        }}
      >
        <ConnectButton />
      </LunoKitProvider>
    </QueryClientProvider>
  )
}
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showInstalledGroup` | `boolean` | `true` | When `true`, displays an automatic "Installed" group containing all detected installed wallets. When `false`, this automatic grouping is disabled. |

