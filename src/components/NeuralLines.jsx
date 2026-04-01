import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"

export default function NeuralLines() {
  const ref = useRef()
  const count = 70
  const maxDist = 1.5

  const points = useMemo(() => {
    return new Array(count).fill().map(() => [
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 4,
    ])
  }, [])

  const positions = useMemo(
    () => new Float32Array(count * count * 3),
    []
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    let idx = 0

    points.forEach((p, i) => {
      p[0] += Math.sin(t + i) * 0.001
      p[2] += Math.cos(t + i) * 0.001
    })

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = points[i][0] - points[j][0]
        const dy = points[i][1] - points[j][1]
        const dz = points[i][2] - points[j][2]

        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < maxDist) {
          positions[idx++] = points[i][0]
          positions[idx++] = points[i][1]
          positions[idx++] = points[i][2]

          positions[idx++] = points[j][0]
          positions[idx++] = points[j][1]
          positions[idx++] = points[j][2]
        }
      }
    }

    ref.current.geometry.setDrawRange(0, idx / 3)
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#60a5fa" opacity={0.20} transparent />
    </lineSegments>
  )
}

