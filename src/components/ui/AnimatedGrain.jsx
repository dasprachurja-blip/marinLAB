import { useEffect, useRef } from 'react'

/**
 * AnimatedGrain — Subtle animated film grain overlay
 * Adds tactile, cinematic texture across the entire app
 * Respects prefers-reduced-motion
 */
export default function AnimatedGrain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let frame = 0

    const resize = () => {
      canvas.width = window.innerWidth / 2 // Half res for performance
      canvas.height = window.innerHeight / 2
    }

    const draw = () => {
      frame++
      if (frame % 3 !== 0) { // ~12fps for film feel
        animationId = requestAnimationFrame(draw)
        return
      }

      const { width, height } = canvas
      const imageData = ctx.createImageData(width, height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255
        data[i] = v      // R
        data[i + 1] = v  // G
        data[i + 2] = v  // B
        data[i + 3] = 8  // A — very subtle
      }

      ctx.putImageData(imageData, 0, 0)
      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9998,
        opacity: 0.04,
        mixBlendMode: 'overlay',
      }}
    />
  )
}
