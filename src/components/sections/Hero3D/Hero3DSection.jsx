import { useEffect, useRef, useCallback, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
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
   ────────────────────────────────────────────────── */

export default function Hero3DSection() {
  const wrapperRef = useRef(null)
  const pinRef = useRef(null)
  const uiRef = useRef(null)
  const transitionGlowRef = useRef(null)

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

  const updateUI = useCallback((p) => {
    if (uiRef.current) {
      const show = p > 0.88
      uiRef.current.style.opacity = show ? '1' : '0'
      uiRef.current.style.pointerEvents = show ? 'auto' : 'none'
    }
    
    if (transitionGlowRef.current) {
      let glow = 0
      if (p > 0.8 && p <= 0.9) {
        glow = (p - 0.8) / 0.1 
      } else if (p > 0.9) {
        glow = 1 - Math.min((p - 0.9) / 0.1, 1) 
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
        style={{ height: '100vh', background: '#080a0f' }} // Dark, clean navy
      >
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 1.2, 4], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            style={{ background: '#080a0f' }}
            onCreated={({ gl }) => gl.setClearColor('#080a0f')}
            shadows
          >
            <color attach="background" args={['#080a0f']} />
            <fog attach="fog" args={['#080a0f', 8, 25]} />

            {/* Apple-style Studio Lighting */}
            <ambientLight intensity={0.4} />
            {/* Soft key light from front-top-left */}
            <directionalLight 
              position={[-4, 8, 6]} 
              intensity={1.2} 
              color="#ffffff" 
              castShadow 
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.0001}
            />
            {/* Subtle rim light from back-right (teal) */}
            <spotLight 
              position={[5, 4, -5]} 
              angle={0.5} 
              penumbra={1} 
              intensity={2.5} 
              color="#48D9B4" 
            />
            {/* Soft fill light */}
            <hemisphereLight args={['#ffffff', '#080a0f', 0.3]} />

            {/* Environment map for realistic PBR metal reflections */}
            <Suspense fallback={null}>
              <Environment preset="city" />
            </Suspense>

            <Scene />
          </Canvas>
        </div>

        {/* Debug progress — remove after testing */}
        <div
          id="debug-progress"
          className="absolute top-4 left-4 z-50 font-mono text-xs px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(0,0,0,0.7)', color: '#48D9B4' }}
        />

        <div
          ref={transitionGlowRef}
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(72,217,180,0.4) 50%, rgba(8,10,15,0) 100%)',
            opacity: 0,
            transition: 'opacity 0.1s linear',
            mixBlendMode: 'screen',
          }}
        />

        <div
          ref={uiRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#080a0f]"
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
