import {DefaultTheme, LocaleSpecificConfig} from "vitepress";

const LocaleConfigZh: LocaleSpecificConfig<DefaultTheme.Config> & { label: string; link?: string } = {
    label: '简体中文',
    lang: 'zh-CN',
    themeConfig: {
        langMenuLabel: '切换语言',
        darkModeSwitchLabel: '主题',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        lastUpdated: {text: '最近更新',},
        docFooter: {prev: '上一篇', next: '下一篇'},
        nav: [
            {text: '主页', link: '/zh/'},
            {text: '文章', link: '/zh/post'},
            {text: '项目', link: '/zh/project'},
        ],
        notFound: {
            code: '404',
            title: '页面未找到',
            quote: '但如果你不改变方向，继续寻找，也许最终会到达你要去的地方。',
            linkText: '返回主页',
            linkLabel: '返回主页',
        }
    }
}

export {
    LocaleConfigZh
}