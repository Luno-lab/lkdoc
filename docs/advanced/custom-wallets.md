# Custom Wallets

Learn how to add support for custom wallet connectors or integrate with new wallet implementations.

## Overview

LunoKit's modular architecture allows you to easily add support for new wallets by creating custom connectors. This guide shows you how to integrate wallets that aren't built into LunoKit.

## Basic Custom Connector

```tsx
import { BaseConnector } from '@luno-kit/core'
import type { Account, Chain } from '@luno-kit/core'

class CustomWalletConnector extends BaseConnector {
  constructor() {
    super({
      id: 'custom-wallet',
      name: 'Custom Wallet',
      icon: 'data:image/svg+xml;base64,...', // Your wallet's icon
    })
  }
  
  async connect(): Promise<void> {
    // Check if wallet is installed
    if (!this.isInstalled()) {
      throw new Error('Custom wallet not installed')
    }
    
    // Request connection
    await window.customWallet.enable('My App Name')
    
    // Get accounts
    const accounts = await window.customWallet.getAccounts()
    
    if (accounts.length === 0) {
      throw new Error('No accounts found')
    }
    
    // Set the connected account
    this.account = accounts[0]
    this.connected = true
  }
  
  async disconnect(): Promise<void> {
    this.account = undefined
    this.connected = false
  }
  
  async getAccounts(): Promise<Account[]> {
    if (!this.isInstalled()) return []
    
    const accounts = await window.customWallet.getAccounts()
    return accounts.map(account => ({
      address: account.address,
      name: account.name,
      source: this.id,
      type: account.type,
    }))
  }
  
  async signMessage(message: string): Promise<string> {
    if (!this.account) {
      throw new Error('No account connected')
    }
    
    const signature = await window.customWallet.signRaw({
      address: this.account.address,
      data: message,
      type: 'bytes',
    })
    
    return signature.signature
  }
  
  async signTransaction(transaction: any): Promise<string> {
    if (!this.account) {
      throw new Error('No account connected')
    }
    
    const signature = await window.customWallet.signPayload({
      address: this.account.address,
      ...transaction,
    })
    
    return signature.signature
  }
  
  isInstalled(): boolean {
    return typeof window !== 'undefined' && !!window.customWallet
  }
  
  // Handle account changes
  private setupEventListeners(): void {
    if (window.customWallet) {
      window.customWallet.on('accountsChanged', (accounts: any[]) => {
        if (accounts.length === 0) {
          this.disconnect()
        } else {
          this.account = accounts[0]
        }
      })
    }
  }
}

// Create connector factory function
export const customWallet = () => new CustomWalletConnector()
```

## Integration with Config

```tsx
import { createConfig, polkadot, kusama } from '@luno-kit/react'
import { customWallet } from './connectors/customWallet'

const config = createConfig({
  appName: 'My App',
  chains: [polkadot, kusama],
  connectors: [
    customWallet(), // Your custom wallet
    polkadotjs(),   // Built-in wallets
    subwallet(),
  ],
})
```

## Advanced Custom Connector

Here's a more complete example with error handling and event management:

