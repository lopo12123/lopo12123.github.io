<script setup lang="ts">
import {
    computed,
    onMounted,
    onUnmounted,
    onUpdated,
    ref, watch,
    watchEffect,
    watchPostEffect,
    WatchStopHandle,
    watchSyncEffect
} from "vue";
import PostCard from "../components/PostCard.vue";
import { useData } from "vitepress";

const postList = ref<{
    link: string
    topic?: string
    brief?: string
}[]>([])

const grid = computed(() => {
    const length = postList.value.length

    if(!length) {
        return
    } else if(length === 2) {
        return 'grid-2'
    } else if(length === 3) {
        return 'grid-3'
    } else if(length % 3 === 0) {
        return 'grid-6'
    } else if(length > 3) {
        return 'grid-4'
    }
})

const { localeIndex } = useData()

let stopWatch: WatchStopHandle

onMounted(() => {
    postList.value = window.scan_data
    console.log('bind window.scan_data to postList')

    stopWatch = watch(() => localeIndex.value, () => {
        postList.value = window.scan_data
        console.log('localeIndex changed, update window.scan_data to postList')
    }, { flush: 'post' })
    console.log('set watchPostEffect to localeIndex')
})
onUnmounted(() => {
    postList.value = []
    console.log('unbind window.scan_data to postList')

    stopWatch()
    console.log('clear watchPostEffect on localeIndex')
})
</script>

<template>
    <div class="category">
        <div class="container">
            <div class="items">
                <div :class="['item', grid]"
                     v-for="(post, idx) in postList" :key="idx">
                    <PostCard
                        :title="post.topic" :link="post.link" :brief="post.brief"/>
                </div>
            </div>
        </div>
    </div>

    <!-- use Content to get data from script in md -->
    <Content/>
</template>

<style scoped>
.category {
    position: relative;
    margin-top: 24px;
    padding: 0 24px;
}

@media (min-width: 640px) {
    .category {
        padding: 0 48px;
    }
}

@media (min-width: 960px) {
    .category {
        padding: 0 64px;
    }
}

.container {
    margin: 0 auto;
    max-width: 1152px;
}

.items {
    display: flex;
    flex-wrap: wrap;
    margin: -8px;
}

.item {
    padding: 8px;
    width: 100%;
}

@media (min-width: 640px) {
    .item.grid-2,
    .item.grid-4,
    .item.grid-6 {
        width: calc(100% / 2);
    }
}

@media (min-width: 768px) {
    .item.grid-2,
    .item.grid-4 {
        width: calc(100% / 2);
    }

    .item.grid-3,
    .item.grid-6 {
        width: calc(100% / 3);
    }
}

@media (min-width: 960px) {
    .item.grid-4 {
        width: calc(100% / 4);
    }
}
</style>