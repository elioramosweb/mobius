import './style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import { Environment, OrbitControls } from '@react-three/drei'


const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <React.StrictMode>
  <Canvas camera={{ position: [0, 0, 2] }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <Environment files="./hdrs/empty_warehouse_01_4k.hdr" background={false} /> 
    <Scene />
    <OrbitControls />
  </Canvas>
  </React.StrictMode>
)
