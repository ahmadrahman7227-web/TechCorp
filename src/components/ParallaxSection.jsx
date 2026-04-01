import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function TrustedSection() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  // 🔥 Trusted fade out
  const trustedOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const trustedY = useTransform(scrollYProgress, [0, 0.3], [0, -100])

  // 🔥 Parallax content fade in
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])
  const contentY = useTransform(scrollYProgress, [0.3, 0.6], [100, 0])

  return (
    <section
      ref={ref}
      className="relative h-[180vh] overflow-hidden text-white"
    >

      {/* 🔥 TRUSTED SECTION */}
      <motion.div
        style={{ opacity: trustedOpacity, y: trustedY }}
        className="sticky top-0 h-screen flex flex-col items-center justify-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          Trusted by Innovative Companies
        </h2>

        <p className="text-gray-400 mb-10 text-center">
          Partnering with modern businesses to build scalable digital solutions
        </p>

        {/* LOGO TEXT */}
        <div className="flex flex-wrap justify-center gap-6 text-gray-500 text-sm tracking-widest">
          <span>MICROSOFT</span>
          <span>AMAZON</span>
          <span>NETFLIX</span>
          <span>TESLA</span>
          <span>META</span>
          <span>SPOTIFY</span>
        </div>

        {/* STATS */}
        <div className="flex gap-10 mt-10 text-center">
          <div>
            <p className="text-xl font-bold">20+</p>
            <p className="text-xs text-gray-400">Projects</p>
          </div>
          <div>
            <p className="text-xl font-bold">10+</p>
            <p className="text-xs text-gray-400">Clients</p>
          </div>
          <div>
            <p className="text-xl font-bold">5+</p>
            <p className="text-xs text-gray-400">Technologies</p>
          </div>
        </div>
      </motion.div>

      {/* 🔥 PARALLAX CONTENT (LANJUTAN, BUKAN SECTION BARU) */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="sticky top-0 h-screen flex items-center justify-center"
      >
        <div className="text-center max-w-4xl px-6">

          <h2 className="
            text-3xl sm:text-4xl md:text-6xl font-bold mb-6
            bg-gradient-to-r from-blue-400 to-purple-400
            bg-clip-text text-transparent
          ">
            From Vision to Intelligent Systems
          </h2>

          <p className="text-gray-400 mb-12">
            We transform ideas into scalable, AI-powered digital ecosystems 
            designed for performance, growth, and real impact.
          </p>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <h3 className="text-white mb-2 font-semibold">
                AI-Driven Innovation
              </h3>
              <p className="text-gray-400 text-sm">
                Smart systems that adapt and evolve with your business.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <h3 className="text-white mb-2 font-semibold">
                Scalable Architecture
              </h3>
              <p className="text-gray-400 text-sm">
                Built for growth, performance, and long-term stability.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <h3 className="text-white mb-2 font-semibold">
                Business Impact
              </h3>
              <p className="text-gray-400 text-sm">
                We deliver measurable results, not just clean code.
              </p>
            </div>

          </div>

        </div>
      </motion.div>

    </section>
  )
}








// import { useEffect, useState } from "react"
// import { motion, useScroll, useTransform } from "framer-motion"
// import { TypeAnimation } from "react-type-animation"

// export default function ParallaxSection() {
//   const { scrollY } = useScroll()

//   const yContent = useTransform(scrollY, [0, 500], [0, -80])

//   const [mouse, setMouse] = useState({ x: 0, y: 0 })
//   const [isMobile, setIsMobile] = useState(false)

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768)
//     }

//     checkMobile()
//     window.addEventListener("resize", checkMobile)

//     return () => window.removeEventListener("resize", checkMobile)
//   }, [])

//   useEffect(() => {
//     if (isMobile) return

//     const handleMouse = (e) => {
//       setMouse({
//         x: e.clientX,
//         y: e.clientY,
//       })
//     }

//     window.addEventListener("mousemove", handleMouse)
//     return () => window.removeEventListener("mousemove", handleMouse)
//   }, [isMobile])

//   return (
//     <section className="relative min-h-screen w-full overflow-hidden">

//       {/* 🔥 DARK DEPTH BASE */}
//       <div className="absolute inset-0 bg-[#020617]/80 z-[1]" />

//       {/* 🔥 RADIAL FOCUS (BIAR TEKS NYALA) */}
//       <div className="absolute inset-0 z-[2] 
//         bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" 
//       />

