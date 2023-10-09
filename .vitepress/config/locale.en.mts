import {LocaleSpecificConfig} from "vitepress";

const LocaleConfigEn: LocaleSpecificConfig & { label: string; link?: string } = {
    label: 'English',
    lang: 'en',
    themeConfig: {
        nav: [
            {text: 'Home', link: '/en/'},
            {text: 'Post', link: '/en/post'},
            {text: 'Project', link: '/en/project'},
        ]
    }
}

export {
    LocaleConfigEn
}