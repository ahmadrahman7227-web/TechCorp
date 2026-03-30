/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      animation: {
        gradient: "gradientMove 15s ease infinite",
        aurora: "auroraMove 20s ease-in-out infinite",
        aurora2: "auroraMove2 25s ease-in-out infinite",
      },
      keyframes: {
        gradientMove: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        auroraMove: {
          "0%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(80px,60px)" },
          "100%": { transform: "translate(0,0)" },
        },
        auroraMove2: {
          "0%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(-60px,-80px)" },
          "100%": { transform: "translate(0,0)" },
        },
      },
    },
  },

  plugins: [],
}