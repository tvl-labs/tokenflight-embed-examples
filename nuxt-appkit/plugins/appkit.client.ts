import { createAppKit } from '@reown/appkit/vue';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';
import { mainnet, base, arbitrum, optimism, polygon, solana } from '@reown/appkit/networks';
import type { AppKitNetwork } from '@reown/appkit/networks';
import { VersionedTransaction } from '@solana/web3.js';
import { registerElements } from '@tokenflight/swap';
import { AppKitWalletAdapter } from '@tokenflight/adapter-appkit';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const projectId = (config.public.walletConnectProjectId as string) || 'PLACEHOLDER_PROJECT_ID';

  const evmChains = [mainnet, base, arbitrum, optimism, polygon] as unknown as AppKitNetwork[];
  const allNetworks = [mainnet, base, arbitrum, optimism, polygon, solana] as unknown as [AppKitNetwork, ...AppKitNetwork[]];

  const wagmiAdapter = new WagmiAdapter({
    projectId,
    networks: evmChains,
  });

  const solanaAdapter = new SolanaAdapter();

  const appkit = createAppKit({
    adapters: [wagmiAdapter, solanaAdapter],
    networks: allNetworks,
    defaultNetwork: mainnet,
    projectId,
    metadata: {
      name: 'TokenFlight Swap',
      description: 'Cross-chain token swaps powered by TokenFlight',
      url: window.location.origin,
      icons: ['https://tokenflight.xyz/favicon.ico'],
    },
    features: {
      analytics: false,
    },
  });

  // Listen for theme changes from ThemeToggle
  window.addEventListener('theme-change', (e) => {
    const theme = (e as CustomEvent<{ theme: string }>).detail.theme;
    appkit.setThemeMode(theme as 'dark' | 'light');
  });

  // Register TokenFlight custom elements with Solana support
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
});
