import { useRef } from "react"

export default function MagneticButton({ children }) {
  const ref = useRef(null)

  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - r.left - r.width/2
    const y = e.clientY - r.top - r.height/2

    ref.current.style.transform = `translate(${x*0.2}px, ${y*0.2}px)`
  }

  return (
    <button
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => ref.current.style.transform=""}
      className="px-6 py-3 bg-blue-500 rounded-xl"
    >
      {children}
    </button>
  )
}