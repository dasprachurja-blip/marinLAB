import { motion } from 'motion/react'
import { stats } from '@/data/stats'
import { easing, viewportOnce } from '@/animations/motionPresets'

function AnimatedStat({ value, suffix, label, delay }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: easing.expoOut, delay }}
    >
      <div className="text-4xl md:text-5xl font-display font-semibold text-text-primary mb-3 tracking-ultra-tight">
        {value}{suffix}
      </div>
      <p className="text-[10px] uppercase tracking-label text-text-tertiary font-medium">{label}</p>
    </motion.div>
  )
}

export default function StatsStrip() {
  return (
    <section className="py-16 md:py-20 border-t border-white/[0.04] bg-surface">
      <div className="section-container grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat, i) => (
          <AnimatedStat key={stat.label} {...stat} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}
