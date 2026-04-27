import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { scrollState } from './scrollState'
import * as THREE from 'three'

/* ─────────────────────────────────────────────
   Phone — Pure Three.js geometry. NO drei hooks.
   ───────────────────────────────────────────── */

export default function PhoneModel(props) {
  const group = useRef()

  const wireframeMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#2B82AD'),
    wireframe: true,
    transparent: true,
    opacity: 0.6,
  }), [])

  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1a1a1e'),
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0,
  }), [])

  const screenMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0a0a0f'),
    metalness: 0.2,
    roughness: 0.8,
    transparent: true,
    opacity: 0,
    emissive: new THREE.Color('#48D9B4'),
    emissiveIntensity: 0,
  }), [])

  const notchMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#000000'),
    transparent: true,
    opacity: 0,
  }), [])

  const cameraMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#222228'),
    metalness: 0.95,
    roughness: 0.05,
    transparent: true,
    opacity: 0,
  }), [])

  const PHONE_W = 0.75, PHONE_H = 1.55, PHONE_D = 0.08
  const SCREEN_W = 0.65, SCREEN_H = 1.35

  useFrame(({ clock }) => {
    const p = scrollState.progress
    const t_elapsed = clock.getElapsedTime()

    /* Slide in (0.18 → 0.38) */
    let tx = 4.5, ty = -3.5
    if (p > 0.18) {
      const t = Math.min((p - 0.18) / 0.2, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      tx = THREE.MathUtils.lerp(4.5, 2.0, ease)
      ty = THREE.MathUtils.lerp(-3.5, -0.25, ease)
    }

    /* Exit during zoom (0.58 → 0.75) */
    if (p > 0.58) {
      const zt = Math.min((p - 0.58) / 0.15, 1)
      ty = THREE.MathUtils.lerp(-0.25, -6, zt)
      tx = THREE.MathUtils.lerp(2.0, 5, zt)
    }

    if (group.current) {
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, tx, 0.05)
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, ty, 0.05)
      // Gentle idle float
      group.current.position.y += Math.sin(t_elapsed * 1.8) * 0.03
      group.current.rotation.y = -0.3 + p * 0.4
      group.current.rotation.z = 0.08 + Math.sin(t_elapsed * 1.2) * 0.02
    }

    /* Wireframe → Solid (0.22 → 0.42) */
    let wfOp = 1, solOp = 0
    if (p > 0.22 && p <= 0.42) {
      const t = (p - 0.22) / 0.2
      wfOp = 1 - t
      solOp = t
    } else if (p > 0.42) {
      wfOp = 0
      solOp = 1
    }

    wireframeMat.opacity = wfOp * 0.5
    frameMat.opacity = solOp
    screenMat.opacity = solOp
    notchMat.opacity = solOp
    cameraMat.opacity = solOp

    // Screen glow when solid
    screenMat.emissiveIntensity = solOp * 0.05
  })

  return (
    <group ref={group} {...props}>
      {/* WIREFRAME */}
      <mesh material={wireframeMat}>
        <boxGeometry args={[PHONE_W, PHONE_H, PHONE_D]} />
      </mesh>

      {/* SOLID */}
      <group>
        <mesh material={frameMat} castShadow receiveShadow>
          <boxGeometry args={[PHONE_W, PHONE_H, PHONE_D]} />
        </mesh>
        <mesh material={screenMat} position={[0, 0, PHONE_D / 2 + 0.001]}>
          <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        </mesh>
        <mesh material={notchMat} position={[0, SCREEN_H / 2 - 0.06, PHONE_D / 2 + 0.002]}>
          <planeGeometry args={[0.3, 0.04]} />
        </mesh>
        <mesh material={cameraMat} position={[-0.18, 0.55, -PHONE_D / 2 - 0.015]}>
          <boxGeometry args={[0.22, 0.22, 0.03]} />
        </mesh>
        {[[-0.22, 0.59], [-0.14, 0.59], [-0.18, 0.51]].map(([x, y], i) => (
          <mesh key={i} material={cameraMat} position={[x, y, -PHONE_D / 2 - 0.032]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.005, 16]} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
