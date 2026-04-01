import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function ParticlesField() {
  const ref = useRef()

  const particles = new Float32Array(600 * 3)

  for (let i = 0; i < 600; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 10
    particles[i * 3 + 1] = (Math.random() - 0.5) * 6
    particles[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  useFrame(() => {
    ref.current.rotation.y += 0.0008
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#93c5fd" />
    </points>
  )
}