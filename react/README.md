# TokenFlight Swap - TanStack Start + AppKit

Cross-chain token swap widget powered by TokenFlight, built with TanStack Start, Reown AppKit, and wagmi.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/tvl-labs/tokenflight-embed-examples/tree/main/react)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Core Integration

The swap widget integration lives in a single self-contained component:

[app/components/swap-widget.tsx](app/components/swap-widget.tsx)

This file handles dynamic import of `@tokenflight/swap`, wallet adapter setup via `@tokenflight/adapter-appkit`, and rendering the `<tokenflight-swap>` web component. Start here to understand how TokenFlight is wired into the app.

## Tech Stack

- [TanStack Start](https://tanstack.com/start) (full-stack React framework powered by Vinxi)
- [Reown AppKit](https://reown.com/appkit) + [wagmi v2](https://wagmi.sh/) + [viem](https://viem.sh/)
- [TokenFlight Swap](https://tokenflight.xyz/) + AppKit adapter
- [TailwindCSS v4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/) (strict mode)

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_WALLETCONNECT_PROJECT_ID` | WalletConnect Project ID from [Reown](https://cloud.reown.com) | Optional |

## Project Structure

```
app/
  client.tsx          # Client-side hydration entry
  ssr.tsx             # Server-side rendering entry
  router.tsx          # TanStack Router setup
  routes/
    __root.tsx        # Root layout (HTML shell, providers)
    index.tsx         # Home page (composes Layout + SwapWidget)
  components/
    Layout.tsx        # App shell (nav, footer, appkit-button)
    swap-widget.tsx   # TokenFlight Swap web component wrapper
    providers.tsx     # WagmiProvider + QueryClientProvider
    ThemeToggle.tsx   # Light/dark theme toggle
    LocaleSelect.tsx  # Locale selector for swap widget
  lib/
    wagmi.ts          # wagmi + AppKit configuration
  styles/
    globals.css       # TailwindCSS v4 + custom styles
  types/
    custom-elements.d.ts  # Web Component type declarations
```

## Deployment

### Vercel

```bash
npx vercel
```

### Netlify

```bash
npx netlify deploy --build
```

### Cloudflare

```bash
npx wrangler pages deploy .output/public
```
