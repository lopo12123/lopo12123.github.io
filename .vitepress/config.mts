import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    // base: './',
    srcDir: 'src',
    outDir: 'docs',

    lang: 'zh-CN',
    title: 'lopo',
    titleTemplate: 'lopo | :title',
    description: 'my personal website',
    lastUpdated: true,
    themeConfig: {
        logo: '/lopo.svg',

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Examples', link: '/markdown-examples'}
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    {text: 'Markdown Examples', link: '/markdown-examples'},
                    {text: 'Runtime API Examples', link: '/api-examples'}
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/lopo12123'}
        ]
    }
})
