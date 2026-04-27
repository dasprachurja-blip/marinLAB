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
   Hero3DSection — Moody, Minimalist Apple-Style Hero
   ────────────────────────────────────────────────── */

export default function Hero3DSection() {
  const wrapperRef = useRef(null)
  const pinRef = useRef(null)
  const uiRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    let st = null

    const setup = () => {
      if (st) st.kill()
      st = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: '+=150%',
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
      // Zoom in and fade out as the user scrolls down
      const fadeProgress = Math.min(p / 0.5, 1) // 0 to 1 over the first 50% of scroll
      const opacity = 1 - fadeProgress
      const scale = 1 + (fadeProgress * 0.8) // Scales up to 1.8x
      
      uiRef.current.style.opacity = opacity.toString()
      uiRef.current.style.transform = `scale(${scale})`
      uiRef.current.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none'
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
        style={{ height: '100vh', background: '#0A0B10' }} 
      >
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 1.2, 4], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            style={{ background: '#0A0B10' }}
            onCreated={({ gl }) => gl.setClearColor('#0A0B10')}
            shadows
          >
            <color attach="background" args={['#0A0B10']} />
            <fog attach="fog" args={['#0A0B10', 8, 25]} />

            {/* Apple-style Ultra-Soft Studio Lighting */}
            <ambientLight intensity={0.1} />

            {/* Soft Key Light */}
            <directionalLight 
              position={[-2, 10, 5]} 
              intensity={0.4} 
              color="#ffffff" 
              castShadow 
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.0005}
            />

            {/* Extremely subtle rim light */}
            <spotLight 
              position={[5, 5, -5]} 
              angle={0.8} 
              penumbra={1} 
              intensity={0.3} 
              color="#48D9B4" 
            />

            {/* Removed hemisphereLight completely to avoid over-filling the shadows */}

            <Suspense fallback={null}>
              {/* Keep environment reflections but use lower intensity if supported, otherwise it just relies on materials */}
              <Environment preset="studio" />
            </Suspense>

            <Scene />
          </Canvas>
        </div>

        {/* Debug progress — remove after testing */}
        <div
          id="debug-progress"
          className="absolute top-4 left-4 z-50 font-mono text-xs px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(0,0,0,0.7)', color: '#FF2A55' }}
        />

        <div
          ref={uiRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-auto"
          style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
        >
          {/* Subtle glow behind the text to ensure readability over the 3D elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0A0B10]/80 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FF2A55]/10 rounded-full blur-[140px] pointer-events-none" />

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
