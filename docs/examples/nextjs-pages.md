# Next.js Pages Router

Integrate LunoKit with Next.js Pages Router for traditional Next.js applications.

## Quick Start

```bash
git clone https://github.com/Luno-lab/LunoKit.git
cd LunoKit

# Install dependencies
pnpm install

# Start with-nextjs-pages example
pnpm --filter with-nextjs-pages dev
```

## Project Structure

```
with-nextjs-pages/
├── pages/
│   ├── _app.tsx          # App wrapper with providers
│   ├── _document.tsx     # Custom document
│   ├── index.tsx         # Home page
│   └── api/
│       └── hello.ts      # API route example
├── styles/
│   └── globals.css       # Global styles
├── next.config.ts        # Next.js configuration
└── package.json          # Dependencies
```

## Implementation

### pages/_app.tsx

```tsx
import type { AppProps } from 'next/app'
import { LunoKitProvider } from '@luno-kit/ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { 
  createConfig, 
  polkadot, 
  kusama, 
  westend, 
  paseo,
  polkadotjs, 
  subwallet,
  talisman 
} from '@luno-kit/react'
import '@luno-kit/ui/styles.css'
import '../styles/globals.css'
import { useState } from 'react'

const config = createConfig({
  appName: 'Next.js Pages Example',
  chains: [polkadot, kusama, westend, paseo],
  connectors: [
    polkadotjs(),
    subwallet(),
    talisman(),
  ],
  autoConnect: true,
})

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <LunoKitProvider config={config}>
        <Component {...pageProps} />
      </LunoKitProvider>
    </QueryClientProvider>
  )
}
```

### pages/index.tsx

```tsx
import { ConnectButton } from '@luno-kit/ui'
import { useAccount, useBalance, useChain } from '@luno-kit/react'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>LunoKit + Next.js Pages</title>
        <meta name="description" content="Polkadot wallet connection with Next.js Pages Router" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="container">
        <header className="header">
          <h1>LunoKit + Next.js Pages</h1>
          <p>Connect your Polkadot wallet to get started</p>
        </header>
        
        <section className="connect-section">
          <ConnectButton />
          <AccountInfo />
        </section>
      </main>
    </>
  )
}

function AccountInfo() {
  const { account } = useAccount()
  const { data: balance } = useBalance({ address: account?.address })
  const { chain } = useChain()
  
  if (!account) {
    return (
      <div className="info-card">
        <h2>Welcome!</h2>
        <p>Connect your wallet to view account details.</p>
      </div>
    )
  }
  
  return (
    <div className="info-card">
      <h2>Account Information</h2>
      <div className="info-grid">
        <div className="info-item">
          <span className="label">Name:</span>
          <span className="value">{account.name || 'Unnamed'}</span>
        </div>
        <div className="info-item">
          <span className="label">Address:</span>
          <span className="value">{account.formattedAddress}</span>
        </div>
        {chain && (
          <div className="info-item">
            <span className="label">Network:</span>
            <span className="value">{chain.name}</span>
          </div>
        )}
        {balance && (
          <div className="info-item">
            <span className="label">Balance:</span>
            <span className="value">
              {balance.formattedTransferable} {balance.symbol}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
```

For complete implementation details, view the source code: [GitHub - with-nextjs-pages](https://github.com/Luno-lab/LunoKit/tree/main/examples/with-nextjs-pages)