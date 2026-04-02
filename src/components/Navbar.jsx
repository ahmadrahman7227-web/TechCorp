import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = ["Home", "About", "Services", "Teams", "Blog"]

export default function Navbar() {
  const [active, setActive] = useState("Home")
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed w-full z-[9999999] pointer-events-auto px-6 md:px-16 transition-all duration-500
        ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl py-2 border-b border-white/10 shadow-lg"
            : "bg-transparent py-4"
        }
      `}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">

        {/* LOGO */}
        <motion.h1
          whileHover={{ scale: 1.1 }}
          className="text-blue-400 font-bold text-xl cursor-pointer"
        >
          TechCorp
        </motion.h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((item) => (
            <motion.div
              key={item}
              className="relative group"
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <a
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault()
                  setActive(item)

                  const section = document.getElementById(item.toLowerCase())
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className={`relative z-10 px-4 py-2 rounded-lg transition
                  ${
                    active === item
                      ? "text-blue-400"
                      : "text-white/70 group-hover:text-white"
                  }
                `}
              >
                {item}
              </a>

              {/*  ACTIVE BACKGROUND */}
              {active === item && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-blue-500/10 rounded-xl blur-md"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/*  HOVER GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-blue-500/20 blur-xl rounded-xl transition duration-300"></div>

              {/* ⚡ CLICK RIPPLE */}
              <span className="absolute inset-0 overflow-hidden rounded-xl">
                <span className="absolute inset-0 scale-0 group-active:scale-150 bg-blue-400/20 rounded-full transition-transform duration-500"></span>
              </span>

              {/* UNDERLINE */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-blue-400 transition-all duration-300
                  ${active === item ? "w-full" : "w-0 group-hover:w-full"}
                `}
              />
            </motion.div>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <div
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 bg-black/80 backdrop-blur-xl rounded-2xl p-6 space-y-4"
          >
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault()
                  setIsOpen(false)

                  const section = document.getElementById(item.toLowerCase())
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="block text-white border-b border-white/10 pb-2 hover:text-blue-400 transition"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}