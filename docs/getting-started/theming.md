# Theming

LunoKit provides a comprehensive theming system that allows you to customize the appearance of wallet components to match your application's design.

## Quick Start

Import the default styles and start customizing:

```tsx
import '@luno-kit/ui/styles.css'
```

## CSS Variables

LunoKit uses CSS custom properties (variables) for theming. Override these variables to customize the appearance:

```css
:root {
  /* Primary colors */
  --luno-accent-color: #E6007A;
  --luno-accent-color-foreground: #ffffff;
  
  /* Background colors */
  --luno-modal-background: #ffffff;
  --luno-modal-background-secondary: #f8f9fa;
  
  /* Text colors */
  --luno-modal-text: #1a1b23;
  --luno-modal-text-secondary: #6b7280;
  
  /* Button colors */
  --luno-connect-button-background: #1a1b23;
  --luno-connect-button-text: #ffffff;
}
```

## Dark Mode

LunoKit automatically supports dark mode through CSS variables:

```css
:root {
  /* Light mode (default) */
  --luno-modal-background: #ffffff;
  --luno-modal-text: #1a1b23;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode */
    --luno-modal-background: #1a1b23;
    --luno-modal-text: #ffffff;
  }
}
```

### Manual Dark Mode Toggle

```css
[data-theme="light"] {
  --luno-modal-background: #ffffff;
  --luno-modal-text: #1a1b23;
}

[data-theme="dark"] {
  --luno-modal-background: #1a1b23;
  --luno-modal-text: #ffffff;
}
```

```tsx
// Toggle dark mode
function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  )
}
```

## Complete Variable Reference

### Color Palette

```css
:root {
  /* Accent colors */
  --luno-accent-color: #E6007A;
  --luno-accent-color-foreground: #ffffff;
  
  /* Background colors */
  --luno-modal-background: #ffffff;
  --luno-modal-background-secondary: #f8f9fa;
  --luno-modal-overlay: rgba(0, 0, 0, 0.3);
  
  /* Text colors */
  --luno-modal-text: #1a1b23;
  --luno-modal-text-secondary: #6b7280;
  --luno-modal-text-tertiary: #9ca3af;
  
  /* Border colors */
  --luno-border: #e5e7eb;
  --luno-border-secondary: #f3f4f6;
}
```

### Button Styling

```css
:root {
  /* Connect button */
  --luno-connect-button-background: #1a1b23;
  --luno-connect-button-text: #ffffff;
  --luno-connect-button-background-hover: #2a2d3a;
  --luno-connect-button-background-active: #1a1b23;
  
  /* Connect button inner (when connected) */
  --luno-connect-button-inner-background: #ffffff;
  --luno-connect-button-inner-background-hover: #f8f9fa;
  
  /* Network button */
  --luno-current-network-button-background: #f3f4f6;
  --luno-current-network-button-background-hover: #e5e7eb;
  
  /* Action buttons */
  --luno-action-button-background: #f3f4f6;
  --luno-action-button-background-hover: #e5e7eb;
}
```

### Modal Styling

```css
:root {
  /* Modal container */
  --luno-modal-border-radius: 24px;
  --luno-modal-border: 1px solid var(--luno-border);
  --luno-modal-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  /* Modal content */
  --luno-modal-padding: 24px;
  --luno-modal-gap: 16px;
  
  /* Modal header */
  --luno-modal-header-background: transparent;
  --luno-modal-header-border-bottom: 1px solid var(--luno-border);
}
```

### Component Specific

```css
:root {
  /* Account action items */
  --luno-account-action-item-background: transparent;
  --luno-account-action-item-background-hover: var(--luno-modal-background-secondary);
  
  /* Wallet list items */
  --luno-wallet-item-background: transparent;
  --luno-wallet-item-background-hover: var(--luno-modal-background-secondary);
  
  /* Chain list items */
  --luno-chain-item-background: transparent;
  --luno-chain-item-background-hover: var(--luno-modal-background-secondary);
}
```

## Radius and Spacing

```css
:root {
  /* Border radius */
  --luno-border-radius: 12px;
  --luno-border-radius-small: 8px;
  --luno-border-radius-large: 16px;
  --luno-connect-button-border-radius: 12px;
  --luno-current-network-button-border-radius: 12px;
  
  /* Spacing */
  --luno-spacing-small: 8px;
  --luno-spacing-medium: 16px;
  --luno-spacing-large: 24px;
}
```

## Pre-built Themes

### Polkadot Theme

