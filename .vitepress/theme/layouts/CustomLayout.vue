<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import {useData, useRoute, useRouter} from "vitepress";
import {computed} from "vue";
import Tag from "../components/Tag.vue";

const {Layout} = DefaultTheme

const {frontmatter, localeIndex} = useData()
const router = useRouter()

const platformList = computed(() => frontmatter.value.platform ?? [])
const languageList = computed(() => frontmatter.value.language ?? [])
const tagList = computed(() => frontmatter.value.tag ?? [])

const showTagBar = computed(() => {
  return platformList.value.length > 0
      || languageList.value.length > 0
      || tagList.value.length > 0
})

const onTagClick = (v: string, k: 'platform' | 'language' | 'tag') => {
  router.go(`/${localeIndex.value}/archive/?${k}=${v}`)
}
</script>

<template>
  <Layout>
    <template v-if="showTagBar" #doc-top>
      <div class="tag-bar">
        <Tag v-for="(platform, idx) in platformList" :key="'p'+idx"
             :text="platform" type="PLATFORM"
             @click="onTagClick(platform, 'platform')"/>
        <Tag v-for="(language, idx) in languageList" :key="'l'+idx"
             :text="language" type="LANGUAGE"
             @click="onTagClick(language, 'language')"/>
        <Tag v-for="(tag, idx) in tagList" :key="'t'+idx"
             :text="tag" type="TAG"
             @click="onTagClick(tag, 'tag')"/>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.tag-bar {
  width: 100%;
  margin-bottom: 16px;
  padding: 4px 0;
  overflow: auto hidden;
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>