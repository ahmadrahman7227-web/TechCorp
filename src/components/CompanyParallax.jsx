import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import team from "../assets/team.jpg"

export default function CompanyParallax() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // 🔥 PARALLAX DEPTH (lebih halus & natural)
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.02, 1.12])
  const opacityOverlay = useTransform(scrollYProgress, [0, 1], [0.45, 0.75])

  // 🔥 SMOOTH FADE GLOBAL (ini kunci)
  const opacitySection = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  // 🔥 CONTENT FLOAT (biar cinematic)
  const yContent = useTransform(scrollYProgress, [0, 1], [80, -60])

  // 🔥 GRID FADE IN (biar ga muncul kasar)
  const gridOpacity = useTransform(scrollYProgress, [0.4, 1], [0, 1])

  // 🔥 MOUSE GLOW
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
    const handleMouse = (e) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [isMobile])

  return (
    <>
      <motion.section
        ref={ref}
        style={{ opacity: opacitySection }}
        className="relative h-[75vh] md:h-[95vh] overflow-hidden flex items-center justify-center"
      >

        {/* 🔥 TOP BLEND (SUPER HALUS) */}
        <div className="absolute top-0 left-0 w-full h-60 
          bg-gradient-to-b from-[#020617] via-[#020617]/70 to-transparent z-20" />

        {/* 🔥 BACKGROUND */}
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

        {/* 🔥 DARK OVERLAY */}
        <motion.div
          style={{ opacity: opacityOverlay }}
          className="absolute inset-0 bg-black"
        />

        {/* 🔥 GLOBAL COLOR BLEND */}
        <div className="absolute inset-0 
          bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />

        {/* 🔥 CONNECTOR LIGHT (ini bikin nyatu antar section) */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 
          w-[700px] h-[350px] bg-blue-500/10 blur-[160px] rounded-full" />

        {/* 🔥 EXTRA DEPTH */}
        <div className="absolute bottom-[-25%] right-[15%] 
          w-[600px] h-[600px] bg-purple-500/10 blur-[180px] rounded-full" />

        {/* 🔥 MOUSE INTERACTION */}
        {!isMobile && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(59,130,246,0.12), transparent 45%)`,
            }}
          />
        )}

        {/* 🔥 MAIN CONTENT */}
        <motion.div
          style={{ y: yContent }}
          className="relative z-30 text-center px-4 max-w-5xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight
              bg-gradient-to-r from-white via-blue-200 to-purple-300
              bg-clip-text text-transparent"
          >
            From Vision to Intelligent Systems
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-sm sm:text-base md:text-lg mb-12"
          >
            We transform ideas into scalable, AI-powered digital ecosystems 
            that drive real business growth and long-term innovation.
          </motion.p>

          {/* 🔥 CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[
              {
                title: "AI-Driven Innovation",
                desc: "Create adaptive systems powered by modern AI technologies."
              },
              {
                title: "Scalable Architecture",
                desc: "Built to grow with your business without limits."
              },
              {
                title: "Business Impact",
                desc: "Focused on real results, not just development."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="p-6 rounded-2xl 
                  bg-white/[0.03] border border-white/[0.08]
                  backdrop-blur-xl hover:-translate-y-2
                  transition duration-300"
              >
                <h3 className="text-white font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}

          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <button
              onClick={() =>
                document
                  .getElementById("case-studies")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 rounded-full
                bg-gradient-to-r from-blue-500 to-purple-500
                hover:scale-105 transition shadow-xl"
            >
              Explore Our Work →
            </button>
          </motion.div>

        </motion.div>

        {/* 🔥 GRID FADE (INI KUNCI BIAR GA PATAH KE BAWAH) */}
        <motion.div
          style={{ opacity: gridOpacity }}
          className="absolute bottom-0 left-0 w-full h-40 
          bg-gradient-to-t from-[#020617] to-transparent"
        />

        {/* 🔥 BOTTOM TRANSITION */}
        <div className="absolute bottom-0 left-0 w-full h-40 
          bg-gradient-to-b from-transparent to-[#020617]" />

      </motion.section>

      {/* SPACING */}
      <div className="h-24 md:h-32" />
    </>
  )
}