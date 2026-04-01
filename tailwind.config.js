// /** @type {import('tailwindcss').Config} */
// export default {
//   darkMode: "class",
//   content: ["./index.html", "./src/**/*.{js,jsx}"],

//   theme: {
//     extend: {
//       animation: {
//         gradient: "gradientMove 15s ease infinite",
//         aurora: "auroraMove 20s ease-in-out infinite",
//         aurora2: "auroraMove2 25s ease-in-out infinite",
//       },
//       keyframes: {
//         gradientMove: {
//           "0%, 100%": { backgroundPosition: "0% 50%" },
//           "50%": { backgroundPosition: "100% 50%" },
//         },
//         auroraMove: {
//           "0%": { transform: "translate(0,0)" },
//           "50%": { transform: "translate(80px,60px)" },
//           "100%": { transform: "translate(0,0)" },
//         },
//         auroraMove2: {
//           "0%": { transform: "translate(0,0)" },
//           "50%": { transform: "translate(-60px,-80px)" },
//           "100%": { transform: "translate(0,0)" },
//         },
//       },
//     },
//   },

//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      animation: {
        gradient: "gradientMove 20s ease infinite",

        aurora: "auroraMove 25s ease-in-out infinite",
        aurora2: "auroraMove2 30s ease-in-out infinite",

        floatSlow: "floatSlow 12s ease-in-out infinite",
        floatSlow2: "floatSlow2 16s ease-in-out infinite",

        pulseGlow: "pulseGlow 4s ease-in-out infinite",

        drift: "drift 40s linear infinite",
      },

      keyframes: {
        // 🌈 gradient shift (lebih smooth)
        gradientMove: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },

        // 🌌 aurora movement (lebih halus)
        auroraMove: {
          "0%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(60px,40px)" },
          "100%": { transform: "translate(0,0)" },
        },

        auroraMove2: {
          "0%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(-40px,-60px)" },
          "100%": { transform: "translate(0,0)" },
        },

        // 🔥 FLOAT ORB (utama)
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-40px) translateX(20px)" },
        },

        floatSlow2: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(30px) translateX(-30px)" },
        },

        // 💡 glow hidup
        pulseGlow: {
          "0%, 100%": { opacity: 0.4, transform: "scale(1)" },
          "50%": { opacity: 0.8, transform: "scale(1.2)" },
        },

        // 🌠 star drift (horizontal pelan)
        drift: {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(-200px)" },
        },
      },
    },
  },

  plugins: [],
}