import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useRef } from "react"

function EnergyCore() {
  const mesh = useRef()

  useFrame(({ mouse }) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01
      mesh.current.rotation.y += 0.01

      // follow cursor (smooth)
      mesh.current.position.x = mouse.x * 2
      mesh.current.position.y = mouse.y * 2
    }
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color="#3b82f6"
        emissive="#3b82f6"
        emissiveIntensity={2}
        wireframe
      />
    </mesh>
  )
}

function Particles() {
  const points = useRef()

  useFrame(() => {
    if (points.current) {
      points.current.rotation.y += 0.002
    }
  })

  const particles = new Array(500).fill().map(() => [
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
  ])

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={new Float32Array(particles.flat())}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#60a5fa" size={0.05} />
    </points>
  )
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} />

      <EnergyCore />
      <Particles />

      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

