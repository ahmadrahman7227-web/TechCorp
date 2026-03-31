import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import Starfield from "./Starfield"
import NeuralNetwork from "./NeuralNetwork"

export default function ParallaxSection() {
  const { scrollY } = useScroll()

  const yBg = useTransform(scrollY, [0, 500], [0, 120])
  const yContent = useTransform(scrollY, [0, 500], [0, -80])

  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const [isMobile, setIsMobile] = useState(false)

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768)
  }

  checkMobile()
  window.addEventListener("resize", checkMobile)

  return () => window.removeEventListener("resize", checkMobile)
}, [])

  // useEffect(() => {
  //   const handleMouse = (e) => {
  //     setMouse({
  //       x: e.clientX,
  //       y: e.clientY,
  //     })
  //   }

  //   window.addEventListener("mousemove", handleMouse)
  //   return () => window.removeEventListener("mousemove", handleMouse)
  // }, [])

  useEffect(() => {
  if (isMobile) return

  const handleMouse = (e) => {
    setMouse({
      x: e.clientX,
      y: e.clientY,
    })
  }

  window.addEventListener("mousemove", handleMouse)
  return () => window.removeEventListener("mousemove", handleMouse)
}, [isMobile])
  

   return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/* BASE */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, #1e3a8a 0%, #020617 60%)",
          y: yBg
        }}
      />

      {/* GLOW CENTER */}
      <motion.div
        className={`absolute rounded-full ${
          isMobile
            ? "w-[300px] h-[300px] blur-[80px]"
            : "w-[700px] h-[700px] blur-[160px]"
        } bg-blue-500`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      />

      {/* SECOND GLOW */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-purple-500 rounded-full blur-[140px] opacity-20"
        animate={{
          x: mouse.x * -0.02,
          y: mouse.y * -0.02,
        }}
        transition={{ type: "spring", stiffness: 40 }}
        style={{
          top: "70%",
          left: "30%"
        }}
      />

      {/* NETWORK + STAR */}
      {!isMobile && <NeuralNetwork mouse={mouse} />}
      {!isMobile && <Starfield mouse={mouse} />}

      {/* GRID */}
      <div className="absolute inset-0 opacity-10 pointer-events-none
        bg-[radial-gradient(circle,_#3b82f6_1px,_transparent_1px)]
        bg-[size:40px_40px]"
      />

      {/* CURSOR LIGHT */}
      {!isMobile && (
        <>
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(59,130,246,0.18), transparent 40%)`
            }}
          />

          <motion.div
            className="pointer-events-none absolute inset-0 z-[7]"
            style={{
              background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(96,165,250,0.08), transparent 60%)`
            }}
          />
        </>
      )}

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* 🔥 NEW: FLOATING STATS (UPGRADE) */}
      <motion.div 
        className="absolute top-[30%] left-[8%] hidden md:block
        bg-white/5 backdrop-blur-md px-5 py-3 rounded-xl
        border border-white/10 text-white/80 text-sm shadow-lg"
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        🚀 <span className="font-semibold text-white">20+ Projects</span>
      </motion.div>

      <motion.div 
        className="absolute bottom-[25%] right-[8%] hidden md:block
        bg-white/5 backdrop-blur-md px-5 py-3 rounded-xl
        border border-white/10 text-white/80 text-sm shadow-lg"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        🌍 <span className="font-semibold text-white">Global Clients</span>
      </motion.div>

      {/* 🔥 NEW: FOREGROUND GLOW (DEPTH) */}
      <div className="absolute w-[400px] h-[200px] 
        bg-blue-500/10 blur-3xl rounded-full 
        top-[45%] left-1/2 -translate-x-1/2 -z-0" />

      {/* CONTENT */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-4"
        style={{ y: yContent }}
      >
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4
                     bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400
                     bg-clip-text text-transparent"
        >
          Engineering the Future <br />
          of Digital Systems
        </motion.h1>

        {/* 🔥 UPGRADE: BIGGER SUBTEXT */}
        <TypeAnimation
          sequence={[
            "Web Development Solutions",
            1500,
            "Mobile App Development",
            1500,
            "Cloud Infrastructure & AI Systems",
            2000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold opacity-90 mb-4 text-blue-300"
        />

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl max-w-2xl opacity-80 mt-3 leading-relaxed"
        >
          We design and develop scalable web, mobile, and cloud-based solutions 
          that help businesses innovate faster, improve efficiency, and stay 
          competitive in the rapidly evolving digital landscape.
        </motion.p>

        {/* CHIPS */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm sm:text-base">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full 
            bg-gradient-to-r from-white/5 to-white/10 
            border border-white/10 backdrop-blur-md">
            🌐 Web Development
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full 
            bg-gradient-to-r from-white/5 to-white/10 
            border border-white/10 backdrop-blur-md">
            📱 Mobile Apps
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full 
            bg-gradient-to-r from-white/5 to-white/10 
            border border-white/10 backdrop-blur-md">
            ☁️ Cloud Systems
          </div>
        </div>

        {/* 🔥 NEW: CTA BUTTON */}
        {/* <div className="flex flex-wrap justify-center gap-4 mt-10">
          <button className="px-6 py-3 rounded-full 
            bg-gradient-to-r from-blue-500 to-purple-500 
            shadow-xl hover:scale-105 transition">
            Get Started
          </button>

          <button className="px-6 py-3 rounded-full 
            border border-white/20 
            hover:bg-white/10 transition">
            View Services
          </button>
        </div> */}

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs sm:text-sm mt-8 tracking-widest text-gray-300"
        >
          20+ PROJECTS • 10+ CLIENTS • PROFESSIONAL TEAM
        </motion.div>
      </motion.div>

      {/* 🔥 NEW: SCROLL INDICATOR */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-6 text-white/40 text-sm"
      >
        ↓ Scroll
      </motion.div>

    </section>
  )
}