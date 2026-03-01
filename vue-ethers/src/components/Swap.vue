<script setup lang="ts">
/**
 * Swap.vue — Core TokenFlight Swap integration
 *
 * This component is the single reference for integrating TokenFlight Swap
 * with Vue 3 + ethers.js. It handles:
 *
 *  1. Registering the <tokenflight-swap> web component via `registerElements()`
 *  2. Creating an `EthersWalletAdapter` from `window.ethereum`
 *  3. Listening for theme/locale changes and forwarding them to the widget
 *
 * No other file is needed to understand the full integration.
 */
import { onMounted, onUnmounted } from 'vue';
import { SUPPORTED_LOCALES } from '@/constants';

/* ── Constants ── */

const VALID_THEMES = new Set(['dark', 'light']);

/* ── Helpers ── */

const getSwapEl = (): HTMLElement | null => document.getElementById('swap-widget');

const getInitialTheme = (): string =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

/* ── Theme & locale event handlers ── */

const handleThemeChange = (e: Event) => {
  if (!(e instanceof CustomEvent) || typeof e.detail?.theme !== 'string') return;
  const { theme } = e.detail;
  if (!VALID_THEMES.has(theme)) return;
  getSwapEl()?.setAttribute('theme', theme);
};

const handleLocaleChange = (e: Event) => {
  if (!(e instanceof CustomEvent) || typeof e.detail?.locale !== 'string') return;
  const { locale } = e.detail;
  if (!SUPPORTED_LOCALES.some((l) => l.value === locale)) return;
  getSwapEl()?.setAttribute('locale', locale);
};

/* ── Lifecycle ── */

onMounted(async () => {
  // Register event listeners for theme/locale toggling
  window.addEventListener('theme-change', handleThemeChange);
  window.addEventListener('locale-change', handleLocaleChange);

  // Guard: a wallet extension must be present
  if (!window.ethereum) return;

  try {
    // Dynamically import TokenFlight packages
    const [{ registerElements }, { EthersWalletAdapter }] = await Promise.all([
      import('@tokenflight/swap'),
      import('@tokenflight/adapter-ethers'),
    ]);

    // Register the <tokenflight-swap> custom element with ethers adapter
    registerElements({
      walletAdapter: new EthersWalletAdapter(window.ethereum),
      customColors: {
        '--tf-font-family': "'Inter', sans-serif",
        '--tf-font-family-mono': "'JetBrains Mono', monospace",
      },
    });
  } catch (err: unknown) {
    console.error('Failed to initialize swap widget:', err);
  }
});

onUnmounted(() => {
  window.removeEventListener('theme-change', handleThemeChange);
  window.removeEventListener('locale-change', handleLocaleChange);
});
</script>

<template>
  <div class="w-full max-w-120 flex justify-center items-center">
    <tokenflight-swap
      id="swap-widget"
      :theme="getInitialTheme()"
      style="display: block; width: 100%"
    />
  </div>
</template>
