# Subscan Integration

LunoKit supports Subscan API integration for enhanced AssetList functionality. This allows your application to display token balances and other asset information using Subscan's data.

## Configuration

Add your Subscan API key to the LunoKit configuration:

```tsx
import { createConfig } from '@luno-kit/react'
import { polkadot, kusama } from '@luno-kit/react/chains'
import { polkadotjsConnector } from '@luno-kit/react/connectors'

const config = createConfig({
  appName: 'My LunoKit App with Subscan',
  chains: [polkadot, kusama],
  connectors: [polkadotjsConnector()],
  // Subscan API configuration
  subscan: {
    apiKey: 'YOUR_SUBSCAN_API_KEY',
    cacheTime: 60000, // Optional: cache time in milliseconds (default: 60000)
    retryCount: 3,    // Optional: number of retry attempts (default: 3)
  },
})
```

> [!TIP]
> If you're using custom chains, make sure to configure the `subscan` property on your chain definitions. See [Custom Chains](/getting-started/custom-chains) for details.

## Subscan Configuration Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `apiKey` | `string` | Yes | - | Your Subscan API key |
| `cacheTime` | `number` | No | `60000` | Cache duration in milliseconds |
| `retryCount` | `number` | No | `3` | Number of retry attempts on failure |

## Getting a Subscan API Key

To obtain a Subscan API key:

1. Register an account on [Subscan](https://www.subscan.io/)
2. Navigate to the API section in your account dashboard
3. Create a new API key for your application
4. Copy the API key and add it to your LunoKit configuration

## Related

- [useBalance Hook](/hooks/account/use-balance)
