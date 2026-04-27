import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollState } from './scrollState'
import Scene from './Scene'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import { getLenis } from '@/hooks/useLenis'

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────────
   Hero3DSection — GSAP-pinned cinematic sequence
   Uses ScrollTrigger pin instead of CSS sticky
   ────────────────────────────────────────────────── */

export default function Hero3DSection() {
  const wrapperRef = useRef(null)
  const pinRef = useRef(null)
  const uiRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const pinEl = pinRef.current
    if (!wrapper || !pinEl) return

    // Small delay to let Lenis init first
    const initTimer = setTimeout(() => {
      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: '+=400%',    // 4 extra viewports of scroll
        pin: pinEl,        // Pin the viewport div
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress
          scrollState.progress = p

          // UI overlay
          if (uiRef.current) {
            const show = p > 0.82
            uiRef.current.style.opacity = show ? '1' : '0'
            uiRef.current.style.pointerEvents = show ? 'auto' : 'none'
          }

          // Dark overlay
          if (overlayRef.current) {
            const oVal = p > 0.75 ? Math.min((p - 0.75) / 0.12, 1) : 0
            overlayRef.current.style.opacity = oVal
          }
        },
      })

      // Force refresh
      ScrollTrigger.refresh()

      // Cleanup
      wrapper._st = st
    }, 300)

    return () => {
      clearTimeout(initTimer)
      if (wrapper._st) {
        wrapper._st.kill()
        delete wrapper._st
      }
    }
  }, [])

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (!el) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { offset: -80 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={wrapperRef} id="hero" className="relative">
      {/* This div gets pinned by ScrollTrigger */}
      <div
        ref={pinRef}
        className="relative w-full h-screen"
        style={{ background: '#081F3D' }}
      >
        {/* Three.js Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0.6, 5.5], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            style={{ background: '#081F3D' }}
            onCreated={({ gl }) => gl.setClearColor('#081F3D')}
          >
            <color attach="background" args={['#081F3D']} />
            <fog attach="fog" args={['#081F3D', 8, 25]} />

            <ambientLight intensity={0.5} />
            <directionalLight position={[8, 8, 4]} intensity={1.5} color="#48D9B4" castShadow />
            <pointLight position={[-6, -4, -8]} intensity={1.0} color="#2B82AD" />
            <spotLight position={[0, 10, 0]} angle={0.35} penumbra={1} intensity={0.8} color="#ffffff" />
            <hemisphereLight args={['#48D9B4', '#081F3D', 0.3]} />

            <Scene />
          </Canvas>
        </div>

        {/* Debug progress — remove after testing */}
        <div
          id="debug-progress"
          className="absolute top-20 left-4 z-50 text-teal font-mono text-sm bg-black/70 px-4 py-2 rounded-lg backdrop-blur"
        />

        {/* Dark radial overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(8,31,61,0.0) 0%, rgba(8,31,61,0.97) 65%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Scene 5 — Final Hero UI */}
        <div
          ref={uiRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center"
          style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 0.5s ease' }}
        >
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-teal/8 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2B82AD]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 text-center space-y-8 px-6 max-w-5xl mx-auto">
            <div className="flex justify-center">
              <Badge>Web Agency · Dhaka, Bangladesh</Badge>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold leading-[1.06] tracking-tighter text-white">
              <span className="block">We Build Websites</span>
              <span className="block teal-gradient-text pb-2">That Bring You Customers</span>
            </h1>

            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              High-performance digital engineering for ambitious brands. We ship
              premium experiences that turn browsers into believers within 3‑7 days.
            </p>

            <div className="flex flex-wrap justify-center gap-5 pt-4">
              <Button variant="primary" size="lg" onClick={() => scrollTo('#contact')}>
                GET YOUR WEBSITE <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => scrollTo('#portfolio')}>
                VIEW OUR WORK
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/5">
              {[
                ['⭐', '50+ Projects'],
                ['⚡', '3-7 Day Delivery'],
                ['🌍', 'International Quality'],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2 text-sm text-muted pt-4">
                  <span className="text-teal">{icon}</span> {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
