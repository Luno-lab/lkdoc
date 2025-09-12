# useConfig

The `useConfig` hook provides access to the current LunoKit configuration, including chains, connectors, and other settings.

## Import

```tsx
import { useConfig } from '@luno-kit/react'
import type { Config } from '@luno-kit/react/types'
```

## Usage

### Basic Usage

::: code-group
```tsx [index.tsx]
import { useConfig } from '@luno-kit/react'

function ConfigInfo() {
  const config = useConfig()

  if (!config) {
    return <div>No configuration available</div>
  }
  
  console.log('config: ', config)

  return (
    <div>
      <h3>Configuration</h3>
    </div>
  )
}
```
<<< ../../../snippets/config.ts[config.ts]
:::

## Return Value

The hook returns a `Config` object or `undefined`:

| Property | Type | Description |
|----------|------|-------------|
| `config` | [`Config`](#config) \| `undefined` | The current LunoKit configuration |

## Related Types

### Config

```tsx
interface Config {
  readonly appName: string;                                    // Application name
  readonly chains: readonly Chain[];                           // Available chains
  readonly connectors: readonly Connector[];                   // Available wallet connectors
  readonly transports: Readonly<Record<string, Transport>>;   // Transport configurations
  readonly storage: LunoStorage;                              // Storage interface
  readonly autoConnect: boolean;                              // Whether to auto-connect on mount
}
```

### LunoStorage

```tsx
interface LunoStorage {
  getItem(keySuffix: string): Promise<string | null>;     // Get item from storage
  setItem(keySuffix: string, value: string): Promise<void>; // Set item in storage
  removeItem(keySuffix: string): Promise<void>;           // Remove item from storage
}
```

> [!TIP]
> This hook provides read-only access to the configuration that was passed to `LunoKitProvider`.

## Related Hooks

- [`useChain`](/hooks/chain/use-chain) - Get current chain information
- [`useConnectors`](/hooks/connection/use-connectors) - Get available connectors
- [`useApi`](/hooks/api/use-api) - Access the chain API client
