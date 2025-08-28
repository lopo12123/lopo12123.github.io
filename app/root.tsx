import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";

import "highlight.js/styles/github.css";
import "./styles/animation.css";
import "./styles/font.css";
import "./styles/app.css";

export default function App() {
    return (
        <html lang="zh">
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport"
                      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                <link rel="icon" type="image/svg+xml" href="/lopo.svg"/>

                <Meta/>
                <Links/>
            </head>
            <body>
                <Outlet/>

                <ScrollRestoration/>
                <Scripts/>
            </body>
        </html>
    )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{ message }</h1>
            <p>{ details }</p>
            { stack && (
                <pre className="w-full p-4 overflow-x-auto">
                  <code>{ stack }</code>
                </pre>
            ) }
        </main>
    );
}
