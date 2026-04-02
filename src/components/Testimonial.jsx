import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

export default function ClientsSection() {
  const testimonials = [
    {
      name: "John Carter",
      role: "Startup Founder",
      text: "TechCorp transformed our business with a powerful and scalable platform.",
      img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Lisa Wong",
      role: "Product Manager",
      text: "The UI/UX quality is top-notch. Everything feels smooth and modern.",
      img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Michael Lee",
      role: "CTO",
      text: "Their cloud solutions helped us scale without worrying about infrastructure.",
      img: "https://randomuser.me/api/portraits/men/76.jpg"
    }
  ]

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  // AUTO SLIDE
  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [paused])

  // MOUSE PARALLAX
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  // DRAG
  const handleDragEnd = (_, info) => {
    if (info.offset.x < -50) {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    } else if (info.offset.x > 50) {
      setCurrent((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      )
    }
  }

  return (
    <section className="py-32 px-6 relative overflow-hidden text-center">

      {/* NOISE */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* GLOW BG */}
      <div className="absolute w-[700px] h-[700px] bg-blue-500/10 blur-[180px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      {/* TITLE */}
      <h2 className="text-4xl md:text-5xl font-bold mb-20 
        bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 
        bg-clip-text text-transparent">
        What Our Clients Say
      </h2>

      {/* CARD */}
      <div
        className="relative max-w-2xl mx-auto perspective-[1200px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false)
          handleMouseLeave()
        }}
        onMouseMove={handleMouseMove}
      >

        {/* TRACKING GLOW */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(59,130,246,0.2), transparent 70%)",
            x,
            y
          }}
        />

        {/* BORDER */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 opacity-30 blur"></div>

        {/* MAIN CARD */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          style={{ rotateX, rotateY }}
          className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-10 py-14 shadow-2xl cursor-grab active:cursor-grabbing"
        >

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -60, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >

              {/* AVATAR */}
              <motion.img
                src={testimonials[current].img}
                className="w-20 h-20 rounded-full mb-6 border-2 border-blue-400 shadow-lg shadow-blue-500/30"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              />

              {/* TEXT */}
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6 max-w-xl">
                “{testimonials[current].text}”
              </p>

              {/* STARS */}
              <div className="flex gap-1 mb-3">
                {"★★★★★".split("").map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-yellow-400 text-lg"
                  >
                    ★
                  </motion.span>
                ))}
              </div>

              {/* NAME */}
              <h4 className="text-lg font-semibold text-white">
                {testimonials[current].name}
              </h4>
              <p className="text-sm text-blue-400">
                {testimonials[current].role}
              </p>

            </motion.div>
          </AnimatePresence>

        </motion.div>
      </div>

      {/* DOT */}
      <div className="flex justify-center gap-4 mt-10">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              current === i ? "bg-blue-400 scale-125" : "bg-white/20"
            }`}
          />
        ))}
      </div>

    </section>
  )
}