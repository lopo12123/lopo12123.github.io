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
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: '搜索',
                        buttonAriaLabel: '提交搜索查询',
                    },
                    modal: {
                        displayDetails: '显示详情',
                        resetButtonTitle: '重置搜索',
                        backButtonTitle: '返回搜索结果',
                        noResultsText: '没有找到结果',
                        footer: {
                            selectText: '选择',
                            selectKeyAriaLabel: '回车键',
                            navigateText: '切换',
                            navigateUpKeyAriaLabel: '上方向键',
                            navigateDownKeyAriaLabel: '下方向键',
                            closeText: '关闭',
                            closeKeyAriaLabel: 'ESC键',
                        }
                    }
                }
            }
        },
        docFooter: {prev: '上一篇', next: '下一篇'},
        notFound: {
            code: '404',
            title: '页面未找到',
            quote: '但如果你不改变方向，继续寻找，也许最终会到达你要去的地方。',
            linkText: '返回主页',
            linkLabel: '返回主页',
        },
        nav: [
            {text: '主页', link: '/zh/'},
            {text: '文章', link: '/zh/post/'},
            {text: '项目', link: '/zh/project/'},
        ],
    }
}

export {
    LocaleConfigZh
}