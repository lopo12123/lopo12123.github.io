<script setup lang="ts">
import {useRouter} from "vitepress";

defineProps<{
  link: string
  title?: string
  brief?: string
}>()

const router = useRouter()
</script>

<template>
  <div class="post-card">
    <article class="box">
      <h2 class="title" v-html="title"></h2>
      <p v-if="brief" class="brief" v-html="brief"></p>
      <p class="link" @click="router.go(link)">see detail →</p>
    </article>
  </div>
</template>

<style scoped>
.post-card {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
}

.box {
  flex-direction: column;
  padding: 24px;
  height: 100%;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}

.brief {
  flex-grow: 1;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.link {
  padding-top: 8px;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
}
</style>