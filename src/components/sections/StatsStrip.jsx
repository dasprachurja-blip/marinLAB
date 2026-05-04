import { stats } from '@/data/stats'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

function AnimatedStat({ value, suffix, label, delay }) {
  const [ref, inView] = useInView({ threshold: 0.5 })

  return (
    <div ref={ref} className="text-center">
      <div
        className={cn(
          'text-4xl md:text-5xl font-heading font-bold text-white mb-3 transition-all duration-700',
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {inView ? `${value}${suffix}` : `0${suffix}`}
      </div>
      <p className="text-[10px] uppercase tracking-[0.25em] text-white/25 font-semibold">{label}</p>
    </div>
  )
}

export default function StatsStrip() {
  return (
    <section className="py-16 md:py-20 border-t border-white/[0.04] bg-[#08090D]">
      <div className="section-container grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat, i) => (
          <AnimatedStat key={stat.label} {...stat} delay={i * 100} />
        ))}
      </div>
    </section>
  )
}
