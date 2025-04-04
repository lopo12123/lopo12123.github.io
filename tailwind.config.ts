import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        incognito: 'incognito'
      },
    },
  },
  plugins: [],
} satisfies Config;
