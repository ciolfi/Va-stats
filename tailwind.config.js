/** @type {import('tailwindcss').Config} */
// export const content = [];
export const content = ["./src/**/*.{html,js,jsx}"];
export const theme = {
  extend: {},
};
export const plugins = [];

// Added below for NextUI components
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
