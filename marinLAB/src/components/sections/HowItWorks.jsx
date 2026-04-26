import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionLabel from '@/components/atoms/SectionLabel'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

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

function ProcessStep({ num, title, desc, index, isLast }) {
  const [ref, inView] = useInView({ threshold: 0.3 })
  const isEven = index % 2 === 1

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col md:flex-row items-center gap-8 relative transition-all duration-700',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        isEven && 'md:flex-row-reverse'
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Content */}
      <div className={cn('flex-1', !isEven && 'md:text-right')}>
        <h4 className="text-2xl font-bold text-teal mb-2">{num}. {title}</h4>
        <p className="text-muted leading-relaxed">{desc}</p>
      </div>

      {/* Number circle */}
      <div className="w-10 h-10 rounded-full bg-teal text-navy-dark flex items-center justify-center font-bold shrink-0 z-10 shadow-[0_0_20px_rgba(72,217,180,0.3)]">
        {index + 1}
      </div>

      {/* Empty spacer */}
      <div className="flex-1 hidden md:block" />
    </div>
  )
}

export default function HowItWorks() {
  return (
    <SectionWrapper className="bg-navy-light/30">
      <div className="text-center mb-16 reveal-up">
        <SectionLabel>THE PROCESS</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">From Vision to Launch</h2>
      </div>

      <div className="relative max-w-3xl mx-auto space-y-16">
        {/* Timeline line */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/5" />

        {steps.map((step, i) => (
          <ProcessStep
            key={step.num}
            {...step}
            index={i}
            isLast={i === steps.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
