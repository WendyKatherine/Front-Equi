/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      'purple': '#5d24f1',
      'lila': '#bba0ff',
      'white': '#f3eeff',
      'black': '#232323',
      'black-tran': '#24242482',
      'dark-black': '#131313',
      'dark-grey': '#242424',
      'grey': '#424242'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}

