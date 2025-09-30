import { createConfig } from '@luno-kit/react'
import { polkadotjsConnector } from '@luno-kit/react/connectors'

const config = createConfig({
  appName: 'luno with-vite example',
  connectors: [polkadotjsConnector()],
  autoConnect: true,
});
