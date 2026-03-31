import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import Tilt from "react-parallax-tilt"
import Starfield from "../components/Starfield"
import NeuralNetwork from "../components/NeuralNetwork"

export default function AboutSection() {

  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 600], [0, -80])

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

  useEffect(() => {
    if (isMobile) return

    const handleMouse = (e) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }

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

  return (
    <section 
      id="about"
      className="relative bg-black text-white overflow-hidden px-6 md:px-12 py-32"
    >

      {/* BACKGROUND */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a,transparent_60%)] opacity-40"
      />

      {/* AI BACKGROUND */}
      {!isMobile && <NeuralNetwork mouse={mouse} />}
      {!isMobile && <Starfield mouse={mouse} />}

      {/* CURSOR LIGHT */}
      {!isMobile && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(59,130,246,0.12), transparent 40%)`
          }}
        />
      )}

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
          className="text-4xl md:text-6xl font-bold mb-6
                     bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400
                     bg-clip-text text-transparent"
        >
          We Build Digital Products That Actually Work
        </motion.h2>

        {/* DESC */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg opacity-70 max-w-2xl mx-auto mb-20"
        >
          We focus on delivering real business impact through scalable systems, 
          modern design, and performance-driven development.
        </motion.p>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-10">

          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <Tilt
                tiltMaxAngleX={isMobile ? 0 : 10}
                tiltMaxAngleY={isMobile ? 0 : 10}
                perspective={1200}
                scale={isMobile ? 1 : 1.05}
                transitionSpeed={2000}
              >
                <div className="relative p-8 rounded-2xl border border-white/10 
                                bg-white/5 backdrop-blur-xl overflow-hidden group">

                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
                    bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-purple-500/20 blur-xl"
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

        {/* CTA */}
        <div className="mt-20">
          <button
            onClick={() => {
              document.getElementById("services")?.scrollIntoView({
                behavior: "smooth",
              })
            }}
            className="px-8 py-3 rounded-full font-semibold text-white 
                       bg-gradient-to-r from-blue-500 to-purple-600
                       hover:scale-105 transition"
          >
            Explore Our Services →
          </button>
        </div>

      </motion.div>

      {/* LINE EFFECT */}
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