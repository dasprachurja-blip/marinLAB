import { useRef } from 'react'
import * as Icons from 'lucide-react'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionLabel from '@/components/atoms/SectionLabel'
import GlassCard from '@/components/atoms/GlassCard'
import { services } from '@/data/services'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

function ServiceCard({ icon, title, desc, span, index }) {
  const IconComponent = Icons[icon]
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        span === 2 && 'md:col-span-2',
        span === 3 && 'md:col-span-3'
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <GlassCard
        className={cn(
          'p-8 flex group h-full',
          span === 2 && 'flex-col',
          span === 3 && 'flex-col md:flex-row md:items-center gap-6'
        )}
      >
        <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-6 md:mb-0 shrink-0 group-hover:bg-teal/20 group-hover:shadow-[0_0_15px_rgba(72,217,180,0.3)] transition-all duration-300">
          {IconComponent && <IconComponent className="w-5 h-5 text-teal" />}
        </div>
        <div className={cn(span === 2 && 'mt-0')}>
          <h4 className="text-xl font-bold mb-3">{title}</h4>
          <p className="text-muted text-sm leading-relaxed">{desc}</p>
        </div>
      </GlassCard>
    </div>
  )
}

export default function ServicesSection() {
  return (
    <SectionWrapper id="services">
      <div className="text-center mb-16">
        <SectionLabel>WHAT WE DO</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Precision Services</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {services.map((service, i) => (
          <ServiceCard key={service.id} {...service} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
