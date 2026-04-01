export default function NeuralLights() {
  return (
    <>
      <ambientLight intensity={0.3} />

      <pointLight position={[2, 2, 2]} intensity={2} color="#3b82f6" />
      <pointLight position={[-2, -2, 2]} intensity={2} color="#a855f7" />
    </>
  )
}