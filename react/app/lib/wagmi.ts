import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';
import {
  mainnet,
  base,
  arbitrum,
  optimism,
  polygon,
  solana,
} from '@reown/appkit/networks';
import type { AppKitNetwork } from '@reown/appkit/networks';

const FALLBACK_PROJECT_ID = '00000000000000000000000000000000';
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || FALLBACK_PROJECT_ID;

const evmChains = [mainnet, base, arbitrum, optimism, polygon] as unknown as AppKitNetwork[];
const allNetworks = [mainnet, base, arbitrum, optimism, polygon, solana] as unknown as [AppKitNetwork, ...AppKitNetwork[]];

const wagmiAdapter = new WagmiAdapter({
  networks: evmChains,
  projectId,
});

const solanaAdapter = new SolanaAdapter();

export const appkit = createAppKit({
  adapters: [wagmiAdapter, solanaAdapter],
  networks: allNetworks,
  defaultNetwork: mainnet,
  projectId,
  metadata: {
    name: 'TokenFlight Swap',
    description: 'Cross-chain token swap powered by TokenFlight',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://tokenflight.xyz',
    icons: ['https://tokenflight.xyz/favicon.ico'],
  },
  features: {
    analytics: false,
  },
  themeMode: 'dark',
});

if (typeof window !== 'undefined') {
  window.addEventListener('theme-change', (e) => {
    const theme = (e as CustomEvent<{ theme: string }>).detail.theme;
    appkit.setThemeMode(theme as 'dark' | 'light');
  });
}

export const wagmiConfig = wagmiAdapter.wagmiConfig;
