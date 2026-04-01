import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function GridFloor() {
  const ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.position.z = (t * 0.5) % 2
  })

  return (
    <gridHelper
      ref={ref}
      args={[20, 40, "#1e3a8a", "#1e3a8a"]}
      position={[0, -2, 0]}
    />
  )
}