import { motion } from "framer-motion"

const projects = [
  {
    title: "AI SaaS Analytics Platform",
    desc: "Scalable AI system for real-time business intelligence and automated insights.",
    problem: "Manual reporting slowed decision making",
    solution: "Built real-time AI analytics dashboard with automation",
    result: "+60% operational efficiency",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    tags: ["AI", "SaaS", "Dashboard"]
  },
  {
    title: "High-Converting E-Commerce",
    desc: "Optimized e-commerce platform focused on conversion and performance.",
    problem: "Low conversion & slow performance",
    solution: "UX redesign + speed optimization",
    result: "+35% sales growth",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    tags: ["E-Commerce", "UX", "Performance"]
  }
]

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative py-28 bg-black overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[140px]" />
      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-purple-500/10 blur-[140px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-20">
          <p className="text-blue-400 text-xs tracking-[0.35em] mb-4">
            CASE STUDIES
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 text-transparent bg-clip-text">
            Real Results. Real Impact.
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            We design and build high-performance digital systems that solve real business problems.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-10">

          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition duration-500"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-[240px] object-cover group-hover:scale-110 transition duration-700"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* RESULT BADGE */}
                <div className="absolute bottom-4 left-4 px-4 py-2 text-xs rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-lg">
                  {p.result}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">

                <h3 className="text-xl font-semibold text-white mb-2">
                  {p.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {p.desc}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* PROBLEM / SOLUTION */}
                <div className="space-y-2 text-sm mb-4">
                  <p className="text-gray-400">
                    <span className="text-white font-medium">Problem:</span> {p.problem}
                  </p>
                  <p className="text-gray-400">
                    <span className="text-white font-medium">Solution:</span> {p.solution}
                  </p>
                </div>

                {/* CTA */}
                {/* <button
                  onClick={() => alert("Demo case study")}
                  className="text-sm text-white hover:text-blue-400 transition"
                >
                  View Details →
                </button> */}

              </div>

              {/* HOVER GLOW */}
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 blur-2xl transition duration-500" />

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  )
}