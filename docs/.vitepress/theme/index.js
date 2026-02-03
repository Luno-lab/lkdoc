import Theme from 'vitepress/theme'
import { h } from 'vue'
import './custom.css'
import 'virtual:group-icons.css'

const SupportBadge = () =>
  h('div', { class: 'support-badge' }, [
    h('span', { class: 'support-badge__logo' }, [
      h('img', {
        src: '/web3%20foundation_grants_badge_black.svg',
        alt: 'Web3 Foundation Grants badge'
      })
    ])
  ])

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'home-features-after': () =>
        h('div', { class: 'support-badge-wrap' }, [h(SupportBadge)])
    })
  }
}
