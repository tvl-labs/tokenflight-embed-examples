<template>
  <select class="nav-select" aria-label="Language" @change="onChange">
    <option v-for="locale in SUPPORTED_LOCALES" :key="locale.value" :value="locale.value">
      {{ locale.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { SUPPORTED_LOCALES } from '@/constants';

function onChange(e: Event) {
  const target = e.target;
  if (!(target instanceof HTMLSelectElement)) return;
  window.dispatchEvent(new CustomEvent('locale-change', { detail: { locale: target.value } }));
}
</script>
