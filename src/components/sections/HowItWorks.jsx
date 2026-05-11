import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/utils/cn'
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

    // Initial states
    gsap.set('.step-number-0', { opacity: 1, y: 0 })
    gsap.set('.step-number-1, .step-number-2', { opacity: 0, y: 100 })
    
    gsap.set('.step-title', { color: 'rgba(240,242,245,0.2)' })
    gsap.set('.step-desc', { color: 'rgba(139,144,160,0.4)' })
    gsap.set('.step-icon', { backgroundColor: '#0F1117', color: '#4A4F60', scale: 1, boxShadow: 'none' })
    
    // First step highlighted
    gsap.set('.step-title-0', { color: '#F0F2F5' })
    gsap.set('.step-desc-0', { color: '#8B90A0' })
    gsap.set('.step-icon-0', { backgroundColor: 'rgba(77,158,255,0.08)', color: '#4D9EFF', scale: 1.1, boxShadow: '0 0 16px rgba(77,158,255,0.15)' })

    let tl;
    
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
      tl.to('.step-icon-1', { backgroundColor: 'rgba(77,158,255,0.08)', color: '#4D9EFF', scale: 1.1, boxShadow: '0 0 16px rgba(77,158,255,0.15)', duration: 0.3 }, 0.5)
      tl.to('.step-title-1', { color: '#F0F2F5', duration: 0.3 }, 0.5)
      tl.to('.step-desc-1', { color: '#8B90A0', duration: 0.3 }, 0.5)

      // Step 2 → 3
      tl.to('.step-number-1', { opacity: 0, y: -100, duration: 0.5 }, 1.5)
      tl.to('.step-number-2', { opacity: 1, y: 0, duration: 0.5 }, 1.5)
      tl.to('.step-icon-2', { backgroundColor: 'rgba(77,158,255,0.08)', color: '#4D9EFF', scale: 1.1, boxShadow: '0 0 16px rgba(77,158,255,0.15)', duration: 0.3 }, 1.5)
      tl.to('.step-title-2', { color: '#F0F2F5', duration: 0.3 }, 1.5)
      tl.to('.step-desc-2', { color: '#8B90A0', duration: 0.3 }, 1.5)

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

      <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row relative items-center justify-center">
        
        {/* LEFT: Giant numbers */}
        <div className="hidden md:flex w-1/2 items-center justify-center relative h-[300px]">
          {steps.map((step, idx) => (
            <span 
              key={step.num}
              className={`step-number-${idx} absolute text-[18rem] lg:text-[22rem] font-display font-semibold leading-none tracking-tighter`}
              style={{
                color: 'rgba(77,158,255,0.04)',
                opacity: 0,
                transform: 'translateY(100px)'
              }}
            >
              {step.num}
            </span>
          ))}
        </div>

        {/* RIGHT: Steps */}
        <div className="w-full md:w-1/2 relative flex flex-col justify-between h-[60vh] max-h-[600px] pl-10 md:pl-0 mt-10 md:mt-0">
          
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
              <div key={step.num} className="relative pl-16 md:pl-20">
                <div className={`step-icon step-icon-${idx} absolute left-[-1.5rem] top-0 w-11 h-11 rounded-full flex items-center justify-center z-10 border border-white/8 bg-surface text-text-tertiary`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                
                <div>
                  <h4 className={`step-title step-title-${idx} text-2xl md:text-3xl font-display font-semibold mb-2 tracking-wide uppercase text-text-primary/20`}>{step.title}</h4>
                  <p className={`step-desc step-desc-${idx} text-base leading-relaxed max-w-md font-sans text-text-secondary/40`}>{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
