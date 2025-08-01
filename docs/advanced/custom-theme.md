# Custom Theme

Create completely custom themes and deeply customize LunoKit's appearance to match your brand.

## Overview

LunoKit provides a comprehensive theming system that goes beyond simple CSS variable overrides. This guide shows you how to create custom themes, implement theme switching, and build advanced styling solutions.

## Advanced CSS Variables

### Complete Theme Definition

```css
:root {
  /* Brand Colors */
  --luno-brand-primary: #E6007A;
  --luno-brand-secondary: #552BBF;
  --luno-brand-accent: #00D4AA;
  --luno-brand-warning: #F59E0B;
  --luno-brand-error: #EF4444;
  --luno-brand-success: #10B981;
  
  /* Semantic Colors */
  --luno-accent-color: var(--luno-brand-primary);
  --luno-accent-color-foreground: #ffffff;
  
  /* Background System */
  --luno-modal-background: #ffffff;
  --luno-modal-background-secondary: #f8fafc;
  --luno-modal-background-tertiary: #f1f5f9;
  --luno-modal-overlay: rgba(0, 0, 0, 0.5);
  
  /* Text System */
  --luno-modal-text: #1e293b;
  --luno-modal-text-secondary: #64748b;
  --luno-modal-text-tertiary: #94a3b8;
  --luno-modal-text-inverse: #ffffff;
  
  /* Border System */
  --luno-border: #e2e8f0;
  --luno-border-secondary: #cbd5e1;
  --luno-border-focus: var(--luno-accent-color);
  
  /* Interactive Elements */
  --luno-interactive-background: #f8fafc;
  --luno-interactive-background-hover: #f1f5f9;
  --luno-interactive-background-active: #e2e8f0;
  
  /* Shadows */
  --luno-shadow-small: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --luno-shadow-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --luno-shadow-large: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  /* Border Radius */
  --luno-radius-small: 6px;
  --luno-radius-medium: 8px;
  --luno-radius-large: 12px;
  --luno-radius-xl: 16px;
  --luno-radius-2xl: 24px;
  
  /* Spacing Scale */
  --luno-space-1: 4px;
  --luno-space-2: 8px;
  --luno-space-3: 12px;
  --luno-space-4: 16px;
  --luno-space-5: 20px;
  --luno-space-6: 24px;
  --luno-space-8: 32px;
  --luno-space-10: 40px;
  --luno-space-12: 48px;
  
  /* Typography */  
  --luno-font-family-sans: ui-sans-serif, system-ui, sans-serif;
  --luno-font-family-mono: ui-monospace, 'SF Mono', Consolas, monospace;
  --luno-font-size-xs: 12px;
  --luno-font-size-sm: 14px;
  --luno-font-size-base: 16px;
  --luno-font-size-lg: 18px;
  --luno-font-size-xl: 20px;
  --luno-font-size-2xl: 24px;
  --luno-font-weight-normal: 400;
  --luno-font-weight-medium: 500;
  --luno-font-weight-semibold: 600;
  --luno-font-weight-bold: 700;
}
```

## Theme Variants

### Dark Theme

```css
[data-theme="dark"] {
  /* Brand colors stay the same */
  --luno-accent-color: #E6007A;
  
  /* Dark backgrounds */
  --luno-modal-background: #0f172a;
  --luno-modal-background-secondary: #1e293b;
  --luno-modal-background-tertiary: #334155;
  --luno-modal-overlay: rgba(0, 0, 0, 0.8);
  
  /* Dark text */
  --luno-modal-text: #f8fafc;
  --luno-modal-text-secondary: #cbd5e1;
  --luno-modal-text-tertiary: #94a3b8;
  
  /* Dark borders */
  --luno-border: #334155;
  --luno-border-secondary: #475569;
  
  /* Dark interactive elements */
  --luno-interactive-background: #1e293b;
  --luno-interactive-background-hover: #334155;
  --luno-interactive-background-active: #475569;
  
  /* Enhanced shadows for dark mode */
  --luno-shadow-small: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  --luno-shadow-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  --luno-shadow-large: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Auto dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    /* Apply dark theme variables */
  }
}
```

### Brand-specific Themes

