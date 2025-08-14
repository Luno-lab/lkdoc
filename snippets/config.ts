import { createConfig, kusama, polkadot, polkadotjsConnector } from '@luno-kit/react'

const config = createConfig({
  appName: 'luno with-vite example',
  chains: [polkadot, kusama],
  connectors: [polkadotjsConnector()],
  autoConnect: true,
});
