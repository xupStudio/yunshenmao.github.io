import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF6F0",
        cream: "#FFFBF5",
        beige: "#F0E9DC",
        ink: {
          DEFAULT: "#2D2520",
          soft: "#635950",
          faint: "#9B8F83",
        },
        earth: {
          DEFAULT: "#8B6F47",
          deep: "#5C4B33",
        },
        sage: "#7A8B6F",
        warm: "#D4A574",
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', "ui-serif", "Georgia", "serif"],
        sans: ['"Noto Sans TC"', "ui-sans-serif", "system-ui", "sans-serif"],
        brush: ['"Ma Shan Zheng"', '"Noto Serif TC"', "serif"],
      },
      maxWidth: {
        prose: "680px",
      },
    },
  },
  plugins: [],
};

export default config;
