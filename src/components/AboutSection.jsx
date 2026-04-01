import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import Tilt from "react-parallax-tilt"

export default function AboutSection() {
  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 600], [0, -100])

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

  const items = [
    {
      title: "Business-Oriented",
      desc: "Every product we build is designed to solve real business problems."
    },
    {
      title: "Performance First",
      desc: "Speed, scalability, and reliability are at the core of everything we do."
    },
    {
      title: "Modern Stack",
      desc: "We use the latest technologies to ensure long-term growth and flexibility."
    }
  ]

  const text = "We Build Digital Products That Actually Work".split(" ")

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const wordAnim = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6 }
    }
  }

  const cardAnim = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  }

  return (
    <section 
      id="about"
      className="relative z-10 text-white overflow-hidden px-4 sm:px-6 md:px-12 py-24 md:py-32"
    >

      {/* 🔥 DARK BASE (BIAR KONTRAS NAIK) */}
      <div className="absolute inset-0 bg-[#020617]/80 z-[1]" />

      {/* 🔥 RADIAL FOCUS */}
      <div className="absolute inset-0 z-[2] 
        bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" 
      />

      {/* 🔥 CURSOR LIGHT (SOFT) */}
      {!isMobile && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(59,130,246,0.08), transparent 40%)`
          }}
        />
      )}

      {/* 🔥 CONTENT */}
      <motion.div
        style={{ y: yParallax }}
        className="relative z-[5] max-w-6xl mx-auto text-center"
      >

        {/* TITLE */}
        <motion.h2
          variants={container}
          initial="hidden"
          whileInView="show"
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight"
        >
          {text.map((word, i) => (
            <motion.span
              key={i}
              variants={wordAnim}
              className={`inline-block mr-2 ${
                word === "Digital" || word === "Work"
                  ? "bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                  : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* DESC */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-16 md:mb-20"
        >
          We focus on delivering real business impact through scalable systems, 
          modern design, and performance-driven development.
        </motion.p>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">

          {items.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardAnim}
              initial="hidden"
              whileInView="show"
            >
              <Tilt
                tiltMaxAngleX={isMobile ? 0 : 8}
                tiltMaxAngleY={isMobile ? 0 : 8}
                scale={isMobile ? 1 : 1.04}
                perspective={1000}
                transitionSpeed={1500}
              >
                <div className="relative p-6 md:p-8 rounded-2xl border border-white/10 
                                bg-white/5 backdrop-blur-xl overflow-hidden group
                                hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]
                                transition-all duration-300">

                  {/* GLOW */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
                    bg-gradient-to-br from-blue-500/10 via-cyan-400/10 to-purple-500/10 blur-2xl"
                  />

                  <h3 className="text-lg md:text-xl font-semibold mb-2 relative z-10">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/70 relative z-10 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r 
                    from-blue-400 to-purple-500 group-hover:w-full transition-all duration-500"
                  />

                </div>
              </Tilt>
            </motion.div>
          ))}

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 md:mt-20"
        >
          <button
            onClick={() => {
              document.getElementById("services")?.scrollIntoView({
                behavior: "smooth",
              })
            }}
            className="px-6 md:px-8 py-3 rounded-full font-semibold text-white 
                       bg-gradient-to-r from-blue-500 to-purple-600
                       hover:scale-105 hover:shadow-lg
                       transition duration-300"
          >
            Explore Our Services →
          </button>
        </motion.div>

      </motion.div>

      {/* LINE */}
      <motion.div
        className="absolute bottom-10 md:bottom-16 left-1/2 w-[250px] md:w-[400px] h-[2px]
                   bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        animate={{
          opacity: [0.2, 1, 0.2],
          scaleX: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        style={{ transform: "translateX(-50%)" }}
      />

    </section>
  )
}