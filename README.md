# TokenFlight Swap — Integration Examples

Production-grade examples for integrating the [TokenFlight Swap](https://embed.tokenflight.ai) cross-chain swap widget across different frontend stacks.

Each example is a **fully standalone project** — copy any directory, install dependencies, and deploy.

## Examples

| Example | Stack | Wallet | Adapter |
|---------|-------|--------|---------|
| [`next-rainbowkit`](./next-rainbowkit) | Next.js 16 + React 19 | RainbowKit | `@tokenflight/adapter-wagmi` |
| [`react`](./react) | TanStack Start + Vinxi | Reown AppKit | `@tokenflight/adapter-appkit` |
| [`nuxt-appkit`](./nuxt-appkit) | Nuxt 4 + Vue 3 | Reown AppKit | `@tokenflight/adapter-appkit` |
| [`vue-ethers`](./vue-ethers) | Vite + Vue 3 | ethers.js v6 (direct) | `@tokenflight/adapter-ethers` |
| [`astro-native`](./astro-native) | Astro 5 + vanilla JS | Reown AppKit | `@tokenflight/adapter-appkit` |

## How It Works

TokenFlight Swap is a **Web Component** built with Shadow DOM encapsulation. It works with any framework.

Register the web component once, then use it anywhere in your HTML:

```ts
import { registerElements } from '@tokenflight/swap';
import { AppKitWalletAdapter } from '@tokenflight/adapter-appkit';

registerElements({
  walletAdapter: new AppKitWalletAdapter(appkit, { VersionedTransaction }),
});
```

```html
<tokenflight-swap theme="dark" locale="en"></tokenflight-swap>
```

### Wallet Adapters

| Package | Use With |
|---------|----------|
| `@tokenflight/adapter-wagmi` | wagmi, RainbowKit, ConnectKit |
| `@tokenflight/adapter-appkit` | Reown AppKit (WalletConnect) |
| `@tokenflight/adapter-ethers` | ethers.js v5/v6 direct |

## Quick Start

Pick an example and run it:

```bash
cd next-rainbowkit
npm install
npm run dev
```

No API key is required. The widget connects to the Hyperstream API with public rate limiting.

## Copy an Example

Each example is self-contained. To use one in your own project:

```bash
cp -r next-rainbowkit my-swap-app
cd my-swap-app
npm install
npm run dev
```

## Deploy

Every example includes deployment configs for:

- **Vercel** — `vercel.json`
- **Netlify** — `netlify.toml`
- **Cloudflare Pages** — `wrangler.toml`

## Environment Variables

All examples support an optional WalletConnect Project ID for wallet connectivity. Get one at [cloud.reown.com](https://cloud.reown.com).

| Framework | Variable |
|-----------|----------|
| Next.js | `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` |
| Nuxt | `NUXT_PUBLIC_WALLETCONNECT_PROJECT_ID` |
| Vite / TanStack Start | `VITE_WALLETCONNECT_PROJECT_ID` |
| Astro | `PUBLIC_WALLETCONNECT_PROJECT_ID` |

## Project Structure

```
next-rainbowkit/     # Next.js 16 + RainbowKit
react/               # TanStack Start + AppKit
nuxt-appkit/         # Nuxt 4 + AppKit
vue-ethers/          # Vite + Vue + ethers.js
astro-native/        # Astro + native JS
```

No monorepo. No shared packages. No workspace dependencies.

## License

MIT
