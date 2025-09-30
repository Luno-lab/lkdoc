import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

export default defineConfig({
  title: 'LunoKit',
  description: 'React library for Polkadot wallet connections',
  vite: {
    plugins: [groupIconVitePlugin()]
  },

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/logo-light.svg' }],
    ['meta', { name: 'theme-color', content: '#E6007A' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'LunoKit | React library for Polkadot wallet connections' }],
    ['meta', { property: 'og:description', content: 'React library for Polkadot wallet connections' }],
    ['meta', { property: 'og:site_name', content: 'LunoKit' }],
    ['meta', { property: 'og:url', content: 'https://docs.lunolab.xyz/' }],
    ['meta', { property: 'og:image', content: 'https://docs.lunolab.xyz/og-image.png' }],
    ['meta', { property: 'og:image:width', content: '800' }],
    ['meta', { property: 'og:image:height', content: '420' }],
    ['meta', { property: 'og:image:alt', content: 'LunoKit - React library for Polkadot wallet connections' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'LunoKit | React library for Polkadot wallet connections' }],
    ['meta', { name: 'twitter:description', content: 'React library for Polkadot wallet connections' }],
    ['meta', { name: 'twitter:image', content: 'https://docs.lunolab.xyz/og-image.png' }],
  ],

  themeConfig: {
    logo: { src: '/logo-light.svg', width: 24, height: 24 },

    nav: [
      { text: 'Guide', link: '/overview/introduction', activeMatch: '/overview/|/getting-started/' },
      { text: 'Hooks', link: '/hooks/connection/use-connect', activeMatch: '/hooks/' },
      { text: 'Examples', link: '/examples/vite', activeMatch: '/examples/' },
      { text: 'FAQ', link: '/faq/runtime-errors', activeMatch: '/faq/' },
      { text: 'DeepWiki', link: 'https://deepwiki.com/Luno-lab/LunoKit', target: '_blank' }
    ],

    outline: [2,3],
    sidebar: {
      '/overview/': [
        {
          text: '📖 Overview',
          items: [
            { text: 'Introduction', link: '/overview/introduction' },
            { text: 'IntegrationModes', link: '/overview/integration-modes' },
          ]
        },
        {
          text: '🚀 Getting Started',
          items: [
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'ConnectButton', link: '/getting-started/connect-button' },
            { text: 'Modal Sizes', link: '/getting-started/modal-sizes' },
            { text: 'Chains', link: '/getting-started/chains' },
            { text: 'Wallets', link: '/getting-started/wallets' },
            { text: 'Theming', link: '/getting-started/theming' },
          ]
        },
        {
          text: '🔧 Advanced',
          items: [
            { text: 'Custom ConnectButton', link: '/getting-started/custom-connect-button' },
            { text: 'Custom Wallet', link: '/getting-started/custom-wallet' },
            { text: 'Custom Chains', link: '/getting-started/custom-chains' },
            { text: 'Custom Theme', link: '/getting-started/custom-theme' },
          ]
        }
      ],

      '/getting-started/': [
        {
          text: '📖 Overview',
          items: [
            { text: 'Introduction', link: '/overview/introduction' }
          ]
        },
        {
          text: '🚀 Getting Started',
          items: [
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'ConnectButton', link: '/getting-started/connect-button' },
            { text: 'Modal Sizes', link: '/getting-started/modal-sizes' },
            { text: 'Chains', link: '/getting-started/chains' },
            { text: 'Wallets', link: '/getting-started/wallets' },
            { text: 'Theming', link: '/getting-started/theming' },
          ]
        },
        {
          text: '🔧 Advanced',
          items: [
            { text: 'Custom ConnectButton', link: '/getting-started/custom-connect-button' },
            { text: 'Custom Wallet', link: '/getting-started/custom-wallet' },
            { text: 'Custom Chains', link: '/getting-started/custom-chains' },
            { text: 'Custom Theme', link: '/getting-started/custom-theme' },
          ]
        }
      ],

      '/hooks/': [
        {
          text: '🔌 Connection',
          items: [
            { text: 'useConnect', link: '/hooks/connection/use-connect' },
            { text: 'useDisconnect', link: '/hooks/connection/use-disconnect' },
            { text: 'useStatus', link: '/hooks/connection/use-status' },
            { text: 'useConnectors', link: '/hooks/connection/use-connectors' },
            { text: 'useActiveConnector', link: '/hooks/connection/use-active-connector' }
          ]
        },
        {
          text: '👤 Account',
          items: [
            { text: 'useAccount', link: '/hooks/account/use-account' },
            { text: 'useAccounts', link: '/hooks/account/use-accounts' },
            { text: 'useBalance', link: '/hooks/account/use-balance' }
          ]
        },
        {
          text: '⚡ Api Client',
          items: [
            { text: 'useApi', link: '/hooks/api/use-api' }
          ]
        },
        {
          text: '🌐 Chain',
          items: [
            { text: 'useChain', link: '/hooks/chain/use-chain' },
            { text: 'useChains', link: '/hooks/chain/use-chains' },
            { text: 'useSwitchChain', link: '/hooks/chain/use-switch-chain' },
          ]
        },
        {
          text: '💸 Transaction',
          items: [
            { text: 'useSendTransaction', link: '/hooks/transaction/use-send-transaction' },
            { text: 'useSendTransactionHash', link: '/hooks/transaction/use-send-transaction-hash' },
            { text: 'useEstimatePaymentInfo', link: '/hooks/transaction/use-estimate-payment-info' },
            { text: 'useSignMessage', link: '/hooks/transaction/use-sign-message' },
            { text: 'useSigner', link: '/hooks/transaction/use-signer' },
            { text: 'usePapiSigner', link: '/hooks/transaction/use-papi-signer' }
          ]
        },
        {
          text: '📊 Data',
          items: [
            { text: 'useBlockNumber', link: '/hooks/data/use-block-number' },
            { text: 'useRuntimeVersion', link: '/hooks/data/use-runtime-version' },
            { text: 'useGenesisHash', link: '/hooks/data/use-genesis-hash' },
            { text: 'useSs58Format', link: '/hooks/data/use-ss58-format' },
            { text: 'useSubscription', link: '/hooks/data/use-subscription' },
            { text: 'useConfig', link: '/hooks/data/use-config' },
          ]
        },
      ],
      '/examples/': [
        {
          text: '💡 Framework Examples',
          items: [
            { text: 'Vite', link: '/examples/vite' },
            { text: 'Next.js App Router', link: '/examples/nextjs-app' },
            { text: 'Next.js Pages Router', link: '/examples/nextjs-pages' },
            { text: 'Create React App', link: '/examples/cra' },
            { text: 'Vite Papi', link: '/examples/vite-papi' },
          ]
        }
      ],

      '/faq/': [
        {
          text: '❓ FAQ',
          items: [
            { text: 'Runtime Errors', link: '/faq/runtime-errors' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Luno-lab/LunoKit' },
      { icon: 'x', link: 'https://x.com/lunolab_xyz' },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785L24 5.173c.321-1.236-.541-1.818-1.335-1.456z"/></svg>'
        },
        link: 'https://t.me/+sPFPCbmbG0gyYzE1'
      }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Luno Lab'
    },

    editLink: {
      pattern: 'https://github.com/Luno-lab/lkdoc/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    search: {
      provider: 'local'
    }
  }
})
