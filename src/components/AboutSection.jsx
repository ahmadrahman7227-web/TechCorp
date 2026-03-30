import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import Tilt from "react-parallax-tilt"
import Starfield from "../components/Starfield"
import NeuralNetwork from "../components/NeuralNetwork"
import { Link } from "react-router-dom"

export default function AboutSection() {

  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 600], [0, -80])

  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  const items = [
    {
      title: "AI-Powered Solutions",
      desc: "Cutting-edge AI systems for smarter automation and decision-making."
    },
    {
      title: "High Performance Systems",
      desc: "High-performance infrastructure that grows with your business needs."
    },
    {
      title: "Future-Ready Technology",
      desc: "Built for tomorrow’s challenges in a fast-moving digital world."
    }
  ]

  return (
    <section 
      id="about"
      className="relative min-h-screen bg-black text-white overflow-hidden px-6 py-32"
    >

      {/* BACKGROUND */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a,transparent_60%)] opacity-40"
      />

      {/* AI BACKGROUND */}
      <NeuralNetwork mouse={mouse} />
      <Starfield mouse={mouse} />

      {/* ⚡ CURSOR LIGHT */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(59,130,246,0.12), transparent 40%)`
        }}
      />

      {/* CONTENT */}
      <motion.div
        style={{ y: yParallax }}
        className="relative z-10 max-w-6xl mx-auto text-center"
      >

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold mb-6
                     bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400
                     bg-clip-text text-transparent"
        >
          About Us
        </motion.h2>

        {/* DESC */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg opacity-70 max-w-2xl mx-auto"
        >
          We build intelligent systems powered by cutting-edge AI.
          Helping businesses scale faster, smarter, and beyond limits.
        </motion.p>

        {/*  COMPANY HISTORY */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-blue-400">
            Our Journey
          </h3>
          <p className="opacity-70 leading-relaxed">
            Founded in 2023, TechCorp started as a small team of passionate developers
            driven by a vision to revolutionize digital experiences. Today, we build
            scalable AI-powered systems used by businesses worldwide.
          </p>
        </div>

        {/*  VISION & MISSION */}
        <div className="grid md:grid-cols-2 gap-10 mt-20 text-left">

          <div className="p-6 border border-white/10 rounded-xl bg-white/5">
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              Our Vision
            </h3>
            <p className="opacity-70">
              To become a global leader in AI-driven technology solutions.
            </p>
          </div>

          <div className="p-6 border border-white/10 rounded-xl bg-white/5">
            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              Our Mission
            </h3>
            <p className="opacity-70">
              Deliver innovative, scalable, and intelligent systems that empower businesses.
            </p>
          </div>

        </div>

        {/*  CULTURE */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-pink-400">
            Our Culture
          </h3>
          <p className="opacity-70 leading-relaxed">
            At TechCorp, we believe in innovation, collaboration, and continuous learning.
            Our team thrives on solving complex problems using cutting-edge technologies
            like AI, cloud computing, and modern web systems.
          </p>
        </div>

        {/*  WHY CHOOSE US */}
        <h3 className="text-2xl font-bold mt-24 mb-10">
          Why Choose Us
        </h3>

        {/*  CARDS (TIDAK DIHAPUS, CUMA DIPOSISIKAN ULANG) */}
        <div className="grid md:grid-cols-3 gap-10">

          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >

              <Tilt
                tiltMaxAngleX={12}
                tiltMaxAngleY={12}
                perspective={1200}
                scale={1.05}
                transitionSpeed={2000}
              >

                <div className="relative p-8 rounded-2xl border border-white/10 
                                bg-white/5 backdrop-blur-xl overflow-hidden group cursor-pointer">

                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500
                    bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-purple-500/20 blur-xl"
                  />

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                    bg-gradient-to-br from-blue-500/10 to-purple-500/10"
                  />

                  <h3 className="text-xl font-semibold mb-3 relative z-10">
                    {item.title}
                  </h3>

                  <p className="text-sm opacity-70 relative z-10">
                    {item.desc}
                  </p>

                </div>

              </Tilt>
            </motion.div>
          ))}

        </div>

        {/*  TEAM PREVIEW */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold mb-4">
            Meet Our Team
          </h3>

          <p className="opacity-70 mb-6">
            Our talented engineers, designers, and innovators.
          </p>

          {/* <a href="#teams">
            <button className="px-6 py-3 bg-blue-500 rounded-full hover:bg-blue-600 transition inline-block">
                  View Team
            </button>
          </a> */}

          <button
  onClick={() => {
    document.getElementById("teams")?.scrollIntoView({
      behavior: "smooth",
    })
  }}
  className="relative px-8 py-3 rounded-full font-semibold text-white 
             bg-gradient-to-r from-blue-500 to-purple-600
             overflow-hidden group transition duration-300"
>

  {/*  Glow effect */}
  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 
                   opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></span>

  {/* ✨ Inner light */}
  <span className="absolute inset-0 opacity-0 group-hover:opacity-20 
                   bg-white transition duration-300"></span>

  {/* TEXT */}
  <span className="relative z-10 flex items-center gap-2">
    View Team
    <span className="group-hover:translate-x-1 transition">→</span>
  </span>

</button>
        </div>

      </motion.div>

      {/* ⚡ DATA FLOW LINE */}
      <motion.div
        className="absolute bottom-16 left-1/2 w-[400px] h-[2px]
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