# Theming

LunoKit provides a comprehensive theming system that allows you to customize the appearance of wallet components through the `theme` prop in `LunoKitProvider`.

## Basic Theme Usage

### Simple Color Customization

```tsx
import { LunoKitProvider, createConfig } from '@luno-kit/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const config = createConfig({
  // ... your config
})

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LunoKitProvider
        config={config}
        theme={{
          light: {
            colors: {
              accentColor: '#E6007A',
              connectButtonBackground: '#1a1b23',
              connectButtonText: '#ffffff',
            }
          }
        }}
      >
        {/* Your app */}
      </LunoKitProvider>
    </QueryClientProvider>
  )
}
```

### Light and Dark Mode

```tsx
<QueryClientProvider client={queryClient}>
  <LunoKitProvider
    config={config}
    theme={{
      light: {
        colors: {
          modalBackground: '#ffffff',
          modalText: '#1a1b23',
        }
      },
      dark: {
        colors: {
          modalBackground: '#1a1b23',
          modalText: '#ffffff',
        }
      }
    }}
  >
    {/* Your app */}
  </LunoKitProvider>
</QueryClientProvider>
```

### Auto Theme Mode

Automatically follow system theme preferences:

```tsx
<QueryClientProvider>
  <LunoKitProvider
    config={config}
    theme={{ autoMode: true }}
  >
    {/* Your app */}
  </LunoKitProvider>
</QueryClientProvider>
```

## Theme Configuration

The `theme` prop accepts:

- `autoMode`: Automatically follow system theme (default: false)
- `defaultMode`: Default theme mode when not auto (default: 'light')
- `light`: Light mode theme overrides
- `dark`: Dark mode theme overrides
- `theme`: Complete custom theme (overrides both light and dark)

## Next Steps

- Learn about [custom themes](/getting-started/custom-theme) - Complete theme definitions and all available properties
- Check out [custom ConnectButton](/getting-started/custom-connect-button)
