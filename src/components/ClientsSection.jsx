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
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden px-4 sm:px-6 md:px-12">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-blue-500/10 blur-3xl rounded-full absolute top-0 left-0"></div>
        <div className="w-[250px] sm:w-[350px] md:w-[400px] h-[250px] sm:h-[350px] md:h-[400px] bg-purple-500/10 blur-3xl rounded-full absolute bottom-0 right-0"></div>
      </div>

      {/* TITLE */}
      <div className="text-center mb-10 sm:mb-14 md:mb-16 relative z-10">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold 
        bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 
        bg-clip-text text-transparent">
          Trusted by Innovative Companies
        </h2>

        <p className="text-white/50 mt-3 text-xs sm:text-sm md:text-base max-w-xl mx-auto">
          Partnering with modern businesses to build scalable digital solutions
        </p>
      </div>

      {/* FADE LEFT */}
      <div className="absolute left-0 top-0 h-full w-12 sm:w-20 md:w-32 bg-gradient-to-r from-[#020617] to-transparent z-20" />

      {/* FADE RIGHT */}
      <div className="absolute right-0 top-0 h-full w-12 sm:w-20 md:w-32 bg-gradient-to-l from-[#020617] to-transparent z-20" />

      {/* ROW 1 */}
      <div className="overflow-hidden relative z-10">
        <motion.div
          className="flex gap-8 sm:gap-12 md:gap-16 w-max"
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
                text-sm sm:text-lg md:text-2xl font-semibold 
                tracking-wide sm:tracking-widest uppercase
                bg-gradient-to-r from-blue-400 to-purple-400 
                bg-clip-text text-transparent
                opacity-60 hover:opacity-100
                hover:scale-110
                transition duration-300 whitespace-nowrap
              "
            >
              {client}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ROW 2 */}
      <div className="overflow-hidden mt-6 sm:mt-8 md:mt-10 relative z-10">
        <motion.div
          className="flex gap-8 sm:gap-12 md:gap-16 w-max"
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
                text-xs sm:text-base md:text-xl font-semibold 
                text-white/30
                hover:text-white
                hover:scale-105
                transition duration-300 whitespace-nowrap
              "
            >
              {client}
            </div>
          ))}
        </motion.div>
      </div>

      {/* STATS */}
      <div className="mt-10 sm:mt-14 md:mt-16 flex flex-wrap justify-center gap-6 sm:gap-10 text-center relative z-10 text-white/70">

        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">20+</h3>
          <p className="text-xs sm:text-sm">Projects</p>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">10+</h3>
          <p className="text-xs sm:text-sm">Clients</p>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">5+</h3>
          <p className="text-xs sm:text-sm">Technologies</p>
        </div>

      </div>

    </section>
  )
}