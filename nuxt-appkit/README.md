# TokenFlight Swap - Nuxt + AppKit

A standalone example demonstrating cross-chain token swaps using [TokenFlight Swap](https://tokenflight.xyz), [Nuxt 4](https://nuxt.com), and [Reown AppKit](https://reown.com/appkit).

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/tvl-labs/tokenflight-embed-examples/tree/main/nuxt-appkit)

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Core Integration

Start here to understand how TokenFlight Swap is wired up:

- [`components/Swap.vue`](components/Swap.vue) -- Swap widget component (renders `<tokenflight-swap>`, syncs theme and locale)
- [`plugins/appkit.client.ts`](plugins/appkit.client.ts) -- AppKit + `registerElements()` initialization (client-only)

## Tech Stack

| Package | Purpose |
| --- | --- |
| `nuxt` v4 | Vue meta-framework (SSR/SPA) |
| `@tokenflight/swap` | Cross-chain swap widget |
| `@tokenflight/adapter-appkit` | AppKit wallet adapter for TokenFlight |
| `@reown/appkit` | Wallet connection modal (WalletConnect v2) |
| `@reown/appkit-adapter-wagmi` | Wagmi integration for AppKit |
| `viem` | TypeScript Ethereum library |
| `tailwindcss` | Utility-first CSS (v4) |

## Project Structure

```
nuxt-appkit/
├── app.vue                        # Root component
├── assets/css/main.css            # Global styles + TailwindCSS v4
├── components/
│   ├── Swap.vue                   # Swap widget (core integration)
│   ├── ThemeToggle.vue            # Dark/light theme toggle
│   └── LocaleSelect.vue          # Language selector
├── layouts/default.vue            # Nav + footer layout
├── pages/index.vue                # Home page (renders Swap)
├── plugins/appkit.client.ts       # AppKit initialization (client-only)
├── nuxt.config.ts                 # Nuxt configuration
└── package.json
```

## Environment Variables

| Variable | Description | Required |
| --- | --- | --- |
| `NUXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect / Reown project ID | Optional (get one at [cloud.reown.com](https://cloud.reown.com)) |

## How It Works

1. **AppKit Plugin** (`plugins/appkit.client.ts`) -- Initializes Reown AppKit with Wagmi and Solana adapters, configured for Ethereum mainnet, Base, Arbitrum, Optimism, Polygon, and Solana. Calls `registerElements()` to make the `<tokenflight-swap>` web component available. Runs only on the client side.

2. **Swap Component** (`components/Swap.vue`) -- Renders the `<tokenflight-swap>` web component and listens for `theme-change` and `locale-change` custom events to keep the widget attributes in sync with the UI.

3. **Layout** (`layouts/default.vue`) -- Provides the navigation bar with `<appkit-button />` for wallet connection, `ThemeToggle`, `LocaleSelect`, and a footer.

4. **Home Page** (`pages/index.vue`) -- Renders the `Swap` component inside a centered container.

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
npm run build
npx wrangler pages deploy .output/public
```

## License

MIT
