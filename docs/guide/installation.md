# Installation

LunoKit provides flexible installation options depending on your needs. You can install just the UI components, just the React hooks, or both together.

## Package Options

### UI Components + React Hooks (Recommended)

For most applications, you'll want both the UI components and React hooks:

::: code-group

```bash [pnpm]
pnpm add @luno-kit/ui @luno-kit/react @tanstack/react-query
```

```bash [yarn]
yarn add @luno-kit/ui @luno-kit/react @tanstack/react-query
```

```bash [npm]
npm install @luno-kit/ui @luno-kit/react @tanstack/react-query
```

:::

### React Hooks Only

If you prefer to build your own UI components:

::: code-group

```bash [pnpm]
pnpm add @luno-kit/react @tanstack/react-query
```

```bash [yarn]
yarn add @luno-kit/react @tanstack/react-query
```

```bash [npm]
npm install @luno-kit/react @tanstack/react-query
```

:::

## Dependencies

### Required Dependencies

- **`@tanstack/react-query`** - Used for state management and caching
- **React 18+** - LunoKit is built for modern React

### Peer Dependencies

These are automatically handled when you install LunoKit:

- `@polkadot/api` - Polkadot API client
- `@polkadot/extension-dapp` - Browser extension integration
- `@polkadot/util` - Polkadot utilities
- `@polkadot/util-crypto` - Cryptographic utilities

## TypeScript Support

LunoKit is built with TypeScript and includes full type definitions. No additional `@types` packages are needed.

If you're using TypeScript, make sure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## Framework Compatibility

LunoKit works with all major React frameworks:

- ✅ **Vite** - Full support
- ✅ **Next.js** (App Router) - Full support  
- ✅ **Next.js** (Pages Router) - Full support
- ✅ **Create React App** - Full support
- ✅ **Remix** - Full support

## Browser Support

LunoKit supports all modern browsers:

- Chrome/Chromium 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## Troubleshooting

### Common Issues

#### Module Resolution Issues

If you encounter module resolution issues, try adding this to your bundler config:

```js
// vite.config.js
export default {
  optimizeDeps: {
    include: ['@luno-kit/ui', '@luno-kit/react']
  }
}
```

#### Polyfill Issues

Some bundlers may require additional polyfills for Node.js modules. If you encounter issues, try:

::: code-group

```bash [pnpm]
pnpm add --dev @esbuild-plugins/node-globals-polyfill
```

```bash [yarn]
yarn add --dev @esbuild-plugins/node-globals-polyfill
```

```bash [npm]
npm install --save-dev @esbuild-plugins/node-globals-polyfill
```

:::

## Next Steps

Now that you have LunoKit installed, check out the [Quick Start Guide](/guide/getting-started) to begin integrating wallet functionality into your application.