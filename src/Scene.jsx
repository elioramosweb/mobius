import {useRef} from 'react'
import { useFrame } from '@react-three/fiber'
import MobiusWithShader from './MobiusWithShader'
import MobiusWithCrystal from './MobiusWithCrystal'
import { OrbitControls,Stage,Gltf } from '@react-three/drei'

export default function Scene() {

  const groupRef = useRef()

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()
    if (groupRef.current) {
      //groupRef.current.rotation.y = elapsed * 0.2
      //groupRef.current.rotation.x = elapsed * 0.2
    }
  })

  return (
    <group ref={groupRef} rotation={[Math.PI/2,Math.PI/2,Math.PI/2]}>
      {/* <mesh position={[0, 0, 0]} rotation={[Math.PI/2,0,0]}>
      <PlaneWithShader />
      </mesh> */}
      {/* <mesh position={[0,-3,0]}>
      <MobiusWithShader/>
      </mesh> */}
      <mesh position={[0, -4, 0]}>
      <MobiusWithCrystal />
      </mesh>
    </group>
  )
}