```css
/* Polkadot Theme */
[data-theme="polkadot"] {
  --luno-accent-color: #E6007A;
  --luno-brand-primary: #E6007A;
  --luno-brand-secondary: #552BBF;
  
  /* Polkadot gradient backgrounds */
  --luno-connect-button-background: linear-gradient(135deg, #E6007A 0%, #552BBF 100%);
  --luno-modal-background: radial-gradient(ellipse at top, #fdf2f8 0%, #ffffff 100%);
}

/* Kusama Theme */
[data-theme="kusama"] {
  --luno-accent-color: #000000;
  --luno-brand-primary: #000000;
  --luno-brand-secondary: #ffffff;
  
  /* High contrast Kusama style */
  --luno-connect-button-background: #000000;
  --luno-connect-button-text: #ffffff;
  --luno-border: #000000;
}

/* Minimal Theme */
[data-theme="minimal"] {
  --luno-radius-small: 4px;
  --luno-radius-medium: 4px;
  --luno-radius-large: 6px;
  --luno-shadow-small: none;
  --luno-shadow-medium: 0 1px 3px rgba(0, 0, 0, 0.1);
  --luno-shadow-large: 0 4px 12px rgba(0, 0, 0, 0.15);
  --luno-border: #d1d5db;
}

/* Glass Theme */
[data-theme="glass"] {
  --luno-modal-background: rgba(255, 255, 255, 0.8);
  --luno-modal-background-secondary: rgba(248, 250, 252, 0.8);
  --luno-connect-button-background: rgba(230, 0, 122, 0.9);
  --luno-border: rgba(226, 232, 240, 0.8);
  
  /* Add backdrop blur via CSS */
  .luno-modal {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
}
```

## Dynamic Theme System

### Theme Provider Component

