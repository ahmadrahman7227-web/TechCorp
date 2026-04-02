import usePerformanceAnimation from "../hooks/usePerformanceAnimation"
import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const glowRef = useRef(null)

  const mouse = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })

  //  TRACK MOUSE (NO RE-RENDER)
  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  //  PERFORMANCE ANIMATION (FPS CONTROLLED)
  usePerformanceAnimation(() => {
    // smooth follow
    pos.current.x += (mouse.current.x - pos.current.x) * 0.18
    pos.current.y += (mouse.current.y - pos.current.y) * 0.18

    if (cursorRef.current && glowRef.current) {
      const x = pos.current.x
      const y = pos.current.y

      cursorRef.current.style.transform =
        `translate3d(${x}px, ${y}px, 0)`

      glowRef.current.style.transform =
        `translate3d(${x}px, ${y}px, 0)`
    }
  }, 60) // 👉 ubah ke 30 kalau ingin lebih ringan

  return (
    <>
      {/*  GLOW */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[999]"
        style={{
          width: "80px",
          height: "80px",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,46,166,0.35), rgba(255,46,166,0.1), transparent 70%)",
          filter: "blur(20px)",
          willChange: "transform"
        }}
      />

      {/*  DOT */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: "10px",
          height: "10px",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "#ff2ea6",
          boxShadow: "0 0 10px #ff2ea6, 0 0 25px #ff2ea6",
          willChange: "transform"
        }}
      />
    </>
  )
}