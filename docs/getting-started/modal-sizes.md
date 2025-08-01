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
  config={config}
  modalSize="compact"
>
  <ConnectButton />
</LunoKitProvider>
```

### Wide Size  

Provides more space for wallet lists and account information:

```tsx
<LunoKitProvider 
  config={config}
  modalSize="wide"
>
  <ConnectButton />
</LunoKitProvider>
```

### Custom Size

Define custom modal dimensions:

```tsx
<LunoKitProvider 
  config={config}
  modalSize={{
    width: '480px',
    maxWidth: '90vw',
    height: 'auto',
    maxHeight: '80vh'
  }}
>
  <ConnectButton />
</LunoKitProvider>
```

## CSS Customization

### Modal Container

Customize modal appearance using CSS variables:

```css
:root {
  /* Modal dimensions */
  --luno-modal-width: 420px;
  --luno-modal-max-width: 90vw;
  --luno-modal-max-height: 80vh;
  
  /* Modal positioning */
  --luno-modal-margin: 20px;
  --luno-modal-border-radius: 24px;
  
  /* Modal backdrop */
  --luno-modal-overlay-background: rgba(0, 0, 0, 0.3);
  --luno-modal-backdrop-blur: 4px;
}
```

### Responsive Modal Sizes

Create responsive modal behavior:

```css
/* Desktop */
.luno-modal {
  width: var(--luno-modal-width, 420px);
  max-width: var(--luno-modal-max-width, 90vw);
}

/* Tablet */
@media (max-width: 768px) {
  .luno-modal {
    width: 380px;
    margin: 16px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .luno-modal {
    width: calc(100vw - 32px);
    margin: 16px;
    border-radius: 16px;
  }
}
```

## Modal Types and Sizes

### Connect Modal

The wallet selection modal with size variations:

```css
/* Compact connect modal */
.luno-connect-modal.compact {
  width: 320px;
  max-height: 400px;
}

/* Wide connect modal */
.luno-connect-modal.wide {
  width: 520px;
  max-height: 600px;
}
```

### Account Modal

Account details and management modal:

```css
/* Account modal sizing */
.luno-account-modal {
  width: 380px;
  min-height: 300px;
  max-height: 70vh;
}

/* Account modal on mobile */
@media (max-width: 480px) {
  .luno-account-modal {
    width: calc(100vw - 24px);
    height: auto;
    max-height: 85vh;
  }
}
```

### Chain Selection Modal

Network switching modal dimensions:

```css
.luno-chain-modal {
  width: 340px;
  max-height: 500px;
}
```

## Full-Screen Modal

For mobile experiences, you can make modals full-screen:

```css
@media (max-width: 480px) {
  .luno-modal.full-screen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    max-width: none;
    max-height: none;
    border-radius: 0;
    margin: 0;
  }
}
```

Apply full-screen on mobile:

```tsx
<LunoKitProvider 
  config={config}
  mobileModalBehavior="fullscreen"
>
  <ConnectButton />
</LunoKitProvider>
```

## Advanced Modal Configuration

### Custom Modal Component

For complete control, you can customize the modal wrapper:

```tsx
import { LunoKitProvider } from '@luno-kit/ui'

const CustomModalWrapper = ({ children, onClose }) => {
  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div className="custom-modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

<LunoKitProvider 
  config={config}
  customModal={CustomModalWrapper}
>
  <ConnectButton />
</LunoKitProvider>
```

### Modal Animation

Customize modal entrance and exit animations:

```css
.luno-modal {
  animation: modalEnter 0.2s ease-out;
}

.luno-modal.closing {
  animation: modalExit 0.15s ease-in;
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes modalExit {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
}
```

## Accessibility Considerations

### Focus Management

Ensure proper focus management for different modal sizes:

```css
.luno-modal {
  /* Ensure modal is focusable */
  outline: none;
}

.luno-modal:focus-within {
  /* Highlight when modal content has focus */
  box-shadow: 0 0 0 2px var(--luno-accent-color);
}
```

### Screen Reader Support

Make sure modal sizes don't affect accessibility:

```tsx
<div 
  className="luno-modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  {/* Modal content */}
</div>
```

## Best Practices

### Mobile-First Design

Start with mobile sizes and scale up:

```css
/* Mobile first */
.luno-modal {
  width: calc(100vw - 32px);
  max-height: 85vh;
}

/* Tablet and up */
@media (min-width: 768px) {
  .luno-modal {
    width: 420px;
    max-height: 80vh;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .luno-modal {
    width: 480px;
    max-height: 70vh;
  }
}
```

### Performance Considerations

Use CSS transforms for smooth animations:

```css
.luno-modal {
  will-change: transform, opacity;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
```

### Content Overflow

Handle content overflow gracefully:

```css
.luno-modal-content {
  overflow-y: auto;
  max-height: calc(100vh - 120px);
  
  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: var(--luno-accent-color) transparent;
}

.luno-modal-content::-webkit-scrollbar {
  width: 6px;
}

.luno-modal-content::-webkit-scrollbar-thumb {
  background: var(--luno-accent-color);
  border-radius: 3px;
}
```

## Examples

### Compact Mobile Modal

```tsx
function MobileApp() {
  return (
    <LunoKitProvider 
      config={config}
      modalSize="compact"
      mobileModalBehavior="bottom-sheet"
    >
      <ConnectButton />
    </LunoKitProvider>
  )
}
```

### Desktop Wide Modal

```tsx
function DesktopApp() {
  return (
    <LunoKitProvider 
      config={config}
      modalSize="wide"
    >
      <ConnectButton />
    </LunoKitProvider>
  )
}
```

### Custom Responsive Modal

```tsx
function ResponsiveApp() {
  const [modalSize, setModalSize] = useState('default')
  
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 480) {
        setModalSize('compact')
      } else if (window.innerWidth > 1024) {
        setModalSize('wide')
      } else {
        setModalSize('default')
      }
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  
  return (
    <LunoKitProvider 
      config={config}
      modalSize={modalSize}
    >
      <ConnectButton />
    </LunoKitProvider>
  )
}
```

## Related Documentation

- [ConnectButton](/getting-started/connect-button) - Main connection component
- [Theming](/getting-started/theming) - Customize modal appearance
- [Custom ConnectButton](/advanced/custom-connect-button) - Build custom modals