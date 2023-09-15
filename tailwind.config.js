/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        'salmon': '#FF9A62',
        'lightsalmon':'#FFD0B7'
      },
      fontFamily: {
        'Nunito': ['Nunito', 'sans-serif']
      },
    },
  },
  plugins: [require("daisyui")],
};
