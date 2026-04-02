import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1200)
    const t2 = setTimeout(() => setPhase(2), 2600)
    const t3 = setTimeout(() => setPhase(3), 4200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#020617]"
      animate={{ opacity: phase === 3 ? 0 : 1 }}
      transition={{ duration: 1 }}
    >

      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/10 blur-[160px] rounded-full" />

      {/* ================= ORB ================= */}
      {phase === 0 && (
        <motion.div
          className="w-28 h-28 rounded-full"
          style={{
            background:
              "radial-gradient(circle, #60a5fa, #3b82f6, transparent)",
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
          }}
        />
      )}

      {/* ================= PARTICLE BURST ================= */}
      {phase >= 1 && (
        <>
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[3px] h-[3px] bg-blue-400 rounded-full"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: Math.cos(i) * 120,
                y: Math.sin(i) * 120,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.02,
              }}
            />
          ))}
        </>
      )}

      {/* ================= AI SHAPE ================= */}
      {phase >= 2 && (
        <div className="relative flex items-center justify-center">

          {/* CORE */}
          <motion.div
            className="w-6 h-6 bg-blue-400 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* RING 1 */}
          <motion.div
            className="absolute w-40 h-40 border border-blue-400/40 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* RING 2 */}
          <motion.div
            className="absolute w-28 h-28 border border-purple-400/40 rounded-full"
            animate={{ rotate: -360 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* ORBIT DOT */}
          <motion.div
            className="absolute w-3 h-3 bg-cyan-400 rounded-full"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              transformOrigin: "60px 0px",
            }}
          />
        </div>
      )}

      {/* ================= TEXT ================= */}
      <motion.div
        className="absolute bottom-24 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          TechCorp AI
        </h1>

        <p className="text-gray-500 text-sm mt-2 tracking-widest">
          SYSTEM INITIALIZING
        </p>
      </motion.div>

    </motion.div>
  )
}

