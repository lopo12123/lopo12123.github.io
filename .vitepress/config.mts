import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    // base: './',
    srcDir: 'src',
    outDir: 'docs',

    lang: 'zh-CN',
    title: 'lopo',
    titleTemplate: ':title',
    description: 'my personal website',
    lastUpdated: true,
    head: [
        // set favicon
        ['link', {rel: 'icon', type: 'image/svg+xml', href: '/lopo.svg'}],
    ],
    themeConfig: {
        // this is the logo in the navbar (not favicon)
        logo: '/lopo_run.svg',
        siteTitle: false,

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
