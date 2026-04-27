import { useEffect, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionLabel from '@/components/atoms/SectionLabel'
import { cn } from '@/utils/cn'
import { useInView } from '@/hooks/useInView'
import ProcessPhone, { processScrollState } from './ProcessPhone'

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
      className={cn(
        'relative pl-20 transition-all duration-700',
        inView ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'
      )}
    >
      {/* Icon overlapping the timeline line */}
      <div 
        className={cn(
          "absolute left-[-1.5rem] top-0 w-12 h-12 rounded-full flex items-center justify-center font-bold z-10 transition-colors duration-500",
          inView ? "bg-teal text-navy-dark shadow-[0_0_20px_rgba(72,217,180,0.4)]" : "bg-navy-light text-muted border border-white/10"
        )}
      >
        {num}
      </div>
      
      <div>
        <h4 className={cn("text-3xl font-bold mb-4 transition-colors duration-500", inView ? "text-white" : "text-white/40")}>{title}</h4>
        <p className="text-lg text-muted leading-relaxed max-w-md">{desc}</p>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const containerRef = useRef(null)
  const rightColRef = useRef(null)
  const progressLineRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const rightCol = rightColRef.current
    if (!container || !rightCol) return

    // 1. Overall Section Progress for Phone Rotation & Screen Crossfading
    const stPhone = ScrollTrigger.create({
      trigger: rightCol,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      onUpdate: (self) => {
        processScrollState.progress = self.progress
      }
    })

    // 2. Timeline Line Fill Animation
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

    return () => {
      stPhone.kill()
      stLine.kill()
    }
  }, [])

  return (
    <SectionWrapper id="process" className="bg-navy-light/10 relative overflow-hidden" ref={containerRef}>
      
      {/* Title Area */}
      <div className="text-center mb-16 relative z-10 pt-10">
        <SectionLabel>THE PROCESS</SectionLabel>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mt-4">From Vision to Launch</h2>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative">
        
        {/* LEFT SIDE: Sticky 3D Phone Canvas */}
        <div className="hidden md:block w-1/2 h-screen sticky top-0 z-0">
          <div className="w-full h-full absolute inset-0 -translate-y-10">
            <Canvas
              camera={{ position: [0, 0, 4.5], fov: 45 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
              <ambientLight intensity={0.2} />
              <directionalLight position={[2, 5, 4]} intensity={0.8} color="#ffffff" />
              <spotLight position={[-5, 5, -5]} angle={0.5} penumbra={1} intensity={1.5} color="#48D9B4" />
              
              <Suspense fallback={null}>
                <Environment preset="city" />
              </Suspense>

              <ProcessPhone position={[0, -0.2, 0]} />
            </Canvas>
          </div>
        </div>

        {/* RIGHT SIDE: Scrolling Steps with Timeline */}
        <div ref={rightColRef} className="w-full md:w-1/2 relative py-[25vh] pl-10 md:pl-0">
          
          {/* Timeline Background Track */}
          <div className="absolute left-[0.5rem] top-[25vh] bottom-[25vh] w-[2px] bg-white/5" />
          
          {/* Timeline Highlight Track */}
          <div ref={progressLineRef} className="absolute left-[0.5rem] top-[25vh] w-[2px] bg-teal shadow-[0_0_15px_rgba(72,217,180,0.5)] origin-top" />

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
