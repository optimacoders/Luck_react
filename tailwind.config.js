/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg_white: '#f9f9f1',
        gold_primary: '#e3db94',
        gold_secondary: '#dacd7f',
        gold_medium: '#d1bf6a',
        gold_dark: '#c9b156'
      },
    },
  },
  plugins: [],
}