import { useMemo } from "react"
import { motion } from "framer-motion"

export default function Starfield({ mouse }) {

  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: 2 + Math.random() * 3,
    }))
  }, [])

  return (
    <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">

      {/* ⭐ NORMAL STARS */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-300 rounded-full mix-blend-screen"
          style={{
            width: star.size,
            height: star.size,
            top: `${star.y}%`,
            left: `${star.x}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.6, 1],
            x: mouse.x * 0.01,
            y: mouse.y * 0.01,
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 🌠 SHOOTING STAR (SEPARATE) */}
      <motion.div
        className="absolute w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_10px_white]"
        initial={{ x: "-10%", y: "20%", opacity: 0 }}
        animate={{
          x: "110%",
          y: "80%",
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 6,
          ease: "easeOut"
        }}
      />

    </div>
  )
}