/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all JS/TS/React files
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#5F6FFF"
      }
    },
  },
  plugins: [],
}

