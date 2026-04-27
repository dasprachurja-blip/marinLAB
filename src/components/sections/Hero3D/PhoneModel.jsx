import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { scrollState } from './scrollState'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────
   PhoneModel — Deterministic, stable, premium
   
   SCENE 3: Curved arc entry, settles exactly at [1.2, 0.3, 1.5]
   SCENE 4: Subtle float (max ±5° rotation)
   ───────────────────────────────────────────────────── */

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const DEG = Math.PI / 180

// EXACT settled position
const SETTLE_X = 1.2
const SETTLE_Y = 0.3
const SETTLE_Z = 1.5

// Start position
const START_X = 3.5
const START_Y = 0.5
const START_Z = 2.0

export default function PhoneModel(props) {
  const group = useRef()
  const screenMeshRef = useRef()
  const [texture, setTexture] = useState(null)

  // Premium PBR Materials
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1f1f23'),
    metalness: 0.95,
    roughness: 0.2, // Subtle reflections
  }), [])

  const screenMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#000000'),
    metalness: 0.1,
    roughness: 0.3,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0,
    transparent: true,
  }), [])

  const cameraMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#151518'),
    metalness: 0.95,
    roughness: 0.1,
  }), [])

  /* ── Load texture (responsive mobile version) ── */
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load('/previews/restaurant.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      // Perfect Edge-to-Edge UV mapping for a mobile ratio
      tex.wrapS = THREE.RepeatWrapping
      tex.wrapT = THREE.RepeatWrapping
      // The image is wide (desktop). We want to crop a mobile-sized slice from the center-left.
      tex.repeat.set(0.35, 1.0)
      tex.offset.set(0.32, 0)
      
      // Ensure high quality filtering
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      setTexture(tex)
    })
  }, [])

  const PHONE_W = 0.75, PHONE_H = 1.55, PHONE_D = 0.06
  const SCREEN_W = 0.71, SCREEN_H = 1.51 // Edge-to-edge

  useFrame(({ clock }) => {
    if (!group.current) return
    const p = scrollState.progress
    const t = clock.getElapsedTime()

    let x, y, z, ry, rx

    if (p <= 0.3) {
      x = START_X
      y = START_Y
      z = START_Z
      ry = -15 * DEG
      rx = 0
    } else if (p > 0.3 && p <= 0.5) {
      const easeT3 = easeInOut((p - 0.3) / 0.2)
      const midX = (START_X + SETTLE_X) / 2
      const midY = Math.max(START_Y, SETTLE_Y) + 0.4 
      const midZ = (START_Z + SETTLE_Z) / 2

      const oneMinusT = 1 - easeT3
      x = oneMinusT * oneMinusT * START_X + 2 * oneMinusT * easeT3 * midX + easeT3 * easeT3 * SETTLE_X
      y = oneMinusT * oneMinusT * START_Y + 2 * oneMinusT * easeT3 * midY + easeT3 * easeT3 * SETTLE_Y
      z = oneMinusT * oneMinusT * START_Z + 2 * oneMinusT * easeT3 * midZ + easeT3 * easeT3 * SETTLE_Z

      // Slightly rotated TOWARD camera (-8 deg)
      ry = THREE.MathUtils.lerp(-15 * DEG, -8 * DEG, easeT3)
      rx = THREE.MathUtils.lerp(0, -2 * DEG, easeT3)
    } else if (p > 0.5 && p <= 0.7) {
      x = SETTLE_X
      y = SETTLE_Y
      z = SETTLE_Z
      // Subtle float (±3 degrees max)
      ry = -8 * DEG + Math.sin(t * 0.15 + Math.PI) * (3 * DEG)
      rx = -2 * DEG + Math.sin(t * 0.1 + Math.PI) * (1.5 * DEG)
    } else {
      const t7 = easeInOut(Math.min((p - 0.7) / 0.3, 1))
      x = THREE.MathUtils.lerp(SETTLE_X, 3.0, t7)
      y = THREE.MathUtils.lerp(SETTLE_Y, -2.0, t7)
      z = SETTLE_Z
      ry = THREE.MathUtils.lerp(-8 * DEG, -15 * DEG, t7)
      rx = THREE.MathUtils.lerp(-2 * DEG, -10 * DEG, t7)
    }

    z = Math.max(z, 1.5) // Hard clamp

    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, x, 0.1)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, y, 0.1)
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, z, 0.1)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, ry, 0.1)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, rx, 0.1)

    if (screenMeshRef.current) {
      if (texture && screenMeshRef.current.material.emissiveMap !== texture) {
        screenMeshRef.current.material.emissiveMap = texture
        screenMeshRef.current.material.map = texture
        screenMeshRef.current.material.needsUpdate = true
      }
      
      let emissiveInt = 0
      if (p > 0.45 && p <= 0.55) {
        emissiveInt = ((p - 0.45) / 0.1) * 1.5 // brighter!
      } else if (p > 0.55) {
        emissiveInt = 1.5
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
      <mesh material={frameMat} castShadow receiveShadow>
        <boxGeometry args={[PHONE_W, PHONE_H, PHONE_D]} />
      </mesh>
      {/* Edge-to-edge screen */}
      <mesh ref={screenMeshRef} material={screenMat} position={[0, 0, PHONE_D / 2 + 0.001]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
      </mesh>
      {/* Dynamic island */}
      <mesh position={[0, SCREEN_H / 2 - 0.05, PHONE_D / 2 + 0.002]}>
        <planeGeometry args={[0.26, 0.035]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Camera bump */}
      <mesh material={cameraMat} position={[-0.18, 0.55, -PHONE_D / 2 - 0.015]}>
        <boxGeometry args={[0.22, 0.22, 0.02]} />
      </mesh>
    </group>
  )
}
