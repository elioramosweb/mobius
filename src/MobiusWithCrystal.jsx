import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { DoubleSide } from 'three'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { MeshTransmissionMaterial} from '@react-three/drei'

function mobius(u, t, target) {
  // u ∈ [0, 1], t ∈ [0, 1]
  u *= Math.PI * 2.0      // ángulo completo
  t = (t - 0.5) * 2       // t ∈ [-1, 1], ancho de la banda

  const R = 1.0           // radio del círculo central
  const w = 2.0           // ancho de la banda

  const x = (R + (w * t / 2) * Math.cos(u / 2)) * Math.cos(u)
  const y = (R + (w * t / 2) * Math.cos(u / 2)) * Math.sin(u)
  const z = (w * t / 2) * Math.sin(u / 2)

  target.set(x, y, z)
}


export default function MobiusWithCrystal() {
  const meshRef = useRef()
  const shadowRef = useRef()
  const shaderRef = useRef()

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
    }
  })

  const geometry = useMemo(() => {
    const geo = new ParametricGeometry(mobius, 200, 200)
    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <>
      {/* Malla para lanzar sombra */}
      <mesh geometry={geometry} castShadow receiveShadow ref={shadowRef}>
        <meshStandardMaterial color="white" transparent opacity={0} />
      </mesh>

      {/* Malla con material transparente visual */}
      <mesh geometry={geometry} ref={meshRef}>
      <MeshTransmissionMaterial color="#EEEEEE" />
      </mesh>
    </>
  )
}