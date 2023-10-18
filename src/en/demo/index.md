---
layout: page
---

<script setup>
import Outline from '@layout/Outline.vue';
import { data } from './config.data.ts';
</script>

<Outline :base="data.base" :tree="data.tree"/>