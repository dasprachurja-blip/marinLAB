import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { scrollState } from './scrollState'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────
   Laptop — Pure Three.js geometry. NO drei hooks.
   Textures loaded manually via TextureLoader (non-suspending).
   ───────────────────────────────────────────────────── */

export default function LaptopModel(props) {
  const group = useRef()
  const screenRef = useRef()
  const screenGlowRef = useRef()
  const [textures, setTextures] = useState([null, null, null])

  /* ── Materials ── */
  const wireframeMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#48D9B4'),
    wireframe: true,
    transparent: true,
    opacity: 0.6,
  }), [])

  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2a2a2e'),
    metalness: 0.85,
    roughness: 0.15,
    transparent: true,
    opacity: 0,
  }), [])

  const bezelMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#111114'),
    metalness: 0.5,
    roughness: 0.4,
    transparent: true,
    opacity: 0,
  }), [])

  const keyboardMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1a1a1d'),
    metalness: 0.3,
    roughness: 0.6,
    transparent: true,
    opacity: 0,
  }), [])

  const screenMat = useMemo(() => new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    toneMapped: false,
    color: new THREE.Color('#48D9B4'),
  }), [])

  /* ── Load textures manually (non-suspending) ── */
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    const paths = ['/previews/restaurant.png', '/previews/clinic.png', '/previews/shop.png']
    const loaded = [null, null, null]
    let cancelled = false

    paths.forEach((path, i) => {
      loader.load(
        path,
        (tex) => {
          if (cancelled) return
          tex.colorSpace = THREE.SRGBColorSpace
          loaded[i] = tex
          setTextures([...loaded])
        },
        undefined,
        (err) => console.warn('Texture load failed:', path, err)
      )
    })

    return () => { cancelled = true }
  }, [])

  /* ── Per-frame animation ── */
  useFrame(() => {
    const p = scrollState.progress

    /* Wireframe → Solid (0.08 → 0.28) */
    let wfOp = 1, solOp = 0
    if (p > 0.08 && p <= 0.28) {
      const t = (p - 0.08) / 0.2
      wfOp = 1 - t
      solOp = t
    } else if (p > 0.28) {
      wfOp = 0
      solOp = 1
    }

    wireframeMat.opacity = wfOp * 0.6
    bodyMat.opacity = solOp
    bezelMat.opacity = solOp
    keyboardMat.opacity = solOp

    /* Screen on + texture cycle (0.3 → 0.65) */
    if (screenRef.current) {
      const [tR, tC, tS] = textures
      let tex = tR
      if (p > 0.42 && p <= 0.54) tex = tC || tR
      else if (p > 0.54) tex = tS || tR

      if (tex) {
        screenRef.current.material.map = tex
        screenRef.current.material.color = new THREE.Color('#ffffff')
      }

      let sOp = 0
      if (p > 0.3 && p <= 0.38) sOp = (p - 0.3) / 0.08
      else if (p > 0.38) sOp = 1
      screenRef.current.material.opacity = sOp * solOp
      screenRef.current.material.needsUpdate = true
    }

    /* Screen glow */
    if (screenGlowRef.current) {
      let glow = 0
      if (p > 0.32) glow = Math.min((p - 0.32) / 0.1, 0.2) * solOp
      screenGlowRef.current.material.opacity = glow
    }

    /* Rotation — settle flat for zoom */
    if (group.current) {
      let rx = 0.12, ry = -0.12
      if (p > 0.6) {
        const t = Math.min((p - 0.6) / 0.15, 1)
        rx = THREE.MathUtils.lerp(0.12, 0, t)
        ry = THREE.MathUtils.lerp(-0.12, 0, t)
      }
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, rx, 0.06)
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, ry, 0.06)
    }
  })

  /* ── Geometry constants ── */
  const BASE_W = 3.4, BASE_D = 2.2, BASE_H = 0.08
  const LID_W = 3.2, LID_H = 2.1, LID_D = 0.06
  const SCREEN_W = 2.9, SCREEN_H = 1.8
  const HINGE_Y = BASE_H / 2
  const LID_ANGLE = -Math.PI * 0.38

  return (
    <group ref={group} {...props}>
      {/* ═══ WIREFRAME LAYER ═══ */}
      <group>
        <mesh material={wireframeMat} position={[0, 0, 0]}>
          <boxGeometry args={[BASE_W, BASE_H, BASE_D]} />
        </mesh>
        <group position={[0, HINGE_Y, -BASE_D / 2]}>
          <mesh material={wireframeMat} position={[0, LID_H / 2, 0]} rotation={[LID_ANGLE, 0, 0]}>
            <boxGeometry args={[LID_W, LID_H, LID_D]} />
          </mesh>
        </group>
      </group>

      {/* ═══ SOLID LAYER ═══ */}
      <group>
        <mesh material={bodyMat} position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[BASE_W, BASE_H, BASE_D]} />
        </mesh>
        <mesh material={keyboardMat} position={[0, BASE_H / 2 + 0.001, 0.15]}>
          <boxGeometry args={[2.8, 0.005, 1.4]} />
        </mesh>
        <mesh material={bezelMat} position={[0, BASE_H / 2 + 0.001, 0.75]}>
          <boxGeometry args={[1.2, 0.005, 0.6]} />
        </mesh>

        {/* Lid group (hinged) */}
        <group position={[0, HINGE_Y, -BASE_D / 2]}>
          <group rotation={[LID_ANGLE, 0, 0]}>
            <mesh material={bodyMat} position={[0, LID_H / 2, 0]} castShadow>
              <boxGeometry args={[LID_W, LID_H, LID_D]} />
            </mesh>
            <mesh material={bezelMat} position={[0, LID_H / 2, LID_D / 2 + 0.002]}>
              <boxGeometry args={[SCREEN_W + 0.15, SCREEN_H + 0.1, 0.005]} />
            </mesh>
            <mesh ref={screenRef} material={screenMat} position={[0, LID_H / 2, LID_D / 2 + 0.005]}>
              <planeGeometry args={[SCREEN_W, SCREEN_H]} />
            </mesh>
            <mesh ref={screenGlowRef} position={[0, LID_H / 2, LID_D / 2 - 0.01]}>
              <planeGeometry args={[SCREEN_W + 0.5, SCREEN_H + 0.5]} />
              <meshBasicMaterial transparent opacity={0} color="#48D9B4" />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}
