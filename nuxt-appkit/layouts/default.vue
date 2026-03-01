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
            Nuxt + AppKit
          </span>
        </div>

        <div class="flex items-center gap-4">
          <LocaleSelect />
          <ThemeToggle />
          <appkit-button />
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex flex-1 items-center justify-center px-4 py-12">
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

<script setup lang="ts">
import ThemeToggle from '~/components/ThemeToggle.vue';
import LocaleSelect from '~/components/LocaleSelect.vue';
</script>
