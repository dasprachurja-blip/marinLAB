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
        end: 'bottom top',
        scrub: true,
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

        {/* Minimalist Framing Accents */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-white/10 rounded-tl-2xl pointer-events-none z-10 hidden md:block" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-white/10 rounded-tr-2xl pointer-events-none z-10 hidden md:block" />
        
        {/* Faint vertical structural lines */}
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white/[0.02] pointer-events-none z-0 hidden lg:block" />
        <div className="absolute top-0 bottom-0 right-1/4 w-px bg-white/[0.02] pointer-events-none z-0 hidden lg:block" />

        {/* Debug progress — remove after testing */}
        <div
          id="debug-progress"
          className="absolute top-4 left-4 z-50 font-mono text-xs px-3 py-1.5 rounded-lg hidden"
          style={{ background: 'rgba(0,0,0,0.7)', color: '#2563EB' }}
        />

        <div
          ref={uiRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none pb-16"
          style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
        >
          {/* Subtle glow behind the text to ensure readability over the 3D elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-navy-dark/80 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 text-center space-y-6 px-6 max-w-5xl mx-auto pointer-events-none">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white text-[10px] font-bold tracking-[0.2em] uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                Design & Development company
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold leading-[1.06] tracking-tighter text-white">
              <span className="block">Websites designed</span>
              <span className="block primary-gradient-text pb-2">to help you grow.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              We are a design and development team that builds simple, beautiful, and highly effective websites.
            </p>

            <div ref={contentRef} className="flex flex-wrap justify-center gap-5 pt-4 pointer-events-auto">
              <Button variant="primary" size="lg" onClick={() => scrollTo('#contact')}>
                Start Your Project <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => scrollTo('#portfolio')}>
                See Our Work
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Stats & Scroll Indicator) */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-black/10 backdrop-blur-sm pointer-events-none z-20">
          <div className="max-w-[90rem] mx-auto px-6 h-16 flex items-center justify-between">
            {/* Desktop Stats */}
            <div className="hidden md:flex items-center gap-10">
              {[
                ['⭐', '50+ Projects Delivered'],
                ['⚡', '3-7 Day Turnaround'],
                ['🌍', 'International Quality'],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2.5 text-[13px] text-white/50 font-medium tracking-wide">
                  <span className="text-primary">{icon}</span> {label}
                </div>
              ))}
            </div>
            
            {/* Scroll Indicator */}
            <div className="flex items-center justify-center md:justify-end w-full md:w-auto gap-3 text-[11px] text-white/40 uppercase tracking-[0.25em] font-bold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/60" />
              </span>
              Scroll to explore
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
