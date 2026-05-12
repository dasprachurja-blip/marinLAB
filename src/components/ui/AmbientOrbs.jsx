import { useEffect, useRef } from 'react'

/**
 * AmbientOrbs — Floating color orbs with mouse parallax
 * Inspired by Stripe/Resn ambient background treatments
 */
export default function AmbientOrbs({ className = '' }) {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = e.clientY / window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    let raf
    const animate = () => {
      if (containerRef.current) {
        const orbs = containerRef.current.querySelectorAll('.ambient-orb')
        const { x, y } = mouseRef.current
        
        orbs.forEach((orb, i) => {
          const factor = (i + 1) * 8 // parallax intensity per orb
          const offsetX = (x - 0.5) * factor
          const offsetY = (y - 0.5) * factor
          orb.style.setProperty('--px', `${offsetX}px`)
          orb.style.setProperty('--py', `${offsetY}px`)
        })
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={containerRef} className={`ambient-orbs-container ${className}`} aria-hidden="true">
      <div className="ambient-orb ambient-orb--blue" style={{ '--px': '0px', '--py': '0px' }} />
      <div className="ambient-orb ambient-orb--indigo" style={{ '--px': '0px', '--py': '0px' }} />
      <div className="ambient-orb ambient-orb--teal" style={{ '--px': '0px', '--py': '0px' }} />

      <style>{`
        .ambient-orbs-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .ambient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          will-change: transform;
          transform: translate(var(--px, 0px), var(--py, 0px));
        }

        .ambient-orb--blue {
          width: 600px;
          height: 600px;
          top: -15%;
          left: 20%;
          background: radial-gradient(circle, rgba(77, 158, 255, 0.08) 0%, transparent 70%);
          animation: orbDrift1 18s ease-in-out infinite;
        }

        .ambient-orb--indigo {
          width: 500px;
          height: 500px;
          top: 30%;
          right: 10%;
          background: radial-gradient(circle, rgba(124, 92, 252, 0.06) 0%, transparent 70%);
          animation: orbDrift2 22s ease-in-out infinite;
        }

        .ambient-orb--teal {
          width: 400px;
          height: 400px;
          bottom: -10%;
          left: 40%;
          background: radial-gradient(circle, rgba(26, 255, 213, 0.03) 0%, transparent 70%);
          animation: orbDrift3 25s ease-in-out infinite;
        }

        @keyframes orbDrift1 {
          0%, 100% { transform: translate(var(--px, 0px), var(--py, 0px)) translateY(0px); opacity: 0.7; }
          33% { transform: translate(var(--px, 0px), var(--py, 0px)) translate(30px, -20px); opacity: 1; }
          66% { transform: translate(var(--px, 0px), var(--py, 0px)) translate(-15px, 15px); opacity: 0.8; }
        }

        @keyframes orbDrift2 {
          0%, 100% { transform: translate(var(--px, 0px), var(--py, 0px)) translateY(0px); opacity: 0.6; }
          50% { transform: translate(var(--px, 0px), var(--py, 0px)) translate(-25px, 20px); opacity: 1; }
        }

        @keyframes orbDrift3 {
          0%, 100% { transform: translate(var(--px, 0px), var(--py, 0px)) translateY(0px); opacity: 0.5; }
          50% { transform: translate(var(--px, 0px), var(--py, 0px)) translate(20px, -30px); opacity: 0.9; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ambient-orb {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
