# Create React App

Integrate LunoKit with Create React App for a quick start with React development.

## Quick Start

```bash
git clone https://github.com/Luno-lab/LunoKit.git
cd LunoKit

# Install dependencies
pnpm install

# Start with-cra example
pnpm --filter with-cra start
```

## Project Structure

```
with-cra/
├── src/
│   ├── App.tsx           # Main application component
│   ├── index.tsx         # React entry point
│   ├── App.css           # Component styles
│   └── index.css         # Global styles
├── public/
│   └── index.html        # HTML template
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript configuration
```

## Implementation

### src/index.tsx

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### src/App.tsx

```tsx
import { LunoKitProvider, ConnectButton } from '@luno-kit/ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { 
  createConfig, 
  polkadot, 
  kusama, 
  westend, 
  paseo,
  polkadotjs, 
  subwallet,
  talisman,
  useAccount,
  useBalance
} from '@luno-kit/react'
import '@luno-kit/ui/styles.css'
import './App.css'

const config = createConfig({
  appName: 'Create React App Example',
  chains: [polkadot, kusama, westend, paseo],
  connectors: [
    polkadotjs(),
    subwallet(),
    talisman(),
  ],
  autoConnect: true,
})

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LunoKitProvider config={config}>
        <div className="App">
          <header className="App-header">
            <h1>LunoKit + Create React App</h1>
            <ConnectButton />
          </header>
          
          <main className="App-main">
            <WalletInfo />
          </main>
        </div>
      </LunoKitProvider>
    </QueryClientProvider>
  )
}

function WalletInfo() {
  const { account } = useAccount()
  const { data: balance } = useBalance({ address: account?.address })
  
  if (!account) {
    return (
      <div className="welcome-section">
        <h2>Welcome to LunoKit!</h2>
        <p>Connect your Polkadot wallet to get started with the ecosystem.</p>
      </div>
    )
  }
  
  return (
    <div className="wallet-info">
      <h2>Wallet Connected</h2>
      <div className="info-grid">
        <div className="info-card">
          <h3>Account</h3>
          <p><strong>Name:</strong> {account.name || 'Unnamed'}</p>
          <p><strong>Address:</strong> {account.formattedAddress}</p>
        </div>
        
        {balance && (
          <div className="info-card">
            <h3>Balance</h3>
            <p><strong>Available:</strong> {balance.formattedTransferable} {balance.symbol}</p>
            <p><strong>Total:</strong> {balance.formattedTotal} {balance.symbol}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
```

For complete implementation details, view the source code: [GitHub - with-cra](https://github.com/Luno-lab/LunoKit/tree/main/examples/with-cra)