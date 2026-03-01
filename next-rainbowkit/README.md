# TokenFlight Swap - Next.js + RainbowKit

Cross-chain token swap widget powered by TokenFlight, built with Next.js 16, RainbowKit, and wagmi.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/tvl-labs/tokenflight-embed-examples/tree/main/next-rainbowkit)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  layout.tsx              # Root layout (fonts + Providers)
  page.tsx                # Page entry point (Layout + SwapWidget)
  swap-widget.tsx         # Core TokenFlight integration
  providers.tsx           # RainbowKit + wagmi providers
  globals.css             # Global styles & theme variables
  components/
    Layout.tsx            # App shell (nav, footer, children slot)
    ThemeToggle.tsx        # Dark/light theme toggle
    LocaleSelect.tsx       # Language selector
  context/
    theme.tsx             # Theme context provider
    locale.tsx            # Locale context provider
```

## Core Integration

The swap widget integration lives in [app/swap-widget.tsx](app/swap-widget.tsx). It handles:

- Dynamic import of `@tokenflight/swap` and `@tokenflight/adapter-wagmi`
- One-time registration of custom elements via `registerElements()`
- Wiring the wagmi config through `WagmiWalletAdapter`
- Rendering the `<tokenflight-swap>` web component with theme and locale props

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [RainbowKit v2](https://www.rainbowkit.com/) + [wagmi v3](https://wagmi.sh/) + [viem](https://viem.sh/)
- [TokenFlight Swap](https://tokenflight.xyz/) + wagmi adapter
- [TailwindCSS v4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/) (strict mode)

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Project ID from [Reown](https://cloud.reown.com) | Optional |

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

Cloudflare Workers deployment requires [`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages) or [`opennextjs-cloudflare`](https://github.com/opennextjs/opennextjs-cloudflare). A minimal `wrangler.toml` is included as a starting point.

```bash
npx @cloudflare/next-on-pages
npx wrangler pages deploy .vercel/output/static
```
