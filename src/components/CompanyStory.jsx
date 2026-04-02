import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

import teamImage from "../assets/team-work.avif"
import cultureImage from "../assets/culture.avif"

export default function CompanyStory() {

  const { scrollY } = useScroll()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  //  PARALLAX SMOOTH
  const raw = useTransform(scrollY, [0, 1000], [0, isMobile ? 0 : 80])
  const y = useSpring(raw, { stiffness: 40, damping: 20 })

  return (
    <section className="relative py-32 md:py-40 text-white overflow-hidden">

      {/* BG GLOBAL */}
      <div className="absolute inset-0 -z-10 bg-[#020617]" />

      {/* GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 
        w-[700px] h-[300px] bg-blue-500/10 blur-[140px] rounded-full"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ================= TITLE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20 md:mb-28"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 
            bg-gradient-to-r from-blue-400 to-cyan-300 
            bg-clip-text text-transparent"
          >
            Our Journey
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Our journey began with a vision to build impactful technology.
            From a small passionate team, we evolved into innovators creating scalable systems.
          </p>
        </motion.div>

        {/* ================= IMAGE + TEXT ================= */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-32">

          {/* IMAGE */}
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl group"
          >
            <img
              src={teamImage}
              alt="team"
              className="w-full h-[300px] md:h-[420px] object-cover 
              transition duration-1000 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
          </motion.div>

          {/* TEXT */}
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              We started by solving real-world problems with clean and efficient solutions.
              As our experience grew, we expanded into AI, cloud systems, and scalable platforms.

              <br /><br />

              Every project shaped our identity and strengthened our expertise.
              Today, we focus on delivering innovation that anticipates future opportunities.
            </p>
          </motion.div>

        </div>

        {/* ================= TIMELINE ================= */}
        <div className="relative mb-32">

          <div className="absolute left-1/2 top-0 h-full w-[2px] 
            bg-gradient-to-b from-blue-500 to-transparent -translate-x-1/2"
          />

          {[
            { year: "2023", text: "Company founded with strong vision." },
            { year: "2024", text: "Expanded into AI & cloud systems." },
            { year: "2025", text: "Serving global clients." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`flex mb-16 ${
                i % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >

              <div className="w-[45%] p-6 rounded-2xl 
                bg-white/5 border border-white/10 backdrop-blur-xl
                hover:scale-105 transition duration-300"
              >
                <p className="text-blue-400 font-semibold mb-1">{item.year}</p>
                <p className="text-gray-400">{item.text}</p>
              </div>

              {/* DOT */}
              <div className="absolute left-1/2 w-4 h-4 bg-blue-500 
                rounded-full -translate-x-1/2"
              />

            </motion.div>
          ))}
        </div>

        {/* ================= VISION MISSION ================= */}
        <div className="grid md:grid-cols-2 gap-10 mb-32">

          {[
            {
              title: "Our Vision",
              color: "from-cyan-400 to-blue-500",
              desc: "To shape the future through intelligent digital innovation."
            },
            {
              title: "Our Mission",
              color: "from-purple-400 to-pink-500",
              desc: "Crafting future-ready digital products with performance and design."
            }
          ].map((item, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative p-8 md:p-10 rounded-3xl 
                bg-white/5 border border-white/10 
                backdrop-blur-xl overflow-hidden group
                hover:shadow-[0_0_60px_rgba(59,130,246,0.15)]
                transition-all duration-500"
            >

              {/* GLOW */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 
                transition duration-700 
                bg-gradient-to-br ${item.color} blur-2xl`}
              />

              <div className="absolute inset-0 rounded-3xl border border-white/5 group-hover:border-white/20 transition" />

              <h3 className="text-xl md:text-2xl font-bold mb-3 relative z-10">
                {item.title}
              </h3>

              <p className="text-gray-400 relative z-10">
                {item.desc}
              </p>

            </motion.div>

          ))}

        </div>

        {/* ================= CULTURE ================= */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-3xl font-bold mb-6 
              bg-gradient-to-r from-purple-400 to-pink-400 
              bg-clip-text text-transparent"
            >
              Our Culture
            </h3>

            <p className="text-gray-400 leading-relaxed">
              We foster a culture of innovation, collaboration, and continuous growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl group"
          >
            <img
              src={cultureImage}
              alt="culture"
              className="w-full h-[300px] md:h-[420px] object-cover 
              transition duration-1000 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
          </motion.div>

        </div>

      </div>
    </section>
  )
}