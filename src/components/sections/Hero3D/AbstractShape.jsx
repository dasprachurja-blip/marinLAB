import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Icosahedron } from '@react-three/drei'
import * as THREE from 'three'
import { scrollState } from './scrollState'

/* ─────────────────────────────────────────────────────
   AbstractShape — High-end Abstract 3D Art
   Replaces the Laptop for a more premium, editorial vibe.
   ───────────────────────────────────────────────────── */

export default function AbstractShape(props) {
  const mesh = useRef()

  // Premium Dark Obsidian/Glass Material
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0a0a0c'),
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    transmission: 0.5, // Subtle glass effect
    ior: 1.5,
    thickness: 2.0,
    envMapIntensity: 2.0,
    wireframe: false
  }), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const p = scrollState.progress // 0 to 1

    if (mesh.current) {
      // 1. Rotation: slow base rotation, accelerates heavily on scroll
      mesh.current.rotation.x = t * 0.15 + (p * Math.PI * 1.5)
      mesh.current.rotation.y = t * 0.2 + (p * Math.PI * 2)

      // 2. Position: subtle floating, but moves drastically forward on scroll to "pass" the user
      const baseY = Math.sin(t * 0.5) * 0.1
      mesh.current.position.y = baseY
      
      // As user scrolls, the shape zooms past the camera (Z increases)
      mesh.current.position.z = THREE.MathUtils.lerp(0, 8, p)
      
      // Also scale it up as they scroll
      const scale = THREE.MathUtils.lerp(1, 2, p)
      mesh.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group {...props}>
      {/* A beautiful, slightly faceted shape (Icosahedron with detail 2) */}
      <Icosahedron ref={mesh} args={[1.2, 2]}>
        <primitive object={material} attach="material" />
      </Icosahedron>
      
      {/* Inner glowing core for tech aesthetic */}
      <Icosahedron args={[0.6, 1]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#48D9B4" wireframe transparent opacity={0.3} />
      </Icosahedron>
    </group>
  )
}
