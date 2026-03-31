import { motion } from "framer-motion"
import SectionWrapper from "./SectionWrapper"
import office from "../assets/office.jpg"

export default function CompanyIntro() {
  return (
    <SectionWrapper className="relative bg-black overflow-hidden">

      {/* BACKGROUND LIGHT FX */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-500/10 blur-[140px]" />
      <div className="absolute top-1/2 right-[-200px] w-[500px] h-[500px] bg-purple-500/10 blur-[140px]" />
      <div className="absolute bottom-[-200px] left-1/3 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px]" />

      <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center relative z-10">

        {/* IMAGE SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="relative rounded-3xl overflow-hidden">

            <img
              src={office}
              alt="company"
              className="object-cover w-full h-[260px] sm:h-[360px] md:h-[440px] transition duration-700 group-hover:scale-110"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* LIGHT EDGE */}
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />

          </div>

          {/* OUTER GLOW */}
          <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
        </motion.div>

        {/* TEXT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >

          {/* LABEL */}
          <p className="text-blue-400 text-xs tracking-[0.35em] mb-4">
            WHO WE ARE
          </p>

          {/* HEADLINE (GRADIENT TEXT) */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 text-transparent bg-clip-text">
            Engineering Scalable Systems That Power Real Business Growth
          </h2>

          {/* DESC */}
          <p className="text-gray-400 mb-7 text-sm sm:text-base leading-relaxed max-w-lg">
            We craft intelligent, AI-driven digital systems designed to help businesses
            scale efficiently, optimize operations, and stay ahead in a rapidly evolving
            technological landscape.
          </p>

          {/* VALUE POINTS (GLASS STYLE) */}
          <div className="space-y-3 mb-8">
            {[
              "AI-powered and future-ready architecture",
              "High-performance and scalable systems",
              "Tailored solutions for real business impact"
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-xl backdrop-blur-sm hover:bg-white/10 transition"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <p className="text-gray-300 text-sm">{text}</p>
              </div>
            ))}
          </div>

          {/* STATS */}
          <div className="flex flex-wrap gap-10 mb-10">
            {[
              { value: "20+", label: "Projects Delivered" },
              { value: "10+", label: "Clients Worldwide" },
              { value: "3+", label: "Years Experience" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                  {item.value}
                </h3>
                <p className="text-gray-500 text-xs mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA GROUP */}
          <div className="flex flex-wrap gap-4">

            {/* PRIMARY */}
            <button
              onClick={() => {
                document.getElementById("contact").scrollIntoView({ behavior: "smooth" })
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:opacity-90 transition"
            >
              Start a Project →
            </button>
            {/* <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:opacity-90 transition shadow-lg shadow-blue-500/20">
              Start a Project →
            </button> */}

            {/* SECONDARY */}
            <button
                onClick={() => {
                  document.getElementById("case-studies").scrollIntoView({ behavior: "smooth" })
                }}
                className="px-6 py-3 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition"
              >
                View Portfolio
              </button>
            {/* <button className="px-6 py-3 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition">
              View Portfolio
            </button> */}

          </div>

        </motion.div>

      </div>

    </SectionWrapper>
  )
}