import type { Config } from "tailwindcss";

export default {
    darkMode: 'class',
    content: [ "./src/**/*.{js,jsx,ts,tsx}" ],
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
