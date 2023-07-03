/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        poppins: ['Poppins', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        lato : ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        primary: "#065f46",
        secondary: "#047857",
        offwhite: '#f1f1f1',
        gray: '#8c8b8b',
      }
    },
  },
  plugins: [],
}