/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'open_sans': ['"Open Sans"', 'sans-serif'],
        'merriweather': ['Merriweather', 'serif'],
      },
      colors: {
        bg_white: '#f9f9f1',
        gold_primary: '#e3db94',
        gold_secondary: '#dacd7f',
        gold_medium: '#d1bf6a',
        gold_dark: '#c9b156',
        bg_back: '#263238'
      },
    },
  },
  plugins: [],
}