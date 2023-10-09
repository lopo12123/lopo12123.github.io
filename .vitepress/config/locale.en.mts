import {DefaultTheme, LocaleSpecificConfig} from "vitepress";

const LocaleConfigEn: LocaleSpecificConfig<DefaultTheme.Config> & { label: string; link?: string } = {
    label: 'English',
    lang: 'en-US',
    themeConfig: {
        langMenuLabel: 'Change language',
        darkModeSwitchLabel: 'Appearance',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Return to top',
        nav: [
            {text: 'Home', link: '/en/'},
            {text: 'Post', link: '/en/post'},
            {text: 'Project', link: '/en/project'},
        ],
    }
}

export {
    LocaleConfigEn
}