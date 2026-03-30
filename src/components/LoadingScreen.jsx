
import { motion } from "framer-motion"

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-[999] pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
    >
      <div className="text-center">

        {/* LOGO */}
        <motion.h1
          className="text-4xl font-bold text-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          TechCorp AI
        </motion.h1>

        {/* LOADING BAR */}
        <div className="mt-6 w-40 h-[2px] bg-gray-800 overflow-hidden">
          <motion.div
            className="h-full bg-blue-400"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5 }}
          />
        </div>

      </div>
    </motion.div>
  )
}