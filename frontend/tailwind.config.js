/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'semi-transparent-black': 'rgba(30, 30, 30, 0.2)',
      }
    },
  },
  plugins: [],
}

