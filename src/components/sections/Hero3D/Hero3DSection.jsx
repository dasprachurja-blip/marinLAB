import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollState } from './scrollState'
import MagicRings from './MagicRings'
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
  const contentRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    let st = null

    const setup = () => {
      if (st) st.kill()
      st = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: '+=80%',
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
      // Start fading later so it stays visible longer
      const fadeProgress = Math.max(0, (p - 0.4) / 0.6) // Starts fading at 40% scroll, fully faded at 100%
      const opacity = 1 - fadeProgress
      const scale = 1 + (fadeProgress * 0.8) // Scales up to 1.8x
      
      uiRef.current.style.opacity = opacity.toString()
      uiRef.current.style.transform = `scale(${scale})`
      
      if (contentRef.current) {
        contentRef.current.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none'
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
      <div
        ref={pinRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100vh', background: '#0A0B10' }} 
      >
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <MagicRings
            color="#2563EB"
            colorTwo="#8B5CF6"
            ringCount={6}
            speed={1}
            opacity={0.8}
            followMouse={true}
            mouseInfluence={0.15}
            clickBurst={true}
          />
        </div>

        {/* Debug progress — remove after testing */}
        <div
          id="debug-progress"
          className="absolute top-4 left-4 z-50 font-mono text-xs px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(0,0,0,0.7)', color: '#2563EB' }}
        />

        <div
          ref={uiRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
          style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
        >
          {/* Subtle glow behind the text to ensure readability over the 3D elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-navy-dark/80 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 text-center space-y-8 px-6 max-w-5xl mx-auto pointer-events-none">
            <div className="flex justify-center">
              <Badge>Web Agency · Dhaka, Bangladesh</Badge>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold leading-[1.06] tracking-tighter text-white">
              <span className="block">We Build Websites</span>
              <span className="block primary-gradient-text pb-2">That Bring You Customers</span>
            </h1>

            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              High-performance digital engineering for ambitious brands. We ship
              premium experiences that turn browsers into believers within 3‑7 days.
            </p>

            <div ref={contentRef} className="flex flex-wrap justify-center gap-5 pt-4 pointer-events-auto">
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
                  <span className="text-primary">{icon}</span> {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
