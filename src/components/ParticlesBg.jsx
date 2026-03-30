import Particles from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { useCallback } from "react"

export default function ParticlesBg() {

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="fixed inset-0 -z-10" 
      options={{
        background: { color: "transparent" },
        particles: {
          number: { value: 50 },
          color: { value: "#3b82f6" },
          links: {
            enable: true,
            color: "#3b82f6",
            opacity: 0.3,
          },
          move: {
            enable: true,
            speed: 1,
          },
          size: { value: 2 },
          opacity: { value: 0.5 },
        },
      }}
    />
  )
}