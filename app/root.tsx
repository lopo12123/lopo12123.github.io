import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { useEffect } from "react";
import { IconMoon, IconSun } from "~/components/icon";
import { navItems } from "~/configs/navigation";
import type { LinksFunction } from "@remix-run/node";

import hlLight from "highlight.js/styles/github.css?url"
import hlDark from "highlight.js/styles/github-dark.css?url"

import "./styles/font.css";
import "./styles/global.css";
import "./styles/custom.css";

export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: hlLight, id: 'hl-style' },
    ]
}

const Header = () => {
    const toggleTheme = () => {
        const html = document.documentElement
        if (html.className == 'light') {
            html.className = 'dark'
            ;(document.getElementById("hl-style") as HTMLLinkElement).href = hlDark
            localStorage.setItem('theme', 'dark')
        } else {
            html.className = 'light'
            ;(document.getElementById("hl-style") as HTMLLinkElement).href = hlLight
            localStorage.setItem('theme', 'light')
        }
    }

    const toggleThemeDelegate = () => {
        if (!document.startViewTransition) {
            toggleTheme()
        } else {
            document.startViewTransition(() => toggleTheme())
        }
    }

    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.className = 'dark'
            ;(document.getElementById("hl-style") as HTMLLinkElement).href = hlDark
        }
    }, []);

    return (
        <header className={ 'border-b border-[#e4e4e7] dark:border-[#27272a]' }>
            <div className={ 'content-body flex items-center justify-between' }>
                <a href="/">
                    <img className={ 'logo' } src="/lopo_animate.svg" width={ 75 } height={ 36 } alt="logo"/>
                </a>

                <nav>
                    <ul className={ 'font-incognito flex items-center space-x-8' }>
                        {
                            navItems.map(({ title, path }) => {
                                return <li key={ path }><a href={ path }>{ title }</a></li>
                            })
                        }
                    </ul>
                </nav>

                <button className={ 'w-6 h-6 text-[18px] flex items-center justify-center' }
                        onClick={ toggleThemeDelegate }>
                    <IconSun className={ 'dark:hidden' }/>
                    <IconMoon className={ 'hidden dark:block' }/>
                </button>
            </div>
        </header>
    )
}

export default function App() {
    return (
        <html lang="zh" className="light">
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport"
                      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                <title>还得是 lopo !</title>
                <link rel="icon" type="image/svg+xml" href="/lopo.svg"/>

                <Meta/>
                <Links/>
            </head>
            <body>
                <dialog id={ 'toast-container' }/>

                <Header/>
                <Outlet/>

                <ScrollRestoration/>
                <Scripts/>
            </body>
        </html>
    );
}
