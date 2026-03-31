import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import team from "../assets/team.jpg"

export default function CompanyParallax() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // 🔥 PARALLAX MULTI LAYER
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.1, 1.2])
  const opacityOverlay = useTransform(scrollYProgress, [0, 1], [0.6, 0.8])

  return (
    <section
      ref={ref}
      className="relative h-[60vh] sm:h-[75vh] md:h-[90vh] overflow-hidden flex items-center justify-center"
    >

      {/*  BACKGROUND IMAGE */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0"
      >
        <img
          src={team}
          alt="team"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/*  DARK OVERLAY */}
      <motion.div
        style={{ opacity: opacityOverlay }}
        className="absolute inset-0 bg-black"
      />

      {/*  GRADIENT DEPTH */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]" />

      {/*  CENTER GLOW */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] sm:w-[600px] md:w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      {/*  CONTENT */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
            text-2xl sm:text-3xl md:text-5xl lg:text-6xl 
            font-bold mb-4 leading-tight
            bg-gradient-to-r from-white via-blue-200 to-purple-300
            bg-clip-text text-transparent
          "
        >
          Building Future-Ready Digital Experiences
        </motion.h2>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="
            text-gray-300 
            text-sm sm:text-base md:text-lg 
            mb-6 leading-relaxed
          "
        >
          We design and develop scalable, high-performance systems 
          that empower businesses to grow faster, smarter, and more efficiently.
        </motion.p>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="
            flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10
            text-[10px] sm:text-xs md:text-sm 
            text-gray-400 tracking-widest
          "
        >
          <span>20+ PROJECTS</span>
          <span>10+ CLIENTS</span>
          <span>5+ YEARS EXPERIENCE</span>
        </motion.div>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <button
  onClick={() => {
    const section = document.getElementById("case-studies")
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }}
  className="
    px-6 py-2 sm:px-8 sm:py-3 
    rounded-full 
    bg-gradient-to-r from-blue-500 to-purple-500
    hover:scale-105 transition
    text-sm sm:text-base
    shadow-lg
  "
>
  Explore Our Work →
</button>
        </motion.div>

      </div>
    </section>
  )
}