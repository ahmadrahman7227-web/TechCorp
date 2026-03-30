import { useState, useEffect } from "react"

//  SCREEN DETECTOR
export function useDevice() {
  const [device, setDevice] = useState("desktop")

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setDevice("mobile")
      else if (window.innerWidth < 1024) setDevice("tablet")
      else setDevice("desktop")
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return device
}

//  GLOBAL SPACING
export const container = "px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24"
export const section = "py-16 sm:py-20 md:py-24"

//  GLOBAL TEXT
export const title = "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
export const text = "text-sm sm:text-base md:text-lg text-gray-400"

//  GLOBAL ANIMATION
export const fadeUp = (device) => ({
  hidden: {
    opacity: 0,
    y: device === "mobile" ? 20 : device === "tablet" ? 40 : 60
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
})

export const scaleCard = (device) => ({
  hidden: {
    opacity: 0,
    scale: device === "mobile" ? 1 : 0.9
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 }
  }
})