// SphereWithShader.jsx
import { useRef,useMemo} from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';
import { DoubleSide } from 'three'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js'
import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'


export default function Cylinder() {

  function EspacioTiempo() {

    const meshRef = useRef()
    const shaderRef = useRef();
  
    useFrame((state) => {
      if (meshRef.current) {
        // meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
        // meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1 
      }
      if (shaderRef.current) {
        shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
      }
    })

    const geometry = useMemo(() => {
      return new THREE.CylinderGeometry(1.32,1.32,2,63,64)
    }, [])
  
    return (
    <mesh ref={meshRef} geometry={geometry}>
    <meshPhysicalMaterial
    color="#ffffff"
    roughness={0}
    metalness={0}
    transmission={1}    // Transparencia física
    thickness={0.05}    // ← CRISTAL FINO: grosor pequeño
    ior={1.45}          // Índice de refracción para vidrio fino
    clearcoat={1}       // Reflejos suaves en la superficie
    clearcoatRoughness={0}
    reflectivity={0.5}  // Qué tanto refleja la luz (ajustable)
    side={DoubleSide}
    transparent={true}
  />
</mesh>

    )
  }

  return (EspacioTiempo())
}
