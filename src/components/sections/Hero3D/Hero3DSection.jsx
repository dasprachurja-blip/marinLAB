import { useEffect, useRef, useCallback } from 'react'
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
   Hero3DSection — GSAP‑pinned + native scroll fallback
   Scroll progress drives all 3D animation via scrollState
   
   SCENE 7 (p 0.7→1.0): Camera zooms directly into screen,
   transitioning seamlessly into real HTML hero section.
   ────────────────────────────────────────────────── */

export default function Hero3DSection() {
  const wrapperRef = useRef(null)
  const pinRef = useRef(null)
  const uiRef = useRef(null)
  const transitionGlowRef = useRef(null)

  /* ── Scroll‑progress integration ── */
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    let st = null

    const setup = () => {
      if (st) st.kill()

      st = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: '+=400%',
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          scrollState.progress = self.progress
          updateUI(self.progress)
        },
      })
    }

    const timer = setTimeout(() => {
      setup()
      ScrollTrigger.refresh()
    }, 400)

    const nativeFallback = () => {
      if (st && st.isActive) return 
      const rect = wrapper.getBoundingClientRect()
      const vh = window.innerHeight
      const totalH = wrapper.offsetHeight
      const scrolled = -rect.top
      const total = totalH - vh
      if (total > 0) {
        const p = Math.max(0, Math.min(1, scrolled / total))
        scrollState.progress = p
        updateUI(p)
      }
    }

    window.addEventListener('scroll', nativeFallback, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', nativeFallback)
      if (st) st.kill()
    }
  }, [])

  /* ── Update HTML overlays ── */
  const updateUI = useCallback((p) => {
    // UI fade in (Scene 7 end)
    if (uiRef.current) {
      const show = p > 0.88
      uiRef.current.style.opacity = show ? '1' : '0'
      uiRef.current.style.pointerEvents = show ? 'auto' : 'none'
    }
    
    // Transition glow (simulates entering the bright screen)
    if (transitionGlowRef.current) {
      // Glow peaks exactly at the transition point to mask the handoff
      let glow = 0
      if (p > 0.8 && p <= 0.9) {
        glow = (p - 0.8) / 0.1 // ramp up 0->1
      } else if (p > 0.9) {
        glow = 1 - Math.min((p - 0.9) / 0.1, 1) // ramp down 1->0
      }
      transitionGlowRef.current.style.opacity = glow * 0.8
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
      <div
        ref={pinRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100vh', background: '#0a0b10' }} // Deep navy background
      >
        {/* ── WebGL Canvas ── */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 1.2, 4], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            style={{ background: '#0a0b10' }}
            onCreated={({ gl }) => gl.setClearColor('#0a0b10')}
          >
            <color attach="background" args={['#0a0b10']} />
            <fog attach="fog" args={['#0a0b10', 10, 30]} />

            {/* Premium lighting rig */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 8, 4]} intensity={1.2} color="#48D9B4" castShadow />
            <directionalLight position={[-5, 3, -2]} intensity={0.6} color="#2B82AD" />
            <pointLight position={[0, -3, 5]} intensity={0.5} color="#ffffff" />
            <spotLight position={[0, 10, 2]} angle={0.3} penumbra={1} intensity={0.6} color="#ffffff" />
            <hemisphereLight args={['#48D9B4', '#0a0b10', 0.25]} />

            <Scene />
          </Canvas>
        </div>

        {/* Debug progress — remove after testing */}
        <div
          id="debug-progress"
          className="absolute top-4 left-4 z-50 font-mono text-xs px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(0,0,0,0.7)', color: '#48D9B4' }}
        />

        {/* White/teal glow to simulate physically entering the emissive screen */}
        <div
          ref={transitionGlowRef}
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(72,217,180,0.4) 50%, rgba(10,11,16,0) 100%)',
            opacity: 0,
            transition: 'opacity 0.1s linear',
            mixBlendMode: 'screen',
          }}
        />

        {/* ── Scene 7 — Final Hero UI ── */}
        <div
          ref={uiRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0b10]"
          style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 0.8s ease' }}
        >
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#48D9B4]/10 rounded-full blur-[140px] pointer-events-none" />
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
