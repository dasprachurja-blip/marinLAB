import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────
   ProcessPhone — 3D Sticky Phone for "The Process"
   
   - Static Camera
   - Phone rotates based on `processScrollState.progress` (0 to 1)
   - Smoothly crossfades between 3 screen textures
   ───────────────────────────────────────────────────── */

export const processScrollState = { progress: 0 }

const DEG = Math.PI / 180

export default function ProcessPhone(props) {
  const group = useRef()
  const screen0Ref = useRef()
  const screen1Ref = useRef()
  const screen2Ref = useRef()

  const [tex0, setTex0] = useState(null)
  const [tex1, setTex1] = useState(null)
  const [tex2, setTex2] = useState(null)

  // Premium PBR Materials (same as Hero)
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1f1f23'),
    metalness: 0.95,
    roughness: 0.2,
  }), [])

  const cameraMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#151518'),
    metalness: 0.95,
    roughness: 0.1,
  }), [])

  const createScreenMat = () => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#000000'),
    metalness: 0.1,
    roughness: 0.3,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0,
    transparent: true,
    opacity: 0,
  })

  const screen0Mat = useMemo(createScreenMat, [])
  const screen1Mat = useMemo(createScreenMat, [])
  const screen2Mat = useMemo(createScreenMat, [])

  // Load textures
  useEffect(() => {
    const loader = new THREE.TextureLoader()

    const setupTexture = (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.wrapS = THREE.RepeatWrapping
      tex.wrapT = THREE.RepeatWrapping
      tex.repeat.set(0.35, 1.0)
      tex.offset.set(0.32, 0)
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      return tex
    }

    loader.load('/previews/clinic.png', (t) => setTex0(setupTexture(t)))
    loader.load('/previews/shop.png', (t) => setTex1(setupTexture(t)))
    loader.load('/previews/restaurant.png', (t) => setTex2(setupTexture(t)))
  }, [])

  // Apply textures
  useEffect(() => {
    if (tex0) { screen0Mat.map = tex0; screen0Mat.emissiveMap = tex0; screen0Mat.needsUpdate = true }
    if (tex1) { screen1Mat.map = tex1; screen1Mat.emissiveMap = tex1; screen1Mat.needsUpdate = true }
    if (tex2) { screen2Mat.map = tex2; screen2Mat.emissiveMap = tex2; screen2Mat.needsUpdate = true }
  }, [tex0, tex1, tex2, screen0Mat, screen1Mat, screen2Mat])

  const PHONE_W = 0.75, PHONE_H = 1.55, PHONE_D = 0.06
  const SCREEN_W = 0.71, SCREEN_H = 1.51 

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    const p = processScrollState.progress

    /* ── 1. Rotation Logic ── */
    // p goes from 0 to 1 across the whole section
    // 0.0 -> Discovery (slight left: +15 deg)
    // 0.5 -> Design (center: 0 deg)
    // 1.0 -> Execution (slight right: -15 deg)
    const targetRy = THREE.MathUtils.lerp(15 * DEG, -15 * DEG, p)
    
    // Subtle float on X axis to make it feel alive, but extremely premium
    const floatRx = Math.sin(t * 0.5) * (2 * DEG)

    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRy, 0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, floatRx, 0.05)
    group.current.position.y = Math.sin(t * 0.8) * 0.02 // Tiny breathing motion

    /* ── 2. Screen Crossfade Logic ── */
    // Map p (0 -> 1) into 3 segments:
    // Step 0: 0.0 to 0.33
    // Step 1: 0.33 to 0.66
    // Step 2: 0.66 to 1.0
    let op0 = 0, op1 = 0, op2 = 0

    if (p < 0.33) {
      op0 = 1
    } else if (p < 0.66) {
      // Crossfade 0 -> 1 over the 0.33-0.45 range
      const fade = THREE.MathUtils.clamp((p - 0.33) / 0.12, 0, 1)
      op0 = 1 - fade
      op1 = fade
    } else {
      // Crossfade 1 -> 2 over the 0.66-0.78 range
      const fade = THREE.MathUtils.clamp((p - 0.66) / 0.12, 0, 1)
      op1 = 1 - fade
      op2 = fade
    }

    // Apply opacities
    screen0Mat.opacity = THREE.MathUtils.lerp(screen0Mat.opacity, op0, 0.1)
    screen0Mat.emissiveIntensity = screen0Mat.opacity * 1.2
    
    screen1Mat.opacity = THREE.MathUtils.lerp(screen1Mat.opacity, op1, 0.1)
    screen1Mat.emissiveIntensity = screen1Mat.opacity * 1.2
    
    screen2Mat.opacity = THREE.MathUtils.lerp(screen2Mat.opacity, op2, 0.1)
    screen2Mat.emissiveIntensity = screen2Mat.opacity * 1.2
  })

  return (
    <group ref={group} {...props}>
      <mesh material={frameMat} castShadow receiveShadow>
        <boxGeometry args={[PHONE_W, PHONE_H, PHONE_D]} />
      </mesh>
      
      {/* 3 stacked screens for crossfading */}
      <mesh ref={screen0Ref} material={screen0Mat} position={[0, 0, PHONE_D / 2 + 0.001]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
      </mesh>
      <mesh ref={screen1Ref} material={screen1Mat} position={[0, 0, PHONE_D / 2 + 0.0015]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
      </mesh>
      <mesh ref={screen2Ref} material={screen2Mat} position={[0, 0, PHONE_D / 2 + 0.002]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
      </mesh>

      {/* Dynamic island */}
      <mesh position={[0, SCREEN_H / 2 - 0.05, PHONE_D / 2 + 0.003]}>
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
