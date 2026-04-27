import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionLabel from '@/components/atoms/SectionLabel'
import { cn } from '@/utils/cn'
import { useInView } from '@/hooks/useInView'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We dive deep into your brand identity and business objectives to map out the strategy.',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Rapid prototyping and high-fidelity mockups of your future digital ecosystem.',
  },
  {
    num: '03',
    title: 'Execution',
    desc: 'Clean code development and performance optimization for a flawless launch.',
  },
]

function ProcessStep({ num, title, desc }) {
  const [ref, inView] = useInView({ threshold: 0.5 })

  return (
    <div
      ref={ref}
      data-step={num}
      className={cn(
        'process-step relative pl-20 transition-all duration-700',
        inView ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'
      )}
    >
      {/* Icon overlapping the timeline line */}
      <div 
        className={cn(
          "absolute left-[-1.5rem] top-0 w-12 h-12 rounded-full flex items-center justify-center font-bold z-10 transition-colors duration-500",
          inView ? "bg-teal text-white shadow-[0_0_20px_rgba(255,42,85,0.4)]" : "bg-navy-light text-muted border border-white/10"
        )}
      >
        {num}
      </div>
      
      <div>
        <h4 className={cn("text-3xl font-heading font-bold mb-4 transition-colors duration-500 tracking-wide uppercase", inView ? "text-white" : "text-white/40")}>{title}</h4>
        <p className="text-lg text-muted leading-relaxed max-w-md font-sans">{desc}</p>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const containerRef = useRef(null)
  const rightColRef = useRef(null)
  const progressLineRef = useRef(null)
  const [activeStep, setActiveStep] = useState('01')

  useEffect(() => {
    const container = containerRef.current
    const rightCol = rightColRef.current
    if (!container || !rightCol) return

    // 1. Timeline Line Fill Animation
    const stLine = gsap.fromTo(progressLineRef.current, 
      { height: '0%' },
      {
        height: 'calc(100% - 50vh)',
        ease: 'none',
        scrollTrigger: {
          trigger: rightCol,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        }
      }
    )

    // 2. Track which step is in view for the massive number
    const stepsEls = rightCol.querySelectorAll('.process-step')
    const stepTriggers = []
    stepsEls.forEach((el) => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveStep(el.getAttribute('data-step')),
        onEnterBack: () => setActiveStep(el.getAttribute('data-step')),
      })
      stepTriggers.push(st)
    })

    return () => {
      stLine.kill()
      stepTriggers.forEach(st => st.kill())
    }
  }, [])

  return (
    <SectionWrapper id="process" className="bg-navy-light/10 relative overflow-hidden" ref={containerRef}>
      
      {/* Title Area */}
      <div className="text-center mb-16 relative z-10 pt-10">
        <SectionLabel>THE PROCESS</SectionLabel>
        <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight text-white mt-4 uppercase">From Vision to Launch</h2>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative">
        
        {/* LEFT SIDE: Sticky Massive Number */}
        <div className="hidden md:flex w-1/2 h-[80vh] sticky top-[10vh] z-0 items-center justify-center">
          <div className="relative">
             <span 
                className="text-[18rem] lg:text-[22rem] font-heading font-bold leading-none tracking-tighter"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 42, 85, 0.4), rgba(255, 85, 0, 0))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
             >
               {activeStep}
             </span>
             {/* Glowing orb behind number */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-teal/20 rounded-full blur-[100px] pointer-events-none -z-10" />
          </div>
        </div>

        {/* RIGHT SIDE: Scrolling Steps with Timeline */}
        <div ref={rightColRef} className="w-full md:w-1/2 relative py-[25vh] pl-10 md:pl-0">
          
          {/* Timeline Background Track */}
          <div className="absolute left-[0.5rem] top-[25vh] bottom-[25vh] w-[2px] bg-white/5" />
          
          {/* Timeline Highlight Track */}
          <div ref={progressLineRef} className="absolute left-[0.5rem] top-[25vh] w-[2px] bg-teal shadow-[0_0_15px_rgba(255,42,85,0.5)] origin-top" />

          {/* Steps */}
          <div className="space-y-[35vh]">
            {steps.map((step) => (
              <ProcessStep key={step.num} {...step} />
            ))}
          </div>

        </div>

      </div>
    </SectionWrapper>
  )
}
