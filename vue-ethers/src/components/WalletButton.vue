<script setup lang="ts">
import { computed } from 'vue';
import { useWallet } from '@/composables/useWallet';

const { address, chainName, isConnected, isConnecting, connect, disconnect } = useWallet();

const truncated = computed(() => {
  if (address.value === null) return '';
  return `${address.value.slice(0, 6)}...${address.value.slice(-4)}`;
});

const ariaLabel = computed(() => {
  if (isConnecting.value) return 'Connecting wallet';
  if (isConnected.value) return 'Disconnect wallet';
  return 'Connect wallet';
});

const handleClick = () => {
  if (isConnected.value) disconnect();
  else connect();
};
</script>

<template>
  <button
    :class="['wallet-btn', isConnected ? 'wallet-btn--connected' : 'wallet-btn--cta']"
    :disabled="isConnecting"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <template v-if="isConnecting">
      <span class="wallet-btn__spinner" />
      <span>Connecting...</span>
    </template>
    <template v-else-if="isConnected">
      <span class="wallet-btn__chain">
        <span class="wallet-btn__dot" />
        {{ chainName }}
      </span>
      <span class="wallet-btn__divider" />
      <span class="wallet-btn__addr">{{ truncated }}</span>
    </template>
    <template v-else>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </svg>
      <span>Connect Wallet</span>
    </template>
  </button>
</template>

<style scoped>
.wallet-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all 150ms ease;
  border: 1px solid transparent;
  outline: none;
  white-space: nowrap;
}

.wallet-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

/* CTA (disconnected) */
.wallet-btn--cta {
  background: linear-gradient(135deg, var(--accent), #8b5cf6);
  color: #fff;
  border-color: rgba(139, 92, 246, 0.3);
}
.wallet-btn--cta:hover:not(:disabled) {
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.25);
  filter: brightness(1.1);
}
.wallet-btn--cta:active:not(:disabled) { transform: scale(0.98); }

/* Connected pill */
.wallet-btn--connected {
  background: var(--bg-subtle);
  color: var(--text-primary);
  border-color: var(--border-subtle);
}
.wallet-btn--connected:hover {
  background: var(--hover-bg);
  border-color: var(--border-subtle);
}
.wallet-btn--connected:active { transform: scale(0.98); }

.wallet-btn__chain {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-secondary);
}

.wallet-btn__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
}

.wallet-btn__divider {
  width: 1px;
  height: 16px;
  background: var(--border-subtle);
}

.wallet-btn__addr {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  letter-spacing: 0.02em;
}

.wallet-btn__spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
