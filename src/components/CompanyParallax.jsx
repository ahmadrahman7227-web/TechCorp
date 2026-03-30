import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import team from "../assets/team.jpg"

export default function CompanyParallax() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])

  return (
    <section ref={ref} className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] overflow-hidden flex items-center justify-center">

      {/* BG */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={team}
          alt="team"
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl">

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-2xl sm:text-3xl md:text-6xl font-bold mb-4 leading-tight"
        >
          Designed for Performance. Built for Growth.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-sm sm:text-base md:text-lg mb-4"
        >
          We help businesses scale through modern technology and reliable systems
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xs sm:text-sm text-gray-400 tracking-widest"
        >
          20+ PROJECTS • 10+ CLIENTS • PROFESSIONAL TEAM
        </motion.div>

      </div>

    </section>
  )
}