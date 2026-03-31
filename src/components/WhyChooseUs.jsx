import { motion } from "framer-motion"
import Tilt from "react-parallax-tilt"

export default function WhyChooseUs() {

  const items = [
    {
      title: "Fast Execution",
      desc: "We deliver high-quality products with speed and precision."
    },
    {
      title: "Scalable Systems",
      desc: "Architecture designed to grow with your business."
    },
    {
      title: "AI Integration",
      desc: "Smart automation to boost efficiency and insights."
    },
    {
      title: "Clean Code",
      desc: "Maintainable, readable, and future-proof development."
    },
    {
      title: "Business Focus",
      desc: "We don’t just build — we solve real business problems."
    },
    {
      title: "Modern Tech Stack",
      desc: "Using cutting-edge tools for maximum performance."
    }
  ]

  return (
    <section id="why" className="py-28 bg-black text-white px-6">

      <div className="max-w-6xl mx-auto text-center">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Why Choose Us
        </motion.h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-16">
          We combine technology, design, and strategy to deliver impactful digital solutions.
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.05}
                transitionSpeed={2000}
              >
                <div className="p-8 rounded-2xl border border-white/10 
                                bg-white/5 backdrop-blur-xl
                                hover:border-blue-500 transition group">

                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                    bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-purple-500/20 blur-xl rounded-2xl"
                  />

                  <h3 className="text-lg font-semibold mb-3 relative z-10">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-400 relative z-10">
                    {item.desc}
                  </p>

                </div>
              </Tilt>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  )
}