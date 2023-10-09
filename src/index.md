---
layout: false
---

<script setup>
import {useRouter} from "vitepress"; 

// automatically redirect to the english version (as this is the default language)
useRouter().go("/en/");
</script>