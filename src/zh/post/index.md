---
layout: outline
---

<script setup>
import {onBeforeMount, onBeforeUnmount} from "vue";
import {data} from './scan.data.ts';

onBeforeMount(() => {
    window.scan_data = data.docs;
    console.log('set window.scan_data');
});
onBeforeUnmount(() => {
    delete window.scan_data;
    console.log('delete window.scan_data');
});
</script>