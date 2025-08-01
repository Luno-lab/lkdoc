# Signer Integration

Integrate custom signers and transaction signing logic with LunoKit for advanced use cases.

## Overview

LunoKit provides flexible signer integration allowing you to customize transaction signing, implement custom signing flows, or integrate with hardware wallets and other signing solutions.

## Basic Signer Usage

```tsx
import { useSigner, useAccount } from '@luno-kit/react'

function SigningExample() {
  const { account } = useAccount()
  const { data: signer } = useSigner()
  
  const signTransaction = async () => {
    if (!signer || !account) return
    
    try {
      // Create a simple transfer transaction
      const transfer = {
        dest: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        value: '1000000000000', // 1 DOT in Planck units
      }
      
      // Sign the transaction
      const signature = await signer.signPayload({
        address: account.address,
        method: transfer,
        era: '0x00', // Immortal transaction
        nonce: 0,
        tip: 0,
        specVersion: 1000000,
        transactionVersion: 1,
        genesisHash: '0x91b171bb...',
        blockHash: '0x91b171bb...',
      })
      
      console.log('Transaction signed:', signature)
    } catch (error) {
      console.error('Signing failed:', error)
    }
  }
  
  return (
    <div>
      <button onClick={signTransaction} disabled={!signer}>
        Sign Transaction
      </button>
    </div>
  )
}
```

## Custom Signer Implementation

```tsx
import type { Signer, SignerPayload, SignerResult } from '@luno-kit/core'

class CustomSigner implements Signer {
  constructor(
    private account: Account,
    private signFunction: (payload: SignerPayload) => Promise<string>
  ) {}
  
  async signPayload(payload: SignerPayload): Promise<SignerResult> {
    try {
      // Validate payload
      this.validatePayload(payload)
      
      // Custom signing logic
      const signature = await this.signFunction(payload)
      
      return {
        id: Math.random(), // Unique request ID
        signature,
      }
    } catch (error) {
      throw new Error(`Signing failed: ${error.message}`)
    }
  }
  
  async signRaw(raw: SignerPayloadRaw): Promise<SignerResult> {
    try {
      // Sign raw bytes
      const signature = await this.signFunction({
        ...raw,
        type: 'bytes',
      })
      
      return {
        id: Math.random(),
        signature,
      }
    } catch (error) {
      throw new Error(`Raw signing failed: ${error.message}`)
    }
  }
  
  private validatePayload(payload: SignerPayload): void {
    if (payload.address !== this.account.address) {
      throw new Error('Address mismatch')
    }
    
    if (!payload.method) {
      throw new Error('Missing transaction method')
    }
    
    // Additional validation logic
  }
}

// Usage with custom signer
function CustomSignerProvider({ children }: { children: React.ReactNode }) {
  const { account } = useAccount()
  const [customSigner, setCustomSigner] = useState<CustomSigner | null>(null)
  
  useEffect(() => {
    if (account) {
      const signer = new CustomSigner(account, async (payload) => {
        // Implement your custom signing logic here
        // This could integrate with hardware wallets, HSMs, etc.
        return await window.myCustomSigningMethod(payload)
      })
      setCustomSigner(signer)
    }
  }, [account])
  
  return (
    <SignerContext.Provider value={customSigner}>
      {children}
    </SignerContext.Provider>
  )
}
```

## Hardware Wallet Integration

