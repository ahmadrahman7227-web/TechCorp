// import { useRef } from "react"
// import { useFrame } from "@react-three/fiber"

// export default function NeuralFlowField() {
//   const mesh = useRef()

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime()
//     mesh.current.rotation.z = Math.sin(t * 0.1) * 0.1
//     mesh.current.material.uniforms.uTime.value = t
//   })

//   return (
//     <mesh ref={mesh} position={[0, 0, 0]}>
//       <planeGeometry args={[8, 8, 128, 128]} />

//       <shaderMaterial
//         transparent
//         wireframe
//         uniforms={{
//           uTime: { value: 0 },
//         }}
//         vertexShader={`
//           uniform float uTime;
//           varying float vZ;

//           void main() {
//             vec3 pos = position;

//             float wave1 = sin(pos.x * 2.0 + uTime) * 0.2;
//             float wave2 = cos(pos.y * 2.0 + uTime * 1.2) * 0.2;

//             pos.z += wave1 + wave2;
//             vZ = pos.z;

//             gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//           }
//         `}
//         fragmentShader={`
//           varying float vZ;

//           void main() {
//             float intensity = 0.5 + vZ;

//             vec3 color = mix(
//               vec3(0.2, 0.4, 1.0),   // blue
//               vec3(0.6, 0.2, 1.0),   // purple
//               intensity
//             );

//             gl_FragColor = vec4(color, 0.15);
//           }
//         `}
//       />
//     </mesh>
//   )
// }