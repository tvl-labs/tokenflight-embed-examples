# TokenFlight Receive - Vue + Ethers

A standalone intent-based trading widget built with Vue 3, ethers.js v6, and TokenFlight Receive.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/tvl-labs/tokenflight-embed-examples/tree/main/vue-ethers)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in a browser with a wallet extension installed.

> **Note:** This example requires a browser wallet extension (e.g., [MetaMask](https://metamask.io)) for connecting to blockchain networks.

## Core Integration

**[src/components/Receive.vue](src/components/Receive.vue)** is the single file you need to understand the full TokenFlight Receive integration. It contains:

- `registerElements()` initialization with `EthersWalletAdapter`
- The `<tokenflight-receive>` web component
- Theme and locale event forwarding

Start here if you want to integrate TokenFlight Receive into your own Vue app.

## Tech Stack

- **Vue 3.5+** - Composition API with `<script setup>`
- **ethers.js v6** - Wallet connection via `BrowserProvider`
- **@tokenflight/embed** - Intent-based trading widget (Web Components)
- **@tokenflight/adapter-ethers** - ethers.js wallet adapter for TokenFlight
- **Vite 7** - Build tool
- **TailwindCSS v4** - Utility-first CSS
- **TypeScript** - Strict mode enabled

## Project Structure

```
src/
  components/
    Receive.vue         # Core integration — registerElements + <tokenflight-receive>
    Layout.vue          # App shell (nav, error banners, footer, slot)
    WalletButton.vue    # Wallet connect/disconnect button
    ThemeToggle.vue     # Dark/light theme toggle
    LocaleSelect.vue    # Locale picker
    ChainSelect.vue     # Chain selector
  composables/
    useWallet.ts        # Wallet connection composable (ethers v6)
  constants.ts          # Supported locales
  styles/
    main.css            # TailwindCSS v4 + custom styles
  App.vue               # Root component (assembles Layout + Receive)
  main.ts               # App entry point
```

## How It Works

1. **Wallet Detection** - Checks for `window.ethereum` (injected by MetaMask or similar)
2. **Element Registration** - Dynamically imports `@tokenflight/embed` and `@tokenflight/adapter-ethers`, then calls `registerElements()` with an `EthersWalletAdapter` to define the `<tokenflight-receive>` custom element
3. **Rendering** - Places `<tokenflight-receive>` in the template as a standard HTML element with `theme` and `locale` attributes
4. **Live Updates** - Listens for `theme-change` and `locale-change` custom events and forwards them to the widget via attribute changes

## Deployment

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Cloudflare Pages

```bash
npm i -g wrangler
wrangler pages deploy dist
```

## License

MIT
