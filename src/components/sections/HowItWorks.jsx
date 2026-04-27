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

function ProcessStep({ num, title, desc, index }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const isEven = index % 2 === 1

  return (
    <div
      ref={ref}
      className={cn(
        'flex w-full relative transition-all duration-700',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        isEven ? 'justify-end' : 'justify-start'
      )}
    >
      <div className={cn(
        "flex flex-col md:flex-row items-start gap-6 max-w-md w-full",
        isEven && "md:flex-row-reverse text-right"
      )}>
        <div className="w-12 h-12 rounded-full bg-teal text-navy-dark flex items-center justify-center font-bold shrink-0 shadow-[0_0_20px_rgba(72,217,180,0.3)] z-10">
          {num}
        </div>
        <div className={cn("flex-1", isEven && "md:text-right")}>
          <h4 className="text-3xl font-bold text-teal mb-4">{title}</h4>
          <p className="text-lg text-muted leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ScrollTrigger to track the overall progress of the section to drive the 3D Phone
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      onUpdate: (self) => {
        processScrollState.progress = self.progress
      }
    })

    return () => st.kill()
  }, [])

  return (
    <SectionWrapper id="process" className="bg-navy-light/10 relative" ref={containerRef}>
      
      {/* Title Area */}
      <div className="text-center mb-12 relative z-10 pt-20">
        <SectionLabel>THE PROCESS</SectionLabel>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mt-4">From Vision to Launch</h2>
      </div>

      <div className="relative max-w-6xl mx-auto mt-20">
        
        {/* Sticky 3D Canvas fixed in the absolute center of this section */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center -translate-y-10">
            <div className="w-full h-full max-w-3xl">
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

                {/* The Process Phone */}
                <ProcessPhone position={[0, -0.2, 0]} />
              </Canvas>
            </div>
          </div>
        </div>

        {/* Scrollable Text Steps */}
        <div className="relative z-10 py-[30vh] space-y-[40vh]">
          {steps.map((step, i) => (
            <ProcessStep key={step.num} {...step} index={i} />
          ))}
        </div>

      </div>
    </SectionWrapper>
  )
}