```tsx
import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'polkadot' | 'kusama' | 'minimal' | 'glass'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: Theme[]
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('luno-theme') as Theme
    if (savedTheme) return savedTheme
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    
    return 'light'
  })
  
  const themes: Theme[] = ['light', 'dark', 'polkadot', 'kusama', 'minimal', 'glass']
  
  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme)
    
    // Save to localStorage
    localStorage.setItem('luno-theme', theme)
    
    // Apply theme-specific classes
    document.documentElement.className = `theme-${theme}`
  }, [theme])
  
  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'light' || theme === 'dark') {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

### Theme Selector Component

```tsx
function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme()
  
  const themeConfig = {
    light: { name: 'Light', icon: '☀️', colors: ['#ffffff', '#f8fafc'] },
    dark: { name: 'Dark', icon: '🌙', colors: ['#0f172a', '#1e293b'] },
    polkadot: { name: 'Polkadot', icon: '🟣', colors: ['#E6007A', '#552BBF'] },
    kusama: { name: 'Kusama', icon: '⚫', colors: ['#000000', '#ffffff'] },
    minimal: { name: 'Minimal', icon: '📦', colors: ['#ffffff', '#f9fafb'] },
    glass: { name: 'Glass', icon: '💎', colors: ['rgba(255,255,255,0.8)', 'rgba(248,250,252,0.8)'] },
  }
  
  return (
    <div className="theme-selector">
      <h3>Choose Theme</h3>
      <div className="theme-grid">
        {themes.map((themeId) => {
          const config = themeConfig[themeId]
          return (
            <button
              key={themeId}
              onClick={() => setTheme(themeId)}
              className={`theme-option ${theme === themeId ? 'active' : ''}`}
            >
              <div className="theme-preview">
                {config.colors.map((color, i) => (
                  <div
                    key={i}
                    className="color-swatch"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="theme-info">
                <span className="theme-icon">{config.icon}</span>
                <span className="theme-name">{config.name}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
```

## Advanced Styling Techniques

### CSS-in-JS Integration

```tsx
import styled, { createGlobalStyle } from 'styled-components'

const GlobalThemeStyles = createGlobalStyle`
  :root {
    ${props => props.theme.cssVariables}
  }
`

const styledThemes = {
  light: {
    cssVariables: `
      --luno-accent-color: #E6007A;
      --luno-modal-background: #ffffff;
      --luno-modal-text: #1e293b;
    `,
    colors: {
      accent: '#E6007A',
      background: '#ffffff',
      text: '#1e293b',
    }
  },
  dark: {
    cssVariables: `
      --luno-accent-color: #E6007A;
      --luno-modal-background: #0f172a;
      --luno-modal-text: #f8fafc;
    `,
    colors: {
      accent: '#E6007A',
      background: '#0f172a',
      text: '#f8fafc',
    }
  }
}

const ThemedApp = styled.div`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: 100vh;
  transition: all 0.3s ease;
`

function App() {
  const { theme } = useTheme()
  
  return (
    <ThemeProvider theme={styledThemes[theme]}>
      <GlobalThemeStyles />
      <ThemedApp>
        <ConnectButton />
      </ThemedApp>
    </ThemeProvider>
  )
}
```

### Tailwind CSS Integration

Create a Tailwind theme configuration:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'luno-accent': 'var(--luno-accent-color)',
        'luno-bg': 'var(--luno-modal-background)',
        'luno-text': 'var(--luno-modal-text)',
        'luno-border': 'var(--luno-border)',
      },
      borderRadius: {
        'luno': 'var(--luno-radius-medium)',
        'luno-lg': 'var(--luno-radius-large)',
      },
      boxShadow: {
        'luno': 'var(--luno-shadow-medium)',
        'luno-lg': 'var(--luno-shadow-large)',
      }
    }
  }
}
```

Usage in components:

```tsx
function TailwindThemedComponent() {
  return (
    <div className="bg-luno-bg text-luno-text border border-luno-border rounded-luno shadow-luno">
      <ConnectButton className="bg-luno-accent text-white hover:opacity-90" />
    </div>
  )
}
```

### Emotion/React Integration

```tsx
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'

const themeStyles = (theme: any) => css`
  :root {
    --luno-accent-color: ${theme.colors.accent};
    --luno-modal-background: ${theme.colors.background};
    --luno-modal-text: ${theme.colors.text};
  }
`

const ThemeGlobal = ({ theme }: { theme: any }) => (
  <Global styles={themeStyles(theme)} />
)

const StyledConnectButton = styled(ConnectButton)`
  --luno-connect-button-background: ${props => props.theme.colors.accent};
  --luno-connect-button-text: white;
  border-radius: ${props => props.theme.borderRadius};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${props => props.theme.colors.accent}40;
  }
`
```

## Component-Specific Theming

### Custom Connect Button Themes

```css
/* Gaming Theme */
.connect-button-gaming {
  --luno-connect-button-background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  --luno-connect-button-text: #ffffff;
  --luno-border-radius: 0; /* Sharp edges */
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

.connect-button-gaming::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: shine 2s infinite;
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Elegant Theme */
.connect-button-elegant {
  --luno-connect-button-background: #ffffff;
  --luno-connect-button-text: #1a1a1a;
  --luno-border: 1px solid #e0e0e0;
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.connect-button-elegant:hover {
  --luno-connect-button-background: #f8f8f8;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}
```

### Modal Themes

```css
/* Neumorphism Theme */
.luno-modal-neumorphism {
  background: #e0e5ec;
  border: none;
  box-shadow: 
    20px 20px 60px #bebebe,
    -20px -20px 60px #ffffff;
  border-radius: 30px;
}

.luno-modal-neumorphism .wallet-item {
  background: #e0e5ec;
  border: none;
  box-shadow: 
    5px 5px 15px #bebebe,
    -5px -5px 15px #ffffff;
  border-radius: 15px;
  transition: all 0.3s ease;
}

.luno-modal-neumorphism .wallet-item:hover {
  box-shadow: 
    inset 5px 5px 15px #bebebe,
    inset -5px -5px 15px #ffffff;
}

/* Cyberpunk Theme */
.luno-modal-cyberpunk {
  background: #0a0a0a;
  border: 2px solid #00ff41;
  box-shadow: 
    0 0 20px #00ff41,
    inset 0 0 20px rgba(0, 255, 65, 0.1);
  color: #00ff41;
  font-family: 'Courier New', monospace;
}

.luno-modal-cyberpunk::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 255, 65, 0.03) 2px,
      rgba(0, 255, 65, 0.03) 4px
    );
  pointer-events: none;
}
```

## Performance Considerations

### CSS Custom Properties Performance

```css
/* Efficient theme switching */
:root {
  /* Define all variables once */
  --theme-transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

* {
  /* Apply transitions to all themed elements */
  transition: var(--theme-transition);
}

/* Use will-change for smoother animations */
.theme-switching {
  will-change: color, background-color, border-color;
}
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --theme-transition: none;
  }
  
  .luno-modal {
    animation: none !important;
  }
  
  .connect-button {
    transition: none !important;
  }
}
```

## Testing Themes

```tsx
// Theme testing utility
const ThemeTestWrapper = ({ theme, children }: { theme: Theme, children: React.ReactNode }) => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    return () => {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [theme])
  
  return <>{children}</>
}

// Test all themes
const ThemeShowcase = () => {
  const themes: Theme[] = ['light', 'dark', 'polkadot', 'kusama']
  
  return (
    <div className="theme-showcase">
      {themes.map(theme => (
        <ThemeTestWrapper key={theme} theme={theme}>
          <div className="theme-section">
            <h3>{theme}</h3>
            <ConnectButton />
          </div>
        </ThemeTestWrapper>
      ))}
    </div>
  )
}
```

## Related Documentation

- [Basic Theming](/getting-started/theming) - Simple theme customization
- [CSS Variables Reference](/reference/css-variables) - Complete variable list
- [Component Styling](/reference/component-styling) - Style individual components