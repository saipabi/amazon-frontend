/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          dark: '#131921',
          light_dark: '#232f3e',
          yellow: '#febd69',
          orange: '#f08804',
          orange_hover: '#e27b00',
          blue: '#007185',
          price: '#b12704',
          bg: '#eaeded',
        },
      },
    },
  },
  plugins: [],
};
