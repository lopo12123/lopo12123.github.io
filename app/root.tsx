import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

import itislopo from "./assets/itislopo.svg"

import "./styles/font.css";
import "./styles/index.css";

export const links: LinksFunction = () => {
    return [
        { rel: 'icon', type: 'image/xml+svg', href: '/favicon.svg' }
    ]
}

export const meta: MetaFunction = () => {
    return [
        { title: '~' }
    ]
}

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="zh">
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport"
                      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                <Meta/>
                <Links/>
            </head>
            <body>
                <nav className={ 'tab-bar' }>
                    <Link to={ '/' }>
                        <img
                            className={ 'w-[105px] h-[30px]' }
                            width={ 105 } height={ 30 }
                            src={ itislopo } alt=""/>
                    </Link>
                </nav>

                { children }

                <ScrollRestoration/>
                <Scripts/>
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet/>;
}
