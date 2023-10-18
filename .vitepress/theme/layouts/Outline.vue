<script lang="ts" setup>
import TreeBranch from "../components/TreeBranch.vue";

defineProps<{
    base: string
    tree: Record<string, string[]>,
}>()
</script>

<template>
    <div class="tree-outline">
        <h2 style="text-align: center; font-size: 20px;">Outline</h2>
        <TreeBranch
            v-for="(filename, category) in tree"
            :base="base" :label="category" :items="filename"/>
    </div>
</template>

<style scoped>
.tree-outline {
    width: 100%;
    height: 100%;
    padding: 32px;
    overflow: auto;
    display: flex;
    flex-direction: column;
}
</style>