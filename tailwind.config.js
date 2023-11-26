/** @type {import('tailwindcss').Config} */
export const content = [];

// export const content = ["./src/**/*.{html,js,jsx}"];
// export const content = ["./pages/**/*.{html,js,jsx}"];
export const theme = {
  extend: {},
};
export const plugins = [];

// Added below for NextUI components
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './pages/**/*.{html,js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    // "./node_modules/@nextui-org/theme/dist/components/select.js",
    // "./node_modules/@nextui-org/theme/dist/components/selectitem.js",
  ],
  theme: {
    extend: {
    }
  },
  darkMode: "class",

  // Try
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            // DEFAULT: "#BEF264",
            foreground: "#000000",
            background: "#ffffff",
          },
        },
      },
    }),
  ],
};
