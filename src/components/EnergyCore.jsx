import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function EnergyCore() {
  const ref = useRef()

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime()

    ref.current.rotation.y += 0.01

    // FOLLOW CURSOR
    ref.current.position.x = mouse.x * 1.2
    ref.current.position.y = mouse.y * 1

    // PULSE HALUS
    const scale = 1 + Math.sin(t * 2) * 0.04
    ref.current.scale.set(scale, scale, scale)
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial
        color="#3b82f6"
        emissive="#3b82f6"
        emissiveIntensity={1.8}
        wireframe
      />
    </mesh>
  )
}