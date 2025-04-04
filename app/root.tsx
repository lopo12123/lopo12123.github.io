import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

import "./styles/font.css";
import "./styles/global.css";
import "./styles/custom.css";

const Header = () => {
    const toggleTheme = () => {
        const html = document.documentElement
        if (html.className == 'dark') {
            html.className = 'light'
        } else if (html.className == 'light') {
            html.className = 'dark'
        } else {
            // exception!
            html.className = 'light'
        }
    }

    return (
        <header>
            <div className={ 'content-body mx-auto flex items-center justify-between' }>
                <a href="/">
                    <img className={ 'logo logo-black dark:hidden' } height={ 48 }
                         src="/lopo-black.svg" alt="logo"/>
                    <img className={ 'logo logo-white hidden dark:inline-block' } height={ 48 }
                         src="/lopo-white.svg" alt="logo"/>
                </a>

                <nav>
                    {/* TODO: nav */ }
                </nav>

                {/* TODO: switch button */ }
                <button onClick={ toggleTheme }>aaa</button>
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
