import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { scrollState } from './scrollState'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────
   LaptopModel — GLTF MacBook
   ───────────────────────────────────────────────────── */

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function LaptopModel(props) {
  const group = useRef()
  const [texture, setTexture] = useState(null)

  // Fetch the free open-source MacBook model
  const { scene } = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/macbook/model.gltf')

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load('/previews/restaurant.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      // Many GLTF laptops need a flipped texture
      tex.flipY = false 
      setTexture(tex)
    })
  }, [])

  useFrame(({ clock }) => {
    const p = scrollState.progress
    const t = clock.getElapsedTime()

    if (group.current) {
      // 1. Laptop entry animation (simulating opening by rotating the whole laptop up)
      let targetRotX = 0
      if (p > 0 && p <= 0.3) {
        targetRotX = Math.PI / 2 * (1 - easeInOut(p / 0.3)) // Starts flat, rises up
      } else if (p > 0.3) {
        targetRotX = 0
      } else {
        targetRotX = Math.PI / 2
      }
      
      // Add subtle floating
      let lry = 0, lrx = targetRotX
      if (p >= 0.5 && p <= 0.7) {
        lry = Math.sin(t * 0.3) * 0.05 
        lrx += Math.sin(t * 0.2) * 0.02 
      }
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, lry, 0.05)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, lrx, 0.05)

      // 2. Apply texture and emissive intensity to the screen node dynamically
      scene.traverse((child) => {
        // Most models name the screen "Object_7" or have a material named "screen"
        if (child.isMesh && child.material) {
          const matName = child.material.name.toLowerCase()
          const meshName = child.name.toLowerCase()
          
          if (matName.includes('screen') || meshName.includes('screen') || meshName === 'object_7') {
            if (texture && child.material.emissiveMap !== texture) {
              child.material.map = texture
              child.material.emissiveMap = texture
              child.material.emissive = new THREE.Color('#ffffff')
              child.material.needsUpdate = true
            }

            // Screen glow intensity based on scroll
            let emissiveInt = 0
            if (p > 0.01 && p < 0.2) {
              emissiveInt = ((p - 0.01) / 0.19) * 1.2
            } else if (p >= 0.2) {
              emissiveInt = 1.2
            }
            child.material.emissiveIntensity = THREE.MathUtils.lerp(
              child.material.emissiveIntensity,
              emissiveInt,
              0.1
            )
          }
        }
      })
    }
  })

  // We rotate it slightly so it faces the camera properly when "open"
  return (
    <group ref={group} {...props} rotation={[0, 0, 0]}>
      <primitive object={scene} position={[0, -0.5, 0]} />
    </group>
  )
}

// Preload to ensure it's ready
useGLTF.preload('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/macbook/model.gltf')
