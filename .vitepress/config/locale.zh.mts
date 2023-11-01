import { createContentLoader, DefaultTheme, LocaleSpecificConfig } from "vitepress";

const posts = (await createContentLoader('src/zh/post/*.md').load())
    .filter((item) => {
        const layout = item.frontmatter.layout
        return layout === 'doc' || !layout
    })
    .map((item) => ({ text: item.frontmatter.topic, link: item.url }))
const projects = (await createContentLoader('src/zh/project/*.md').load())
    .filter((item) => {
        const layout = item.frontmatter.layout
        return layout === 'doc' || !layout
    })
    .map((item) => ({ text: item.frontmatter.topic, link: item.url }))

const LocaleConfigZh: LocaleSpecificConfig<DefaultTheme.Config> & { label: string; link?: string } = {
    label: '简体中文',
    lang: 'zh-CN',
    themeConfig: {
        langMenuLabel: '切换语言',
        darkModeSwitchLabel: '主题',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        lastUpdated: { text: '最近更新', },
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
        docFooter: { prev: '上一篇', next: '下一篇' },
        nav: [
            { text: '首页', link: '/zh/' },
            { text: '我的博客', link: '/zh/post/' },
            { text: '我的项目', link: '/zh/project/' },
            { text: '归档', link: '/zh/archive/' },
        ],
        sidebar: [
            { text: '我的博客', link: '/en/post/', items: posts },
            { text: '我的项目', link: '/en/project/', items: projects },
            { text: '归档', link: '/en/archive/' },
        ],
    }
}

export {
    LocaleConfigZh
}