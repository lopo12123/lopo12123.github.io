import {LocaleSpecificConfig} from "vitepress";

const LocaleConfigZh: LocaleSpecificConfig & { label: string; link?: string } = {
    label: '简体中文',
    lang: 'zh-CN',
    themeConfig: {
        nav: [
            {text: '主页', link: '/zh/'},
            {text: '文章', link: '/zh/post'},
            {text: '项目', link: '/zh/project'},
        ]
    }
}

export {
    LocaleConfigZh
}