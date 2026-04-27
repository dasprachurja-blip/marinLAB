import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { scrollState } from './scrollState'
import LaptopModel from './LaptopModel'
import PhoneModel from './PhoneModel'
import * as THREE from 'three'

/* ──────────────────────────────────────────────────────
   Scene — Premium Camera‑driven cinematic experience
   ────────────────────────────────────────────────────── */

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
    ref.current.rotation.y = clock.getElapsedTime() * 0.006
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

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function Scene() {
  const laptopGroupRef = useRef()
  const { camera } = useThree()

  /* Premium Camera Composition 
     - Lower Y values for a better "product table" perspective
     - Slow forward push on Z
     - Very subtle orbit on X */
  const CAM = {
    start:  { x: 0,    y: 0.9, z: 4.2 },   // Scene 1 (0%): lower, looking at closed laptop
    open:   { x: 0.05, y: 0.85, z: 4.0 },   // Scene 2 (30%): slight orbit & push in as lid opens
    phone:  { x: 0.15, y: 0.8, z: 3.7 },   // Scene 3 (50%): frame shifts slightly to include phone
    float:  { x: 0.2,  y: 0.75, z: 3.4 },   // Scene 4 (70%): continue orbit & slow push
    zoom:   { x: 0,    y: 0.9, z: 0.2 },   // Scene 7 (100%): direct move to screen center
  }

  useFrame(({ clock }) => {
    const p = scrollState.progress
    const t = clock.getElapsedTime()

    let cx, cy, cz

    if (p <= 0.3) {
      const t2 = easeInOut(p / 0.3)
      cx = THREE.MathUtils.lerp(CAM.start.x, CAM.open.x, t2)
      cy = THREE.MathUtils.lerp(CAM.start.y, CAM.open.y, t2)
      cz = THREE.MathUtils.lerp(CAM.start.z, CAM.open.z, t2)
    } else if (p <= 0.5) {
      const t3 = easeInOut((p - 0.3) / 0.2)
      cx = THREE.MathUtils.lerp(CAM.open.x, CAM.phone.x, t3)
      cy = THREE.MathUtils.lerp(CAM.open.y, CAM.phone.y, t3)
      cz = THREE.MathUtils.lerp(CAM.open.z, CAM.phone.z, t3)
    } else if (p <= 0.7) {
      const t4 = easeInOut((p - 0.5) / 0.2)
      cx = THREE.MathUtils.lerp(CAM.phone.x, CAM.float.x, t4)
      cy = THREE.MathUtils.lerp(CAM.phone.y, CAM.float.y, t4)
      cz = THREE.MathUtils.lerp(CAM.phone.z, CAM.float.z, t4)
    } else {
      const t7 = easeInOut((p - 0.7) / 0.3)
      cx = THREE.MathUtils.lerp(CAM.float.x, CAM.zoom.x, t7)
      cy = THREE.MathUtils.lerp(CAM.float.y, CAM.zoom.y, t7)
      cz = THREE.MathUtils.lerp(CAM.float.z, CAM.zoom.z, t7)
    }

    // Subtle parallax (product-video feel) that fades out during final zoom
    const parallaxFactor = 1 - Math.min(1, Math.max(0, (p - 0.7) / 0.3))
    const parallaxX = Math.sin(t * 0.12) * 0.02 * parallaxFactor
    const parallaxY = Math.cos(t * 0.08) * 0.015 * parallaxFactor

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, cx + parallaxX, 0.08)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, cy + parallaxY, 0.08)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, cz, 0.08)

    // Camera targets slightly right of laptop to frame both laptop and phone perfectly
    let lookTargetX = THREE.MathUtils.lerp(0, 0.3, p <= 0.7 ? p / 0.7 : 1)
    
    // During final zoom, shift gaze exactly to center of laptop screen
    if (p > 0.7) {
      lookTargetX = THREE.MathUtils.lerp(0.3, 0, (p - 0.7) / 0.3) 
    }
    
    const lookY = THREE.MathUtils.lerp(0.2, 0.9, p)
    const lookZ = THREE.MathUtils.lerp(-0.5, -1.0, p)
    
    camera.lookAt(lookTargetX, lookY, lookZ)

    const dbg = document.getElementById('debug-progress')
    if (dbg) dbg.textContent = `scroll: ${(p * 100).toFixed(1)}% | scene: ${p<=0.3?2:p<=0.5?3:p<=0.7?4:7}`
  })

  return (
    <>
      <Particles />
      <GlowOrbs />

      <group ref={laptopGroupRef} position={[0, 0, 0]}>
        <LaptopModel />
      </group>

      <PhoneModel />
    </>
  )
}
