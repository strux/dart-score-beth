/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  safelist: [
    {
      pattern: /grid-rows-.+/,
    }
  ],
  theme: {
    extend: {
      fontFamily: {
         'script': ['Kolker Brush'],
      }
   }
  },
  plugins: [],
}