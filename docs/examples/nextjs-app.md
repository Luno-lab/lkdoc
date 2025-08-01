# Next.js App Router

Integrate LunoKit with Next.js 13+ App Router for server-side rendered applications.

## Overview

The `with-nextjs-app` example shows how to use LunoKit with Next.js App Router, including proper client-side rendering setup and server-side compatibility.

## Quick Start

```bash
git clone https://github.com/Luno-lab/LunoKit.git
cd LunoKit

# Install dependencies
pnpm install

# Start with-nextjs-app example
pnpm --filter with-nextjs-app dev
```

## Project Structure

```
with-nextjs-app/
├── app/
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Home page
│   ├── providers.tsx     # Client-side providers
│   └── globals.css       # Global styles
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

## Configuration

### next.config.ts

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // Enable server components (default in Next.js 13+)
    serverComponentsExternalPackages: ['@polkadot/api'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }
    return config
  },
}

export default nextConfig
```

### package.json

```json
{
  "name": "with-nextjs-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@luno-kit/ui": "workspace:*",
    "@luno-kit/react": "workspace:*",
    "@tanstack/react-query": "^5.0.0",
    "next": "15.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "15.0.0",
    "typescript": "^5.0.0"
  }
}
```

## Implementation

### app/layout.tsx

```tsx
import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'LunoKit + Next.js App Router',
  description: 'Polkadot wallet connection with Next.js App Router',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

### app/providers.tsx

```tsx
'use client'

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
import { useState } from 'react'

const config = createConfig({
  appName: 'Next.js App Router Example',
  chains: [polkadot, kusama, westend, paseo],
  connectors: [
    polkadotjs(),
    subwallet(),
    talisman(),
  ],
  autoConnect: true,
})

export function Providers({ children }: { children: React.ReactNode }) {
  // Create a client instance inside the component to avoid SSR issues
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <LunoKitProvider config={config}>
        {children}
      </LunoKitProvider>
    </QueryClientProvider>
  )
}
```

### app/page.tsx

```tsx
import { ConnectSection } from '../components/ConnectSection'

export default function Home() {
  return (
    <main className="container">
      <header className="header">
        <h1>LunoKit + Next.js App Router</h1>
        <p>Connect your Polkadot wallet to get started</p>
      </header>
      
      <ConnectSection />
      
      <footer className="footer">
        <p>Built with LunoKit and Next.js 15</p>
      </footer>
    </main>
  )
}
```

### components/ConnectSection.tsx

```tsx
'use client'

import { ConnectButton } from '@luno-kit/ui'
import { useAccount, useBalance, useChain } from '@luno-kit/react'

export function ConnectSection() {
  return (
    <section className="connect-section">
      <ConnectButton />
      <AccountDetails />
    </section>
  )
}

function AccountDetails() {
  const { account } = useAccount()
  const { data: balance } = useBalance({ address: account?.address })
  const { chain } = useChain()
  
  if (!account) {
    return (
      <div className="welcome-card">
        <h2>Welcome!</h2>
        <p>Connect your wallet to view account details and interact with the Polkadot ecosystem.</p>
      </div>
    )
  }
  
  return (
    <div className="account-card">
      <h2>Account Details</h2>
      
      <div className="detail-row">
        <span className="label">Name:</span>
        <span className="value">{account.name || 'Unnamed Account'}</span>
      </div>
      
      <div className="detail-row">
        <span className="label">Address:</span>
        <span className="value mono">{account.formattedAddress}</span>
      </div>
      
      {chain && (
        <div className="detail-row">
          <span className="label">Network:</span>
          <span className="value">{chain.name}</span>
        </div>
      )}
      
      {balance && (
        <div className="detail-row">
          <span className="label">Balance:</span>
          <span className="value">
            {balance.formattedTransferable} {balance.symbol}
          </span>
        </div>
      )}
    </div>
  )
}
```

### app/globals.css

```css
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #E6007A 0%, #552BBF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.connect-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.welcome-card,
.account-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.account-card h2 {
  margin-bottom: 1.5rem;
  color: #111827;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.detail-row:last-child {
  border-bottom: none;
}

.label {
  font-weight: 600;
  color: #6b7280;
}

.value {
  color: #111827;
  font-weight: 500;
}

.mono {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
}

.footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
  color: #6b7280;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
  
  body {
    background: #0f172a;
    color: #f8fafc;
  }
  
  .welcome-card,
  .account-card {
    background: #1e293b;
    border-color: #334155;
  }
  
  .account-card h2 {
    color: #f8fafc;
  }
  
  .detail-row {
    border-color: #334155;
  }
  
  .label {
    color: #94a3b8;
  }
  
  .value {
    color: #f8fafc;
  }
  
  .footer {
    border-color: #334155;
    color: #94a3b8;
  }
}
```

## Key Features

### Server-Side Rendering Support

LunoKit works with Next.js SSR by using client components where needed:

```tsx
'use client'

import { ConnectButton } from '@luno-kit/ui'

// This component will only render on the client
export function ClientOnlyWallet() {
  return <ConnectButton />
}
```

### Optimized Bundle Splitting

Next.js automatically code-splits LunoKit components:

```tsx
// This will be code-split automatically
import dynamic from 'next/dynamic'

const ConnectButton = dynamic(
  () => import('@luno-kit/ui').then((mod) => ({ default: mod.ConnectButton })),
  { ssr: false }
)
```

### Environment Configuration

Use environment variables for different deployments:

```bash
# .env.local
NEXT_PUBLIC_APP_NAME="My Polkadot App"
NEXT_PUBLIC_ENVIRONMENT="development"
```

```tsx
const config = createConfig({
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'LunoKit App',
  // ... other config
})
```

## Deployment

### Vercel

Deploy to Vercel with zero configuration:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Static Export

For static hosting:

```ts
// next.config.ts
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

## Common Patterns

### Protected Pages

Create protected routes that require wallet connection:

```tsx
// app/dashboard/page.tsx
import { ProtectedRoute } from '../components/ProtectedRoute'
import { DashboardContent } from '../components/DashboardContent'

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
```

```tsx
// components/ProtectedRoute.tsx
'use client'

import { useAccount } from '@luno-kit/react'
import { ConnectButton } from '@luno-kit/ui'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { account } = useAccount()
  
  if (!account) {
    return (
      <div className="auth-required">
        <h2>Authentication Required</h2>
        <p>Please connect your wallet to access this page.</p>
        <ConnectButton />
      </div>
    )
  }
  
  return <>{children}</>
}
```

## Performance Tips

### React Query Configuration

Optimize queries for Next.js:

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
```

### Image Optimization

Use Next.js Image component for chain icons:

```tsx
import Image from 'next/image'

function ChainIcon({ chain }: { chain: Chain }) {
  return (
    <Image
      src={chain.chainIconUrl}
      alt={chain.name}
      width={24}
      height={24}
      priority
    />
  )
}
```

## Next Steps

- Check out the [Next.js Pages Router example](/examples/nextjs-pages)
- Learn about [custom theming](/getting-started/theming)
- Explore [advanced hooks](/hooks/)

## Live Demo

Try the live demo: [Next.js App Router Example](https://demo.lunolab.xyz/nextjs-app)

## Source Code

View the complete source code: [GitHub - with-nextjs-app](https://github.com/Luno-lab/LunoKit/tree/main/examples/with-nextjs-app)