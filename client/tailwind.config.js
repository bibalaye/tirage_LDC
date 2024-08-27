/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'uefa-blue': '#0E1E5B',
        'uefa-gold': '#D4A62A',
      },
    },
  },
  plugins: [],
}
