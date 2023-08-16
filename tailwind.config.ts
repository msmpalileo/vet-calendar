import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#1c1c1e",
        "accent-color": "#ff630b",
        "button-bg-hover": "#282828",
        "light-gray": "#8D8D8E",
        "dark-gray": "#323234",
      },
    },
  },
  plugins: [],
};
export default config;
