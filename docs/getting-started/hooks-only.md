# React Hooks Only

Use LunoKit's powerful React hooks without any UI components to build completely custom interfaces.

## Overview

If you want full control over your UI while leveraging LunoKit's wallet connection logic, you can use only the React hooks package (`@luno-kit/react`) without the UI components.

## Installation

```bash
npm install @luno-kit/react @tanstack/react-query
```

Note: You don't need `@luno-kit/ui` for this approach.

## Basic Setup

```tsx
import { createConfig, LunoProvider } from '@luno-kit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { polkadot, kusama, polkadotjs, subwallet } from '@luno-kit/react'

// Create LunoKit config
const lunoConfig = createConfig({
  appName: 'My Custom App',
  chains: [polkadot, kusama],
  connectors: [polkadotjs(), subwallet()],
})

// Create React Query client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LunoProvider config={lunoConfig}>
        <CustomWalletInterface />
      </LunoProvider>
    </QueryClientProvider>
  )
}
```

## Custom Wallet Interface

```tsx
import { 
  useConnect, 
  useAccount, 
  useDisconnect, 
  useBalance,
  useChain,
  useSwitchChain,
  ConnectionStatus 
} from '@luno-kit/react'

function CustomWalletInterface() {
  const { connect, connectors, status, isPending } = useConnect()
  const { account } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address: account?.address })
  const { chain } = useChain()
  const { switchChain, chains } = useSwitchChain()

  // Not connected - show wallet selection
  if (status === ConnectionStatus.Disconnected) {
    return (
      <div className="wallet-connection">
        <h1>Connect Your Wallet</h1>
        <p>Choose a wallet to connect to the Polkadot ecosystem:</p>
        
        <div className="wallet-grid">
          {connectors.map((connector) => (
            <WalletOption
              key={connector.id}
              connector={connector}
              onConnect={() => connect({ connectorId: connector.id })}
              disabled={isPending || !connector.installed}
            />
          ))}
        </div>
        
        {isPending && <div className="connecting">Connecting...</div>}
      </div>
    )
  }

  // Connected - show account dashboard
  if (status === ConnectionStatus.Connected && account) {
    return (
      <div className="wallet-dashboard">
        <header className="dashboard-header">
          <h1>Wallet Dashboard</h1>
          <button onClick={() => disconnect()} className="disconnect-btn">
            Disconnect
          </button>
        </header>

        <div className="dashboard-grid">
          <AccountCard account={account} />
          <BalanceCard balance={balance} />
          <NetworkCard chain={chain} chains={chains} onSwitchChain={switchChain} />
        </div>
      </div>
    )
  }

  // Loading state
  return <div className="loading">Loading wallet...</div>
}

// Custom components
function WalletOption({ connector, onConnect, disabled }) {
  return (
    <button 
      onClick={onConnect}
      disabled={disabled}
      className={`wallet-option ${!connector.installed ? 'not-installed' : ''}`}
    >
      <img src={connector.icon} alt={connector.name} width={48} height={48} />
      <h3>{connector.name}</h3>
      <p>{connector.installed ? 'Ready to connect' : 'Not installed'}</p>
    </button>
  )
}

function AccountCard({ account }) {
  const copyAddress = () => {
    navigator.clipboard.writeText(account.address)
    // Show toast notification
  }

  return (
    <div className="account-card">
      <h3>Account</h3>
      <div className="account-info">
        <div className="account-name">{account.name || 'Unnamed Account'}</div>
        <div className="account-address" onClick={copyAddress}>
          {account.formattedAddress}
        </div>
      </div>
    </div>
  )
}

function BalanceCard({ balance }) {
  if (!balance) {
    return (
      <div className="balance-card">
        <h3>Balance</h3>
        <div className="loading">Loading balance...</div>
      </div>
    )
  }

  return (
    <div className="balance-card">
      <h3>Balance</h3>
      <div className="balance-amount">
        {balance.formattedTransferable} {balance.symbol}
      </div>
      <div className="balance-details">
        <div>Total: {balance.formattedTotal}</div>
        {balance.formattedReserved !== '0' && (
          <div>Reserved: {balance.formattedReserved}</div>
        )}
      </div>
    </div>
  )
}

function NetworkCard({ chain, chains, onSwitchChain }) {
  return (
    <div className="network-card">
      <h3>Network</h3>
      {chain && (
        <div className="current-network">
          <img src={chain.chainIconUrl} alt={chain.name} width={24} height={24} />
          <span>{chain.name}</span>
        </div>
      )}
      
      <details>
        <summary>Switch Network</summary>
        <div className="network-list">
          {chains.map((c) => (
            <button
              key={c.genesisHash}
              onClick={() => onSwitchChain({ chainId: c.genesisHash })}
              className={c.genesisHash === chain?.genesisHash ? 'active' : ''}
            >
              <img src={c.chainIconUrl} alt={c.name} width={20} height={20} />
              {c.name}
            </button>
          ))}
        </div>
      </details>
    </div>
  )
}
```

