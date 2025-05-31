import { useEffect } from "react";
import { IconMoon, IconSun } from "../components/icon.tsx";
import { Link, Outlet } from "react-router";
import { navItems } from "../config/nav_item.ts";

import hlLight from "highlight.js/styles/github.css?url"
import hlDark from "highlight.js/styles/github-dark.css?url"
import { createPortal } from "react-dom";

const PageHeader = () => {
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
            {
                createPortal(
                    <link id={ 'hl-style' } rel={ 'stylesheet' } href={ hlLight }/>,
                    document.head
                )
            }

            <div className={ 'content-body flex items-center justify-between' }>
                <Link to={ '/' }>
                    <img className={ 'logo' } src="/lopo_animate.svg" width={ 75 } height={ 36 } alt="logo"/>
                </Link>

                <nav>
                    <ul className={ 'font-incognito flex items-center space-x-8' }>
                        {
                            navItems.map(({ title, path }) => {
                                return <li key={ path }><Link to={ path }>{ title }</Link></li>
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

const RootLayout = () => {
    return (
        <>
            <dialog id={ 'toast-container' }/>
            <dialog id={ 'preview-container' }/>

            <PageHeader/>

            <Outlet/>
        </>
    )
}

export {
    RootLayout,
}