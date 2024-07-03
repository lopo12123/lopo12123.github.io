import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://lopo12123.github.io',
    outDir: './docs',
    integrations: [ mdx(), sitemap() ],
});
