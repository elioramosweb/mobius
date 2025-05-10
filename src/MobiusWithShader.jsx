import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { DoubleSide } from 'three'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

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


export default function MobiusWithShader() {
  const meshRef = useRef()
  const shaderRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      // Puedes activar animaciones aquí si deseas
      // meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
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
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
        }}
        side={DoubleSide}
        transparent={false}
        wireframe={false}
        depthWrite={false}
      />
    </mesh>
  )
}
