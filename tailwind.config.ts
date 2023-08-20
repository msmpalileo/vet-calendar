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
        "primary-light-color": "#282828",
        "light-gray-color": "#F3F2F0",
        "gray-color": "#8D8D8E",
        "dark-gray-color": "#323234",
        "light-orange-color": "#FFE0CE",
        "dark-orange-color": "#E6590A",
      },
    },
  },
  plugins: [],
};
export default config;
