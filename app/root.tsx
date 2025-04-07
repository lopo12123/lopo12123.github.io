import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { useEffect } from "react";
import { IconMoon, IconSun } from "~/components/icon";

import "./styles/font.css";
import "./styles/global.css";
import "./styles/custom.css";
import { navItems } from "~/configs/navigation";

const Header = () => {
    const toggleTheme = () => {
        const html = document.documentElement
        if (html.className == 'light') {
            html.className = 'dark'
            localStorage.setItem('theme', 'dark')
        } else {
            html.className = 'light'
            localStorage.setItem('theme', 'light')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.className = 'dark'
        }
    }, []);

    return (
        <header className={ 'border-b border-[#e4e4e7] dark:border-[#27272a]' }>
            <div className={ 'content-body flex items-center justify-between' }>
                <a href="/">
                    <img className={ 'logo' } src="/lopo_animate.svg" width={ 75 } height={ 36 } alt="logo"/>
                    {/*<img className={ 'logo logo-black dark:hidden' }*/ }
                    {/*     width={ 78 } height={ 36 }*/ }
                    {/*     src="/lopo-black.svg" alt="logo"/>*/ }
                    {/*<img className={ 'logo logo-white hidden dark:inline-block' }*/ }
                    {/*     width={ 78 } height={ 36 }*/ }
                    {/*     src="/lopo-white.svg" alt="logo"/>*/ }
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

                <button
                    className={
                        'w-9 h-9 border border-[#e4e4e7] dark:border-[#27272a] rounded-full ' +
                        ' bg-[#f4f4f5] dark:bg-[#27272b66] ' +
                        'text-[22px] flex items-center justify-center'
                    }
                    onClick={ toggleTheme }>
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
                <title>霓为衣兮风为马</title>
                <link rel="icon" type="image/svg+xml" href="/lopo.svg"/>

                <Meta/>
                <Links/>
            </head>
            <body>
                <Header/>
                <Outlet/>

                <ScrollRestoration/>
                <Scripts/>
            </body>
        </html>
    );
}
