import { useRef } from "react"

export default function Card3D({ title }) {
  const ref = useRef()

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateX = -(y / rect.height - 0.5) * 20
    const rotateY = (x / rect.width - 0.5) * 20

    ref.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const reset = () => {
    ref.current.style.transform = "rotateX(0) rotateY(0)"
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-xl transition"
    >
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm mt-2">3D Interactive Card</p>
    </div>
  )
}



