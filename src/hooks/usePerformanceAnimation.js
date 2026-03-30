import { useEffect, useRef } from "react"

export default function usePerformanceAnimation(callback, fps = 60) {
  const requestRef = useRef()
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const frameDuration = 1000 / fps

    const animate = (time) => {
      if (time - lastTimeRef.current > frameDuration) {
        callback(time)
        lastTimeRef.current = time
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(requestRef.current)
  }, [callback, fps])
}