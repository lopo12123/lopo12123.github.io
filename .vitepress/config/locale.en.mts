import { DefaultTheme, LocaleSpecificConfig } from "vitepress";

const LocaleConfigEn: LocaleSpecificConfig<DefaultTheme.Config> & { label: string; link?: string } = {
    label: 'English',
    lang: 'en-US',
    themeConfig: {
        langMenuLabel: 'Change language',
        darkModeSwitchLabel: 'Appearance',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Return to top',
        lastUpdated: { text: 'Last updated', },
        docFooter: { prev: 'Previous Page', next: 'Next Page' },
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
        nav: [
            { text: 'Home', link: '/en/' },
            { text: 'My Posts', link: '/en/post/' },
            { text: 'My Projects', link: '/en/project/' },
            { text: 'Archive', link: '/en/archive/' },
        ],
    }
}

export {
    LocaleConfigEn
}