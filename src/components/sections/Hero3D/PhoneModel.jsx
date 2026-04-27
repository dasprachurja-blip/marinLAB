import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { scrollState } from './scrollState'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────
   PhoneModel — Deterministic curved‑arc entry
   
   SCENE 3 (p 0.3→0.5): Enters from off‑screen right
   SCENE 4 (p 0.5→0.7): Subtle sine float (opposite phase)
   SCENE 7 (p 0.7→1.0): Exits or stays relative to camera
   
   z always ≥ 1.5 (in front of laptop)
   Max rotation: ±10° Y, ±5° X
   NO Math.random. Fully deterministic.
   ───────────────────────────────────────────────────── */

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const DEG = Math.PI / 180

// Settled position (in front of laptop)
const SETTLE_X = 1.2
const SETTLE_Y = 0.3
const SETTLE_Z = 1.5

// Start position (off-screen right)
const START_X = 3.5
const START_Y = 0.5
const START_Z = 2.0

export default function PhoneModel(props) {
  const group = useRef()
  const screenMeshRef = useRef()
  const [texture, setTexture] = useState(null)

  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1a1a1e'),
    metalness: 0.92,
    roughness: 0.08,
  }), [])

  const screenMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#000000'),
    metalness: 0.2,
    roughness: 0.8,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0,
    transparent: true,
  }), [])

  const cameraMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#222228'),
    metalness: 0.95,
    roughness: 0.05,
  }), [])

  /* ── Load texture (responsive mobile version) ── */
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    // Using the same website mockup
    loader.load('/previews/restaurant.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      // Adjust texture offset/repeat for mobile aspect ratio
      tex.wrapS = THREE.RepeatWrapping
      tex.wrapT = THREE.RepeatWrapping
      tex.repeat.set(0.3, 1)
      tex.offset.set(0.35, 0)
      setTexture(tex)
    })
  }, [])

  const PHONE_W = 0.75, PHONE_H = 1.55, PHONE_D = 0.08
  const SCREEN_W = 0.65, SCREEN_H = 1.35

  useFrame(({ clock }) => {
    if (!group.current) return
    const p = scrollState.progress
    const t = clock.getElapsedTime()

    let x, y, z, ry, rx

    if (p <= 0.3) {
      /* ── SCENE 1 & 2: Hidden off‑screen ── */
      x = START_X
      y = START_Y
      z = Math.max(START_Z, 1.5)
      ry = -15 * DEG
      rx = 0
    } else if (p > 0.3 && p <= 0.5) {
      /* ── SCENE 3: Curved arc entry (0.3 → 0.5) ── */
      const t3 = Math.min(1, Math.max(0, (p - 0.3) / 0.2))
      const easeT3 = easeInOut(t3)

      const midX = (START_X + SETTLE_X) / 2
      const midY = Math.max(START_Y, SETTLE_Y) + 0.4 // curved arc upward
      const midZ = (START_Z + SETTLE_Z) / 2

      // Quadratic bezier path
      const oneMinusT = 1 - easeT3
      x = oneMinusT * oneMinusT * START_X + 2 * oneMinusT * easeT3 * midX + easeT3 * easeT3 * SETTLE_X
      y = oneMinusT * oneMinusT * START_Y + 2 * oneMinusT * easeT3 * midY + easeT3 * easeT3 * SETTLE_Y
      z = oneMinusT * oneMinusT * START_Z + 2 * oneMinusT * easeT3 * midZ + easeT3 * easeT3 * SETTLE_Z

      ry = THREE.MathUtils.lerp(-15 * DEG, -10 * DEG, easeT3)
      rx = THREE.MathUtils.lerp(0, -5 * DEG, easeT3)
    } else if (p > 0.5 && p <= 0.7) {
      /* ── SCENE 4: Subtle float (0.5 → 0.7) ── */
      // Opposite phase of laptop
      x = SETTLE_X
      y = SETTLE_Y
      z = SETTLE_Z
      // Slower movement, opposite phase
      ry = -10 * DEG + Math.sin(t * 0.15 + Math.PI) * (5 * DEG) // Max ±10 overall
      rx = -5 * DEG + Math.sin(t * 0.1 + Math.PI) * (2 * DEG)  // Max ±5 overall
    } else {
      /* ── SCENE 7: Exit or hold (0.7 → 1.0) ── */
      // Moves out of the way as camera zooms into laptop
      const t7 = easeInOut(Math.min((p - 0.7) / 0.3, 1))
      x = THREE.MathUtils.lerp(SETTLE_X, 3.0, t7)
      y = THREE.MathUtils.lerp(SETTLE_Y, -2.0, t7)
      z = SETTLE_Z
      ry = THREE.MathUtils.lerp(-10 * DEG, -20 * DEG, t7)
      rx = THREE.MathUtils.lerp(-5 * DEG, -10 * DEG, t7)
    }

    // STRICT RULE: Clamp z-position to always stay in front of laptop
    z = Math.max(z, 1.5)

    // Apply with lerp for smoothness
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, x, 0.1)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, y, 0.1)
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, z, 0.1)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, ry, 0.1)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, rx, 0.1)

    /* ── SCENE 5: Screen activation (~0.5) ── */
    if (screenMeshRef.current) {
      if (texture && screenMeshRef.current.material.emissiveMap !== texture) {
        screenMeshRef.current.material.emissiveMap = texture
        screenMeshRef.current.material.map = texture
        screenMeshRef.current.material.needsUpdate = true
      }
      
      let emissiveInt = 0
      if (p > 0.45 && p <= 0.55) {
        emissiveInt = (p - 0.45) / 0.1
      } else if (p > 0.55) {
        emissiveInt = 1.0
      }
      screenMeshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        screenMeshRef.current.material.emissiveIntensity,
        emissiveInt,
        0.1
      )
    }
  })

  return (
    <group ref={group} position={[START_X, START_Y, START_Z]} {...props}>
      {/* Frame */}
      <mesh material={frameMat} castShadow receiveShadow>
        <boxGeometry args={[PHONE_W, PHONE_H, PHONE_D]} />
      </mesh>

      {/* Screen */}
      <mesh ref={screenMeshRef} material={screenMat} position={[0, 0, PHONE_D / 2 + 0.001]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
      </mesh>

      {/* Dynamic island */}
      <mesh position={[0, SCREEN_H / 2 - 0.06, PHONE_D / 2 + 0.002]}>
        <planeGeometry args={[0.28, 0.035]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Camera bump */}
      <mesh material={cameraMat} position={[-0.18, 0.55, -PHONE_D / 2 - 0.015]}>
        <boxGeometry args={[0.22, 0.22, 0.03]} />
      </mesh>

      {/* Triple lenses */}
      {[[-0.22, 0.59], [-0.14, 0.59], [-0.18, 0.51]].map(([lx, ly], i) => (
        <mesh key={i} material={cameraMat} position={[lx, ly, -PHONE_D / 2 - 0.032]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 0.005, 16]} />
        </mesh>
      ))}
    </group>
  )
}
