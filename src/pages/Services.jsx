import { useNavigate } from "react-router-dom"


import webImg from "../assets/web-development.avif"
import mobileImg from "../assets/mobile-app.png"
import cloudImg from "../assets/cloud-solution.avif"

export default function Services() {
  const navigate = useNavigate()

  const services = [
    {
      title: "Web Development",
      desc: "We build fast, SEO-friendly, and scalable websites using modern technologies like React and Next.js.",
      image: webImg, // ✅ TANPA TANDA PETIK
      features: ["Responsive Design", "SEO Optimization", "High Performance"],
      link: "/services/web"
    },
    {
      title: "Mobile Apps",
      desc: "Cross-platform mobile applications with smooth performance and intuitive UI/UX.",
      image: mobileImg,
      features: ["Android & iOS", "Fast Performance", "Modern UI"],
      link: "/services/mobile"
    },
    {
      title: "Cloud Solutions",
      desc: "Secure and scalable cloud infrastructure to support your business growth.",
      image: cloudImg,
      features: ["AWS / Firebase", "Scalable Systems", "High Security"],
      link: "/services/cloud"
    }
  ]

  return (
    <section className="min-h-screen bg-black text-white px-6 py-32">

      {/*  BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="mb-10 text-blue-400 hover:underline"
      >
        ← Back to Home
      </button>

      <h1 className="text-5xl font-bold text-center mb-12">
        Our Services
      </h1>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {services.map((s, i) => (
          <div key={i} className="p-6 border border-white/10 rounded-2xl bg-white/5">

             <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover"
              />
            </div>


            <h2 className="text-2xl font-bold mb-3">{s.title}</h2>

            <p className="text-gray-400 mb-4">{s.desc}</p>

            {/* FEATURES */}
            <ul className="mb-4 text-sm text-gray-300">
              {s.features.map((f, idx) => (
                <li key={idx}>✔ {f}</li>
              ))}
            </ul>

            <button
              onClick={() => navigate(s.link)}
              className="text-blue-400 hover:underline"
            >
              View Details →
            </button>

          </div>
        ))}

      </div>

    </section>
  )
}