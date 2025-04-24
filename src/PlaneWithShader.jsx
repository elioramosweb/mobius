// SphereWithShader.jsx
import { useRef,useMemo} from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';
import { ShaderMaterial } from 'three'
import { DoubleSide } from 'three'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js'
import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'

// function mobius(u, t, target) {
//   // u ∈ [0, 1], t ∈ [0, 1]
//   u *= Math.PI * 2.00
//   t = (t - 0.5) * 2// rango [-1, 1]

//   const major = 1.0*t
//   const a = 0.5

//   const x = Math.cos(u) * (major + t * Math.cos(u / 2))
//   const y = Math.sin(u) * (major + t * Math.cos(u / 2))
//   const z = t * Math.sin(u / 2)

//   target.set(x, y, z)
// }

function espacioTiempo(u, t, target) {
  u *= Math.PI * 2.0
  t = (t - 0.5) * 2.0 // t ∈ [-1, 1]

  const baseRadius = 0.2
  const coneSlope = 1.5
  const t0 = 0.15 // mitad del tubo

  // Transición suave con una curva de tipo sigmoide
  const smooth = Math.abs(t)
  const blend = smoothstep(t0, 1.0, smooth) // 0 cerca de centro, 1 fuera
  const r = baseRadius + coneSlope * (smooth - t0) * blend * (smooth > t0 ? 1.0 : 0.0)

  const x = (baseRadius + r) * Math.cos(u)
  const y = (baseRadius + r) * Math.sin(u)
  const z = t

  target.set(x, y, z)
}

// Utilidad para smoothstep
function smoothstep(edge0, edge1, x) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0)
  return t * t * (3.0 - 2.0 * t)
}

export default function SphereWithShader() {

  function EspacioTiempo() {

    const meshRef = useRef()
    const shaderRef = useRef();
  
    useFrame((state) => {
      if (meshRef.current) {
        //meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
        // meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1 
      }
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
      <mesh ref={meshRef} geometry={geometry}>
        {/* <meshStandardMaterial color="orange" side={DoubleSide} /> */}
        <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uLightDir: { value: new THREE.Vector3(10, 10, 10) },
          uAmbientColor: { value: new THREE.Color(0.4, 0.4, 0.4) },
          uAmbientIntensity: { value: 0.8 },
          uDiffuseColor: { value: new THREE.Color(1.0, 1.0, 1.0) },
          uSpecularColor: { value: new THREE.Color(1, 1, 1) },
          uSpecularPower: { value: 64.0}
        }}
        side={DoubleSide}
        transparent={false}
        wireframe={false}
        depthWrite={false}
      />
      </mesh>
    )
  }

  return (EspacioTiempo())

  // return (
  //   <mesh position={[0,0,0]}>
  //     <planeGeometry args={[20, 20,64, 64]} />
  //     <shaderMaterial
  //       ref={shaderRef}
  //       vertexShader={vertexShader}
  //       fragmentShader={fragmentShader}
  //       uniforms={{
  //         uTime: { value: 0 }
  //       }}
  //       side={DoubleSide}
  //     />
  //   </mesh>
  // )
}