```tsx
import { LedgerSigner } from '@polkadot/ledger'

class LedgerSignerIntegration implements Signer {
  private ledgerSigner: LedgerSigner
  
  constructor(account: Account) {
    this.ledgerSigner = new LedgerSigner(account.address)
  }
  
  async signPayload(payload: SignerPayload): Promise<SignerResult> {
    try {
      // Show user confirmation dialog
      const confirmed = await this.showConfirmationDialog(payload)
      if (!confirmed) {
        throw new Error('User cancelled transaction')
      }
      
      // Sign with Ledger device
      const signature = await this.ledgerSigner.signPayload(payload)
      
      return {
        id: Date.now(),
        signature: signature.signature,
      }
    } catch (error) {
      if (error.message.includes('Transaction rejected')) {
        throw new Error('Transaction was rejected on Ledger device')
      }
      throw error
    }
  }
  
  async signRaw(raw: SignerPayloadRaw): Promise<SignerResult> {
    const signature = await this.ledgerSigner.signRaw(raw)
    return {
      id: Date.now(),
      signature: signature.signature,
    }
  }
  
  private async showConfirmationDialog(payload: SignerPayload): Promise<boolean> {
    return new Promise((resolve) => {
      // Show modal asking user to confirm on Ledger device
      const modal = document.createElement('div')
      modal.innerHTML = `
        <div class="ledger-confirmation">
          <h3>Confirm on Ledger Device</h3>
          <p>Please review and confirm the transaction on your Ledger device.</p>
          <button onclick="resolve(false)">Cancel</button>
        </div>
      `
      document.body.appendChild(modal)
      
      // Auto-resolve after user action or timeout
      setTimeout(() => {
        document.body.removeChild(modal)
        resolve(true)
      }, 30000) // 30 second timeout
    })
  }
}

// Ledger integration component
function LedgerWalletSupport() {
  const { account } = useAccount()
  const [ledgerSigner, setLedgerSigner] = useState<LedgerSignerIntegration | null>(null)
  const [isLedgerConnected, setIsLedgerConnected] = useState(false)
  
  const connectLedger = async () => {
    try {
      if (!account) return
      
      const signer = new LedgerSignerIntegration(account)
      await signer.connect() // Custom connect method
      
      setLedgerSigner(signer)
      setIsLedgerConnected(true)
    } catch (error) {
      console.error('Failed to connect Ledger:', error)
    }
  }
  
  return (
    <div className="ledger-integration">
      <h3>Hardware Wallet Support</h3>
      {!isLedgerConnected ? (
        <button onClick={connectLedger}>
          Connect Ledger Device
        </button>
      ) : (
        <div>
          <p>✅ Ledger device connected</p>
          <TransactionInterface signer={ledgerSigner} />
        </div>
      )}
    </div>
  )
}
```

## Multi-Signature Integration

```tsx
class MultiSigSigner implements Signer {
  constructor(
    private signers: Signer[],
    private threshold: number,
    private account: Account
  ) {}
  
  async signPayload(payload: SignerPayload): Promise<SignerResult> {
    const signatures: string[] = []
    
    // Collect signatures from multiple signers
    for (let i = 0; i < this.signers.length && signatures.length < this.threshold; i++) {
      try {
        const result = await this.signers[i].signPayload(payload)
        signatures.push(result.signature)
      } catch (error) {
        console.warn(`Signer ${i} failed:`, error.message)
      }
    }
    
    if (signatures.length < this.threshold) {
      throw new Error(`Insufficient signatures: ${signatures.length}/${this.threshold}`)
    }
    
    // Combine signatures according to your multi-sig scheme
    const combinedSignature = this.combineSignatures(signatures)
    
    return {
      id: Date.now(),
      signature: combinedSignature,
    }
  }
  
  async signRaw(raw: SignerPayloadRaw): Promise<SignerResult> {
    // Similar logic for raw signing
    const signatures: string[] = []
    
    for (let i = 0; i < this.signers.length && signatures.length < this.threshold; i++) {
      try {
        const result = await this.signers[i].signRaw(raw)
        signatures.push(result.signature)
      } catch (error) {
        console.warn(`Raw signer ${i} failed:`, error.message)
      }
    }
    
    if (signatures.length < this.threshold) {
      throw new Error(`Insufficient raw signatures: ${signatures.length}/${this.threshold}`)
    }
    
    return {
      id: Date.now(),
      signature: this.combineSignatures(signatures),
    }
  }
  
  private combineSignatures(signatures: string[]): string {
    // Implement your multi-signature combination logic
    // This depends on your specific multi-sig scheme
    return signatures.join(':')
  }
}

// Multi-sig wallet interface
function MultiSigWallet() {
  const { account } = useAccount()
  const [signers, setSigners] = useState<Signer[]>([])
  const [threshold, setThreshold] = useState(2)
  
  const addSigner = async (signerType: 'ledger' | 'trezor' | 'polkadotjs') => {
    let newSigner: Signer
    
    switch (signerType) {
      case 'ledger':
        newSigner = new LedgerSignerIntegration(account!)
        break
      case 'trezor':
        newSigner = new TrezorSignerIntegration(account!)
        break
      case 'polkadotjs':
        newSigner = await getPolkadotJSSigner(account!)
        break
      default:
        return
    }
    
    setSigners(prev => [...prev, newSigner])
  }
  
  const multiSigSigner = useMemo(() => {
    if (signers.length >= threshold && account) {
      return new MultiSigSigner(signers, threshold, account)
    }
    return null
  }, [signers, threshold, account])
  
  return (
    <div className="multisig-wallet">
      <h3>Multi-Signature Wallet</h3>
      
      <div className="multisig-config">
        <label>
          Threshold: 
          <input 
            type="number" 
            value={threshold} 
            onChange={(e) => setThreshold(Number(e.target.value))}
            min={1}
            max={signers.length}
          />
        </label>
        
        <div className="signer-list">
          <h4>Signers ({signers.length})</h4>
          {signers.map((signer, index) => (
            <div key={index} className="signer-item">
              Signer {index + 1}: {signer.constructor.name}
            </div>
          ))}
        </div>
        
        <div className="add-signers">
          <button onClick={() => addSigner('ledger')}>Add Ledger</button>
          <button onClick={() => addSigner('trezor')}>Add Trezor</button>
          <button onClick={() => addSigner('polkadotjs')}>Add Polkadot{.js}</button>
        </div>
      </div>
      
      {multiSigSigner && (
        <TransactionInterface signer={multiSigSigner} />
      )}
    </div>
  )
}
```