## Advanced Hook Usage

### Transaction Interface

```tsx
import { useSendTransaction, useSignMessage } from '@luno-kit/react'

function TransactionInterface() {
  const { account } = useAccount()
  const { sendTransaction, isPending, error } = useSendTransaction()
  const { signMessage } = useSignMessage()
  
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')

  const handleTransfer = async () => {
    if (!account) return

    try {
      const result = await sendTransaction({
        to: recipient,
        value: amount,
      })
      console.log('Transaction sent:', result)
    } catch (err) {
      console.error('Transaction failed:', err)
    }
  }

  const handleSignMessage = async () => {
    if (!message) return

    try {
      const signature = await signMessage({ message })
      console.log('Message signed:', signature)
    } catch (err) {
      console.error('Signing failed:', err)
    }
  }

  return (
    <div className="transaction-interface">
      <section className="transfer-section">
        <h3>Transfer Tokens</h3>
        <div className="form-group">
          <label>Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
          />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1.0"
            step="0.1"
          />
        </div>
        <button 
          onClick={handleTransfer}
          disabled={isPending || !recipient || !amount}
        >
          {isPending ? 'Sending...' : 'Send Transaction'}
        </button>
        {error && <div className="error">Error: {error.message}</div>}
      </section>

      <section className="signing-section">
        <h3>Sign Message</h3>
        <div className="form-group">
          <label>Message to Sign</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message to sign..."
          />
        </div>
        <button onClick={handleSignMessage} disabled={!message}>
          Sign Message
        </button>
      </section>
    </div>
  )
}
```

### Real-time Data Dashboard

```tsx
import { 
  useBlockNumber, 
  useSubscription, 
  useApi,
  useRuntimeVersion 
} from '@luno-kit/react'

function BlockchainDataDashboard() {
  const { data: api } = useApi()
  const { data: blockNumber } = useBlockNumber()
  const { data: runtimeVersion } = useRuntimeVersion()
  
  // Subscribe to new blocks
  const { data: latestBlock } = useSubscription({
    subscription: api?.rpc.chain.subscribeNewHeads,
    enabled: !!api,
  })

  // Subscribe to balance changes
  const { account } = useAccount()
  const { data: balanceUpdates } = useSubscription({
    subscription: (callback) => 
      api?.query.system.account(account?.address, callback),
    enabled: !!api && !!account,
  })

  return (
    <div className="blockchain-dashboard">
      <div className="stats-grid">
        <StatCard
          title="Current Block"
          value={blockNumber?.toString() || 'Loading...'}
          subtitle={`Updated ${new Date().toLocaleTimeString()}`}
        />
        
        <StatCard
          title="Runtime Version"
          value={runtimeVersion?.specName || 'Loading...'}
          subtitle={`v${runtimeVersion?.specVersion}`}
        />
        
        <StatCard
          title="Latest Block Hash"
          value={latestBlock?.hash.toHex().slice(0, 10) + '...' || 'Loading...'}
          subtitle={`Block #${latestBlock?.number}`}
        />
        
        <StatCard
          title="Account Nonce"
          value={balanceUpdates?.nonce.toString() || 'Loading...'}
          subtitle="Transaction count"
        />
      </div>

      <div className="live-updates">
        <h3>Live Updates</h3>
        <div className="update-log">
          {/* Show real-time blockchain updates */}
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, subtitle }) {
  return (
    <div className="stat-card">
      <h4>{title}</h4>
      <div className="stat-value">{value}</div>
      {subtitle && <div className="stat-subtitle">{subtitle}</div>}
    </div>
  )
}
```

### Custom State Management

```tsx
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Custom store for app state
interface AppState {
  preferences: {
    theme: 'light' | 'dark'
    defaultChain: string
    autoConnect: boolean
  }
  transactionHistory: Transaction[]
  setPreference: (key: string, value: any) => void
  addTransaction: (tx: Transaction) => void
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      preferences: {
        theme: 'light',
        defaultChain: 'polkadot',
        autoConnect: true,
      },
      transactionHistory: [],
      setPreference: (key, value) =>
        set((state) => ({
          preferences: { ...state.preferences, [key]: value },
        })),
      addTransaction: (tx) =>
        set((state) => ({
          transactionHistory: [tx, ...state.transactionHistory].slice(0, 100),
        })),
    }),
    {
      name: 'lunokit-app-storage',
    }
  )
)

