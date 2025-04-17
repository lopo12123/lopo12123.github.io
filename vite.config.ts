import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import * as process from "node:process";

declare module "@remix-run/node" {
    interface Future {
        v3_singleFetch: true;
    }
}

export default defineConfig(({ command, mode }) => {
    const isSpa = process.env.NODE_ENV === 'production' && mode === 'spa'

    return {
        base: isSpa ? './' : undefined,
        plugins: [
            remix({
                ssr: mode != 'spa',
                future: {
                    v3_fetcherPersist: true,
                    v3_relativeSplatPath: true,
                    v3_throwAbortReason: true,
                    v3_singleFetch: true,
                    v3_lazyRouteDiscovery: true,
                },
            }),
            tsconfigPaths(),
        ],
    }
})
