import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function ParallaxSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <section className="relative w-full py-28 flex items-center justify-center overflow-hidden text-white">

      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617] to-black" />

      {/* 🔵 SOFT GLOW */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* 🟣 SECOND GLOW */}
      <motion.div
        className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full"
        animate={{
          x: mouse.x * -0.02,
          y: mouse.y * -0.02,
        }}
        transition={{ type: "spring", stiffness: 40 }}
        style={{ top: "60%", left: "40%" }}
      />

      {/* ✨ CURSOR LIGHT */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(59,130,246,0.12), transparent 40%)`
        }}
      />

      {/* 📦 CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-5xl text-center px-6"
      >

        {/* 🔥 HEADLINE */}
        <h2 className="text-4xl md:text-6xl font-bold mb-6
          bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400
          bg-clip-text text-transparent">
          From Vision to Intelligent Systems
        </h2>

        {/* ✍️ SUBTEXT */}
        <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-16">
          We transform ideas into scalable, AI-powered digital ecosystems 
          that drive real business growth.
        </p>

        {/* ⚡ PILLARS */}
        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              title: "AI-Driven Innovation",
              desc: "We leverage artificial intelligence to create smarter, adaptive systems."
            },
            {
              title: "Scalable Architecture",
              desc: "Our solutions are built to grow with your business, without limits."
            },
            {
              title: "Business Impact",
              desc: "We focus on delivering measurable results, not just clean code."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.03 }}
              className="relative p-6 rounded-2xl
              bg-white/5 backdrop-blur-xl border border-white/10
              shadow-[0_0_40px_rgba(59,130,246,0.1)]
              transition-all duration-300"
            >
              {/* glow */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition
                bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl" />

              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-white/70">{item.desc}</p>
            </motion.div>
          ))}

        </div>

        {/* 📊 PROOF */}
        <p className="text-white/40 text-sm mt-16">
          Trusted by startups & enterprises worldwide
        </p>

      </motion.div>

      {/* 🌑 BOTTOM FADE */}
      <div className="absolute bottom-0 w-full h-[200px] 
        bg-gradient-to-t from-black via-black/80 to-transparent" />

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