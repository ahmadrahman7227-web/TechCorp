import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

import teamImage from "../assets/team-work.avif"
import cultureImage from "../assets/culture.avif"

export default function CompanyStory() {

  const { scrollY } = useScroll()

  //  DETECT MOBILE
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  //  PARALLAX (disable di mobile)
  const ySlow = useTransform(scrollY, [0, 800], [0, isMobile ? 0 : 60])
  const yFast = useTransform(scrollY, [0, 800], [0, isMobile ? 0 : -80])

  return (
    <section className="relative py-16 sm:py-20 md:py-28 text-white px-4 sm:px-6 overflow-hidden">

      {/* BG GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 
        w-[300px] sm:w-[500px] md:w-[800px] 
        h-[200px] sm:h-[300px] md:h-[400px] 
        bg-blue-500/10 blur-[100px] rounded-full"
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ================= JOURNEY ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-center mb-16 sm:mb-20 md:mb-32">

          {/* IMAGE */}
          <motion.div
            style={{ y: ySlow }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative group overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl"
          >
            <img
              src={teamImage}
              alt="team"
              className="w-full h-[200px] sm:h-[260px] md:h-[360px] 
                         object-cover transition duration-700 group-hover:scale-105"
            />

            {/* OVERLAY FIX */}
            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 
              bg-gradient-to-tr from-blue-500/10 to-purple-500/10"
            />

            <div className="absolute inset-0 border border-white/10 rounded-xl sm:rounded-2xl md:rounded-3xl" />
          </motion.div>

          {/* TEXT */}
          <motion.div
            style={{ y: yFast }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-center md:text-left"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-6 
              bg-gradient-to-r from-blue-400 to-cyan-300 
              bg-clip-text text-transparent"
            >
              Our Journey
            </h2>

            <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0">
              Founded in 2023, TechCorp started as a small team of passionate developers 
              driven by a vision to transform digital experiences. Today, we build scalable 
              AI-powered systems used by businesses worldwide.
            </p>
          </motion.div>

        </div>

        {/* ================= TIMELINE ================= */}
        <div className="relative mb-16 sm:mb-20 md:mb-32">

          {/* LINE (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-[2px] 
            bg-gradient-to-b from-blue-500 via-purple-500 to-transparent
            -translate-x-1/2"
          />

          {[
            { year: "2023", text: "Company founded with strong vision." },
            { year: "2024", text: "Expanded into AI & cloud systems." },
            { year: "2025", text: "Serving global clients & scaling products." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`flex flex-col md:flex-row items-start md:items-center mb-8 md:mb-16 ${
                i % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
            >

              <div className="w-full md:w-[45%] p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl 
                bg-white/5 border border-white/10 backdrop-blur-md">

                <p className="text-blue-400 font-semibold text-sm md:text-base mb-1">
                  {item.year}
                </p>

                <p className="text-gray-400 text-sm md:text-base">
                  {item.text}
                </p>

              </div>

              <div className="hidden md:block absolute left-1/2 w-4 h-4 
                bg-blue-500 rounded-full -translate-x-1/2"
              />
            </motion.div>
          ))}

        </div>

        {/* ================= VISION MISSION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-12 mb-16 md:mb-32">

          {[
            {
              title: "Our Vision",
              color: "text-cyan-400",
              desc: "To become a global leader in AI-driven technology solutions."
            },
            {
              title: "Our Mission",
              color: "text-purple-400",
              desc: "Deliver innovative, scalable, and intelligent systems."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="relative p-5 sm:p-6 md:p-10 rounded-xl md:rounded-3xl 
                bg-white/5 border border-white/10 overflow-hidden"
            >
              <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-4 ${item.color}`}>
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm md:text-lg">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>

        {/* ================= CULTURE ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6 
              bg-gradient-to-r from-pink-400 to-purple-400 
              bg-clip-text text-transparent"
            >
              Our Culture
            </h3>

            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
              We believe in innovation, collaboration, and continuous growth.
              Our team thrives in solving complex problems using AI and cloud technologies.
            </p>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative group overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl"
          >
            <img
              src={cultureImage}
              alt="culture"
              className="w-full h-[200px] sm:h-[260px] md:h-[360px] 
                         object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 border border-white/10 rounded-xl sm:rounded-2xl md:rounded-3xl" />
          </motion.div>

        </div>

      </div>
    </section>
  )
}