```tsx
class AdvancedCustomConnector extends BaseConnector {
  private provider: any
  private unsubscribeFunctions: Array<() => void> = []
  
  constructor() {
    super({
      id: 'advanced-wallet',
      name: 'Advanced Wallet',
      icon: '/icons/advanced-wallet.svg',
      downloadUrl: 'https://advanced-wallet.com/download',
    })
    
    this.provider = window.advancedWallet
    this.setupEventListeners()
  }
  
  async connect(chainId?: string): Promise<void> {
    try {
      if (!this.isInstalled()) {
        throw new Error(`${this.name} is not installed. Please install it from ${this.downloadUrl}`)
      }
      
      // Enable the extension for this app
      const extension = await this.provider.enable({
        dappName: 'My Polkadot App',
        genesisHash: chainId,
      })
      
      if (!extension) {
        throw new Error('User rejected the connection request')
      }
      
      // Get accounts
      const accounts = await extension.accounts.get()
      
      if (accounts.length === 0) {
        throw new Error('No accounts available. Please create an account first.')
      }
      
      // Set the first account as active
      this.account = {
        address: accounts[0].address,
        name: accounts[0].name || 'Account 1',
        source: this.id,
        type: accounts[0].type,
      }
      
      this.connected = true
      
      // Emit connection event
      this.emit('connect', this.account)
      
    } catch (error) {
      this.connected = false
      this.account = undefined
      throw error
    }
  }
  
  async disconnect(): Promise<void> {
    try {
      // Clean up subscriptions
      this.unsubscribeFunctions.forEach(unsub => unsub())
      this.unsubscribeFunctions = []
      
      // Reset state
      this.connected = false
      this.account = undefined
      
      // Emit disconnect event
      this.emit('disconnect')
      
    } catch (error) {
      console.warn('Error during disconnect:', error)
    }
  }
  
  async switchChain(chainId: string): Promise<void> {
    if (!this.connected) {
      throw new Error('Wallet not connected')
    }
    
    try {
      await this.provider.switchNetwork(chainId)
      this.emit('chainChanged', chainId)
    } catch (error) {
      throw new Error(`Failed to switch chain: ${error.message}`)
    }
  }
  
  async getBalance(address: string, chainId: string): Promise<bigint> {
    if (!this.provider) {
      throw new Error('Wallet not available')
    }
    
    try {
      const balance = await this.provider.getBalance(address, chainId)
      return BigInt(balance)
    } catch (error) {
      throw new Error(`Failed to get balance: ${error.message}`)
    }
  }
  
  private setupEventListeners(): void {
    if (!this.provider) return
    
    // Account changes
    const unsubscribeAccounts = this.provider.on('accountsChanged', (accounts: any[]) => {
      if (accounts.length === 0) {
        this.disconnect()
      } else {
        this.account = {
          address: accounts[0].address,
          name: accounts[0].name,
          source: this.id,
        }
        this.emit('accountsChanged', accounts)
      }
    })
    
    // Chain changes
    const unsubscribeChain = this.provider.on('chainChanged', (chainId: string) => {
      this.emit('chainChanged', chainId)
    })
    
    // Store unsubscribe functions
    this.unsubscribeFunctions.push(unsubscribeAccounts, unsubscribeChain)
  }
  
  isInstalled(): boolean {
    return typeof window !== 'undefined' && 
           !!window.advancedWallet && 
           !!window.advancedWallet.enable
  }
}
```

## Mobile Wallet Integration

For mobile wallets that use WalletConnect or deep linking:

```tsx
class MobileWalletConnector extends BaseConnector {
  private wcClient: any
  
  constructor(options: { projectId: string, metadata: any }) {
    super({
      id: 'mobile-wallet',
      name: 'Mobile Wallet',
      icon: '/icons/mobile-wallet.svg',
    })
    
    this.initializeWalletConnect(options)
  }
  
  private async initializeWalletConnect({ projectId, metadata }: any) {
    const { SignClient } = await import('@walletconnect/sign-client')
    
    this.wcClient = await SignClient.init({
      projectId,
      metadata,
    })
  }
  
  async connect(): Promise<void> {
    try {
      const { uri, approval } = await this.wcClient.connect({
        requiredNamespaces: {
          polkadot: {
            methods: ['polkadot_signTransaction', 'polkadot_signMessage'],
            chains: ['polkadot:91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'],
            events: ['accountsChanged', 'chainChanged'],
          },
        },
      })
      
      if (uri) {
        // Show QR code or open mobile app
        this.showConnectionUI(uri)
      }
      
      // Wait for approval
      const session = await approval()
      
      // Extract account info
      const accounts = session.namespaces.polkadot.accounts
      if (accounts.length > 0) {
        const address = accounts[0].split(':')[2]
        this.account = {
          address,
          name: 'Mobile Account',
          source: this.id,
        }
        this.connected = true
      }
      
    } catch (error) {
      throw new Error(`Mobile wallet connection failed: ${error.message}`)
    }
  }
  
  private showConnectionUI(uri: string): void {
    // Show QR code or deep link
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    if (isMobile) {
      // Open mobile app directly
      window.open(`mobile-wallet://wc?uri=${encodeURIComponent(uri)}`)
    } else {
      // Show QR code
      this.emit('showQR', uri)
    }
  }
  
  isInstalled(): boolean {
    // Mobile wallets are "installed" if WalletConnect is available
    return true
  }
}
```

## Testing Custom Connectors

```tsx
// Test utilities for custom connectors
export class MockWalletConnector extends BaseConnector {
  constructor(options: { 
    shouldFail?: boolean, 
    accounts?: Account[] 
  } = {}) {
    super({
      id: 'mock-wallet',
      name: 'Mock Wallet',
      icon: 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
    })
    
    this.shouldFail = options.shouldFail || false
    this.mockAccounts = options.accounts || [
      {
        address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        name: 'Mock Account',
        source: this.id,
      }
    ]
  }
  
