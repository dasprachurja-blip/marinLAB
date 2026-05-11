import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollState } from './scrollState'
import MagicRings from './MagicRings'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/atoms/Button'
import { getLenis } from '@/hooks/useLenis'
import { easing, wordReveal, staggerContainer } from '@/animations/motionPresets'

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────────
   Hero3DSection — Cinematic Editorial Hero
   ────────────────────────────────────────────────── */

// Word-by-word reveal component
function WordReveal({ text, className, delay = 0 }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      style={{ display: 'block' }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em] last:mr-0">
          <motion.span
            className="inline-block"
            variants={{
              initial: { y: '110%', opacity: 0 },
              animate: {
                y: '0%',
                opacity: 1,
                transition: {
                  duration: 0.9,
                  ease: easing.expoOut,
                  delay: delay + i * 0.08,
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

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
      const fadeProgress = Math.max(0, (p - 0.4) / 0.6)
      const opacity = 1 - fadeProgress
      const scale = 1 + (fadeProgress * 0.6)
      
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
        style={{ height: '100vh', background: '#050507' }} 
      >
        {/* 3D Rings Background */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <MagicRings
            color="#4D9EFF"
            colorTwo="#2A6ECC"
            ringCount={6}
            speed={1}
            opacity={0.5}
            followMouse={true}
            mouseInfluence={0.15}
            clickBurst={true}
          />
        </div>

        {/* Ambient Hero Glow */}
        <div className="hero-glow z-[1]" />

        {/* Noise texture */}
        <div className="noise-overlay" />

        {/* Structural framing accents */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-white/[0.06] rounded-tl-2xl pointer-events-none z-10 hidden md:block" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-white/[0.06] rounded-tr-2xl pointer-events-none z-10 hidden md:block" />
        
        {/* Faint structural grid lines */}
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white/[0.015] pointer-events-none z-0 hidden lg:block" />
        <div className="absolute top-0 bottom-0 right-1/4 w-px bg-white/[0.015] pointer-events-none z-0 hidden lg:block" />

        {/* Main Hero Content */}
        <div
          ref={uiRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none pb-16"
          style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
        >
          {/* Ambient readability backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-void/70 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 text-center space-y-8 px-6 max-w-7xl mx-auto pointer-events-none">
            {/* Studio badge */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easing.expoOut, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-accent/20 bg-accent-subtle text-accent text-[10px] font-medium tracking-label uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent/60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent/80" />
                </span>
                Design &amp; Development Studio
              </div>
            </motion.div>

            {/* Heading — cinematic word reveal */}
            <h1
              className="font-display font-semibold text-text-primary"
              style={{ fontSize: 'clamp(48px, 8vw, 130px)', lineHeight: 0.92, letterSpacing: '-0.04em' }}
            >
              <WordReveal text="Engineered" delay={0.3} />
              <WordReveal text="for the digital" className="text-text-tertiary" delay={0.5} />
              <WordReveal text="future." delay={0.7} />
            </h1>

            {/* Subtitle */}
            <motion.p
              className="text-base md:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed font-medium tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easing.expoOut, delay: 1.0 }}
            >
              We build simple, beautiful, and high-performance websites for ambitious brands.
            </motion.p>

            {/* CTAs */}
            <motion.div
              ref={contentRef}
              className="flex flex-wrap justify-center gap-4 pt-2 pointer-events-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easing.expoOut, delay: 1.2 }}
            >
              <Button variant="primary" size="lg" onClick={() => scrollTo('#contact')}>
                Start a Project <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="lg" onClick={() => scrollTo('#portfolio')}>
                View Work
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/[0.04] bg-void/40 backdrop-blur-sm pointer-events-none z-20">
          <div className="max-w-[90rem] mx-auto px-6 h-14 flex items-center justify-between">
            {/* Stats */}
            <div className="hidden md:flex items-center gap-8">
              {[
                '50+ Projects',
                '3–7 Day Delivery',
                '100% Client Retention',
              ].map((label) => (
                <span key={label} className="text-[12px] text-text-tertiary font-medium tracking-wide">
                  {label}
                </span>
              ))}
            </div>
            
            {/* Scroll indicator */}
            <div className="flex items-center justify-center md:justify-end w-full md:w-auto gap-3 text-[10px] text-text-tertiary uppercase tracking-label font-medium">
              <span className="relative flex h-1 w-1">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent/30" />
                <span className="relative inline-flex rounded-full h-1 w-1 bg-accent/50" />
              </span>
              Scroll to explore
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