//       {/* 🔥 CURSOR LIGHT (SOFT) */}
//       {!isMobile && (
//         <>
//           <motion.div
//             className="pointer-events-none absolute inset-0 z-[3]"
//             style={{
//               background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(59,130,246,0.08), transparent 40%)`
//             }}
//           />

//           <motion.div
//             className="pointer-events-none absolute inset-0 z-[4]"
//             style={{
//               background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(96,165,250,0.05), transparent 60%)`
//             }}
//           />
//         </>
//       )}

//       {/* FLOATING STATS */}
//       <motion.div 
//         className="absolute top-[30%] left-[8%] hidden md:block
//         bg-white/5 backdrop-blur-md px-5 py-3 rounded-xl
//         border border-white/10 text-white/80 text-sm shadow-lg z-[6]"
//         animate={{ y: [0, -12, 0] }}
//         transition={{ repeat: Infinity, duration: 4 }}
//       >
//         🚀 <span className="font-semibold text-white">20+ Projects</span>
//       </motion.div>

//       <motion.div 
//         className="absolute bottom-[25%] right-[8%] hidden md:block
//         bg-white/5 backdrop-blur-md px-5 py-3 rounded-xl
//         border border-white/10 text-white/80 text-sm shadow-lg z-[6]"
//         animate={{ y: [0, 12, 0] }}
//         transition={{ repeat: Infinity, duration: 5 }}
//       >
//         🌍 <span className="font-semibold text-white">Global Clients</span>
//       </motion.div>

//       {/* FOREGROUND GLOW */}
//       <div className="absolute w-[400px] h-[200px] 
//         bg-blue-500/10 blur-3xl rounded-full 
//         top-[45%] left-1/2 -translate-x-1/2 z-[2]" 
//       />

//       {/* 🔥 MAIN CONTENT */}
//       <motion.div
//         animate={{ y: [0, -10, 0] }}
//         transition={{ duration: 5, repeat: Infinity }}
//         className="relative z-[5] flex flex-col items-center justify-center min-h-screen text-white text-center px-4"
//         style={{ y: yContent }}
//       >

//         {/* TITLE */}
//         <motion.h1
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4
//                      bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400
//                      bg-clip-text text-transparent"
//         >
//           Engineering the Future <br />
//           of Digital Systems
//         </motion.h1>

//         {/* TYPE TEXT */}
//         <TypeAnimation
//           sequence={[
//             "Web Development Solutions",
//             1500,
//             "Mobile App Development",
//             1500,
//             "Cloud Infrastructure & AI Systems",
//             2000,
//           ]}
//           wrapper="span"
//           speed={50}
//           repeat={Infinity}
//           className="text-2xl sm:text-3xl md:text-4xl font-semibold opacity-90 mb-4 text-blue-300"
//         />

//         {/* DESCRIPTION */}
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="text-base sm:text-lg md:text-xl max-w-2xl text-white/90 mt-3 leading-relaxed"
//         >
//           We design and develop scalable web, mobile, and cloud-based solutions 
//           that help businesses innovate faster, improve efficiency, and stay 
//           competitive in the rapidly evolving digital landscape.
//         </motion.p>

//         {/* CHIPS */}
//         <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm sm:text-base">
//           <div className="flex items-center gap-2 px-4 py-2 rounded-full 
//             bg-gradient-to-r from-white/5 to-white/10 
//             border border-white/10 backdrop-blur-md">
//             🌐 Web Development
//           </div>

//           <div className="flex items-center gap-2 px-4 py-2 rounded-full 
//             bg-gradient-to-r from-white/5 to-white/10 
//             border border-white/10 backdrop-blur-md">
//             📱 Mobile Apps
//           </div>

//           <div className="flex items-center gap-2 px-4 py-2 rounded-full 
//             bg-gradient-to-r from-white/5 to-white/10 
//             border border-white/10 backdrop-blur-md">
//             ☁️ Cloud Systems
//           </div>
//         </div>

//         {/* STATS */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="text-xs sm:text-sm mt-8 tracking-widest text-gray-300"
//         >
//           20+ PROJECTS • 10+ CLIENTS • PROFESSIONAL TEAM
//         </motion.div>
//       </motion.div>

//       {/* SCROLL */}
//       <motion.div
//         animate={{ y: [0, 10, 0] }}
//         transition={{ repeat: Infinity, duration: 1.5 }}
//         className="absolute bottom-6 text-white/40 text-sm z-[6]"
//       >
//         ↓ Scroll
//       </motion.div>

//     </section>
//   )
// }