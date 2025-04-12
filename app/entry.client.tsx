/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

window.__delegate = {
    toggleCodeBlock: (element) => {
        element.parentElement!.toggleAttribute('data-collapse')
    },
    // OPTIMIZE: better implementation
    async copyCode(element) {
        window.event?.stopPropagation()

        const code = (element.parentElement!.nextElementSibling as HTMLPreElement).innerText
        await navigator.clipboard.writeText(code)
        console.log('Copied')
    }
}

startTransition(() => {
    hydrateRoot(document, <RemixBrowser/>);
});
