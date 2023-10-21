---
layout: page
---

# Archive

<script setup>
import { data } from './scan.data.ts';

console.log(data)
</script>

<pre>{{JSON.stringify(data, null, 4)}}</pre>