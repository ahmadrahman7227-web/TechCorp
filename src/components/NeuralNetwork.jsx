import { useMemo } from "react"
import { motion } from "framer-motion"

export default function NeuralNetwork({ mouse }) {

  const nodes = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      x: 10 + Math.random() * 80,
      y: 20 + Math.random() * 60,
    }))
  }, [])

  const lines = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 22) {
        lines.push({ a: nodes[i], b: nodes[j] })
      }
    }
  }

  return (
    <div className="absolute inset-0 z-[4] pointer-events-none">

      <svg className="absolute w-full h-full">

        {/* ✨ GLOW */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* ⚡ GRADIENT FLOW */}
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 🔗 STATIC LINES */}
        {lines.map((line, i) => (
          <motion.line
            key={"line-" + i}
            x1={`${line.a.x}%`}
            y1={`${line.a.y}%`}
            x2={`${line.b.x}%`}
            y2={`${line.b.y}%`}
            stroke="rgba(96,165,250,0.25)"
            strokeWidth="1.2"
            filter="url(#glow)"
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.02,
            }}
          />
        ))}

        {/* ⚡ DATA FLOW */}
        {lines.map((line, i) => (
          <motion.line
            key={"flow-" + i}
            x1={`${line.a.x}%`}
            y1={`${line.a.y}%`}
            x2={`${line.b.x}%`}
            y2={`${line.b.y}%`}
            stroke="url(#flowGradient)"
            strokeWidth="2"
            strokeDasharray="6 12"
            filter="url(#glow)"
            initial={{ strokeDashoffset: 20 }}
            animate={{ strokeDashoffset: -20 }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.05,
            }}
          />
        ))}

      </svg>

      {/*  NODES */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
          style={{
            top: `${node.y}%`,
            left: `${node.x}%`,
          }}
          animate={{
            x: mouse.x * 0.015,
            y: mouse.y * 0.015,
            scale: [1, 1.8, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.05
          }}
        />
      ))}

    </div>
  )
}