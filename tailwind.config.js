/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/**/**/.{js,ts,jsx,tsx}',
  ],
  darkMode: 'selector',
  theme: {
    fontFamily: {
      retro: ['Tiny5-Regular'],
      inter: ['Inter'],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    colors: {
      black: '#121212',
      white: '#D9D9D9',
      green: '#85C295',
      pink: '#FFCCF1',
      blue: '#7A9CF4',
      red: {
        title: '#E85B5B',
        episode: '#B6050D',
      },
      semiBlack: {
        400: '#363434',
        500: '#2E2C2C',
        600: '#262424',
        700: '#1E1C1C',
      },
    },
    extend: {},
  },
  plugins: [],
};
