import { motion } from "framer-motion"
import Tilt from "react-parallax-tilt"

export default function WhyChooseUs() {

  const items = [
    {
      title: "Fast Execution",
      desc: "We deliver high-quality products with speed and precision.",
      icon: "⚡"
    },
    {
      title: "Scalable Systems",
      desc: "Architecture designed to grow with your business.",
      icon: "📈"
    },
    {
      title: "AI Integration",
      desc: "Smart automation to boost efficiency and insights.",
      icon: "🤖"
    },
    {
      title: "Clean Code",
      desc: "Maintainable, readable, and future-proof development.",
      icon: "🧠"
    },
    {
      title: "Business Focus",
      desc: "We don’t just build — we solve real business problems.",
      icon: "💼"
    },
    {
      title: "Modern Tech Stack",
      desc: "Using cutting-edge tools for maximum performance.",
      icon: "🚀"
    }
  ]

  return (
    <section id="why" className="py-28 text-white px-6">

      <div className="max-w-6xl mx-auto text-center">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6
                     bg-gradient-to-r from-blue-400 to-purple-500
                     bg-clip-text text-transparent"
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
                perspective={1200}
                scale={1.03}
                transitionSpeed={2000}
              >
                <div className="relative p-8 rounded-2xl border border-white/10 
                                bg-white/5 backdrop-blur-xl overflow-hidden group
                                hover:border-blue-500/40 transition duration-300">

                  {/* 🔥 GLOW */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
                    bg-gradient-to-br from-blue-500/20 via-cyan-400/20 to-purple-500/20 blur-xl"
                  />

                  {/* 🔥 ICON */}
                  <div className="text-4xl mb-4 relative z-10">
                    {item.icon}
                  </div>

                  {/* TITLE */}
                  <h3 className="text-xl font-semibold mb-3 relative z-10">
                    {item.title}
                  </h3>

                  {/* DESC */}
                  <p className="text-sm opacity-70 relative z-10 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* 🔥 HOVER LINE */}
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r 
                    from-blue-400 to-purple-500 group-hover:w-full transition-all duration-500"
                  />

                </div>
              </Tilt>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  )
}