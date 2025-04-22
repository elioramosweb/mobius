import {useRef} from 'react'
import { useFrame } from '@react-three/fiber'
import PlaneWithShader from './PlaneWithShader'
import Cylinder from './Cylinder'

export default function Scene() {

  const groupRef = useRef()

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.2
      groupRef.current.rotation.x = elapsed * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
      <PlaneWithShader />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0,Math.PI/2,Math.PI/2]}>
      <Cylinder />
      </mesh>
    </group>
  )
}
