import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { scrollState } from './scrollState'
import LaptopModel from './LaptopModel'
import PhoneModel from './PhoneModel'
import * as THREE from 'three'

/* ──────────────────────────────────────────
   Main 3‑D Scene — pure Three.js, no drei
   ────────────────────────────────────────── */

/* Procedural floating particles */
function Particles() {
  const ref = useRef()
  const count = 200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 24
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16
      pos[i * 3 + 2] = (Math.random() - 0.5) * 24
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.01
    ref.current.rotation.x = Math.sin(t * 0.006) * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#48D9B4"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* Background glow orbs */
function GlowOrbs() {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.children.forEach((child, i) => {
      child.position.y = child.userData.baseY + Math.sin(t * 0.3 + i * 2) * 0.3
      child.position.x = child.userData.baseX + Math.cos(t * 0.2 + i * 3) * 0.2
    })
  })

  const orbs = useMemo(() => [
    { pos: [-4, 2, -6], color: '#48D9B4', scale: 1.5 },
    { pos: [5, -1, -8], color: '#2B82AD', scale: 2.0 },
    { pos: [0, 3, -10], color: '#1a5276', scale: 2.5 },
    { pos: [-2, -3, -5], color: '#48D9B4', scale: 1.0 },
  ], [])

  return (
    <group ref={ref}>
      {orbs.map((orb, i) => (
        <mesh
          key={i}
          position={orb.pos}
          scale={orb.scale}
          userData={{ baseX: orb.pos[0], baseY: orb.pos[1] }}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.06} />
        </mesh>
      ))}
    </group>
  )
}

export default function Scene() {
  const groupRef = useRef()
  const laptopRef = useRef()
  const { camera } = useThree()

  const CAM_START_Z = 5.5
  const CAM_END_Z   = 0.3
  const CAM_START_Y = 0.6
  const CAM_END_Y   = 1.1

  useFrame(({ clock }) => {
    const p = scrollState.progress
    const t = clock.getElapsedTime()

    // Debug: update the progress indicator in the DOM
    const debugEl = document.getElementById('debug-progress')
    if (debugEl) {
      debugEl.textContent = `scroll: ${(p * 100).toFixed(1)}%`
    }

    /* ── Camera motion ── */
    let tz = CAM_START_Z, ty = CAM_START_Y

    if (p <= 0.6) {
      // Gentle forward push during scenes 1-3
      tz = CAM_START_Z - p * 2.0
      ty = CAM_START_Y + p * 0.3
    } else if (p <= 0.85) {
      // Dramatic zoom into screen (scene 4)
      const zp = (p - 0.6) / 0.25
      const ease = zp < 0.5 ? 2 * zp * zp : 1 - Math.pow(-2 * zp + 2, 2) / 2
      tz = THREE.MathUtils.lerp(CAM_START_Z - 1.2, CAM_END_Z, ease)
      ty = THREE.MathUtils.lerp(CAM_START_Y + 0.18, CAM_END_Y, ease)
    } else {
      tz = CAM_END_Z
      ty = CAM_END_Y
    }

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, tz, 0.08)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, ty, 0.08)

    /* ── Subtle orbit on device group ── */
    if (groupRef.current) {
      let ry = p * Math.PI * 0.08
      if (p > 0.6) {
        const tt = Math.min((p - 0.6) / 0.2, 1)
        ry = THREE.MathUtils.lerp(p * Math.PI * 0.08, 0, tt)
      }
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, ry, 0.05)
    }

    /* ── Laptop idle float ── */
    if (laptopRef.current) {
      laptopRef.current.position.y = -0.3 + Math.sin(t * 1.0) * 0.08
      laptopRef.current.rotation.z = Math.sin(t * 0.7) * 0.015
    }
  })

  return (
    <>
      <Particles />
      <GlowOrbs />

      <group ref={groupRef}>
        <group ref={laptopRef} position={[0, -0.3, 0]}>
          <LaptopModel />
        </group>
        <PhoneModel />
      </group>
    </>
  )
}
