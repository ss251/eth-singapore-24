import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        nouns: {
          bg: '#D5D7E1',
          text: '#151C3B',
          accent: '#E93D82',
          yellow: '#FEF265',
          blue: '#4BDFEF',
          green: '#A7E946',
        },
      },
      fontFamily: {
        'londrina': ['Londrina Solid', 'cursive'],
        'pt-root': ['PT Root UI', 'sans-serif'],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