  async connect(): Promise<void> {
    if (this.shouldFail) {
      throw new Error('Mock connection failure')
    }
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    this.account = this.mockAccounts[0]
    this.connected = true
  }
  
  async disconnect(): Promise<void> {
    this.connected = false
    this.account = undefined
  }
  
  async getAccounts(): Promise<Account[]> {
    return this.mockAccounts
  }
  
  isInstalled(): boolean {
    return true
  }
}

// Usage in tests
const mockWallet = () => new MockWalletConnector({
  shouldFail: false,
  accounts: [
    {
      address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      name: 'Test Account 1',
      source: 'mock-wallet',
    }
  ]
})
```

## Error Handling and Validation

```tsx
class RobustCustomConnector extends BaseConnector {
  async connect(): Promise<void> {
    // Validation checks
    this.validateEnvironment()
    this.validateWalletAvailability()
    
    try {
      await this.performConnection()
    } catch (error) {
      this.handleConnectionError(error)
      throw error
    }
  }
  
  private validateEnvironment(): void {
    if (typeof window === 'undefined') {
      throw new Error('Wallet connection requires a browser environment')
    }
    
    if (!window.isSecureContext) {
      throw new Error('Wallet connection requires a secure context (HTTPS)')
    }
  }
  
  private validateWalletAvailability(): void {
    if (!this.isInstalled()) {
      throw new Error(
        `${this.name} is not installed. ` +
        `Please install it from ${this.downloadUrl}`
      )
    }
    
    if (!window.customWallet.isUnlocked?.()) {
      throw new Error('Please unlock your wallet first')
    }
  }
  
  private handleConnectionError(error: any): void {
    if (error.code === 4001) {
      throw new Error('Connection was rejected by the user')
    } else if (error.code === 4100) {
      throw new Error('The requested method is not supported')
    } else if (error.code === 4900) {
      throw new Error('The wallet is disconnected')
    }
    
    // Log for debugging
    console.error(`${this.name} connection error:`, error)
  }
}
```

## Best Practices

### 1. Error Messages
Provide clear, actionable error messages:

```tsx
const getErrorMessage = (error: any): string => {
  if (error.code === 'WALLET_NOT_INSTALLED') {
    return `Please install ${walletName} from ${downloadUrl}`
  }
  if (error.code === 'USER_REJECTED') {
    return 'Connection was cancelled. Please try again.'
  }
  if (error.code === 'NO_ACCOUNTS') {
    return 'No accounts found. Please create an account in your wallet.'
  }
  return `Connection failed: ${error.message}`
}
```

### 2. Type Safety
Define proper TypeScript types:

```tsx
interface CustomWalletAPI {
  enable(dappName: string): Promise<Extension>
  getAccounts(): Promise<WalletAccount[]>
  signRaw(request: SignerPayloadRaw): Promise<SignerResult>
  signPayload(request: SignerPayload): Promise<SignerResult>
  on(event: string, callback: Function): () => void
}

interface WalletAccount {
  address: string
  name?: string
  type?: string
}
```

### 3. Event Cleanup
Always clean up event listeners:

```tsx
class CleanCustomConnector extends BaseConnector {
  private eventListeners: Array<() => void> = []
  
  constructor() {
    super({ /* config */ })
    this.setupEvents()
  }
  
  private setupEvents(): void {
    if (window.customWallet) {
      const unsubscribe = window.customWallet.on('accountsChanged', this.handleAccountsChanged)
      this.eventListeners.push(unsubscribe)
    }
  }
  
  async disconnect(): Promise<void> {
    // Clean up events
    this.eventListeners.forEach(unsub => unsub())
    this.eventListeners = []
    
    // Reset state
    this.connected = false
    this.account = undefined
  }
}
```

## Related Documentation

- [Custom Chains](/advanced/custom-chains) - Add custom Substrate chains
- [useConnect Hook](/hooks/connection/use-connect) - Connection management
- [Core Concepts](/overview/introduction) - LunoKit architecture