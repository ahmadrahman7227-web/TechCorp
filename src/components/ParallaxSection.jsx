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
    <section className="relative min-h-screen w-full overflow-hidden bg-black">

      {/*  BASE */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, #1e3a8a 0%, #020617 60%)",
          y: yBg
        }}
      />

      {/*  GLOW CENTER */}
      <motion.div
      className={`absolute rounded-full ${
    isMobile
      ? "w-[300px] h-[300px] blur-[80px]"
      : "w-[700px] h-[700px] blur-[160px]"
  } bg-blue-500`}
        // className="absolute w-[700px] h-[700px] bg-blue-500 rounded-full blur-[160px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
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

       {/* AI NETWORK
      <NeuralNetwork mouse={mouse} />

      {/*  STAR */}
      {/* <Starfield mouse={mouse} /> */} 
        {!isMobile && <NeuralNetwork mouse={mouse} />}
        {!isMobile && <Starfield mouse={mouse} />}


      {/* ✨ GRID */}
      <div className="absolute inset-0 opacity-10 pointer-events-none
        bg-[radial-gradient(circle,_#3b82f6_1px,_transparent_1px)]
        bg-[size:40px_40px]"
      />

      {/* ⚡ CURSOR LIGHT 1 */}
      {!isMobile && (
  <>
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{
        background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(59,130,246,0.18), transparent 40%)`
      }}
    />

      {/* ⚡ CURSOR LIGHT 2 */}
       <motion.div
      className="pointer-events-none absolute inset-0 z-[7]"
      style={{
        background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(96,165,250,0.08), transparent 60%)`
      }}
    />
  </>
)}

      {/* 🎯 FOCUS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

      {/* 🌫️ OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* 📝 CONTENT */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-4"
        style={{ y: yContent }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-7xl font-bold mb-4 tracking-wide
                     bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400
                     bg-clip-text text-transparent"
          style={{
            textShadow: "0 0 20px rgba(59,130,246,0.4)"
          }}
        >
          TechCorp
        </motion.h1>

        <TypeAnimation
          sequence={[
            "We Don't Build Systems.",
            1500,
            "We Build Intelligence.",
            1500,
            "Welcome to the Future.",
            2000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className="text-xl opacity-80"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg max-w-xl opacity-70 mt-4"
        >
          Engineering the next generation of AI infrastructure 
          for companies that refuse to stay average.
        </motion.p>
      </motion.div>
    </section>
  )
}