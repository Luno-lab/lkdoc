# Modal Sizes

Control the size and appearance of LunoKit's wallet connection and account modals.

## Overview

LunoKit provides different modal sizes to fit your application's design. You can customize modal dimensions, positioning, and responsive behavior to match your UI requirements.

## Default Modal Behavior

By default, LunoKit modals are responsive and adapt to different screen sizes:

```tsx
import { LunoKitProvider, ConnectButton } from '@luno-kit/ui'

function App() {
  return (
    <LunoKitProvider config={config}>
      {/* Default modal behavior */}
      <ConnectButton />
    </LunoKitProvider>
  )
}
```

## Modal Size Options

### Compact Size

Perfect for mobile-first designs or when screen space is limited:

```tsx
<LunoKitProvider 
  config={{
    ...config,
    modalSize: 'compact'
  }}
>
  <ConnectButton />
</LunoKitProvider>
```

### Wide Size  

Provides more space for wallet lists and account information:

```tsx
<LunoKitProvider
  config={{
    ...config,
    modalSize: 'wide'
  }}
>
  <ConnectButton />
</LunoKitProvider>
```

## Related Documentation

- [ConnectButton](/getting-started/connect-button) - Main connection component
- [Theming](/getting-started/theming) - Customize modal appearance
- [Custom ConnectButton](/getting-started/custom-connect-button) - Build custom modals
