import { useParams, useNavigate } from "react-router-dom"

export default function ServiceDetail() {
  const { type } = useParams()
  const navigate = useNavigate()

  const data = {
    web: {
      title: "Web Development",
      desc: "We create high-performance websites tailored to your business needs.",
      features: [
        "Responsive Design",
        "SEO Optimization",
        "Fast Loading Speed",
        "Modern UI/UX"
      ],
      useCase: "Perfect for company profiles, e-commerce, and web apps."
    },
    mobile: {
      title: "Mobile Apps",
      desc: "We build cross-platform mobile applications for Android and iOS.",
      features: [
        "Cross-platform (React Native)",
        "Smooth Performance",
        "User-friendly Design",
        "API Integration"
      ],
      useCase: "Ideal for startups, on-demand apps, and digital services."
    },
    cloud: {
      title: "Cloud Solutions",
      desc: "We provide scalable cloud infrastructure for modern applications.",
      features: [
        "Firebase / AWS Integration",
        "Secure Data Storage",
        "Auto Scaling",
        "Realtime Database"
      ],
      useCase: "Best for SaaS, real-time apps, and enterprise systems."
    }
  }

  const service = data[type]

  if (!service) {
    return (
      <div className="text-white p-20">
        <h1>Service not found</h1>
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 py-32">

  {/* 🔥 TAMBAHAN CONTAINER */}
  <div className="max-w-5xl mx-auto">

    {/* BACK */}
    <button
      onClick={() => navigate(-1)}
      className="mb-10 text-blue-400 hover:underline"
    >
      ← Back
    </button>

    {/* TITLE */}
    <h1 className="text-5xl font-bold mb-6">
      {service.title}
    </h1>

    {/* DESC */}
    <p className="text-gray-400 mb-12 max-w-2xl">
      {service.desc}
    </p>

    {/* 🔥 GRID BIAR GA KOSONG KANAN */}
    <div className="grid md:grid-cols-2 gap-16">

      {/* FEATURES */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="space-y-2 text-gray-300">
          {service.features.map((f, i) => (
            <li key={i}>✔ {f}</li>
          ))}
        </ul>
      </div>

      {/* USE CASE */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <p className="text-gray-400 mb-6">{service.useCase}</p>

        {/* CTA */}
        <button 
          onClick={() => {
            window.location.href = "/#contact"
          }}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg">
          Contact Us →
        </button>
      </div>

    </div>

  </div>
</section>
  )
}