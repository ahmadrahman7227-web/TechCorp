import { motion } from "framer-motion"
import SectionWrapper from "./SectionWrapper"
import office from "../assets/office.jpg"

export default function CompanyIntro() {
  return (
    <SectionWrapper className="bg-black border-t border-white/10">

      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <img
            src={office}
            alt="company"
            className="rounded-2xl object-cover w-full h-[240px] sm:h-[320px] md:h-[420px] transition duration-700 group-hover:scale-105"
          />

          {/* GLOW */}
          <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-blue-400 text-xs tracking-[0.3em] mb-3">
            ABOUT COMPANY
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Building Digital Products That Scale
          </h2>

          <p className="text-gray-400 mb-8 text-sm sm:text-base leading-relaxed">
            Tech Corp Alpha is a technology company focused on delivering scalable digital solutions
            for businesses and startups. We combine modern design, performance, and innovation
            to create impactful products.
          </p>

          {/* STATS */}
          <div className="flex flex-wrap gap-6">
            {[
              { value: "20+", label: "Projects" },
              { value: "10+", label: "Clients" },
              { value: "3+", label: "Years Experience" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {item.value}
                </h3>
                <p className="text-gray-500 text-xs">{item.label}</p>
              </motion.div>
            ))}
          </div>

        </motion.div>

      </div>

    </SectionWrapper>
  )
}