import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LunoKit',
  description: 'React library for Polkadot wallet connections',
  head: [
    ['link', { rel: 'icon', href: '/logo-light.svg' }],
    ['meta', { name: 'theme-color', content: '#E6007A' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'LunoKit | React library for Polkadot wallet connections' }],
    ['meta', { property: 'og:site_name', content: 'LunoKit' }],
    ['meta', { property: 'og:url', content: 'https://docs.lunolab.xyz/' }],
  ],

  themeConfig: {
    logo: { src: '/logo-light.svg', width: 24, height: 24 },

    nav: [
      { text: 'Guide', link: '/overview/introduction', activeMatch: '/overview/|/getting-started/' },
      { text: 'Hooks', link: '/hooks/connection/use-connect', activeMatch: '/hooks/' },
      { text: 'Advanced', link: '/advanced/custom-connect-button', activeMatch: '/advanced/' },
      { text: 'Examples', link: '/examples/vite', activeMatch: '/examples/' },
      { text: 'Faq', link: '/faq/runtime-errors', activeMatch: '/faq/' },
      { text: 'DeepWiki', link: 'https://deepwiki.com/Luno-lab/LunoKit', target: '_blank' }
    ],

    sidebar: {
      '/overview/': [
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
          text: '🌐 Chain',
          items: [
            { text: 'useChain', link: '/hooks/chain/use-chain' },
            { text: 'useChains', link: '/hooks/chain/use-chains' },
            { text: 'useSwitchChain', link: '/hooks/chain/use-switch-chain' },
            { text: 'useGenesisHash', link: '/hooks/chain/use-genesis-hash' },
            { text: 'useSs58Format', link: '/hooks/chain/use-ss58-format' }
          ]
        },
        {
          text: '💸 Transaction',
          items: [
            { text: 'useSendTransaction', link: '/hooks/transaction/use-send-transaction' },
            { text: 'useSendTransactionHash', link: '/hooks/transaction/use-send-transaction-hash' },
            { text: 'useSignMessage', link: '/hooks/transaction/use-sign-message' },
            { text: 'useSigner', link: '/hooks/transaction/use-signer' }
          ]
        },
        {
          text: '📊 Data',
          items: [
            { text: 'useApi', link: '/hooks/data/use-api' },
            { text: 'useBlockNumber', link: '/hooks/data/use-block-number' },
            { text: 'useRuntimeVersion', link: '/hooks/data/use-runtime-version' },
            { text: 'useSubscription', link: '/hooks/data/use-subscription' }
          ]
        },
        {
          text: '⚙️ Config',
          items: [
            { text: 'useConfig', link: '/hooks/config/use-config' }
          ]
        }
      ],

      '/advanced/': [
        {
          text: '🔧 Advanced',
          items: [
            { text: 'Custom ConnectButton', link: '/advanced/custom-connect-button' },
            { text: 'Custom Wallets', link: '/advanced/custom-wallets' },
            { text: 'Custom Chains', link: '/advanced/custom-chains' },
            { text: 'Custom Theme', link: '/advanced/custom-theme' },
            { text: 'React Hooks Only', link: '/advanced/hooks-only' },
            { text: 'Signer Integration', link: '/advanced/signer-integration' }
          ]
        }
      ],

      '/examples/': [
        {
          text: '💡 Framework Examples',
          items: [
            { text: 'Vite', link: '/examples/vite' },
            { text: 'Next.js App Router', link: '/examples/nextjs-app' },
            { text: 'Next.js Pages Router', link: '/examples/nextjs-pages' },
            { text: 'Create React App', link: '/examples/cra' }
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
      { icon: 'x', link: 'https://x.com/lunolab_xyz' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Luno Lab'
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
