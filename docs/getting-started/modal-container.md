# Modal Container

Control where LunoKit's wallet connection and account modals are mounted in the DOM.

## Overview

LunoKit allows you to customize the container element where modals are mounted. By default, modals are appended to the `body` element, but you can specify a custom container element to control the mounting location and styling context.

## Default Modal Behavior

By default, LunoKit modals are mounted directly to the `body` element:

```tsx
import { LunoKitProvider, ConnectButton } from '@luno-kit/ui'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LunoKitProvider config={config}>
        {/* Default: modals mount to body */}
        <ConnectButton />
      </LunoKitProvider>
    </QueryClientProvider>
  )
}
```

## Modal Container Options

### Function-Based Container

Use a function to dynamically resolve the container element:

```tsx
<QueryClientProvider {...}>
  <LunoKitProvider
    config={{
      ...config,
      modalContainer: () => document.getElementById('my-modal-root')
    }}
  >
    <ConnectButton />
  </LunoKitProvider>
</QueryClientProvider>
```

The function can return `null` if the element is not found, in which case the modal will fall back to mounting to `body`.

### Null (Default)

Explicitly set to `null` to use the default behavior (mount to `body`):

```tsx
<QueryClientProvider {...}>
  <LunoKitProvider
    config={{
      ...config,
      modalContainer: null  // Explicitly use default (body)
    }}
  >
    <ConnectButton />
  </LunoKitProvider>
</QueryClientProvider>
```

## Type Definition

```tsx
export type ModalContainer = HTMLElement | (() => HTMLElement | null) | null;
```

| Type | Description |
|------|-------------|
| `HTMLElement` | Direct reference to a DOM element |
| `() => HTMLElement \| null` | Function that returns a DOM element or null |
| `null` | Default behavior - mount to `body` |


## Related Documentation

- [Modal Sizes](/getting-started/modal-sizes) - Control modal dimensions
- [ConnectButton](/getting-started/connect-button) - Main connection component
- [Theming](/getting-started/theming) - Customize modal appearance
