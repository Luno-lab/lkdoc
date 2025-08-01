# Custom ConnectButton

Learn how to create completely custom wallet connection buttons while leveraging LunoKit's connection logic.

## Overview

While LunoKit's default `ConnectButton` covers most use cases, you might want to create a completely custom UI. LunoKit provides the underlying hooks and logic to build your own connect button from scratch.

## Basic Custom Button

```tsx
import { useConnect, useAccount, useDisconnect, ConnectionStatus } from '@luno-kit/react'

function CustomConnectButton() {
  const { connect, connectors, status } = useConnect()
  const { account } = useAccount()
  const { disconnect } = useDisconnect()
  
  // If connected, show account info
  if (status === ConnectionStatus.Connected && account) {
    return (
      <div className="custom-wallet-info">
        <div className="account-details">
          <span className="account-name">{account.name}</span>
          <span className="account-address">{account.formattedAddress}</span>
        </div>
        <button onClick={() => disconnect()} className="disconnect-btn">
          Disconnect
        </button>
      </div>
    )
  }
  
  // If not connected, show wallet options
  return (
    <div className="custom-connect-modal">
      <h3>Connect Wallet</h3>
      <div className="wallet-grid">
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect({ connectorId: connector.id })}
            className="wallet-option"
            disabled={!connector.installed}
          >
            <img src={connector.icon} alt={connector.name} />
            <span>{connector.name}</span>
            {!connector.installed && <span className="not-installed">Not Installed</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
```

## Advanced Custom Button with Modal

```tsx
import { useState } from 'react'
import { useConnect, useAccount, useBalance, ConnectionStatus } from '@luno-kit/react'

function AdvancedCustomButton() {
  const [showModal, setShowModal] = useState(false)
  const { connect, connectors, status, isPending } = useConnect()
  const { account } = useAccount()
  const { data: balance } = useBalance({ address: account?.address })
  
  if (status === ConnectionStatus.Connected && account) {
    return (
      <div className="advanced-wallet-display">
        <div className="wallet-summary" onClick={() => setShowModal(true)}>
          <div className="account-info">
            <div className="account-name">{account.name || 'Unnamed'}</div>
            <div className="account-address">{account.formattedAddress}</div>
          </div>
          {balance && (
            <div className="balance-info">
              <span className="balance-amount">{balance.formattedTransferable}</span>
              <span className="balance-symbol">{balance.symbol}</span>
            </div>
          )}
        </div>
        
        {showModal && (
          <AccountModal 
            account={account} 
            balance={balance}
            onClose={() => setShowModal(false)} 
          />
        )}
      </div>
    )
  }
  
  return (
    <div>
      <button 
        onClick={() => setShowModal(true)}
        className="custom-connect-trigger"
      >
        Connect Wallet
      </button>
      
      {showModal && (
        <ConnectModal
          connectors={connectors}
          onConnect={(connectorId) => {
            connect({ connectorId })
            setShowModal(false)
          }}
          onClose={() => setShowModal(false)}
          isPending={isPending}
        />
      )}
    </div>
  )
}

// Custom Modal Components
function ConnectModal({ connectors, onConnect, onClose, isPending }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Connect Wallet</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <div className="modal-body">
          <div className="wallet-list">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => onConnect(connector.id)}
                disabled={!connector.installed || isPending}
                className={`wallet-item ${!connector.installed ? 'disabled' : ''}`}
              >
                <img src={connector.icon} alt={connector.name} className="wallet-icon" />
                <div className="wallet-info">
                  <div className="wallet-name">{connector.name}</div>
                  <div className="wallet-status">
                    {connector.installed ? 'Ready to connect' : 'Not installed'}
                  </div>
                </div>
                {isPending && <div className="spinner" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AccountModal({ account, balance, onClose }) {
  const { disconnect } = useDisconnect()
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Account Details</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <div className="modal-body">
          <div className="account-details">
            <div className="account-section">
              <h3>Account</h3>
              <p><strong>Name:</strong> {account.name || 'Unnamed'}</p>
              <p><strong>Address:</strong> {account.address}</p>
              <button onClick={() => navigator.clipboard.writeText(account.address)}>
                Copy Address
              </button>
            </div>
            
            {balance && (
              <div className="balance-section">
                <h3>Balance</h3>
                <p><strong>Available:</strong> {balance.formattedTransferable} {balance.symbol}</p>
                <p><strong>Total:</strong> {balance.formattedTotal} {balance.symbol}</p>
              </div>
            )}
            
            <div className="actions-section">
              <button onClick={() => disconnect()} className="disconnect-btn">
                Disconnect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Styled Custom Button

```tsx
import styled from 'styled-components'

const StyledConnectButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const WalletDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  padding: 8px 16px;
  cursor: pointer;
  
  &:hover {
    border-color: #667eea;
  }
