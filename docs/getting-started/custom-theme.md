# Custom Theme

Advanced theming options for LunoKit with complete type definitions and all available properties.

## Theme Prop Type

The `theme` prop in `LunoKitProvider` accepts this type:

```tsx
theme?: PartialLunokitTheme | LunokitThemeOverrides
```

This means you can pass either:
- `PartialLunokitTheme`: Partial theme overrides for a specific mode
- `LunokitThemeOverrides`: Complete theme configuration with light/dark modes and auto-detection

## Type Definitions

### PartialLunokitTheme

For partial theme overrides:

```tsx
type PartialLunokitTheme = {
  colors?: Partial<LunokitTheme['colors']>;
  fonts?: Partial<LunokitTheme['fonts']>;
  radii?: Partial<LunokitTheme['radii']>;
  shadows?: Partial<LunokitTheme['shadows']>;
  blurs?: Partial<LunokitTheme['blurs']>;
};
```

### LunokitThemeOverrides

For complete theme configuration:

```tsx
interface LunokitThemeOverrides {
  // Theme behavior control
  autoMode?: boolean;           // Whether to auto-follow system theme (default: false)
  defaultMode?: ThemeMode;      // Default theme mode when not auto (default: 'light')

  // Complete custom theme (overrides both light and dark)
  theme?: LunokitTheme;

  // Partial overrides for specific modes
  light?: PartialLunokitTheme;
  dark?: PartialLunokitTheme;
}

type ThemeMode = 'light' | 'dark';
```

## Complete Theme Interface

The `LunokitTheme` interface defines all available theme properties:

```tsx
export interface LunokitTheme {
  colors: {
    // Primary colors
    accentColor: string;

    // Button related
    walletSelectItemBackground: string;
    walletSelectItemBackgroundHover: string;
    walletSelectItemText: string;

    connectButtonBackground: string;
    connectButtonInnerBackground: string;
    connectButtonText: string;

    accountActionItemBackground: string;
    accountActionItemBackgroundHover: string;
    accountActionItemText: string;

    accountSelectItemBackground: string;
    accountSelectItemBackgroundHover: string;
    accountSelectItemText: string;

    currentNetworkButtonBackground: string;
    currentNetworkButtonText: string;

    networkSelectItemBackground: string;
    networkSelectItemBackgroundHover: string;
    networkSelectItemText: string;

    navigationButtonBackground: string;

    separatorLine: string;

    // Modal related
    modalBackground: string;
    modalBackdrop: string;
    modalBorder: string;
    modalText: string;
    modalTextSecondary: string;
    modalControlButtonBackgroundHover: string;
    modalControlButtonText: string;

    // Status colors
    success: string;
    successForeground: string;
    warning: string;
    warningForeground: string;
    error: string;
    errorForeground: string;
    info: string;
    infoForeground: string;

    // Skeleton screen
    skeleton: string;
  };
  fonts: {
    body: string;
  };
  radii: {
    walletSelectItem: string;
    connectButton: string;
    modalControlButton: string;
    accountActionItem: string;
    accountSelectItem: string;
    currentNetworkButton: string;
    networkSelectItem: string;
    modal: string;
    modalMobile: string;
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

## Advanced Usage Examples

### Complete Theme Override

```tsx
<LunoKitProvider
  config={config}
  theme={{
    theme: {
      colors: {
        accentColor: '#E6007A',
        connectButtonBackground: '#E6007A',
        connectButtonText: '#ffffff',
        modalBackground: '#1a1b23',
        modalText: '#ffffff',
        // ... all other color properties
      },
      fonts: {
        body: 'Inter, system-ui, sans-serif'
      },
      radii: {
        modal: '16px',
        connectButton: '8px',
        // ... all other radius properties
      },
      shadows: {
        button: '0 2px 4px rgba(0,0,0,0.1)',
        modal: '0 10px 25px rgba(0,0,0,0.2)'
      },
      blurs: {
        modalOverlay: 'blur(8px)'
      }
    }
  }}
>
  {/* Your app */}
</LunoKitProvider>
```

### Comprehensive Light/Dark Theme

```tsx
<LunoKitProvider
  config={config}
  theme={{
    light: {
      colors: {
        accentColor: '#E6007A',
        connectButtonBackground: '#E6007A',
        connectButtonText: '#ffffff',
        modalBackground: '#ffffff',
        modalText: '#1a1b23',
        walletSelectItemBackground: '#f8f9fa',
        walletSelectItemBackgroundHover: '#e9ecef',
        walletSelectItemText: '#1a1b23',
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
      },
      radii: {
        modal: '16px',
        connectButton: '8px',
        walletSelectItem: '12px'
      },
      shadows: {
        button: '0 2px 4px rgba(0,0,0,0.1)',
        modal: '0 10px 25px rgba(0,0,0,0.15)'
      }
    },
    dark: {
      colors: {
        accentColor: '#E6007A',
        connectButtonBackground: '#E6007A',
        connectButtonText: '#ffffff',
        modalBackground: '#1a1b23',
        modalText: '#ffffff',
        walletSelectItemBackground: '#2d2d2d',
        walletSelectItemBackgroundHover: '#3d3d3d',
        walletSelectItemText: '#ffffff',
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
      },
      radii: {
        modal: '16px',
        connectButton: '8px',
        walletSelectItem: '12px'
      },
      shadows: {
        button: '0 2px 4px rgba(0,0,0,0.3)',
        modal: '0 10px 25px rgba(0,0,0,0.4)'
      }
    }
  }}
>
  {/* Your app */}
</LunoKitProvider>
```

### Custom Font

```tsx
<LunoKitProvider
  config={config}
  theme={{
    fonts: {
      body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
  }}
>
  {/* Your app */}
</LunoKitProvider>
```

### Advanced Shadow and Blur Effects

```tsx
<LunoKitProvider
  config={config}
  theme={{
    light: {
      shadows: {
        button: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        modal: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      },
      blurs: {
        modalOverlay: 'blur(16px)'
      }
    }
  }}
>
  {/* Your app */}
</LunoKitProvider>
```

## Next Steps

- Return to [basic theming](/getting-started/theming)
- Explore [custom ConnectButton](/getting-started/custom-connect-button)
- Check out [custom wallets](/getting-started/custom-wallets)
