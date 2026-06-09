import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505", // Deep Black
        foreground: "#ffffff",
        accent: {
          cyan: "#00f5ff",
          emerald: "#00ff8f",
          neon: "#39ff14",
        },
        noir: {
          900: "#0a0a0a",
          800: "#121212",
          700: "#1a1a1a",
        }
      },
      fontFamily: {
        mono: ["DM Mono", "monospace"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
