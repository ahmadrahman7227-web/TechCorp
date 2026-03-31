import { motion } from "framer-motion"
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaWhatsapp
} from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="relative bg-black text-white border-t border-white/10 mt-20">

      {/* GLOW BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[300px] h-[300px] bg-blue-500/10 blur-3xl rounded-full absolute top-0 left-0"></div>
        <div className="w-[250px] h-[250px] bg-purple-500/10 blur-3xl rounded-full absolute bottom-0 right-0"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              TechCorp
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Building modern digital solutions with cutting-edge technology. 
              We help businesses grow faster, smarter, and stronger.
            </p>

            {/* CTA TAMBAHAN */}
            <button
              onClick={() => window.location.href = "/#contact"}
              className="text-sm text-blue-400 hover:underline"
            >
              Start a Project →
            </button>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>

            <ul className="space-y-2 text-gray-400 text-sm">
              {["home", "about", "services", "teams", "contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className="hover:text-blue-400 transition"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL + CONTACT */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>

            {/* SOCIAL ICON */}
            <div className="flex gap-4 text-xl mb-4">
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="https://github.com"
                target="_blank"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                <FaGithub />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2 }}
                href="https://linkedin.com"
                target="_blank"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                <FaLinkedin />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2 }}
                href="https://instagram.com"
                target="_blank"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                <FaInstagram />
              </motion.a>
            </div>

            <p className="text-gray-500 text-sm mb-4">
              Follow us for updates & insights.
            </p>

            {/* CONTACT INFO TAMBAHAN */}
            <div className="space-y-2 text-sm text-gray-400 mb-4">

              <div className="flex items-center gap-2">
                <FaEnvelope className="text-blue-400" />
                <span>hello@techcorp.com</span>
              </div>

              <div className="flex items-center gap-2">
                <FaPhone className="text-blue-400" />
                <span>+62 812 3456 7890</span>
              </div>

            </div>

            {/* WHATSAPP BUTTON */}
            <button
              onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
              className="flex items-center gap-2 text-sm border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 transition"
            >
              <FaWhatsapp />
              Chat WhatsApp
            </button>

          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-500">

          <p>© 2026 TechCorp. All rights reserved.</p>

          {/* CREDIT */}
          <p className="mt-2">
            Crafted by <span className="text-blue-400 font-semibold">Alif</span>
          </p>

        </div>

      </div>
    </footer>
  )
}