<script setup lang="ts">
import { useWallet } from '@/composables/useWallet';
import ThemeToggle from '@/components/ThemeToggle.vue';
import LocaleSelect from '@/components/LocaleSelect.vue';
import ChainSelect from '@/components/ChainSelect.vue';
import WalletButton from '@/components/WalletButton.vue';

const { error, hasEthereum, clearError } = useWallet();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- Navigation -->
    <nav class="nav sticky top-0 z-50 border-b backdrop-blur-xl">
      <div class="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <div class="flex items-center gap-3">
          <span class="nav-title text-[15px] font-semibold tracking-tight">
            Swap
          </span>
          <span class="nav-badge rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide">
            Vue + Ethers
          </span>
        </div>

        <div class="flex items-center gap-4">
          <LocaleSelect />
          <ThemeToggle />
          <ChainSelect />
          <WalletButton />
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-12">
      <!-- Error banner -->
      <div
        v-if="error !== null"
        role="alert"
        class="error-banner flex w-full max-w-120 items-center gap-3 rounded-xl border px-4 py-3"
      >
        <p class="flex-1 text-[13px] leading-snug">{{ error }}</p>
        <button
          aria-label="Dismiss error"
          class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md hover:bg-red-500/10"
          @click="clearError"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <!-- No wallet warning -->
      <div
        v-if="!hasEthereum"
        role="status"
        class="warning-banner flex max-w-120 w-full items-center gap-2.5 rounded-xl border px-4 py-3 text-[13px]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
          <path d="M12 9v4" /><path d="M12 17h.01" />
        </svg>
        <p class="leading-snug">
          No browser wallet detected. Install
          <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" class="warning-link underline underline-offset-2">MetaMask</a>
          to get started.
        </p>
      </div>

      <!-- Page content slot -->
      <slot />
    </main>

    <!-- Footer -->
    <footer class="py-6 text-center">
      <p class="text-xs" style="color: var(--text-muted)">
        Powered by
        <a
          href="https://khalani.network"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-colors hover:opacity-80"
          style="color: var(--text-tertiary)"
        >
          Khalani Network
        </a>
      </p>
    </footer>
  </div>
</template>
