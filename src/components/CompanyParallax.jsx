import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import team from "../assets/team.jpg"

export default function CompanyParallax() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // 🔥 PARALLAX DEPTH
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.1, 1.2])
  const opacityOverlay = useTransform(scrollYProgress, [0, 1], [0.4, 0.8])
  const fadeOut = useTransform(scrollYProgress, [0, 1], [1, 0.2])

  // 🔥 MOUSE INTERACTION
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const handleMouse = (e) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [isMobile])

  return (
    <>
      <section
        ref={ref}
        className="relative h-[65vh] md:h-[85vh] overflow-hidden flex items-center justify-center"
      >
        {/* 🌌 BACKGROUND IMAGE */}
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

        {/* 🌑 DARK OVERLAY */}
        <motion.div
          style={{ opacity: opacityOverlay }}
          className="absolute inset-0 bg-black"
        />

        {/* 🌈 COLOR DEPTH (BIAR NYATU KE THEME) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]" />

        {/* ✨ LIGHT LEAK (ADVANCED FEEL) */}
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[20%] w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full" />

        {/* 🔥 MOUSE GLOW */}
        {!isMobile && (
          <>
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(59,130,246,0.15), transparent 40%)`,
              }}
            />

            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(168,85,247,0.12), transparent 60%)`,
              }}
            />
          </>
        )}

        {/* 🔥 MAIN CONTENT */}
        <motion.div
          style={{ opacity: fadeOut }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight
              bg-gradient-to-r from-white via-blue-200 to-purple-300
              bg-clip-text text-transparent"
          >
            Building Future-Ready <br /> Digital Experiences
          </motion.h2>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-sm sm:text-base md:text-lg mb-8 leading-relaxed"
          >
            We design scalable, high-performance systems powered by modern
            architecture, AI, and human-centered design.
          </motion.p>

          {/* 🔥 GLASS STATS CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="
              backdrop-blur-xl bg-white/5 border border-white/10
              rounded-2xl px-6 py-4 inline-flex gap-6 md:gap-10
              text-xs sm:text-sm text-gray-300 shadow-2xl
            "
          >
            <div>
              <p className="text-white font-semibold text-lg">20+</p>
              <p>Projects</p>
            </div>
            <div>
              <p className="text-white font-semibold text-lg">10+</p>
              <p>Clients</p>
            </div>
            <div>
              <p className="text-white font-semibold text-lg">5+</p>
              <p>Years</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <button
              onClick={() => {
                document
                  .getElementById("case-studies")
                  ?.scrollIntoView({ behavior: "smooth" })
              }}
              className="
                px-6 py-3 rounded-full
                bg-gradient-to-r from-blue-500 to-purple-500
                hover:scale-105 transition
                shadow-xl text-sm sm:text-base
              "
            >
              Explore Our Work →
            </button>
          </motion.div>
        </motion.div>

        {/* 🔥 DEPTH OVERLAY (BIAR ADA LAYER) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617]" />

        {/* 🔥 BOTTOM TRANSITION */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#020617]" />
      </section>

      {/* SPACING BIAR SMOOTH */}
      <div className="h-20 md:h-28" />
    </>
  )
}