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
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: 'Search',
                        buttonAriaLabel: 'Search',
                    },
                    modal: {
                        displayDetails: 'Display details',
                        resetButtonTitle: 'Reset search',
                        backButtonTitle: 'Back to search results',
                        noResultsText: 'No results found',
                        footer: {
                            selectText: 'Select',
                            selectKeyAriaLabel: 'Enter key',
                            navigateText: 'Navigate',
                            navigateUpKeyAriaLabel: 'Up arrow key',
                            navigateDownKeyAriaLabel: 'Down arrow key',
                            closeText: 'Close',
                            closeKeyAriaLabel: 'ESC key',
                        }
                    }
                }
            }
        },
        notFound: {
            code: '404',
            title: 'Page not found',
            quote: "But if you don't change your direction, and if you keep looking, you may end up where you are heading.",
            linkText: 'Take me home',
            linkLabel: 'go to home',
        },
        nav: [
            {text: 'Home', link: '/en/'},
            {text: 'Post', link: '/en/post/'},
            {text: 'Project', link: '/en/project/'},
        ],
    }
}

export {
    LocaleConfigEn
}