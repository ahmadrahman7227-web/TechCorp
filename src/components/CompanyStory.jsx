import { motion } from "framer-motion"

export default function CompanyStory() {
  return (
    <section id="company-story" className="py-28 bg-black text-white px-6">

      <div className="max-w-5xl mx-auto">

        {/* JOURNEY */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-4 text-blue-400">
            Our Journey
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Founded in 2023, TechCorp started as a small team of passionate developers 
            driven by a vision to transform digital experiences. Today, we build scalable 
            AI-powered systems used by businesses worldwide.
          </p>
        </motion.div>

        {/* VISION & MISSION */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10"
          >
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              Our Vision
            </h3>

            <p className="text-gray-400">
              To become a global leader in AI-driven technology solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10"
          >
            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              Our Mission
            </h3>

            <p className="text-gray-400">
              Deliver innovative, scalable, and intelligent systems that empower businesses.
            </p>
          </motion.div>

        </div>

        {/* CULTURE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-4 text-pink-400">
            Our Culture
          </h3>

          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            At TechCorp, we believe in innovation, collaboration, and continuous learning. 
            Our team thrives on solving complex problems using cutting-edge technologies 
            like AI, cloud computing, and modern web systems.
          </p>
        </motion.div>

      </div>
    </section>
  )
}