`

function StyledCustomButton() {
  const { connect, status } = useConnect()
  const { account } = useAccount()
  
  if (status === ConnectionStatus.Connected && account) {
    return (
      <WalletDisplay>
        <div>
          <div style={{ fontWeight: 600 }}>{account.name}</div>
          <div style={{ fontSize: 14, color: '#666' }}>{account.formattedAddress}</div>
        </div>
      </WalletDisplay>
    )
  }
  
  return (
    <StyledConnectButton 
      onClick={() => connect({ connectorId: 'polkadot-js' })}
    >
      Connect Polkadot Wallet
    </StyledConnectButton>
  )
}
```

## Integration with UI Libraries

### With Ant Design

```tsx
import { Button, Modal, Card, Avatar, Typography } from 'antd'
import { WalletOutlined, UserOutlined } from '@ant-design/icons'

function AntDesignConnectButton() {
  const [visible, setVisible] = useState(false)
  const { connect, connectors, status } = useConnect()
  const { account } = useAccount()
  
  if (status === ConnectionStatus.Connected && account) {
    return (
      <Card size="small" style={{ width: 300 }}>
        <Card.Meta
          avatar={<Avatar icon={<UserOutlined />} />}
          title={account.name || 'Connected Account'}
          description={account.formattedAddress}
        />
      </Card>
    )
  }
  
  return (
    <>
      <Button 
        type="primary" 
        icon={<WalletOutlined />}
        onClick={() => setVisible(true)}
        size="large"
      >
        Connect Wallet
      </Button>
      
      <Modal
        title="Connect Wallet"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {connectors.map(connector => (
          <Button
            key={connector.id}
            block
            size="large"
            style={{ marginBottom: 8 }}
            onClick={() => {
              connect({ connectorId: connector.id })
              setVisible(false)
            }}
            disabled={!connector.installed}
          >
            {connector.name}
          </Button>
        ))}
      </Modal>
    </>
  )
}
```

### With Material-UI

```tsx
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  List, 
  ListItem, 
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip
} from '@mui/material'
import { AccountBalanceWallet } from '@mui/icons-material'

function MaterialUIConnectButton() {
  const [open, setOpen] = useState(false)
  const { connect, connectors, status } = useConnect()
  const { account } = useAccount()
  
  if (status === ConnectionStatus.Connected && account) {
    return (
      <Chip
        avatar={<Avatar><AccountBalanceWallet /></Avatar>}
        label={`${account.name} (${account.formattedAddress})`}
        variant="outlined"
        color="primary"
      />
    )
  }
  
  return (
    <>
      <Button
        variant="contained"
        startIcon={<AccountBalanceWallet />}
        onClick={() => setOpen(true)}
      >
        Connect Wallet
      </Button>
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Connect Wallet</DialogTitle>
        <DialogContent>
          <List>
            {connectors.map(connector => (
              <ListItem key={connector.id} disablePadding>
                <ListItemButton
                  onClick={() => {
                    connect({ connectorId: connector.id })
                    setOpen(false)
                  }}
                  disabled={!connector.installed}
                >
                  <ListItemIcon>
                    <img src={connector.icon} width={24} height={24} alt={connector.name} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={connector.name}
                    secondary={connector.installed ? 'Ready' : 'Not installed'}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  )
}
```

## Best Practices

### Error Handling

```tsx
function RobustCustomButton() {
  const { connect, error, reset } = useConnect()
  const [showError, setShowError] = useState(false)
  
  useEffect(() => {
    if (error) {
      setShowError(true)
    }
  }, [error])
  
  const handleConnect = async (connectorId: string) => {
    try {
      reset() // Clear any previous errors
      await connect({ connectorId })
    } catch (err) {
      // Error will be handled by the error state
    }
  }
  
  return (
    <div>
      {/* Your custom button UI */}
      
      {showError && (
        <div className="error-banner">
          <p>Connection failed: {error?.message}</p>
          <button onClick={() => setShowError(false)}>Dismiss</button>
        </div>
      )}
    </div>
  )
}
```

### Loading States

```tsx
function LoadingAwareButton() {
  const { connect, isPending } = useConnect()
  
  return (
    <button 
      onClick={() => connect({ connectorId: 'polkadot-js' })}
      disabled={isPending}
      className={`connect-btn ${isPending ? 'loading' : ''}`}
    >
      {isPending ? (
        <>
          <Spinner />
          Connecting...
        </>
      ) : (
        'Connect Wallet'
      )}
    </button>
  )
}
```

## Related Hooks

- [`useConnect`](/hooks/connection/use-connect) - Connection logic
- [`useAccount`](/hooks/account/use-account) - Account information
- [`useDisconnect`](/hooks/connection/use-disconnect) - Disconnection logic
- [`useBalance`](/hooks/account/use-balance) - Account balance