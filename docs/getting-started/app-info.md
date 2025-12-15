# App Info

Configure your app’s branding and compliance metadata for LunoKit’s Connect Modal.

## Overview

The`appInfo` lets integrators inject app-specific branding and compliance links into the Connect Modal (e.g., logo, welcome/guide copy, Terms of Service & Privacy Policy).
This helps users understand who they are connecting to, improves trust and conversion, and enables consistent branding across projects without forking LunoKit.

## Basic Usage

```tsx
import { LunoKitProvider, ConnectButton } from '@luno-kit/ui'
import { createConfig } from '@luno-kit/react'
import { polkadot } from '@luno-kit/react/chains'
import { polkadotjsConnector } from '@luno-kit/react/connectors'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import '@luno-kit/ui/styles.css'

const config = createConfig({
  appName: 'My Polkadot App',
  chains: [polkadot],
  connectors: [polkadotjsConnector()],
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LunoKitProvider 
        config={config}
        appInfo={{
          decorativeImage: {
            light: 'https://myapp.com/hero-light.png',
            dark: 'https://myapp.com/hero-dark.png',
          },
          description: 'A decentralized application built on Polkadot',
          guideText: 'Learn how to connect your wallet',
          guideLink: 'https://myapp.com/guide',
          policyLinks: {
            terms: 'https://myapp.com/terms',
            privacy: 'https://myapp.com/privacy',
            target: '_blank',
          },
        }}
      >
        <ConnectButton />
      </LunoKitProvider>
    </QueryClientProvider>
  )
}
```

## AppInfo Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `decorativeImage` | [`DecorativeImage`](#decorativeimage) | No | Decorative image displayed in connection modals |
| `description` | `string` | No | Application description |
| `guideText` | `string` | No | Text for the guide link |
| `guideLink` | `string` | No | URL to the guide or help documentation |
| `policyLinks` | [`PolicyLinks`](#policylinks) | No | Terms of service and privacy policy links |

## Related Types

### DecorativeImage

The decorative image configuration supports both light and dark themes:

```tsx
interface DecorativeImage {
  light: string;    // Required: Image URL for light theme
  dark?: string;    // Optional: Image URL for dark theme
}
```

### PolicyLinks

Configure terms of service and privacy policy links:

```tsx
interface PolicyLinks {
  terms: string;                    // Required: Terms of service URL
  privacy: string;                  // Required: Privacy policy URL
  target?: '_blank' | '_self';      // Optional: Link target (default: '_blank')
}
```

## Use Cases

### Decorative Images

The `decorativeImage` property allows you to display custom images in connection modals:
- Use `light` for light theme interfaces
- Optionally provide `dark` for dark theme support
- Images are displayed prominently in the connection flow

### User Guidance

The `guideText` and `guideLink` properties help users understand how to connect their wallet:
- Provide clear, concise guidance text
- Link to detailed documentation or tutorials
- Improves user onboarding experience

### Legal Compliance

The `policyLinks` property ensures users can access important legal information:
- Terms of service link
- Privacy policy link
- Configurable link target (new tab or same tab)

## Related

- [ConnectButton](/getting-started/connect-button) - Learn about the ConnectButton component
- [Custom ConnectButton](/getting-started/custom-connect-button) - Create custom connection UI

