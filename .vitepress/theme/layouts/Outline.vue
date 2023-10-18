<script lang="ts" setup>
import TreeBranch from "../components/TreeBranch.vue";

const { tree } = defineProps<{
    tree: Record<string, string[]>
}>()
</script>

<template>
    <div class="tree-outline">
        <h2 style="text-align: center; font-size: 20px;">Outline</h2>
        <TreeBranch v-for="(v, k) in tree" :label="k" :items="v"/>
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