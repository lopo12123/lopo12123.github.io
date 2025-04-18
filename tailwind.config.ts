import type { Config } from "tailwindcss";

export default {
    darkMode: 'class',
    content: [ "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}" ],
    theme: {
        extend: {
            fontFamily: {
                incognito: 'incognito',
                poets: 'Poets Electra',
            },
        },
    },
    plugins: [],
} satisfies Config;
