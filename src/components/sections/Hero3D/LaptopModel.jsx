import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { scrollState } from './scrollState'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────
   LaptopModel — Cinematic MacBook with hinge‑pivot lid
   
   SCENE 1 (p=0):      Lid CLOSED (rotX = 0)
   SCENE 2 (p 0→0.3):  Lid OPENS to −1.9 rad (~110°)
   SCENE 4 (p 0.5→0.7): Subtle sine float (applied here)
   SCENE 5 (p ≥0.5):   Screen emissive + texture fade‑in
   
   NO Math.random. Base NEVER moves.
   ───────────────────────────────────────────────────── */

// Smooth easing
function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function LaptopModel(props) {
  const group = useRef()
  const lidPivotRef = useRef()
  const screenMeshRef = useRef()
  const screenGlowRef = useRef()
  const [texture, setTexture] = useState(null)

  /* ── Materials (created once) ── */
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2a2a2e'),
    metalness: 0.88,
    roughness: 0.12,
  }), [])

  const bezelMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#111114'),
    metalness: 0.5,
    roughness: 0.35,
  }), [])

  const keyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1a1a1d'),
    metalness: 0.3,
    roughness: 0.6,
  }), [])

  const screenMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#000000'),
    metalness: 0.1,
    roughness: 0.2,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0,
    transparent: true,
  }), [])

  const screenGlowMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#48D9B4'),
    transparent: true,
    opacity: 0,
    side: THREE.BackSide,
  }), [])

  /* ── Load texture (desktop version) ── */
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    // Using one main desktop mockup to match phone
    loader.load('/previews/restaurant.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      setTexture(tex)
    })
  }, [])

  /* ── Per‑frame animation ── */
  useFrame(({ clock }) => {
    const p = scrollState.progress
    const t = clock.getElapsedTime()

    /* ── SCENE 2: Lid open (0 → 0.3) ── */
    if (lidPivotRef.current) {
      let targetRotX = 0 // closed
      if (p > 0 && p <= 0.3) {
        const openT = easeInOut(p / 0.3)
        targetRotX = -1.9 * openT
      } else if (p > 0.3) {
        targetRotX = -1.9
      }
      // Smooth interpolation for the hinge
      lidPivotRef.current.rotation.x = THREE.MathUtils.lerp(
        lidPivotRef.current.rotation.x, targetRotX, 0.1
      )
    }

    /* ── SCENE 4: Subtle float (0.5 → 0.7) ── */
    if (group.current) {
      let lry = 0, lrx = 0
      if (p >= 0.5 && p <= 0.7) {
        lry = Math.sin(t * 0.3) * 0.08
        lrx = Math.sin(t * 0.2) * 0.03
      }
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, lry, 0.05)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, lrx, 0.05)
    }

    /* ── SCENE 5: Screen activation (≥ 0.5) ── */
    if (screenMeshRef.current) {
      if (texture && screenMeshRef.current.material.emissiveMap !== texture) {
        screenMeshRef.current.material.emissiveMap = texture
        screenMeshRef.current.material.map = texture
        screenMeshRef.current.material.needsUpdate = true
      }

      // Fade in emissive intensity
      let emissiveInt = 0
      if (p >= 0.45 && p < 0.55) {
        emissiveInt = (p - 0.45) / 0.1 // 0→1 over 0.45→0.55
      } else if (p >= 0.55) {
        emissiveInt = 1.0
      }
      screenMeshRef.current.material.emissiveIntensity = emissiveInt
    }

    // Screen glow affects nearby surfaces softly
    if (screenGlowRef.current) {
      let glow = 0
      if (p >= 0.45 && p < 0.55) {
        glow = ((p - 0.45) / 0.1) * 0.15
      } else if (p >= 0.55) {
        glow = 0.15
      }
      screenGlowRef.current.material.opacity = glow
    }
  })

  /* ── Geometry constants ── */
  const BASE_W = 3.4, BASE_D = 2.2, BASE_H = 0.08
  const LID_W = 3.2, LID_H = 2.1, LID_D = 0.06
  const SCREEN_W = 2.9, SCREEN_H = 1.8

  return (
    <group ref={group} {...props}>
      {/* ═══ BASE — Static, never moves ═══ */}
      <mesh material={bodyMat} castShadow receiveShadow>
        <boxGeometry args={[BASE_W, BASE_H, BASE_D]} />
      </mesh>

      {/* Keyboard */}
      <mesh material={keyMat} position={[0, BASE_H / 2 + 0.001, 0.15]}>
        <boxGeometry args={[2.8, 0.005, 1.4]} />
      </mesh>

      {/* Trackpad */}
      <mesh material={bezelMat} position={[0, BASE_H / 2 + 0.001, 0.75]}>
        <boxGeometry args={[1.2, 0.005, 0.6]} />
      </mesh>

      {/* ═══ LID — Hinged at rear edge ═══ */}
      {/* Pivot point at the back-top edge of the base */}
      <group position={[0, BASE_H / 2, -BASE_D / 2]}>
        {/* This group gets rotated: 0 = closed, -1.9 = open */}
        <group ref={lidPivotRef} rotation={[0, 0, 0]}>
          {/* Lid body */}
          <mesh material={bodyMat} position={[0, LID_D / 2, LID_H / 2]} castShadow>
            <boxGeometry args={[LID_W, LID_D, LID_H]} />
          </mesh>

          {/* Bezel frame around screen */}
          <mesh material={bezelMat} position={[0, LID_D + 0.001, LID_H / 2]}>
            <boxGeometry args={[SCREEN_W + 0.15, 0.005, SCREEN_H + 0.1]} />
          </mesh>

          {/* Screen */}
          <mesh
            ref={screenMeshRef}
            material={screenMat}
            position={[0, LID_D + 0.003, LID_H / 2]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[SCREEN_W, SCREEN_H]} />
          </mesh>

          {/* Screen glow */}
          <mesh
            ref={screenGlowRef}
            material={screenGlowMat}
            position={[0, LID_D - 0.01, LID_H / 2]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[SCREEN_W + 0.6, SCREEN_H + 0.5]} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
