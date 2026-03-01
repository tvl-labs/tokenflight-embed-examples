<!--
  Core Integration: Swap Widget Component
  ========================================
  Renders the <tokenflight-swap> web component and keeps its attributes
  in sync with the rest of the UI via custom events:
    - "theme-change"  (dispatched by ThemeToggle)
    - "locale-change" (dispatched by LocaleSelect)

  The web component is registered globally in plugins/appkit.client.ts
  via registerElements(), so it is available by the time this component mounts.
-->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const VALID_THEMES = new Set(['dark', 'light']);

const SUPPORTED_LOCALES = new Set([
  'en-US',
  'zh-CN',
  'zh-TW',
  'ja-JP',
  'ko-KR',
]);

const getSwapEl = (): HTMLElement | null => document.getElementById('swap-widget');

const getInitialTheme = (): string =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

const handleThemeChange = (e: Event) => {
  if (!(e instanceof CustomEvent) || typeof e.detail?.theme !== 'string') return;
  const { theme } = e.detail;
  if (!VALID_THEMES.has(theme)) return;
  getSwapEl()?.setAttribute('theme', theme);
};

const handleLocaleChange = (e: Event) => {
  if (!(e instanceof CustomEvent) || typeof e.detail?.locale !== 'string') return;
  const { locale } = e.detail;
  if (!SUPPORTED_LOCALES.has(locale)) return;
  getSwapEl()?.setAttribute('locale', locale);
};

onMounted(() => {
  window.addEventListener('theme-change', handleThemeChange);
  window.addEventListener('locale-change', handleLocaleChange);
});

onUnmounted(() => {
  window.removeEventListener('theme-change', handleThemeChange);
  window.removeEventListener('locale-change', handleLocaleChange);
});
</script>

<template>
  <tokenflight-swap
    id="swap-widget"
    :theme="getInitialTheme()"
    style="display: block; width: 100%"
  />
</template>
