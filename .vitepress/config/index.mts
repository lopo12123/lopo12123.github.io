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
        search: {
            provider: 'local',
        },
        footer: {
            message: 'open source means "you can you fork"',
            copyright: 'Copyright © 2023-present lopo'
        },

        // config nav in locale config for i18n support
        // for details, see https://vitepress.dev/reference/default-theme-nav
        // nav: [],

        // config sidebar in locale config for i18n support
        // for details, see
        // - https://vitepress.dev/reference/default-theme-sidebar
        // - https://vitepress.dev/reference/default-theme-sidebar#multiple-sidebars
        // sidebar: [],

        // this is common config for all locales
        socialLinks: [
            {icon: 'github', link: 'https://github.com/lopo12123'}
        ],

        // config not found page in locale config for i18n support
        // notFound: {},
    }
})
