import { motion } from "framer-motion"

const clients = [
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "Tesla",
  "Meta",
  "Spotify",
  "Adobe",
]

export default function ClientsSection() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full absolute top-0 left-0"></div>
        <div className="w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full absolute bottom-0 right-0"></div>
      </div>

      {/* 🔥 TITLE */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold 
        bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 
        bg-clip-text text-transparent">
          Trusted by Innovative Companies
        </h2>

        <p className="text-white/50 mt-3 text-sm sm:text-base">
          Partnering with modern businesses to build scalable digital solutions
        </p>
      </div>

      {/* 🔥 GRADIENT FADE LEFT */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-20" />

      {/* 🔥 GRADIENT FADE RIGHT */}
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-20" />

      {/* 🔥 MARQUEE */}
      <div className="overflow-hidden relative z-10">

        <motion.div
          className="flex gap-16 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          {[...clients, ...clients].map((client, i) => (
            <div
              key={i}
              className="
                text-xl sm:text-2xl md:text-3xl font-semibold 
                tracking-widest uppercase
                bg-gradient-to-r from-blue-400 to-purple-400 
                bg-clip-text text-transparent
                opacity-60 hover:opacity-100
                hover:scale-110
                hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]
                transition duration-300 cursor-default
              "
            >
              {client}
            </div>
          ))}
        </motion.div>

      </div>

      {/* 🔥 SECOND ROW (REVERSE — BIAR LEBIH HIDUP) */}
      <div className="overflow-hidden mt-10 relative z-10">

        <motion.div
          className="flex gap-16 w-max"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {[...clients, ...clients].map((client, i) => (
            <div
              key={i}
              className="
                text-lg sm:text-xl md:text-2xl font-semibold 
                tracking-wide
                text-white/30
                hover:text-white
                hover:scale-105
                transition duration-300
              "
            >
              {client}
            </div>
          ))}
        </motion.div>

      </div>

      {/* 🔥 OPTIONAL STATS */}
      <div className="mt-16 flex flex-wrap justify-center gap-10 text-center relative z-10 text-white/70">

        <div>
          <h3 className="text-2xl font-bold text-white">20+</h3>
          <p className="text-sm">Projects</p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white">10+</h3>
          <p className="text-sm">Clients</p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white">5+</h3>
          <p className="text-sm">Technologies</p>
        </div>

      </div>

    </section>
  )
}