## Batch Signing

```tsx
class BatchSigner implements Signer {
  constructor(private baseSigner: Signer) {}
  
  async signPayload(payload: SignerPayload): Promise<SignerResult> {
    return this.baseSigner.signPayload(payload)
  }
  
  async signRaw(raw: SignerPayloadRaw): Promise<SignerResult> {
    return this.baseSigner.signRaw(raw)
  }
  
  async signBatch(payloads: SignerPayload[]): Promise<SignerResult[]> {
    const results: SignerResult[] = []
    
    for (const payload of payloads) {
      try {
        const result = await this.signPayload(payload)
        results.push(result)
      } catch (error) {
        // Handle individual signing failures
        results.push({
          id: Date.now(),
          signature: '',
          error: error.message,
        })
      }
    }
    
    return results
  }
}

// Batch transaction interface
function BatchTransactionInterface() {
  const { account } = useAccount()
  const { data: signer } = useSigner()
  const [transactions, setTransactions] = useState<SignerPayload[]>([])
  const [batchResults, setBatchResults] = useState<SignerResult[]>([])
  
  const addTransaction = () => {
    const newTx: SignerPayload = {
      address: account!.address,
      method: {
        dest: '',
        value: '0',
      },
      nonce: transactions.length,
      // ... other required fields
    }
    setTransactions(prev => [...prev, newTx])
  }
  
  const signAllTransactions = async () => {
    if (!signer || transactions.length === 0) return
    
    const batchSigner = new BatchSigner(signer)
    try {
      const results = await batchSigner.signBatch(transactions)
      setBatchResults(results)
    } catch (error) {
      console.error('Batch signing failed:', error)
    }
  }
  
  return (
    <div className="batch-signing">
      <h3>Batch Transaction Signing</h3>
      
      <div className="transaction-list">
        {transactions.map((tx, index) => (
          <TransactionEditor
            key={index}
            transaction={tx}
            onChange={(updatedTx) => {
              const newTxs = [...transactions]
              newTxs[index] = updatedTx
              setTransactions(newTxs)
            }}
          />
        ))}
      </div>
      
      <div className="batch-controls">
        <button onClick={addTransaction}>Add Transaction</button>
        <button 
          onClick={signAllTransactions}
          disabled={transactions.length === 0}
        >
          Sign All ({transactions.length})
        </button>
      </div>
      
      {batchResults.length > 0 && (
        <div className="batch-results">
          <h4>Signing Results</h4>
          {batchResults.map((result, index) => (
            <div key={index} className="result-item">
              Transaction {index + 1}: {result.error ? 'Failed' : 'Success'}
              {result.error && <span className="error">({result.error})</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

## Signing Hooks

```tsx
// Custom hook for enhanced signing
function useEnhancedSigning() {
  const { data: signer } = useSigner()
  const { account } = useAccount()
  const [signingHistory, setSigningHistory] = useState<SigningRecord[]>([])
  
  const signWithLogging = useCallback(async (payload: SignerPayload) => {
    if (!signer || !account) throw new Error('No signer available')
    
    const startTime = Date.now()
    
    try {
      const result = await signer.signPayload(payload)
      
      // Log successful signing
      const record: SigningRecord = {
        id: result.id,
        timestamp: new Date(),
        address: account.address,
        success: true,
        duration: Date.now() - startTime,
        method: payload.method,
      }
      
      setSigningHistory(prev => [record, ...prev.slice(0, 99)]) // Keep last 100
      
      return result
    } catch (error) {
      // Log failed signing
      const record: SigningRecord = {
        id: Date.now(),
        timestamp: new Date(),
        address: account.address,
        success: false,
        duration: Date.now() - startTime,
        error: error.message,
        method: payload.method,
      }
      
      setSigningHistory(prev => [record, ...prev.slice(0, 99)])
      
      throw error
    }
  }, [signer, account])
  
  return {
    signWithLogging,
    signingHistory,
    clearHistory: () => setSigningHistory([]),
  }
}

