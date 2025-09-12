import { createConfig } from '@luno-kit/react'
import { polkadot, kusama } from '@luno-kit/react/chains'
import { polkadotjsConnector } from '@luno-kit/react/connectors'

const config = createConfig({
  appName: 'luno with-vite example',
  chains: [polkadot, kusama],
  connectors: [polkadotjsConnector()],
  autoConnect: true,
});
