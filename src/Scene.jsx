import PlaneWithShader from './PlaneWithShader'
import Cylinder from './Cylinder'

export default function Scene() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <PlaneWithShader />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0,Math.PI/2,Math.PI/2]}>
        <Cylinder />
      </mesh>
    </group>
  )
}