// Signing analytics component
function SigningAnalytics() {
  const { signingHistory } = useEnhancedSigning()
  
  const stats = useMemo(() => {
    const total = signingHistory.length
    const successful = signingHistory.filter(r => r.success).length
    const avgDuration = signingHistory.reduce((sum, r) => sum + r.duration, 0) / total || 0
    
    return {
      total,
      successful,
      failed: total - successful,
      successRate: total > 0 ? (successful / total * 100).toFixed(1) : '0',
      avgDuration: avgDuration.toFixed(0),
    }
  }, [signingHistory])
  
  return (
    <div className="signing-analytics">
      <h3>Signing Analytics</h3>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Signatures</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{stats.successRate}%</div>
          <div className="stat-label">Success Rate</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{stats.avgDuration}ms</div>
          <div className="stat-label">Avg Duration</div>
        </div>
      </div>
      
      <div className="recent-activity">
        <h4>Recent Activity</h4>
        {signingHistory.slice(0, 10).map((record) => (
          <div key={record.id} className="activity-item">
            <span className={`status ${record.success ? 'success' : 'error'}`}>
              {record.success ? '✅' : '❌'}
            </span>
            <span className="timestamp">
              {record.timestamp.toLocaleTimeString()}
            </span>
            <span className="method">
              {JSON.stringify(record.method)}
            </span>
            <span className="duration">{record.duration}ms</span>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Best Practices

### 1. Error Handling
Always provide comprehensive error handling for signing operations:

```tsx
const robustSigning = async (payload: SignerPayload) => {
  try {
    return await signer.signPayload(payload)
  } catch (error) {
    if (error.code === 'USER_REJECTED') {
      throw new Error('Transaction was cancelled by user')
    } else if (error.code === 'INSUFFICIENT_BALANCE') {
      throw new Error('Insufficient balance for transaction')
    } else if (error.code === 'NETWORK_ERROR') {
      throw new Error('Network connection failed. Please try again.')
    }
    throw new Error(`Signing failed: ${error.message}`)
  }
}
```

### 2. Payload Validation
Validate all signing payloads before processing:

```tsx
const validatePayload = (payload: SignerPayload): void => {
  if (!payload.address) throw new Error('Missing address')
  if (!payload.method) throw new Error('Missing method')
  if (typeof payload.nonce !== 'number') throw new Error('Invalid nonce')
  if (typeof payload.tip !== 'number') throw new Error('Invalid tip')
}
```

### 3. Security Considerations
- Never log sensitive signing data
- Validate all inputs thoroughly
- Use secure communication channels for hardware wallets
- Implement proper timeout handling

## Related Documentation

- [useSigner Hook](/hooks/transaction/use-signer) - Signer hook reference
- [Transaction Hooks](/hooks/transaction/) - Transaction-related hooks
- [Custom Wallets](/advanced/custom-wallets) - Custom wallet integration