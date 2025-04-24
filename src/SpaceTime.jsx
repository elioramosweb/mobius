// SphereWithShader.jsx
import { useRef,useMemo} from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';
import { ShaderMaterial } from 'three'
import { DoubleSide } from 'three'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js'


function espacioTiempo(u, t, target) {
  u *= Math.PI * 2.0
  t = (t - 0.5) * 2.0

  const baseRadius = 0.2
  const coneSlope = 1.5
  const t0 = 0.15

  const smooth = Math.abs(t)
  const blend = smoothstep(t0, 1.0, smooth)
  const r = baseRadius + coneSlope * (smooth - t0) * blend * (smooth > t0 ? 1.0 : 0.0)

  const x = (baseRadius + r) * Math.cos(u)
  const y = (baseRadius + r) * Math.sin(u)
  const z = t

  target.set(x, y, z)
}

function smoothstep(edge0, edge1, x) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0)
  return t * t * (3.0 - 2.0 * t)
}

export default function SphereWithShader() {
  const meshRef = useRef()
  const shadowRef = useRef()
  const shaderRef = useRef()

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
    }
  })

  const geometry = useMemo(() => {
    const geo = new ParametricGeometry(espacioTiempo, 200, 200)
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
        <meshPhysicalMaterial
          color="#AAAAAA"
          roughness={0}
          metalness={0}
          transmission={1}
          thickness={0.01}
          ior={1.0}
          clearcoat={1}
          clearcoatRoughness={0}
          reflectivity={0.001}
          side={DoubleSide}
          transparent={true}
        />
      </mesh>
    </>
  )
}