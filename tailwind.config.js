/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        salmon: "#FF9A62",
        lightsalmon: "#FFD0B7",
        "salmon-profile": "#FF9671",
      },
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
      },
      screen: {
        sm: "640px",
        lg: "1280px",
      },
    },
  },
  plugins: [require("daisyui")],
};
