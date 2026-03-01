<script setup lang="ts">
import { useWallet, SUPPORTED_CHAINS } from '@/composables/useWallet';

const { chainId, isConnected, switchChain } = useWallet();

const onChange = (e: Event) => {
  const target = e.target;
  if (!(target instanceof HTMLSelectElement)) return;
  const value = Number(target.value);
  if (SUPPORTED_CHAINS.some((c) => c.id === value)) {
    switchChain(value);
  }
};
</script>

<template>
  <select
    v-if="isConnected"
    class="nav-select"
    aria-label="Switch chain"
    :value="chainId ?? ''"
    @change="onChange"
  >
    <option v-for="chain in SUPPORTED_CHAINS" :key="chain.id" :value="chain.id">
      {{ chain.name }}
    </option>
  </select>
</template>
