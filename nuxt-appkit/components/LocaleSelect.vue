<template>
  <select class="locale-select" aria-label="Language" @change="onChange">
    <option value="en-US">EN</option>
    <option value="zh-CN">中文</option>
    <option value="zh-TW">繁體</option>
    <option value="ja-JP">日本語</option>
    <option value="ko-KR">한국어</option>
  </select>
</template>

<script setup lang="ts">
function onChange(e: Event) {
  const target = e.target;
  if (!(target instanceof HTMLSelectElement)) return;

  // Dispatch event for Swap component to pick up the locale change
  window.dispatchEvent(new CustomEvent('locale-change', { detail: { locale: target.value } }));
}
</script>
