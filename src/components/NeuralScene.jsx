import { OrbitControls } from "@react-three/drei"
import EnergyCore from "./EnergyCore"
import NeuralLines from "./NeuralLines"
import ParticlesField from "./ParticlesField"
import GridFloor from "./GridFloor"

export default function NeuralScene() {
  return (
    <>
      {/* FOG */}
      <fog attach="fog" args={["#020617", 4, 12]} />

      {/* LIGHTING */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 2]} intensity={2} color="#3b82f6" />
      <pointLight position={[-3, 2, 2]} intensity={1.5} color="#8b5cf6" />

      {/* OBJECT */}
      {/* <EnergyCore /> */}
      <NeuralLines />
      <ParticlesField />
      <GridFloor />

      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  )
}