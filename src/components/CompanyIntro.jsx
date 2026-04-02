import { motion } from "framer-motion"
import SectionWrapper from "./SectionWrapper"
import office from "../assets/office.jpg"

export default function CompanyIntro() {
  return (
    <SectionWrapper
      id="about"
      className="relative overflow-hidden z-10 scroll-mt-24 px-4 sm:px-6 lg:px-8"
    >

      {/* BG LIGHT */}
      <div className="absolute -top-32 -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-[-120px] sm:right-[-200px] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-120px] sm:bottom-[-200px] left-1/3 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-indigo-500/10 blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center relative z-10">

        {/* ================= IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group order-1 md:order-none"
        >
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">

            <img
              src={office}
              alt="company"
              className="object-cover w-full 
              h-[220px] sm:h-[300px] md:h-[380px] lg:h-[440px]
              transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 border border-white/10 rounded-2xl sm:rounded-3xl" />

          </div>

          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-blue-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
        </motion.div>

        {/* ================= TEXT ================= */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="order-2"
        >

          {/* LABEL */}
          <p className="text-blue-400 text-[10px] sm:text-xs tracking-[0.3em] mb-3 sm:mb-4">
            WHO WE ARE
          </p>

          {/* TITLE */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
            font-bold mb-4 sm:mb-6 leading-snug sm:leading-tight
            bg-gradient-to-r from-white via-blue-200 to-purple-300 
            text-transparent bg-clip-text"
          >
            Engineering Scalable Systems That Power Real Business Growth
          </h2>

          {/* DESC */}
          <p className="text-gray-400 mb-6 sm:mb-7 
            text-sm sm:text-base leading-relaxed max-w-xl"
          >
            We craft intelligent, AI-driven digital systems designed to help businesses
            scale efficiently and stay ahead in a rapidly evolving landscape.
          </p>

          {/* VALUE POINTS */}
          <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
            {[
              "AI-powered and future-ready architecture",
              "High-performance and scalable systems",
              "Tailored solutions for real business impact"
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/5 border border-white/10 
                px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl 
                backdrop-blur-sm hover:bg-white/10 transition"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <p className="text-gray-300 text-xs sm:text-sm">{text}</p>
              </div>
            ))}
          </div>

          {/* STATS */}
          <div className="flex flex-wrap gap-6 sm:gap-10 mb-8 sm:mb-10">
            {[
              { value: "20+", label: "Projects Delivered" },
              { value: "10+", label: "Clients Worldwide" },
              { value: "3+", label: "Years Experience" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold 
                  bg-gradient-to-r from-blue-400 to-purple-400 
                  text-transparent bg-clip-text"
                >
                  {item.value}
                </h3>
                <p className="text-gray-500 text-[10px] sm:text-xs mt-1">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

            <button
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth"
                })
              }}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-full 
              bg-gradient-to-r from-blue-500 to-purple-500 
              text-white text-sm font-medium hover:opacity-90 transition"
            >
              Start a Project →
            </button>

            <button
              onClick={() => {
                document.getElementById("case-studies")?.scrollIntoView({
                  behavior: "smooth"
                })
              }}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-full 
              border border-white/20 text-white text-sm 
              hover:bg-white/10 transition"
            >
              View Portfolio
            </button>

          </div>

        </motion.div>

      </div>

    </SectionWrapper>
  )
}








