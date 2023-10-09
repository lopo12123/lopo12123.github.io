import {LocaleSpecificConfig} from "vitepress";

const LocaleConfigZh: LocaleSpecificConfig & { label: string; link?: string } = {
    label: '简体中文',
    lang: 'zh-CN',
    themeConfig: {
        langMenuLabel: '切换语言',
        darkModeSwitchLabel: '主题',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        nav: [
            {text: '主页', link: '/zh/'},
            {text: '文章', link: '/zh/post'},
            {text: '项目', link: '/zh/project'},
        ],
    }
}

export {
    LocaleConfigZh
}