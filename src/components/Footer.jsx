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
    <footer className="relative bg-[#020617] text-white mt-24 overflow-hidden">

      {/* TOP GRADIENT LINE */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />

      {/* GLOW BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full absolute -top-20 -left-20"></div>
        <div className="w-[350px] h-[350px] bg-purple-500/10 blur-[120px] rounded-full absolute -bottom-20 -right-20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* BRAND */}
          <div>
            <motion.h2 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 cursor-pointer"
            >
              TechCorp
            </motion.h2>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Building modern digital solutions with cutting-edge technology. 
              We help businesses grow faster, smarter, and stronger.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = "/#contact"}
              className="text-sm bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2.5 rounded-full font-medium shadow-lg shadow-blue-500/20 hover:shadow-purple-500/30 transition"
            >
              Start a Project →
            </motion.button>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Navigation
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              {["home", "about", "services", "teams", "contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className="group flex items-center gap-2 hover:text-blue-400 transition"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition">→</span>
                    <span className="group-hover:translate-x-1 transition">
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONNECT */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Connect
            </h3>

            {/* SOCIAL */}
            <div className="flex gap-4 text-xl mb-6">
              {[FaGithub, FaLinkedin, FaInstagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.2, y: -2 }}
                  href="#"
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-blue-400 hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/20 transition"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>

            <p className="text-gray-500 text-sm mb-5">
              Follow us for updates & insights.
            </p>

            {/* CONTACT */}
            <div className="space-y-3 text-sm text-gray-400 mb-6">

              <div className="flex items-center gap-3 hover:text-blue-400 transition">
                <FaEnvelope className="text-blue-400" />
                <span>hello@techcorp.com</span>
              </div>

              <div className="flex items-center gap-3 hover:text-blue-400 transition">
                <FaPhone className="text-blue-400" />
                <span>+62 812 3456 7890</span>
              </div>

            </div>

            {/* WHATSAPP CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
              className="flex items-center gap-2 text-sm bg-gradient-to-r from-green-400 to-emerald-500 text-black px-5 py-2.5 rounded-full font-medium shadow-lg shadow-green-500/20 hover:shadow-green-400/40 transition"
            >
              <FaWhatsapp />
              Chat WhatsApp
            </motion.button>

          </div>

        </div>

        {/* DIVIDER */}
        <div className="mt-16 pt-6 border-t border-white/10 text-center">

          <p className="text-xs text-gray-500">
            © 2026 TechCorp. All rights reserved.
          </p>

          <p className="text-xs text-gray-600 mt-2">
            Crafted by <span className="text-blue-400 font-semibold">Alif</span>
          </p>

        </div>

      </div>
    </footer>
  )
}