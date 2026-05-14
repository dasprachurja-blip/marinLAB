import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Compass, PenTool, Rocket } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    icon: Compass,
    title: 'Discovery',
    desc: 'We dive deep into your brand identity and business objectives to map out the strategy.',
  },
  {
    num: '02',
    icon: PenTool,
    title: 'Design',
    desc: 'Rapid prototyping and high-fidelity mockups of your future digital ecosystem.',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Execution',
    desc: 'Clean code development and performance optimization for a flawless launch.',
  },
]

export default function HowItWorks() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Initial states — step numbers visible but dimmed
    gsap.set('.step-number-0', { opacity: 1, y: 0 })
    gsap.set('.step-number-1, .step-number-2', { opacity: 0, y: 100 })

    gsap.set('.step-title', { color: 'rgba(240,242,245,0.30)' })
    gsap.set('.step-desc', { color: 'rgba(160,165,184,0.50)' })
    gsap.set('.step-icon', { backgroundColor: '#0F1117', color: '#6B7080', scale: 1, boxShadow: 'none' })
    gsap.set('.step-card', { borderColor: 'rgba(255,255,255,0.04)', background: 'transparent' })

    // First step highlighted
    gsap.set('.step-title-0', { color: '#F0F2F5' })
    gsap.set('.step-desc-0', { color: '#A0A5B8' })
    gsap.set('.step-icon-0', { backgroundColor: 'rgba(77,158,255,0.08)', color: '#4D9EFF', scale: 1.1, boxShadow: '0 0 20px rgba(77,158,255,0.2)' })
    gsap.set('.step-card-0', { borderColor: 'rgba(77,158,255,0.1)', background: 'rgba(77,158,255,0.02)' })

    let tl

    const timer = setTimeout(() => {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: true,
        }
      })

      // Progress line
      tl.to('.progress-line', { scaleY: 1, ease: 'none', duration: 2 }, 0)
      tl.to('.flare', { opacity: 1, scale: 1, duration: 0.2 }, 0)

      // Step 1 → 2
      tl.to('.step-number-0', { opacity: 0, y: -100, duration: 0.5 }, 0.5)
      tl.to('.step-number-1', { opacity: 1, y: 0, duration: 0.5 }, 0.5)
      tl.to('.step-card-0', { borderColor: 'rgba(255,255,255,0.04)', background: 'transparent', duration: 0.3 }, 0.5)
      tl.to('.step-title-0', { color: 'rgba(240,242,245,0.30)', duration: 0.3 }, 0.5)
      tl.to('.step-desc-0', { color: 'rgba(160,165,184,0.50)', duration: 0.3 }, 0.5)
      tl.to('.step-icon-0', { backgroundColor: '#0F1117', color: '#6B7080', scale: 1, boxShadow: 'none', duration: 0.3 }, 0.5)
      tl.to('.step-icon-1', { backgroundColor: 'rgba(77,158,255,0.08)', color: '#4D9EFF', scale: 1.1, boxShadow: '0 0 20px rgba(77,158,255,0.2)', duration: 0.3 }, 0.5)
      tl.to('.step-title-1', { color: '#F0F2F5', duration: 0.3 }, 0.5)
      tl.to('.step-desc-1', { color: '#A0A5B8', duration: 0.3 }, 0.5)
      tl.to('.step-card-1', { borderColor: 'rgba(77,158,255,0.1)', background: 'rgba(77,158,255,0.02)', duration: 0.3 }, 0.5)

      // Step 2 → 3
      tl.to('.step-number-1', { opacity: 0, y: -100, duration: 0.5 }, 1.5)
      tl.to('.step-number-2', { opacity: 1, y: 0, duration: 0.5 }, 1.5)
      tl.to('.step-card-1', { borderColor: 'rgba(255,255,255,0.04)', background: 'transparent', duration: 0.3 }, 1.5)
      tl.to('.step-title-1', { color: 'rgba(240,242,245,0.30)', duration: 0.3 }, 1.5)
      tl.to('.step-desc-1', { color: 'rgba(160,165,184,0.50)', duration: 0.3 }, 1.5)
      tl.to('.step-icon-1', { backgroundColor: '#0F1117', color: '#6B7080', scale: 1, boxShadow: 'none', duration: 0.3 }, 1.5)
      tl.to('.step-icon-2', { backgroundColor: 'rgba(77,158,255,0.08)', color: '#4D9EFF', scale: 1.1, boxShadow: '0 0 20px rgba(77,158,255,0.2)', duration: 0.3 }, 1.5)
      tl.to('.step-title-2', { color: '#F0F2F5', duration: 0.3 }, 1.5)
      tl.to('.step-desc-2', { color: '#A0A5B8', duration: 0.3 }, 1.5)
      tl.to('.step-card-2', { borderColor: 'rgba(77,158,255,0.1)', background: 'rgba(77,158,255,0.02)', duration: 0.3 }, 1.5)

      tl.to('.flare', { opacity: 0, scale: 0, duration: 0.2 }, 1.8)

      ScrollTrigger.refresh()
    }, 1200)

    return () => {
      clearTimeout(timer)
      if (tl) tl.kill()
    }
  }, [])

  return (
    <section id="process" ref={containerRef} className="relative h-screen w-full overflow-hidden flex flex-col bg-surface" style={{ zIndex: 2 }}>
      {/* Noise */}
      <div className="noise-overlay" />

      {/* Diagonal grid texture */}
      <div className="diagonal-grid absolute inset-0 pointer-events-none" />

      {/* Top accent glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Step counter badge */}
      <div className="absolute top-6 right-6 md:top-8 md:right-10 z-20 flex items-center gap-2">
        <span className="text-[10px] text-text-tertiary uppercase tracking-label font-medium">Step</span>
        <span className="text-[10px] text-accent/60 font-display font-semibold">/ 03</span>
      </div>

      {/* Title */}
      <div className="text-center relative z-10 pt-16 md:pt-24 flex-none">
        <span className="section-label">THE PROCESS</span>
        <h2
          className="font-display font-semibold tracking-super-tight text-text-primary mt-5 uppercase"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
        >
          From Vision to Launch
        </h2>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row relative items-center justify-center px-6">

        {/* LEFT: Giant numbers — now VISIBLE */}
        <div className="hidden md:flex w-1/2 items-center justify-center relative h-[300px]">
          {steps.map((step, idx) => (
            <span
              key={step.num}
              className={`step-number-${idx} absolute text-[18rem] lg:text-[22rem] font-display font-semibold leading-none tracking-tighter`}
              style={{
                color: 'rgba(77,158,255,0.12)',
                textShadow: '0 0 80px rgba(77,158,255,0.08)',
                opacity: 0,
                transform: 'translateY(100px)',
              }}
            >
              {step.num}
            </span>
          ))}

          {/* Decorative ring behind the number */}
          <div className="absolute w-[280px] h-[280px] rounded-full border border-white/[0.02] pointer-events-none" />
          <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-white/[0.015] pointer-events-none" style={{ animation: 'spin 60s linear infinite' }} />
        </div>

        {/* RIGHT: Steps with cards */}
        <div className="w-full md:w-1/2 relative flex flex-col justify-between h-[60vh] max-h-[600px] pl-10 md:pl-0 mt-10 md:mt-0 gap-4">

          {/* Timeline track */}
          <div className="absolute left-[0.5rem] top-6 bottom-[106px] w-[1px] bg-white/[0.04]" />

          {/* Progress line */}
          <div
            className="progress-line absolute left-[0.5rem] top-6 bottom-[106px] w-[1px] bg-accent/60 shadow-[0_0_20px_rgba(77,158,255,0.3)] origin-top z-10"
            style={{ transform: 'scaleY(0)' }}
          >
            <div className="flare absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rounded-full shadow-[0_0_16px_4px_rgba(77,158,255,0.5),0_0_32px_8px_rgba(77,158,255,0.2)] opacity-0 scale-0" />
          </div>

          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={step.num} className={`step-card step-card-${idx} relative pl-16 md:pl-20 py-5 rounded-xl border border-white/[0.04] transition-all duration-500`}>
                <div className={`step-icon step-icon-${idx} absolute left-[-1.5rem] top-5 w-11 h-11 rounded-full flex items-center justify-center z-10 border border-white/8 bg-surface text-text-tertiary transition-all duration-500`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>

                <div>
                  <h4 className={`step-title step-title-${idx} text-2xl md:text-3xl font-display font-semibold mb-2 tracking-wide uppercase text-text-primary/20 transition-colors duration-500`}>{step.title}</h4>
                  <p className={`step-desc step-desc-${idx} text-base leading-relaxed max-w-md font-sans text-text-secondary/40 transition-colors duration-500`}>{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CSS for spinning ring */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
