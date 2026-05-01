import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/atoms/SectionLabel'
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

    // Set initial states
    gsap.set('.step-number-0', { opacity: 1, y: 0 })
    gsap.set('.step-number-1, .step-number-2', { opacity: 0, y: 100 })
    
    // Set initial right-side text states
    gsap.set('.step-title', { color: 'rgba(255,255,255,0.4)' })
    gsap.set('.step-desc', { color: 'rgba(148,163,184,0.4)' }) // text-muted/40
    gsap.set('.step-icon', { backgroundColor: '#0B1225', color: '#94A3B8', scale: 1, boxShadow: 'none' }) // navy-light, text-muted
    
    // Highlight first step initially
    gsap.set('.step-title-0', { color: '#ffffff' })
    gsap.set('.step-desc-0', { color: '#94A3B8' })
    gsap.set('.step-icon-0', { backgroundColor: '#2563EB', color: '#ffffff', scale: 1.1, boxShadow: '0 0 20px rgba(37,99,235,0.4)' })

    let tl;
    
    // We wrap the GSAP initialization in a timeout so it waits for BOTH the Hero section
    // (400ms) and the Horizontal Scroll section (600ms) to finish setting up their
    // ScrollTriggers first. Otherwise, GSAP calculates the pin spacer heights
    // out of order and sections overlap.
    const timer = setTimeout(() => {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=200%', // 2 full screens of scrolling while pinned
          pin: true,
          scrub: 1,
        }
      })
      // The timeline duration will be 3 units (1 for each step transition roughly)
      // Progress line grows down over the entire duration
      tl.to('.progress-line', { scaleY: 1, ease: 'none', duration: 2 }, 0)
      
      // Flare pops in at the start and stays visible while moving down
      tl.to('.flare', { opacity: 1, scale: 1, duration: 0.2 }, 0)

      // First transition (Step 1 -> Step 2)
      tl.to('.step-number-0', { opacity: 0, y: -100, duration: 0.5 }, 0.5)
      tl.to('.step-number-1', { opacity: 1, y: 0, duration: 0.5 }, 0.5)
      
      // Highlight step 2 (keeps step 1 lit)
      tl.to('.step-icon-1', { backgroundColor: '#2563EB', color: '#ffffff', scale: 1.1, boxShadow: '0 0 20px rgba(37,99,235,0.8)', duration: 0.3 }, 0.5)
      tl.to('.step-title-1', { color: '#ffffff', duration: 0.3 }, 0.5)
      tl.to('.step-desc-1', { color: '#e2e8f0', duration: 0.3 }, 0.5)

      // Second transition (Step 2 -> Step 3)
      tl.to('.step-number-1', { opacity: 0, y: -100, duration: 0.5 }, 1.5)
      tl.to('.step-number-2', { opacity: 1, y: 0, duration: 0.5 }, 1.5)
      
      // Highlight step 3 (keeps step 1 & 2 lit)
      tl.to('.step-icon-2', { backgroundColor: '#2563EB', color: '#ffffff', scale: 1.1, boxShadow: '0 0 20px rgba(37,99,235,0.8)', duration: 0.3 }, 1.5)
      tl.to('.step-title-2', { color: '#ffffff', duration: 0.3 }, 1.5)
      tl.to('.step-desc-2', { color: '#e2e8f0', duration: 0.3 }, 1.5)

      // Flare pops out at the end
      tl.to('.flare', { opacity: 0, scale: 0, duration: 0.2 }, 1.8)

      ScrollTrigger.refresh()
    }, 1200)

    return () => {
      clearTimeout(timer)
      if (tl) tl.kill()
    }
  }, [])

  return (
    <section id="process" ref={containerRef} className="bg-navy-light/10 relative h-screen w-full overflow-hidden flex flex-col" style={{ zIndex: 2 }}>
      {/* Title Area - Fixed at top of the section */}
      <div className="text-center relative z-10 pt-16 md:pt-24 flex-none">
        <SectionLabel>THE PROCESS</SectionLabel>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white mt-4 uppercase">From Vision to Launch</h2>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row relative items-center justify-center">
        
        {/* LEFT SIDE: Animated Sliding Numbers */}
        <div className="hidden md:flex w-1/2 items-center justify-center relative h-[300px]">
          {steps.map((step, idx) => (
            <span 
              key={step.num}
              className={`step-number-${idx} absolute text-[18rem] lg:text-[22rem] font-heading font-bold leading-none tracking-tighter`}
              style={{
                background: 'linear-gradient(to bottom, #2563EB, #8B5CF6)', // Blue to Purple gradient
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                opacity: 0,
                transform: 'translateY(100px)'
              }}
            >
              {step.num}
            </span>
          ))}
        </div>

        {/* RIGHT SIDE: 3 Steps fixed in place */}
        <div className="w-full md:w-1/2 relative flex flex-col justify-between h-[60vh] max-h-[600px] pl-10 md:pl-0 mt-10 md:mt-0">
          
          {/* Timeline Background Track - Stops at bottom edge of last icon */}
          <div className="absolute left-[0.5rem] top-6 bottom-[106px] w-[2px] bg-white/5" />
          
          {/* Timeline Highlight Track - Grows based on progress */}
          <div 
            className="progress-line absolute left-[0.5rem] top-6 bottom-[106px] w-[2px] bg-primary shadow-[0_0_30px_rgba(37,99,235,1)] origin-top z-10" 
            style={{ transform: 'scaleY(0)' }} 
          >
            {/* The Flare */}
            <div className="flare absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_4px_rgba(255,255,255,0.8),0_0_40px_8px_rgba(37,99,235,1)] opacity-0 scale-0" />
          </div>

          {/* Steps */}
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={step.num} className="relative pl-16 md:pl-20">
                {/* Icon overlapping the timeline line */}
                <div className={`step-icon step-icon-${idx} absolute left-[-1.5rem] top-0 w-12 h-12 rounded-full flex items-center justify-center z-10 border border-white/10 bg-navy-light text-muted`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div>
                  <h4 className={`step-title step-title-${idx} text-3xl font-heading font-bold mb-2 tracking-wide uppercase text-white/40`}>{step.title}</h4>
                  <p className={`step-desc step-desc-${idx} text-lg leading-relaxed max-w-md font-sans text-muted/40`}>{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
