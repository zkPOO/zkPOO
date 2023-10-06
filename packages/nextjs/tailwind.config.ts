/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  // DaisyUI theme colors
  darkMode: ["class", '[data-theme="dark"]'],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],

          primary: "#42D1D1",
          // "primary-focus": "#5616C5",
          "primary-content": "#272727",

          secondary: "#42D1D1",
          // "secondary-focus": "#BA2191",
          "secondary-content": "#272727",

          accent: "#F8860D",
          "accent-focus": "#DA7407",
          "accent-content": "#301D0D",

          neutral: "#1F2937",
          "neutral-focus": "#121821",
          "neutral-content": "#CED0D4",
          "base-100": "#EFF5F5",
          "base-200": "#FFFFFF",
          "base-300": "#DBDBDB",
          "base-content": "#272727",

          info: "#3ABFF8",
          "info-content": "#002B3D",

          success: "#36D399",
          "success-content": "#003320",

          warning: "#FBBD23",
          "warning-content": "#003320",

          error: "#F87272",
          "error-content": "#470000",

          // "--rounded-btn": "0rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],

          primary: "#42D1D1",
          // "primary-focus": "#5616C5",
          "primary-content": "#272727",

          secondary: "#42D1D1",
          // "secondary-focus": "#BA2191",
          "secondary-content": "#272727",

          accent: "#1FB2A6",
          "accent-focus": "#1A9389",
          "accent-content": "#FFFFFF",

          neutral: "#A6ADBB",
          "neutral-focus": "#242b33",
          "neutral-content": "#A6ADBB",
          "base-100": "#1d232a",
          "base-200": "#191e24",
          "base-300": "#15191e",
          "base-content": "#A6ADBB",

          info: "#3ABFF8",
          "info-content": "#002B3D",

          success: "#36D399",
          "success-content": "#003320",

          warning: "#FBBD23",
          "warning-content": "#003320",

          error: "#F87272",
          "error-content": "#470000",

          // "--rounded-btn": "0rem",
        },
      },
    ],
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
  theme: {
    // Extend Tailwind classes (e.g. font-bai-jamjuree, animate-grow)
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        grow: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        zoom: {
          "0%, 100%": { transform: "scale(1, 1)" },
          "50%": { transform: "scale(1.1, 1.1)" },
        },
      },
      animation: {
        grow: "grow 5s linear infinite",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        zoom: "zoom 1s ease infinite",
      },
    },
  },
};

export default config;
