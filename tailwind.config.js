/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        spotify: {
          primary: '#8B5CF6', // violet-500
          secondary: '#7C3AED', // violet-600
          dark: '#09090B', // zinc-950
          'dark-secondary': '#18181B', // zinc-900
          'dark-hover': '#27272A', // zinc-800
        },
      },
    },
  },
  plugins: [],
};