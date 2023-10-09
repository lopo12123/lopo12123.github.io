import {defineConfig} from 'vitepress'
import {LocaleConfigZh} from "./locale.zh.mjs";
import {LocaleConfigEn} from "./locale.en.mjs";

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
    locales: {
        en: LocaleConfigEn,
        zh: LocaleConfigZh
    },
    themeConfig: {
        logo: '/lopo_run.svg',
        siteTitle: false,
        i18nRouting: true,

        // config nav in locale config for i18n support
        // nav: [],

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
