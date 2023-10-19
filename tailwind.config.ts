const { nextui } = require("@nextui-org/react");

import { fontFamily } from "tailwindcss/defaultTheme";

import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "100px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    lineHeight: {
      relaxed: "1.8",
    },
    extend: {
      colors: {
        primary: "#fff",
        foreground: "#d4d4d4",
        background: "#08070B",
        input: "#131415",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        poppins: "var(--font-default)",
        title: "var(--font-title)",
      },
    },
  },
  plugins: [
    require("daisyui"),
    nextui({
      prefix: "cha1non",
      addCommonColors: false,
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
    }),
  ],
} satisfies Config;
