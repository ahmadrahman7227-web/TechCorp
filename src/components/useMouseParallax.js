import { useEffect, useState } from "react"

export default function useMouseParallax() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handle = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMouse({ x, y })
    }

    window.addEventListener("mousemove", handle)
    return () => window.removeEventListener("mousemove", handle)
  }, [])

  return mouse
}