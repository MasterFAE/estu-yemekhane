/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customblue: {
          50: "#DEE7FF",
          100: "#D2DBF2",
          200: "#BDC5D9",
          300: "#9BA2B3",
          400: "#FFD28D",
        },
      },
    },
  },
  plugins: [],
};
