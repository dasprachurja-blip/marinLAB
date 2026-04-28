import { useRef } from 'react'
import { stats } from '@/data/stats'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

function AnimatedStat({ value, suffix, label, delay }) {
  const [ref, inView] = useInView({ threshold: 0.5 })

  return (
    <div ref={ref} className="text-center">
      <div
        className={cn(
          'stat-value text-4xl md:text-5xl font-bold text-primary mb-2 transition-all duration-700',
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
        style={{ transitionDelay: `${delay}ms` }}
        data-value={value}
        data-suffix={suffix}
      >
        {inView ? `${value}${suffix}` : `0${suffix}`}
      </div>
      <p className="text-xs uppercase tracking-widest text-muted font-semibold">{label}</p>
    </div>
  )
}

export default function StatsStrip() {
  return (
    <section className="py-16 md:py-20 border-y border-white/5 bg-navy-dark/50">
      <div className="section-container grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat, i) => (
          <AnimatedStat key={stat.label} {...stat} delay={i * 100} />
        ))}
      </div>
    </section>
  )
}
