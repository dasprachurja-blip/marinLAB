import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { scrollState } from './scrollState'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────
   LaptopModel — Cinematic MacBook with hinge‑pivot lid
   ───────────────────────────────────────────────────── */

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function LaptopModel(props) {
  const group = useRef()
  const lidPivotRef = useRef()
  const screenMeshRef = useRef()
  const screenGlowRef = useRef()
  const [texture, setTexture] = useState(null)

  /* ── Premium PBR Materials ── */
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2e3035'),
    metalness: 0.95,
    roughness: 0.25,
  }), [])

  const bezelMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0a0a0c'),
    metalness: 0.8,
    roughness: 0.2,
  }), [])

  const keyBedMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#151518'),
    metalness: 0.6,
    roughness: 0.5,
  }), [])

  const keyCapMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#101012'),
    metalness: 0.4,
    roughness: 0.7, // Matte plastic keys
  }), [])

  const screenMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#000000'),
    metalness: 0.1,
    roughness: 0.2,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0,
    transparent: true,
  }), [])

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load('/previews/restaurant.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      setTexture(tex)
    })
  }, [])

  /* ── Generate Simple Keyboard Grid ── */
  const keys = useMemo(() => {
    const arr = []
    const rows = 6
    const cols = 14
    const keySizeX = 0.17
    const keySizeZ = 0.18
    const gapX = 0.02
    const gapZ = 0.03
    
    const startX = -((cols - 1) * (keySizeX + gapX)) / 2
    const startZ = -((rows - 1) * (keySizeZ + gapZ)) / 2

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Skip some spaces for spacebar
        if (r === rows - 1 && c >= 4 && c <= 9) {
          if (c === 6) arr.push({ x: startX + 6.5 * (keySizeX + gapX), z: startZ + r * (keySizeZ + gapZ), w: keySizeX * 6 + gapX * 5 })
          continue
        }
        arr.push({ x: startX + c * (keySizeX + gapX), z: startZ + r * (keySizeZ + gapZ), w: keySizeX })
      }
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    const p = scrollState.progress
    const t = clock.getElapsedTime()

    if (lidPivotRef.current) {
      let targetRotX = 0
      if (p > 0 && p <= 0.3) {
        targetRotX = -1.9 * easeInOut(p / 0.3)
      } else if (p > 0.3) {
        targetRotX = -1.9
      }
      lidPivotRef.current.rotation.x = THREE.MathUtils.lerp(
        lidPivotRef.current.rotation.x, targetRotX, 0.1
      )
    }

    if (group.current) {
      let lry = 0, lrx = 0
      if (p >= 0.5 && p <= 0.7) {
        lry = Math.sin(t * 0.3) * 0.05 // max ±2.8 deg
        lrx = Math.sin(t * 0.2) * 0.02 // max ±1.1 deg
      }
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, lry, 0.05)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, lrx, 0.05)
    }

    if (screenMeshRef.current) {
      if (texture && screenMeshRef.current.material.emissiveMap !== texture) {
        screenMeshRef.current.material.emissiveMap = texture
        screenMeshRef.current.material.map = texture
        screenMeshRef.current.material.needsUpdate = true
      }

      let emissiveInt = 0
      if (p >= 0.45 && p < 0.55) emissiveInt = ((p - 0.45) / 0.1) * 1.0 // subtle
      else if (p >= 0.55) emissiveInt = 1.0

      screenMeshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        screenMeshRef.current.material.emissiveIntensity,
        emissiveInt,
        0.1
      )
    }

    if (screenGlowRef.current) {
      let glow = 0
      if (p >= 0.45 && p < 0.55) glow = ((p - 0.45) / 0.1) * 0.08
      else if (p >= 0.55) glow = 0.08
      screenGlowRef.current.material.opacity = glow
    }
  })

  const BASE_W = 3.4, BASE_D = 2.2, BASE_H = 0.08
  const LID_W = 3.2, LID_H = 2.1, LID_D = 0.05
  const SCREEN_W = 3.0, SCREEN_H = 1.9

  return (
    <group ref={group} {...props}>
      {/* ═══ BASE ═══ */}
      <mesh material={bodyMat} castShadow receiveShadow>
        <boxGeometry args={[BASE_W, BASE_H, BASE_D]} />
      </mesh>

      {/* Keyboard Bed */}
      <mesh material={keyBedMat} position={[0, BASE_H / 2 + 0.001, 0.15]} receiveShadow>
        <boxGeometry args={[2.8, 0.002, 1.3]} />
      </mesh>

      {/* 3D Keycaps */}
      <group position={[0, BASE_H / 2 + 0.002, 0.15]}>
        {keys.map((k, i) => (
          <mesh key={i} material={keyCapMat} position={[k.x, 0.003, k.z]} castShadow receiveShadow>
            <boxGeometry args={[k.w, 0.006, 0.18]} />
          </mesh>
        ))}
      </group>

      {/* Trackpad */}
      <mesh material={bodyMat} position={[0, BASE_H / 2 + 0.001, 0.9]} receiveShadow>
        <boxGeometry args={[1.1, 0.003, 0.65]} />
      </mesh>

      {/* ═══ LID ═══ */}
      <group position={[0, BASE_H / 2, -BASE_D / 2]}>
        <group ref={lidPivotRef} rotation={[0, 0, 0]}>
          <mesh material={bodyMat} position={[0, LID_D / 2, LID_H / 2]} castShadow receiveShadow>
            <boxGeometry args={[LID_W, LID_D, LID_H]} />
          </mesh>

          <mesh material={bezelMat} position={[0, LID_D + 0.001, LID_H / 2]}>
            <boxGeometry args={[SCREEN_W + 0.15, 0.005, SCREEN_H + 0.1]} />
          </mesh>

          <mesh
            ref={screenMeshRef}
            material={screenMat}
            position={[0, LID_D + 0.003, LID_H / 2]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[SCREEN_W, SCREEN_H]} />
          </mesh>

          <mesh
            ref={screenGlowRef}
            position={[0, LID_D - 0.01, LID_H / 2]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[SCREEN_W + 0.8, SCREEN_H + 0.8]} />
            <meshBasicMaterial color="#48D9B4" transparent opacity={0} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
