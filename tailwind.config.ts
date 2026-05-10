import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f7fb",
          100: "#e4edf6",
          200: "#c9dbea",
          500: "#426f9b",
          700: "#244563",
          900: "#172b3d",
        },
        warm: {
          50: "#fbfaf7",
          100: "#f3f0ea",
        },
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 43, 61, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