```css
:root {
  --luno-accent-color: #E6007A;
  --luno-accent-color-foreground: #ffffff;
  --luno-connect-button-background: #E6007A;
  --luno-connect-button-text: #ffffff;
}
```

### Kusama Theme

```css
:root {
  --luno-accent-color: #000000;
  --luno-accent-color-foreground: #ffffff;
  --luno-connect-button-background: #000000;
  --luno-connect-button-text: #ffffff;
}
```

### Minimal Theme

```css
:root {
  --luno-modal-border-radius: 8px;
  --luno-connect-button-border-radius: 8px;
  --luno-border-radius: 6px;
  --luno-modal-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### Rounded Theme

```css
:root {
  --luno-modal-border-radius: 32px;
  --luno-connect-button-border-radius: 32px;
  --luno-current-network-button-border-radius: 32px;
  --luno-border-radius: 20px;
}
```

## Custom Styling with CSS

### Connect Button Customization

```css
/* Custom connect button */
.my-connect-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 12px 24px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.my-connect-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}
```

```tsx
<ConnectButton className="my-connect-button" />
```

### Modal Customization

```css
/* Custom modal styling */
.luno-modal {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(230, 0, 122, 0.2);
}
```

## Framework Integration

### Tailwind CSS

Use Tailwind utilities alongside LunoKit:

```tsx
<div className="bg-gradient-to-r from-purple-400 to-pink-400 p-6 rounded-lg">
  <ConnectButton />
</div>
```

Configure Tailwind to work with LunoKit variables:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'luno-accent': 'var(--luno-accent-color)',
        'luno-text': 'var(--luno-modal-text)',
      }
    }
  }
}
```

### Styled Components

```tsx
import styled from 'styled-components'
import { ConnectButton } from '@luno-kit/ui'

const StyledConnectButton = styled(ConnectButton)`
  --luno-connect-button-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --luno-connect-button-border-radius: 20px;
  
  &:hover {
    transform: scale(1.05);
  }
`
```

### CSS-in-JS

```tsx
import { ConnectButton } from '@luno-kit/ui'

const customStyles = {
  '--luno-accent-color': '#FF6B6B',
  '--luno-connect-button-background': '#4ECDC4',
  '--luno-modal-border-radius': '16px',
} as React.CSSProperties

function App() {
  return (
    <div style={customStyles}>
      <ConnectButton />
    </div>
  )
}
```

## Advanced Theming

### Theme Context

Create a theme provider for your application:

```tsx
import React, { createContext, useContext, useState } from 'react'

type Theme = 'light' | 'dark' | 'polkadot' | 'kusama'

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
}>({
  theme: 'light',
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

### Dynamic Theme Switching

```tsx
function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  
  const themes = [
    { id: 'light', name: 'Light', colors: ['#ffffff', '#000000'] },
    { id: 'dark', name: 'Dark', colors: ['#1a1b23', '#ffffff'] },
    { id: 'polkadot', name: 'Polkadot', colors: ['#E6007A', '#ffffff'] },
    { id: 'kusama', name: 'Kusama', colors: ['#000000', '#ffffff'] },
  ]
  
  return (
    <div className="theme-selector">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id as Theme)}
          className={theme === t.id ? 'active' : ''}
        >
          <div className="theme-preview">
            {t.colors.map((color, i) => (
              <div key={i} style={{ backgroundColor: color }} />
            ))}
          </div>
          {t.name}
        </button>
      ))}
    </div>
  )
}
```

## Best Practices

### Consistent Color Palette

```css
:root {
  /* Define your brand colors */
  --brand-primary: #E6007A;
  --brand-secondary: #552BBF;
  --brand-accent: #00D4AA;
  
  /* Map to LunoKit variables */
  --luno-accent-color: var(--brand-primary);
  --luno-connect-button-background: var(--brand-primary);
}
```

### Responsive Design

```css
:root {
  --luno-modal-border-radius: 24px;
  --luno-modal-padding: 24px;
}

@media (max-width: 768px) {
  :root {
    --luno-modal-border-radius: 16px;
    --luno-modal-padding: 16px;
  }
}
```

### Testing Themes

Test your themes across different scenarios:

```tsx
function ThemeTest() {
  return (
    <div className="theme-test">
      <ConnectButton />
      <ConnectButton chainStatus="none" />
      <ConnectButton showBalance={false} />
    </div>
  )
}
```

## Next Steps

- Explore [account management](/getting-started/account-management)
- Learn about [custom ConnectButton](/advanced/custom-connect-button)
- Check out [advanced theming techniques](/advanced/custom-theme)