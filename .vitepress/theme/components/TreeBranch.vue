<script lang="ts" setup>
import {useData, useRouter} from "vitepress";

const {label} = defineProps<{
  label: string
  items: string[]
}>()

const {localeIndex, frontmatter} = useData()
const lang = localeIndex.value
const category = frontmatter.value.category

const router = useRouter()
const toPost = (name: string) => {
  console.log(`/${lang}/${category}/${label}/${name.replace('.md', '.html')}`)
  router.go(`/${lang}/${category}/${label}/${name.replace('.md', '.html')}`)
}
</script>

<template>
  <section>
    <h3>{{ label }}</h3>
    <ul>
      <li class="hover-indicator" v-for="item in items"
          @click="toPost(item)">
        {{ item }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
section {
  padding: 0 16px;
}

h3 {
  font-size: 18px;
  line-height: 28px;
}

li {
  padding-left: 16px;
  margin: 4px 0;
}

.hover-indicator {
  position: relative;
  cursor: pointer;

  &:hover {
    color: var(--vp-c-brand-1);

    &::before {
      content: '>';
      position: absolute;
      left: 0;
      color: var(--vp-c-brand-1);
    }
  }
}
</style>