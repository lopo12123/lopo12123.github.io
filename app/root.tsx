import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useLocation, useNavigate,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import type { ReactNode } from "react";

import itislopo from "./assets/itislopo.svg"

import "highlight.js/styles/github-dark.css"
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

const IconBack = ({ onClick }: { onClick?: VoidFunction }) => {
    return (
        <svg
            className={ 'icon-back' }
            viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="1em" height="1em" fill="currentColor"
            onClick={ onClick }>
            <path
                d="M425.856 886.263467a29.499733 29.499733 0 0 1-19.669333-7.466667L18.4832 534.135467a29.636267 29.636267 0 0 1 0-44.305067L406.186667 145.186133a29.5936 29.5936 0 0 1 31.761066-4.855466 29.636267 29.636267 0 0 1 17.527467 27.016533v215.415467a29.602133 29.602133 0 0 1-29.610667 29.6192 29.610667 29.610667 0 0 1-29.6192-29.6192V233.284267L82.7136 511.982933 396.245333 790.698667V641.237333a29.610667 29.610667 0 0 1 29.6192-29.6192 29.602133 29.602133 0 0 1 29.610667 29.6192v215.415467a29.6448 29.6448 0 0 1-29.6192 29.610667z"/>
            <path
                d="M985.856 886.263467a29.627733 29.627733 0 0 1-27.477333-18.628267c-0.759467-1.672533-88.507733-196.795733-532.522667-196.795733-16.366933 0-29.6192-13.252267-29.6192-29.6192s13.243733-29.6192 29.6192-29.6192c295.185067 0 446.788267 82.0224 521.361067 149.0176-68.317867-343.287467-501.461333-348.2112-521.4208-348.2624a29.6192 29.6192 0 0 1 0.059733-59.2384c5.896533 0 589.610667 5.7856 589.610667 503.509333a29.678933 29.678933 0 0 1-29.610667 29.636267z"/>
        </svg>
    )
}

const IconProse = () => {
    return (
        <svg
            viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="1em" height="1em" fill="currentColor">
            <path
                d="M792.576 925.184H241.152c-40.448 0-73.728-32.768-73.728-73.728V172.544c0-40.448 32.768-73.728 73.728-73.728h432.64l192.512 192.512v560.128c0 40.448-33.28 73.728-73.728 73.728zM241.152 144.896a27.533 27.533 0 0 0-27.648 27.648v678.912a27.533 27.533 0 0 0 27.648 27.648h551.424a27.533 27.533 0 0 0 27.648-27.648V310.272L654.336 144.384H241.152z"/>
            <path
                d="M843.264 324.096H697.856c-31.232 0-56.832-25.6-56.832-56.832V121.856h46.08v145.408c0 5.632 5.12 10.752 10.752 10.752h145.408v46.08z m-299.52 55.808H345.6c-12.8 0-23.04-10.24-23.04-23.04s10.24-23.04 23.04-23.04h198.144c12.8 0 23.04 10.24 23.04 23.04s-10.24 23.04-23.04 23.04z m143.872 161.28H345.6c-12.8 0-23.04-10.24-23.04-23.04s10.24-23.04 23.04-23.04h342.016c12.8 0 23.04 10.24 23.04 23.04s-10.24 23.04-23.04 23.04z m0 156.16H345.6c-12.8 0-23.04-10.24-23.04-23.04s10.24-23.04 23.04-23.04h342.016c12.8 0 23.04 10.24 23.04 23.04s-10.24 23.04-23.04 23.04z"/>
        </svg>
    )
}

export function Layout({ children }: { children: ReactNode }) {
    const { pathname, state } = useLocation()
    const navigate = useNavigate()

    const showBack = !!state?.['returnable']

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
                    <Link className={ 'icon-lopo' } to={ '/' } state={ { returnable: true } }>
                        <img width={ 105 } height={ 30 } src={ itislopo } alt=""/>
                    </Link>
                    <Link className={ `icon-prose ${ pathname === '/prose' ? 'active' : '' }` }
                          to={ '/prose' } state={ { returnable: true } }>
                        <IconProse/>
                    </Link>
                    <i style={ { flex: 1 } }/>
                    { showBack ? <IconBack onClick={ () => navigate(-1) }/> : null }
                </nav>

                <div className={ 'main-wrapper' }>
                    { children }
                </div>

                <ScrollRestoration/>
                <Scripts/>
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet/>;
}
