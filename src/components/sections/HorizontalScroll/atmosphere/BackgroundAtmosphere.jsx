import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  duration: `${6 + Math.random() * 8}s`,
  delay: `${Math.random() * -10}s`,
  dx: `${(Math.random() - 0.5) * 60}px`,
  dy: `${(Math.random() - 0.5) * 60}px`,
}))

export default function BackgroundAtmosphere({ trackRef }) {
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)

  useEffect(() => {
    if (!trackRef?.current) return

    // Subtle orb drift animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(orb1Ref.current, {
      x: 100,
      y: -60,
      duration: 20,
      ease: 'sine.inOut',
    }, 0)
    tl.to(orb2Ref.current, {
      x: -80,
      y: 40,
      duration: 16,
      ease: 'sine.inOut',
    }, 0)

    return () => tl.kill()
  }, [trackRef])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Grid */}
      <div className="hz-grid-bg" />

      {/* Noise */}
      <div className="hz-noise" />

      {/* Gradient Orbs */}
      <div
        ref={orb1Ref}
        className="hz-orb"
        style={{ top: '10%', left: '20%' }}
      />
      <div
        ref={orb2Ref}
        className="hz-orb hz-orb--secondary"
        style={{ top: '50%', right: '10%' }}
      />

      {/* Light Beams */}
      <div className="hz-beam" style={{ left: '30%' }} />
      <div className="hz-beam hz-beam--2" style={{ right: '20%' }} />

      {/* Floating Particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="hz-particle"
          style={{
            top: p.top,
            left: p.left,
            '--duration': p.duration,
            '--delay': p.delay,
            '--dx': p.dx,
            '--dy': p.dy,
          }}
        />
      ))}
    </div>
  )
}
