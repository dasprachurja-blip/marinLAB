import { useEffect, useRef, useState } from 'react'
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
  const [progress, setProgress] = useState(0)

  // Derived state based on progress (0 to 1)
  const activeIndex = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2
  const activeStep = steps[activeIndex]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=200%', // 2 full screens of scrolling while pinned
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        setProgress(self.progress)
      }
    })

    return () => st.kill()
  }, [])

  return (
    <section id="process" className="bg-navy-light/10 relative h-screen w-full overflow-hidden flex flex-col" ref={containerRef}>
      
      {/* Title Area - Fixed at top of the section */}
      <div className="text-center relative z-10 pt-16 md:pt-24 flex-none">
        <SectionLabel>THE PROCESS</SectionLabel>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white mt-4 uppercase">From Vision to Launch</h2>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row relative items-center justify-center">
        
        {/* LEFT SIDE: Sticky Massive Number */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <div className="relative">
             <span 
                key={activeStep.num}
                className="text-[18rem] lg:text-[22rem] font-heading font-bold leading-none tracking-tighter animate-in fade-in duration-500 block"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 42, 85, 0.4), rgba(255, 85, 0, 0))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
             >
               {activeStep.num}
             </span>
             {/* Glowing orb behind number */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-teal/20 rounded-full blur-[100px] pointer-events-none -z-10" />
          </div>
        </div>

        {/* RIGHT SIDE: 3 Steps fixed in place */}
        <div className="w-full md:w-1/2 relative flex flex-col justify-between h-[60vh] max-h-[600px] pl-10 md:pl-0 mt-10 md:mt-0">
          
          {/* Timeline Background Track */}
          <div className="absolute left-[0.5rem] top-6 bottom-6 w-[2px] bg-white/5" />
          
          {/* Timeline Highlight Track - Grows based on progress */}
          <div 
            className="absolute left-[0.5rem] top-6 w-[2px] bg-teal shadow-[0_0_15px_rgba(255,42,85,0.5)] origin-top" 
            style={{ height: `${progress * 100}%` }} 
          />

          {/* Steps */}
          {steps.map((step, idx) => {
            const Icon = step.icon
            // Step is "active" or "completed" if the progress has passed it
            const stepThreshold = idx * 0.33
            const isActive = progress >= stepThreshold

            return (
              <div key={step.num} className="relative pl-16 md:pl-20 transition-all duration-700">
                {/* Icon overlapping the timeline line */}
                <div 
                  className={cn(
                    "absolute left-[-1.5rem] top-0 w-12 h-12 rounded-full flex items-center justify-center z-10 transition-colors duration-500",
                    isActive ? "bg-teal text-white shadow-[0_0_20px_rgba(255,42,85,0.4)] scale-110" : "bg-navy-light text-muted border border-white/10 scale-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                
                <div>
                  <h4 className={cn("text-3xl font-heading font-bold mb-2 transition-colors duration-500 tracking-wide uppercase", isActive ? "text-white" : "text-white/40")}>{step.title}</h4>
                  <p className={cn("text-lg leading-relaxed max-w-md font-sans transition-colors duration-500", isActive ? "text-muted" : "text-muted/40")}>{step.desc}</p>
                </div>
              </div>
            )
          })}

        </div>

      </div>
    </section>
  )
}
