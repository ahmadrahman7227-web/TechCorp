// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial } from "@react-three/drei";
// import { useRef, useMemo } from "react";
// import * as THREE from "three";

// function FlowFieldParticles() {
//   const ref = useRef();

//   const count = 3000;

//   const positions = useMemo(() => {
//     const arr = new Float32Array(count * 3);
//     for (let i = 0; i < count; i++) {
//       arr[i * 3] = (Math.random() - 0.5) * 20;
//       arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
//       arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
//     }
//     return arr;
//   }, []);

//   useFrame((state) => {
//     const time = state.clock.getElapsedTime();
//     const positions = ref.current.geometry.attributes.position.array;

//     for (let i = 0; i < count; i++) {
//       let x = positions[i * 3];
//       let y = positions[i * 3 + 1];

//       positions[i * 3] += Math.sin(y + time * 0.3) * 0.002;
//       positions[i * 3 + 1] += Math.cos(x + time * 0.3) * 0.002;
//     }

//     ref.current.geometry.attributes.position.needsUpdate = true;
//   });

//   return (
//     <Points ref={ref} positions={positions} stride={3}>
//       <PointMaterial
//         transparent
//         color="#7c3aed"
//         size={0.05}
//         sizeAttenuation
//         depthWrite={false}
//         blending={THREE.AdditiveBlending}
//       />
//     </Points>
//   );
// }

// export default function NeuralBackground() {
//   return (
//     <div className="fixed top-0 left-0 w-full h-full -z-10">
//       {/* Gradient Base */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black opacity-80" />

//       {/* Glow Layer */}
//       <div className="absolute inset-0 blur-3xl opacity-40 bg-[radial-gradient(circle_at_center,#6366f1,transparent)]" />

//       {/* Three.js Canvas */}
//       <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
//         <FlowFieldParticles />
//       </Canvas>

//       {/* Overlay for content focus */}
//       <div className="absolute inset-0 bg-black/40" />
//     </div>
//   );
// }
