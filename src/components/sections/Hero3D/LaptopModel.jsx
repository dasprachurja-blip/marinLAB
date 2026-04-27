import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { scrollState } from './scrollState'

/* ─────────────────────────────────────────────────────
   LaptopModel — Highly Refined Procedural MacBook
   ───────────────────────────────────────────────────── */

export default function LaptopModel(props) {
  const group = useRef()
  const hinge = useRef()
  const [texture, setTexture] = useState(null)

  // ── Materials ──
  // MacBook Aluminum Body
  const aluminumMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#b0b5b9'), // Silver aluminum
    metalness: 0.9,
    roughness: 0.4,
  }), [])

  // Dark Keyboard Area
  const keyboardMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#101010'),
    metalness: 0.8,
    roughness: 0.2,
  }), [])

  // Screen Bezel (Black Glass)
  const bezelMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#050505'),
    metalness: 1.0,
    roughness: 0.05,
  }), [])

  // Screen Glow Material
  const screenMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#000000'),
    metalness: 0.1,
    roughness: 0.2,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0,
  }), [])

  // Load preview texture
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load('/previews/restaurant.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      screenMat.map = tex
      screenMat.emissiveMap = tex
      screenMat.needsUpdate = true
      setTexture(tex)
    })
  }, [screenMat])

  // ── Animation ──
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const p = scrollState.progress

    if (!hinge.current || !group.current) return

    // 1. Lid Hinge Animation (opens when scroll progress starts)
    let targetAngle = Math.PI / 2
    if (p > 0 && p <= 0.3) {
      targetAngle = Math.PI / 2 - (p / 0.3) * (Math.PI / 2) // from 90deg to 0deg
    } else if (p > 0.3) {
      targetAngle = 0
    }

    // Ease the hinge
    hinge.current.rotation.x = THREE.MathUtils.lerp(hinge.current.rotation.x, targetAngle, 0.15)

    // 2. Screen Brightness
    let emissiveInt = 0
    if (p > 0.01 && p < 0.2) {
      emissiveInt = ((p - 0.01) / 0.19) * 1.2
    } else if (p >= 0.2) {
      emissiveInt = 1.2
    }
    screenMat.emissiveIntensity = THREE.MathUtils.lerp(screenMat.emissiveIntensity, emissiveInt, 0.1)

    // 3. Floating effect
    let lry = 0
    if (p >= 0.5 && p <= 0.7) {
      lry = Math.sin(t * 0.3) * 0.05
    }
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, lry, 0.05)
  })

  // Dimensions
  const W = 3.2
  const D = 2.2
  const BASE_H = 0.06
  const LID_H = 0.04

  return (
    <group ref={group} {...props}>
      {/* ═══ BASE ═══ */}
      <group position={[0, -BASE_H / 2, 0]}>
        {/* Main Chassis */}
        <RoundedBox args={[W, BASE_H, D]} radius={0.05} smoothness={8} material={aluminumMat} castShadow receiveShadow />
        
        {/* Keyboard Well */}
        <RoundedBox args={[W - 0.4, 0.02, D - 0.9]} radius={0.02} smoothness={4} position={[0, BASE_H / 2 + 0.005, -0.2]} material={keyboardMat} />
        
        {/* Trackpad */}
        <RoundedBox args={[1.2, 0.02, 0.7]} radius={0.02} smoothness={4} position={[0, BASE_H / 2 + 0.005, 0.6]} material={keyboardMat} />
        
        {/* Hinge Cylinder */}
        <mesh position={[0, BASE_H / 2, -D / 2 + 0.05]} material={keyboardMat}>
          <cylinderGeometry args={[0.03, 0.03, W - 0.6, 16]} />
          <meshStandardMaterial color="#101010" />
        </mesh>
      </group>

      {/* ═══ LID (Pivot at back edge) ═══ */}
      <group position={[0, 0, -D / 2 + 0.05]} ref={hinge}>
        <group position={[0, 0, D / 2 - 0.05]}>
          
          {/* Aluminum Back */}
          <RoundedBox args={[W, LID_H, D]} radius={0.05} smoothness={8} position={[0, LID_H / 2, 0]} material={aluminumMat} castShadow receiveShadow />
          
          {/* Black Glass Bezel */}
          <RoundedBox args={[W - 0.02, 0.01, D - 0.02]} radius={0.04} smoothness={8} position={[0, LID_H + 0.001, 0]} material={bezelMat} />

          {/* Screen Inner Display */}
          <mesh position={[0, LID_H + 0.006, 0]} material={screenMat}>
            <planeGeometry args={[W - 0.15, D - 0.15]} />
          </mesh>

          {/* Notch */}
          <RoundedBox args={[0.4, 0.01, 0.1]} radius={0.02} smoothness={4} position={[0, LID_H + 0.007, -D / 2 + 0.05]} material={new THREE.MeshBasicMaterial({ color: '#000000' })} />

        </group>
      </group>
    </group>
  )
}
