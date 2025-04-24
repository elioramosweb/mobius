import {useRef} from 'react'
import { useFrame } from '@react-three/fiber'
import PlaneWithShader from './PlaneWithShader'
import Cylinder from './Cylinder'
import SpaceTime from './SpaceTime'

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
      <mesh position={[0, 0, 0]} rotation={[Math.PI/2,0,0]}>
      <PlaneWithShader />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI/2,0,0]}>
      <SpaceTime />
      </mesh>
    </group>
  )
}
