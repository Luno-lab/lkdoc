# Theming

LunoKit provides a comprehensive theming system that allows you to customize the appearance of wallet components through the `theme` prop in `LunoKitProvider`.

## Theme Structure

The `LunokitTheme` interface provides comprehensive customization options:

```tsx
interface LunokitTheme {
  colors: {
    // Primary colors
    accentColor: string;
    
    // Button related
    connectButtonBackground: string;
    connectButtonText: string;
    connectButtonInnerBackground: string;
    
    // Modal related
    modalBackground: string;
    modalText: string;
    modalTextSecondary: string;
    modalBorder: string;
    
    // Status colors
    success: string;
    error: string;
    warning: string;
    info: string;
  };
  fonts: {
    body: string;
  };
  radii: {
    modal: string;
    connectButton: string;
    modalControlButton: string;
  };
  shadows: {
    button: string;
    modal: string;
  };
  blurs: {
    modalOverlay: string;
  };
}
```

## Creating Custom Themes

### Basic Custom Theme

Create a complete custom theme by defining all properties:

```tsx
const myCustomTheme: LunokitTheme = {
  colors: {
    accentColor: '#E6007A',
    connectButtonBackground: '#1a1b23',
    connectButtonText: '#ffffff',
    modalBackground: '#ffffff',
    modalText: '#1a1b23',
    modalTextSecondary: '#6b7280',
    modalBorder: '#e5e7eb',
    connectButtonInnerBackground: '#ffffff',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  radii: {
    modal: '24px',
    connectButton: '12px',
    modalControlButton: '8px',
  },
  shadows: {
    button: '0 1px 3px rgba(0, 0, 0, 0.1)',
    modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  blurs: {
    modalOverlay: 'blur(8px)',
  },
}

function App() {
  return (
    <LunoKitProvider config={config} theme={{ theme: myCustomTheme }}>
      {/* Your app */}
    </LunoKitProvider>
  )
}
```

### Partial Theme Overrides

Override specific theme properties without redefining everything:

```tsx
const partialTheme = {
  light: {
    colors: {
      accentColor: '#E6007A',
      connectButtonBackground: '#E6007A',
    }
  },
  dark: {
    colors: {
      accentColor: '#E6007A',
      connectButtonBackground: '#E6007A',
    }
  }
}

function App() {
  return (
    <LunoKitProvider config={config} theme={partialTheme}>
      {/* Your app */}
    </LunoKitProvider>
  )
}
```

## Theme Modes

### Auto Mode

Automatically follow system theme preferences:

```tsx
<LunoKitProvider
  config={config}
  theme={{ autoMode: true }}
>
  {/* Your app */}
</LunoKitProvider>
```

### Manual Mode

Control theme manually with custom light and dark variants:

```tsx
<LunoKitProvider
  config={config}
  theme={{
    defaultMode: 'light',
    light: {
      colors: {
        modalBackground: '#ffffff',
        modalText: '#1a1b23',
        connectButtonBackground: '#1a1b23',
        connectButtonText: '#ffffff',
      }
    },
    dark: {
      colors: {
        modalBackground: '#1a1b23',
        modalText: '#ffffff',
        connectButtonBackground: '#ffffff',
        connectButtonText: '#1a1b23',
      }
    }
  }}
>
  {/* Your app */}
</LunoKitProvider>
```

## Simple Examples

### Customize Connect Button Colors

```tsx
<LunoKitProvider
  config={config}
  theme={{
    colors: {
      connectButtonBackground: '#E6007A',
      connectButtonText: '#ffffff',
    }
  }}
>
  <ConnectButton />
</LunoKitProvider>
```

### Customize Modal Appearance

```tsx
<LunoKitProvider
  config={config}
  theme={{
    light: {
      colors: {
        modalBackground: '#f8f9fa',
        modalBorder: '#dee2e6',
      },
      radii: {
        modal: '16px',
      }
    }
  }}
>
  <ConnectButton />
</LunoKitProvider>
```

### Customize Typography

```tsx
<LunoKitProvider
  config={config}
  theme={{
    fonts: {
      body: 'Roboto, sans-serif',
    }
  }}
>
  <ConnectButton />
</LunoKitProvider>
```

## Next Steps

- Explore [account management](/getting-started/account-management)
- Learn about [custom ConnectButton](/advanced/custom-connect-button)
