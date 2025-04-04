import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import type { ReactNode } from "react";

import "./tailwind.css";

export function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="zh">
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
