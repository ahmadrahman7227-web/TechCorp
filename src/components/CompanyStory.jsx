import { motion } from "framer-motion"
import { useScroll, useTransform } from "framer-motion"

import teamImage from "../assets/team-work.avif"
import cultureImage from "../assets/culture.avif"

export default function CompanyStory() {

  const { scrollY } = useScroll()

  // 🔥 PARALLAX DEPTH
  const ySlow = useTransform(scrollY, [0, 800], [0, 100])
  const yFast = useTransform(scrollY, [0, 800], [0, -120])

  return (
    <section className="relative py-32 text-white px-6 overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 
        w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full"
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ================= JOURNEY ================= */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">

          {/* IMAGE */}
          <motion.div
            style={{ y: ySlow }}
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative group"
          >
            <img
              src={teamImage}
              alt="team"
              className="rounded-3xl w-full h-[360px] object-cover 
                         group-hover:scale-105 transition duration-700"
            />

            {/* 🔥 GLASS OVERLAY */}
            <div className="absolute inset-0 rounded-3xl 
              bg-gradient-to-tr from-blue-500/20 to-purple-500/20 backdrop-blur-[2px]" />

            {/* 🔥 BORDER GLOW */}
            <div className="absolute inset-0 rounded-3xl border border-white/10" />
          </motion.div>

          {/* TEXT */}
          <motion.div
            style={{ y: yFast }}
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-5xl font-bold mb-6 
              bg-gradient-to-r from-blue-400 to-cyan-300 
              bg-clip-text text-transparent"
            >
              Our Journey
            </h2>

            <p className="text-gray-400 leading-relaxed text-lg">
              Founded in 2023, TechCorp started as a small team of passionate developers 
              driven by a vision to transform digital experiences. Today, we build scalable 
              AI-powered systems used by businesses worldwide.
            </p>
          </motion.div>

        </div>

        {/* ================= TIMELINE ================= */}
        <div className="relative mb-32">

          {/* LINE */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] 
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
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`flex items-center mb-16 ${
                i % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div className="w-[45%] p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">

                <p className="text-blue-400 font-semibold mb-1">
                  {item.year}
                </p>

                <p className="text-gray-400">
                  {item.text}
                </p>

              </div>

              {/* DOT */}
              <div className="absolute left-1/2 w-5 h-5 bg-blue-500 rounded-full -translate-x-1/2 shadow-lg shadow-blue-500/50" />
            </motion.div>
          ))}

        </div>

        {/* ================= VISION MISSION ================= */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">

          {/* VISION */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative p-10 rounded-3xl bg-white/5 border border-white/10 overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
              bg-gradient-to-br from-cyan-400/20 to-blue-500/20 blur-2xl"
            />

            <h3 className="text-2xl font-bold text-cyan-400 mb-4 relative z-10">
              Our Vision
            </h3>

            <p className="text-gray-400 relative z-10 text-lg">
              To become a global leader in AI-driven technology solutions.
            </p>
          </motion.div>

          {/* MISSION */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative p-10 rounded-3xl bg-white/5 border border-white/10 overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
              bg-gradient-to-br from-purple-400/20 to-pink-500/20 blur-2xl"
            />

            <h3 className="text-2xl font-bold text-purple-400 mb-4 relative z-10">
              Our Mission
            </h3>

            <p className="text-gray-400 relative z-10 text-lg">
              Deliver innovative, scalable, and intelligent systems that empower businesses.
            </p>
          </motion.div>

        </div>

        {/* ================= CULTURE ================= */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-4xl font-bold mb-6 
              bg-gradient-to-r from-pink-400 to-purple-400 
              bg-clip-text text-transparent"
            >
              Our Culture
            </h3>

            <p className="text-gray-400 leading-relaxed text-lg">
              We believe in innovation, collaboration, and continuous growth.
              Our team thrives in solving complex problems using AI, cloud,
              and cutting-edge technologies.
            </p>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative group"
          >
            <img
              src={cultureImage}
              alt="culture"
              className="rounded-3xl w-full h-[360px] object-cover 
                         group-hover:scale-105 transition duration-700"
            />

            <div className="absolute inset-0 rounded-3xl 
              bg-gradient-to-tr from-purple-500/20 to-pink-500/20"
            />

            <div className="absolute inset-0 rounded-3xl border border-white/10" />
          </motion.div>

        </div>

      </div>
    </section>
  )
}