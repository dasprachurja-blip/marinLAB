import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { scrollState } from './scrollState'
import LaptopModel from './LaptopModel'
import PhoneModel from './PhoneModel'
import * as THREE from 'three'

/* ──────────────────────────────────────────────────────
   Scene — Camera‑driven cinematic experience
   
   GLOBAL: Camera drives the experience, not the objects
   NO Math.random — deterministic golden‑angle particles
   All motion tied to scrollState.progress (0 → 1)
   ────────────────────────────────────────────────────── */

/* Deterministic particle field — golden angle distribution */
function Particles() {
  const ref = useRef()
  const count = 160
  const PHI = (1 + Math.sqrt(5)) / 2

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * i / PHI
      const r = 3 + (i / count) * 12
      const y = ((i / count) * 2 - 1) * 8
      pos[i * 3]     = Math.cos(theta) * r
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = Math.sin(theta) * r
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    // Very subtle predictable rotation
    ref.current.rotation.y = t * 0.006
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#48D9B4"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* Soft ambient glow orbs — deterministic positions */
function GlowOrbs() {
  const ref = useRef()
  const orbs = useMemo(() => [
    { x: -5, y: 3, z: -8, color: '#48D9B4', scale: 2.0 },
    { x: 6, y: -2, z: -10, color: '#2B82AD', scale: 2.5 },
    { x: 0, y: 4, z: -12, color: '#1a5276', scale: 3.0 },
  ], [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.children.forEach((child, i) => {
      // Deterministic sine motion
      child.position.y = orbs[i].y + Math.sin(t * 0.15 + i * 2.1) * 0.4
      child.position.x = orbs[i].x + Math.cos(t * 0.1 + i * 1.7) * 0.3
    })
  })

  return (
    <group ref={ref}>
      {orbs.map((o, i) => (
        <mesh key={i} position={[o.x, o.y, o.z]} scale={o.scale}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color={o.color} transparent opacity={0.04} />
        </mesh>
      ))}
    </group>
  )
}

/* Smooth easing function */
function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function Scene() {
  const laptopGroupRef = useRef()
  const { camera } = useThree()

  /* Camera keyframes — strict product‑film feel */
  const CAM = {
    start:  { x: 0,    y: 1.2, z: 4.0 },   // Scene 1 (0%): slightly above and in front
    open:   { x: 0,    y: 1.1, z: 3.8 },   // Scene 2 (30%): slight forward as lid opens
    phone:  { x: 0.1,  y: 1.0, z: 3.5 },   // Scene 3 (50%): slight orbit as phone enters
    float:  { x: 0.15, y: 0.9, z: 3.2 },   // Scene 4 (70%): continue orbit
    zoom:   { x: 0,    y: 0.9, z: 0.2 },   // Scene 7 (100%): direct move to screen (laptop screen is at z=0 approx)
  }

  useFrame(({ clock }) => {
    const p = scrollState.progress
    const t = clock.getElapsedTime()

    /* ══════════════════════════════════════════
       SCENE 6 & 7: Camera‑driven cinema
       ══════════════════════════════════════════ */
    let cx, cy, cz

    if (p <= 0.3) {
      // SCENE 1 → 2: Start → open
      const t2 = easeInOut(p / 0.3)
      cx = THREE.MathUtils.lerp(CAM.start.x, CAM.open.x, t2)
      cy = THREE.MathUtils.lerp(CAM.start.y, CAM.open.y, t2)
      cz = THREE.MathUtils.lerp(CAM.start.z, CAM.open.z, t2)
    } else if (p <= 0.5) {
      // SCENE 3: Phone entry
      const t3 = easeInOut((p - 0.3) / 0.2)
      cx = THREE.MathUtils.lerp(CAM.open.x, CAM.phone.x, t3)
      cy = THREE.MathUtils.lerp(CAM.open.y, CAM.phone.y, t3)
      cz = THREE.MathUtils.lerp(CAM.open.z, CAM.phone.z, t3)
    } else if (p <= 0.7) {
      // SCENE 4: Floating + subtle parallax
      const t4 = easeInOut((p - 0.5) / 0.2)
      cx = THREE.MathUtils.lerp(CAM.phone.x, CAM.float.x, t4)
      cy = THREE.MathUtils.lerp(CAM.phone.y, CAM.float.y, t4)
      cz = THREE.MathUtils.lerp(CAM.phone.z, CAM.float.z, t4)
    } else {
      // SCENE 7: Zoom directly into screen
      const t7 = easeInOut((p - 0.7) / 0.3)
      cx = THREE.MathUtils.lerp(CAM.float.x, CAM.zoom.x, t7)
      cy = THREE.MathUtils.lerp(CAM.float.y, CAM.zoom.y, t7)
      cz = THREE.MathUtils.lerp(CAM.float.z, CAM.zoom.z, t7)
    }

    // Add very subtle sine parallax on top (product‑video feel)
    // Decreases as we zoom in so it doesn't wobble at the end
    const parallaxFactor = 1 - Math.min(1, Math.max(0, (p - 0.7) / 0.3))
    const parallaxX = Math.sin(t * 0.12) * 0.02 * parallaxFactor
    const parallaxY = Math.cos(t * 0.08) * 0.015 * parallaxFactor

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, cx + parallaxX, 0.08)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, cy + parallaxY, 0.08)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, cz, 0.08)

    // Camera look target shifts slightly as we scroll, but stays centered for the zoom
    let lookTargetX = THREE.MathUtils.lerp(0, -0.05, p <= 0.7 ? p / 0.7 : 1)
    if (p > 0.7) {
      lookTargetX = THREE.MathUtils.lerp(-0.05, 0, (p - 0.7) / 0.3) // Center up for zoom
    }
    
    // Look exactly at the screen center for the final zoom
    // Laptop base is at origin (0,0,0). Screen is open. 
    // The screen center is approx at y=1.0, z=-1.1.
    const lookY = THREE.MathUtils.lerp(0.3, 0.9, p)
    const lookZ = THREE.MathUtils.lerp(-0.5, -1.0, p)
    
    camera.lookAt(lookTargetX, lookY, lookZ)

    // Debug output
    const dbg = document.getElementById('debug-progress')
    if (dbg) dbg.textContent = `scroll: ${(p * 100).toFixed(1)}% | scene: ${p<=0.3?2:p<=0.5?3:p<=0.7?4:7}`
  })

  return (
    <>
      <Particles />
      <GlowOrbs />

      {/* SCENE 1: Laptop — strictly centered at world origin */}
      <group ref={laptopGroupRef} position={[0, 0, 0]}>
        <LaptopModel />
      </group>

      {/* Phone — manages its own position deterministically */}
      <PhoneModel />
    </>
  )
}
