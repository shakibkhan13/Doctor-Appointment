/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#5f6FFF", // Custom primary color
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))', // Custom grid configuration
      },
    },
  },
  plugins: [
    // require('tailwind-scrollbar'), // Add scrollbar plugin for custom styles
  ],
  variants: {
    scrollbar: ['rounded'], // Enables rounded scrollbar variants
  },
};
