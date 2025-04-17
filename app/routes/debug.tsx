import * as process from "node:process";
import { useLoaderData } from "@remix-run/react";

export const loader = () => {
    return {
        'import.meta.url': import.meta.url,
        'import.meta.dirname': import.meta.dirname,
        'import.meta.filename': import.meta.filename,
        'cwd': process.cwd()
    }
}

export default function () {
    const loaderData = useLoaderData()

    return (
        <main className="content-body">
            <h1>Debug Page</h1>

            <pre>{ JSON.stringify(loaderData, null, 4) }</pre>
        </main>
    )
}