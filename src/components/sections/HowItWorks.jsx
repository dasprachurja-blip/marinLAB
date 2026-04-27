import { useEffect, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionLabel from '@/components/atoms/SectionLabel'
import { cn } from '@/utils/cn'
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
  // Use a simple data attribute so we know this is a step for styling
  return (
    <div className="process-step flex flex-col md:flex-row items-start gap-6 py-20 opacity-30 transition-opacity duration-500">
      <div className="w-12 h-12 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold shrink-0 border border-teal/20">
        {num}
      </div>
      <div>
        <h4 className="text-3xl font-bold text-white mb-4">{title}</h4>
        <p className="text-lg text-muted leading-relaxed max-w-md">{desc}</p>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. ScrollTrigger to track the overall progress of the section to drive the 3D Phone
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        processScrollState.progress = self.progress
      }
    })

    // 2. ScrollTriggers for each text step to fade them in/out as they hit the center of the screen
    const steps = container.querySelectorAll('.process-step')
    const stepTriggers = []
    
    steps.forEach((step) => {
      const trigger = ScrollTrigger.create({
        trigger: step,
        start: 'top center+=100',
        end: 'bottom center-=100',
        toggleClass: 'opacity-100',
      })
      stepTriggers.push(trigger)
    })

    return () => {
      st.kill()
      stepTriggers.forEach(t => t.kill())
    }
  }, [])

  return (
    <SectionWrapper id="process" className="bg-navy-light/10 relative overflow-hidden" ref={containerRef}>
      
      {/* Title Area */}
      <div className="text-center mb-12 relative z-10 pt-20">
        <SectionLabel>THE PROCESS</SectionLabel>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mt-4">From Vision to Launch</h2>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative">
        
        {/* LEFT SIDE: Scrollable Text Steps */}
        <div className="w-full md:w-1/2 relative z-10 pl-4 md:pl-8 py-[20vh] space-y-[15vh]">
          {steps.map((step, i) => (
            <ProcessStep key={step.num} {...step} index={i} />
          ))}
        </div>

        {/* RIGHT SIDE: Sticky 3D Canvas */}
        <div className="hidden md:block w-1/2 h-[100vh] sticky top-0 right-0 z-0 pointer-events-none">
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

            <ProcessPhone position={[0, -0.3, 0]} />
          </Canvas>
        </div>

      </div>
    </SectionWrapper>
  )
}
