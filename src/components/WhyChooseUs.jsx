import { motion } from "framer-motion"
import Tilt from "react-parallax-tilt"
import {
  Zap,
  LineChart,
  Brain,
  Cpu,
  Briefcase,
  Rocket
} from "lucide-react"

export default function WhyChooseUs() {

  const items = [
    {
      title: "Fast Execution",
      desc: "We deliver high-quality products with speed and precision.",
      icon: <Zap size={32} />
    },
    {
      title: "Scalable Systems",
      desc: "Architecture designed to grow with your business.",
      icon: <LineChart size={32} />
    },
    {
      title: "AI Integration",
      desc: "Smart automation to boost efficiency and insights.",
      icon: <Cpu size={32} />
    },
    {
      title: "Clean Code",
      desc: "Maintainable, readable, and future-proof development.",
      icon: <Brain size={32} />
    },
    {
      title: "Business Focus",
      desc: "We don’t just build — we solve real business problems.",
      icon: <Briefcase size={32} />
    },
    {
      title: "Modern Tech Stack",
      desc: "Using cutting-edge tools for maximum performance.",
      icon: <Rocket size={32} />
    }
  ]

  //  container animation (stagger)
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  //  item animation
  const itemAnim = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section
      id="why"
      className="py-20 md:py-28 text-white px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto text-center">

        {/*  TITLE */}
        <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6
                      bg-gradient-to-r from-blue-400 to-purple-500
                      bg-clip-text text-transparent"
          >
            Why Choose Us
          </motion.h2>

        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-14 md:mb-16">
          We combine technology, design, and strategy to deliver impactful digital solutions.
        </p>

        {/*  GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
        >

          {items.map((item, i) => (
            <motion.div key={i} variants={itemAnim}>

              <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                gyroscope={true}
              >
                <div
                  className="relative p-6 md:p-8 rounded-2xl border border-white/10 
                             bg-white/5 backdrop-blur-xl overflow-hidden group
                             hover:border-blue-500/40 transition-all duration-300
                             hover:-translate-y-2 hover:shadow-2xl"
                >

                  {/*  GLOW */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
                    bg-gradient-to-br from-blue-500/10 via-cyan-400/10 to-purple-500/10 blur-2xl"
                  />

                  {/*  ICON */}
                  <div className="mb-4 relative z-10 text-blue-400
                                  group-hover:scale-110 group-hover:rotate-3
                                  transition duration-300">
                    {item.icon}
                  </div>

                  {/*  TITLE */}
                  <h3 className="text-lg md:text-xl font-semibold mb-2 relative z-10">
                    {item.title}
                  </h3>

                  {/*  DESC */}
                  <p className="text-xs sm:text-sm opacity-70 relative z-10 leading-relaxed">
                    {item.desc}
                  </p>

                  {/*  HOVER LINE */}
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r 
                    from-blue-400 to-purple-500 group-hover:w-full transition-all duration-500"
                  />

                </div>
              </Tilt>

            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  )
}