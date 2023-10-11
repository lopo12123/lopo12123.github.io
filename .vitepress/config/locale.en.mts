import {DefaultTheme, LocaleSpecificConfig} from "vitepress";

const LocaleConfigEn: LocaleSpecificConfig<DefaultTheme.Config> & { label: string; link?: string } = {
    label: 'English',
    lang: 'en-US',
    themeConfig: {
        langMenuLabel: 'Change language',
        darkModeSwitchLabel: 'Appearance',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Return to top',
        lastUpdated: {text: 'Last updated',},
        docFooter: {prev: 'Previous Page', next: 'Next Page'},
        nav: [
            {text: 'Home', link: '/en/'},
            {text: 'Post', link: '/en/post'},
            {text: 'Project', link: '/en/project'},
        ],
        notFound: {
            code: '404',
            title: 'Page not found',
            quote: "But if you don't change your direction, and if you keep looking, you may end up where you are heading.",
            linkText: 'Take me home',
            linkLabel: 'go to home',
        }
    }
}

export {
    LocaleConfigEn
}