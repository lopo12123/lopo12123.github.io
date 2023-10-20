<script setup lang="ts">
const {type} = defineProps<{
  text: string
  type: 'PLATFORM' | 'LANGUAGE' | 'TAG'
}>()
</script>

<template>
  <span :class="['base', type]">{{ type }}: {{ text }}</span>
</template>

<style scoped>
.base {
  height: 24px;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 12px;
  line-height: 22px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  flex-shrink: 0;
  display: inline-block;
}

.PLATFORM {
  border-color: var(--vp-badge-danger-border);
  color: var(--vp-badge-danger-text);
  background-color: var(--vp-badge-danger-bg);
}

.LANGUAGE {
  border-color: var(--vp-badge-warning-border);
  color: var(--vp-badge-warning-text);
  background-color: var(--vp-badge-warning-bg);
}

.TAG {
  border-color: var(--vp-badge-tip-border);
  color: var(--vp-badge-tip-text);
  background-color: var(--vp-badge-tip-bg);
}
</style>