// Integration with LunoKit hooks
function CustomWalletManager() {
  const { preferences, setPreference } = useAppStore()
  const { connect, connectors } = useConnect()
  const { chain, chains } = useChain()
  const { switchChain } = useSwitchChain()

  // Auto-connect based on preferences
  useEffect(() => {
    if (preferences.autoConnect) {
      const defaultConnector = connectors.find(c => c.installed)
      if (defaultConnector) {
        connect({ 
          connectorId: defaultConnector.id,
          targetChainId: preferences.defaultChain 
        })
      }
    }
  }, [preferences.autoConnect, preferences.defaultChain])

  // Auto-switch to preferred chain
  useEffect(() => {
    if (chain && chain.name !== preferences.defaultChain) {
      const preferredChain = chains.find(c => c.name === preferences.defaultChain)
      if (preferredChain) {
        switchChain({ chainId: preferredChain.genesisHash })
      }
    }
  }, [chain, preferences.defaultChain])

  return (
    <div className="wallet-manager">
      <SettingsPanel 
        preferences={preferences}
        onPreferenceChange={setPreference}
      />
    </div>
  )
}
```

## Styling Without UI Components

Since you're not using LunoKit's UI components, you'll need your own CSS:

```css
/* Custom wallet interface styles */
.wallet-connection {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.wallet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.wallet-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.wallet-option:hover:not(:disabled) {
  border-color: #E6007A;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(230, 0, 122, 0.1);
}

.wallet-option:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.wallet-option.not-installed {
  border-color: #fbbf24;
  background: #fef3c7;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.account-card,
.balance-card,
.network-card {
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
}

.account-address {
  font-family: monospace;
  background: #f8fafc;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.balance-amount {
  font-size: 2rem;
  font-weight: bold;
  color: #E6007A;
  margin: 0.5rem 0;
}

.current-network {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.network-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.network-list button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
}

.network-list button:hover {
  background: #f8fafc;
}

.network-list button.active {
  background: #E6007A;
  color: white;
}
```

## Benefits of Hooks-Only Approach

1. **Complete UI Control**: Build interfaces that perfectly match your design system
2. **Smaller Bundle Size**: No UI components means smaller JavaScript bundles
3. **Framework Flexibility**: Use with any UI framework (Material-UI, Ant Design, etc.)
4. **Custom Interactions**: Implement unique UX patterns not possible with pre-built components
5. **Performance**: Optimize rendering exactly for your use case

## Related Documentation

- [Hook Reference](/hooks/) - Complete hooks documentation
- [Custom ConnectButton](/getting-started/custom-connect-button) - Build custom connection UI
- [Custom Themes](/getting-started/custom-theme) - Style your custom components
