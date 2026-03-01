# TokenFlight Swap -- Astro + Native JS

The simplest possible TokenFlight Swap integration. No framework islands required -- just vanilla JavaScript in an Astro static site.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/tvl-labs/tokenflight-embed-examples/tree/main/astro-native)

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start dev server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PUBLIC_WALLETCONNECT_PROJECT_ID` | Optional | WalletConnect/Reown project ID from [cloud.reown.com](https://cloud.reown.com) |

## Tech Stack

- **Astro 5** -- static site generation, zero JS by default
- **TailwindCSS v4** -- utility-first styling via Vite plugin
- **Reown AppKit** -- wallet connection (Web Component: `<appkit-button />`)
- **wagmi/core** -- vanilla JS chain/wallet configuration (no React hooks)
- **TokenFlight Swap** -- cross-chain swap widget (Web Component: `<tokenflight-swap />`)
- **TypeScript** -- strict mode

## Core Integration

The swap widget integration lives in a single self-contained component:

[src/components/Swap.astro](src/components/Swap.astro)

This is the file to look at to understand how to integrate TokenFlight Swap into your own project.

## How It Works

This example uses `registerElements()` to register the `<tokenflight-swap>` web component:

```ts
import { registerElements } from '@tokenflight/swap';
import { AppKitWalletAdapter } from '@tokenflight/adapter-appkit';

const walletAdapter = new AppKitWalletAdapter(appkit, {
  VersionedTransaction,
});

registerElements({
  walletAdapter,
  customColors: {
    '--tf-font-family': "'Inter', sans-serif",
    '--tf-font-family-mono': "'JetBrains Mono', monospace",
  },
});
```

Once registered, drop `<tokenflight-swap theme="dark" />` anywhere in your HTML. The widget handles chain selection, token picking, and swap execution. Locale can be set via the `locale` attribute (e.g. `locale="zh-CN"`).

All client-side code lives in a single Astro `<script>` tag inside the Swap component, which Vite bundles as an ES module. No React, Vue, or Svelte islands are needed.

## Deployment

### Vercel

```bash
npx vercel
```

### Netlify

```bash
npx netlify deploy --build
```

### Cloudflare Pages

```bash
npx wrangler pages deploy dist
```

## Project Structure

```
astro-native/
  src/
    components/
      Swap.astro            # Core integration — swap widget + AppKit init
      ThemeToggle.astro      # Light/dark theme toggle button
    layouts/Layout.astro     # HTML shell, nav, footer
    pages/index.astro        # Home page (composes Layout + Swap)
    styles/global.css        # TailwindCSS v4 + custom styles
  public/
    favicon.svg
  astro.config.mjs
  package.json
  tsconfig.json
```
