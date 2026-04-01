// import { Canvas } from "@react-three/fiber"
// import NeuralFlowField from "./NeuralFlowField"
// import NeuralParticles from "./NeuralParticles"
// import NeuralLights from "./NeuralLights"

// export default function GlobalBackground() {
//   return (
//     <div className="fixed inset-0 z-[-1] pointer-events-none">
//       {/* BASE DARK */}
//       <div className="absolute inset-0 bg-[#020617]" />

//       <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
//         <NeuralLights />
//         <NeuralFlowField />
//         <NeuralParticles />
//       </Canvas>

//       {/* VIGNETTE BIAR FOKUS KE KONTEN */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,#020617_100%)] opacity-80" />
//     </div>
//   )
// }


import { Canvas } from "@react-three/fiber"
import NeuralScene from "./NeuralScene"

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1]">

      {/* BASE DARK */}
     <div className="absolute inset-0 bg-[#00040f]" />

      {/* GLOW OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 blur-3xl" />

      {/* 3D */}
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <NeuralScene />
      </Canvas>

    </div>
  )
}