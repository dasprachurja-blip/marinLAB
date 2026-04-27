import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────
   ProcessPhone — Premium 3D iPhone
   
   - Static Camera
   - Phone rotates based on `processScrollState.progress` (0 to 1)
   - Smoothly crossfades between 3 screen textures
   - Alternates looking at the left/right text steps
   ───────────────────────────────────────────────────── */

export const processScrollState = { progress: 0 }

const DEG = Math.PI / 180

function easeOutBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function easeInBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return c3 * x * x * x - c1 * x * x;
}

export default function ProcessPhone(props) {
  const group = useRef()
  const screen0Ref = useRef()
  const screen1Ref = useRef()
  const screen2Ref = useRef()

  const [tex0, setTex0] = useState(null)
  const [tex1, setTex1] = useState(null)
  const [tex2, setTex2] = useState(null)

  // iPhone Pro Titanium-style Material
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1f1f23'),
    metalness: 0.8,
    roughness: 0.25,
  }), [])

  const cameraMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#151518'),
    metalness: 0.9,
    roughness: 0.1,
  }), [])

  const createScreenMat = () => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#000000'),
    metalness: 0.1,
    roughness: 0.2,
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

  const PHONE_W = 0.9, PHONE_H = 1.86, PHONE_D = 0.08
  const SCREEN_W = 0.85, SCREEN_H = 1.8 

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    const p = processScrollState.progress // 0 to 1 mapped to top center -> bottom center

    /* ── 1. Scale / Bounce Logic ── */
    // Enter animation (0 to 0.1)
    // Exit animation (0.9 to 1.0)
    let currentScale = 0
    if (p <= 0.1) {
      currentScale = easeOutBack(p / 0.1)
    } else if (p >= 0.9) {
      currentScale = 1 - easeInBack((p - 0.9) / 0.1)
    } else {
      currentScale = 1
    }
    
    // Base scale is 1.2 for the 30% increase request
    const targetScale = currentScale * 1.2
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.15))

    /* ── 2. Rotation Logic ── */
    // Step 0 text (left): look slightly left (+15 deg)
    // Step 1 text (right): look slightly right (-15 deg)
    // Step 2 text (left): look slightly left (+15 deg)
    
    // We map p from 0.1 to 0.9 into 3 distinct zones, but since we scrub, we can just use a sine wave or explicit lerps.
    let targetRy = 0
    if (p < 0.3) {
      targetRy = 15 * DEG // Look left for Step 1
    } else if (p >= 0.3 && p < 0.6) {
      targetRy = -15 * DEG // Look right for Step 2
    } else if (p >= 0.6) {
      targetRy = 15 * DEG // Look left for Step 3
    }
    
    const floatRx = Math.sin(t * 0.5) * (3 * DEG)
    
    // We use a slow lerp for the Y rotation so it turns beautifully
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRy, 0.03)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, floatRx, 0.05)
    group.current.position.y = Math.sin(t * 0.8) * 0.04 

    /* ── 3. Screen Crossfade Logic ── */
    let op0 = 0, op1 = 0, op2 = 0

    if (p < 0.3) {
      op0 = 1
    } else if (p < 0.6) {
      const fade = THREE.MathUtils.clamp((p - 0.3) / 0.15, 0, 1)
      op0 = 1 - fade
      op1 = fade
    } else {
      const fade = THREE.MathUtils.clamp((p - 0.6) / 0.15, 0, 1)
      op1 = 1 - fade
      op2 = fade
    }

    screen0Mat.opacity = THREE.MathUtils.lerp(screen0Mat.opacity, op0, 0.1)
    screen0Mat.emissiveIntensity = screen0Mat.opacity * 1.2
    
    screen1Mat.opacity = THREE.MathUtils.lerp(screen1Mat.opacity, op1, 0.1)
    screen1Mat.emissiveIntensity = screen1Mat.opacity * 1.2
    
    screen2Mat.opacity = THREE.MathUtils.lerp(screen2Mat.opacity, op2, 0.1)
    screen2Mat.emissiveIntensity = screen2Mat.opacity * 1.2
  })

  return (
    <group ref={group} {...props}>
      {/* ═══ IPHONE BODY ═══ */}
      <RoundedBox args={[PHONE_W, PHONE_H, PHONE_D]} radius={0.12} smoothness={8} material={frameMat} castShadow receiveShadow position={[0, 0, 0]} />
      
      {/* Screen Base (Black Bezel area) */}
      <RoundedBox args={[PHONE_W - 0.01, PHONE_H - 0.01, 0.01]} radius={0.11} smoothness={8} position={[0, 0, PHONE_D / 2]} material={cameraMat} />

      {/* 3 stacked screens for crossfading */}
      <mesh ref={screen0Ref} material={screen0Mat} position={[0, 0, PHONE_D / 2 + 0.006]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
      </mesh>
      <mesh ref={screen1Ref} material={screen1Mat} position={[0, 0, PHONE_D / 2 + 0.007]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
      </mesh>
      <mesh ref={screen2Ref} material={screen2Mat} position={[0, 0, PHONE_D / 2 + 0.008]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
      </mesh>

      {/* Dynamic island */}
      <RoundedBox args={[0.26, 0.05, 0.01]} radius={0.025} smoothness={4} material={new THREE.MeshBasicMaterial({ color: '#000000' })} position={[0, SCREEN_H / 2 - 0.08, PHONE_D / 2 + 0.01]} />
      
      {/* Camera bump (Back) */}
      <RoundedBox args={[0.3, 0.3, 0.02]} radius={0.06} smoothness={6} material={cameraMat} position={[-0.22, 0.65, -PHONE_D / 2 - 0.01]} castShadow />
      {/* Lenses */}
      <mesh position={[-0.28, 0.72, -PHONE_D / 2 - 0.022]} material={new THREE.MeshStandardMaterial({ color: '#0a0a0a' })}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
      </mesh>
      <mesh position={[-0.28, 0.58, -PHONE_D / 2 - 0.022]} material={new THREE.MeshStandardMaterial({ color: '#0a0a0a' })}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
      </mesh>
      <mesh position={[-0.14, 0.65, -PHONE_D / 2 - 0.022]} material={new THREE.MeshStandardMaterial({ color: '#0a0a0a' })}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
      </mesh>
    </group>
  )
}
