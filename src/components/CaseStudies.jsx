export default function CaseStudies() {
  const projects = [
    {
      title: "AI SaaS Dashboard",
      problem: "Client struggled with manual data analysis",
      solution: "Built AI-powered analytics dashboard",
      result: "Increased efficiency by 60%"
    },
    {
      title: "E-Commerce Platform",
      problem: "Low conversion rate",
      solution: "Redesigned UX + performance optimization",
      result: "Sales increased by 35%"
    }
  ]

  return (
    <section className="py-24 bg-black text-white">
      <h2 className="text-4xl font-bold text-center mb-16">
        Case Studies
      </h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto px-6">
        {projects.map((p, i) => (
          <div
            key={i}
            className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-blue-500 transition"
          >
            <h3 className="text-2xl font-semibold mb-4">{p.title}</h3>

            <p className="text-gray-400 mb-2">
              <b>Problem:</b> {p.problem}
            </p>

            <p className="text-gray-400 mb-2">
              <b>Solution:</b> {p.solution}
            </p>

            <p className="text-blue-400 font-semibold">
              {p.result}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}