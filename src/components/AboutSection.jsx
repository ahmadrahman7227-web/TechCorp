import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import Tilt from "react-parallax-tilt"

export default function AboutSection() {
  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 600], [0, -60])

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

  return (
    <section
      
      className="relative z-10 text-white overflow-hidden px-4 sm:px-6 md:px-12 py-28 md:py-36"
    >

      {/*  HAPUS BACKGROUND GELAP FULL — GANTI JADI SOFT BLEND */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/40 to-transparent z-[1]" /> */}

      {/*  SOFT RADIAL (BIAR ADA FOKUS TANPA PUTUS BG) */}
      <div className="absolute inset-0 z-[2]
        bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]" 
      />

      {/*  CURSOR LIGHT */}
      {!isMobile && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(59,130,246,0.06), transparent 40%)`
          }}
        />
      )}

      {/*  CONTENT */}
      <motion.div
        style={{ y: yParallax }}
        className="relative z-[5] max-w-6xl mx-auto text-center"
      >

        {/* TITLE */}
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {text.map((word, i) => (
            <span
              key={i}
              className={`inline-block mr-2 ${
                word === "Digital" || word === "Work"
                  ? "bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                  : ""
              }`}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* DESC */}
        <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-16 md:mb-20">
          We focus on delivering real business impact through scalable systems,
          modern design, and performance-driven development.
        </p>

        {/* CARDS */}
        {/* CARDS */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">

  {items.map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        delay: i * 0.15,
        type: "spring",
        stiffness: 80,
        damping: 18
      }}
    >
      <Tilt
        tiltMaxAngleX={isMobile ? 0 : 10}
        tiltMaxAngleY={isMobile ? 0 : 10}
        scale={isMobile ? 1 : 1.05}
        perspective={1200}
        transitionSpeed={2000}
        glareEnable={!isMobile}
        glareMaxOpacity={0.15}
        glareColor="#ffffff"
        glarePosition="all"
      >
        <div className="
          relative group p-6 md:p-8 rounded-2xl
          border border-white/10
          bg-white/[0.04]
          backdrop-blur-2xl
          overflow-hidden
          transition-all duration-500
          hover:-translate-y-3
        ">

          {/*  GRADIENT BORDER GLOW */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500
            bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-400/20 blur-xl"
          />

          {/*  INNER GLASS */}
          <div className="absolute inset-[1px] rounded-2xl bg-[#020617]/80 backdrop-blur-xl" />

          {/*  LIGHT SWEEP ANIMATION */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
            <div className="absolute -left-1/2 top-0 w-[200%] h-full
              bg-gradient-to-r from-transparent via-white/10 to-transparent
              rotate-12 translate-x-[-100%] group-hover:translate-x-[100%]
              transition-transform duration-[1200ms]"
            />
          </div>

          {/* CONTENT */}
          <div className="relative z-10">

            <h3 className="text-lg md:text-xl font-semibold mb-3 
              bg-gradient-to-r from-white to-blue-200 
              bg-clip-text text-transparent">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              {item.desc}
            </p>

          </div>

          {/*  BOTTOM LINE */}
          <div className="absolute bottom-0 left-0 w-0 h-[2px] 
            bg-gradient-to-r from-blue-400 to-purple-500
            group-hover:w-full transition-all duration-500"
          />

        </div>
      </Tilt>
    </motion.div>
  ))}

</div>

        {/* CTA */}
        <div className="mt-16 md:mt-20">
          <button
            onClick={() => {
              document.getElementById("services")?.scrollIntoView({
                behavior: "smooth",
              })
            }}
            className="
              px-6 md:px-8 py-3 rounded-full font-semibold text-white
              bg-gradient-to-r from-blue-500 to-purple-600
              hover:scale-105 hover:shadow-lg
              transition duration-300
            "
          >
            Explore Our Services →
          </button>
        </div>

      </motion.div>

      {/*  TRANSISI ATAS & BAWAH (PENTING BANGET) */}
      {/* <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#020617] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#020617] pointer-events-none" /> */}

    </section>
  )
}