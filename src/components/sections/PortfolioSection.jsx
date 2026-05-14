import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import SectionWrapper from '@/components/layout/SectionWrapper'
import { portfolio } from '@/data/portfolio'
import { easing, viewportOnce } from '@/animations/motionPresets'

/* ── Gradient Art Visual — Premium placeholder for projects without images ── */
function GradientArtVisual({ gradient, accentColor, title }) {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: gradient }}>
      {/* Geometric decorative elements */}
      <div className="absolute inset-0">
        {/* Large accent circle */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)`,
            top: '10%',
            right: '-5%',
          }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-30" />
        {/* Diagonal line accent */}
        <div
          className="absolute w-[200%] h-px origin-left opacity-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            top: '60%',
            left: '-20%',
            transform: 'rotate(-15deg)',
          }}
        />
        {/* Floating shapes */}
        <div
          className="absolute w-16 h-16 rounded-lg border opacity-10 rotate-12"
          style={{ borderColor: accentColor, top: '25%', left: '15%' }}
        />
        <div
          className="absolute w-24 h-24 rounded-full border opacity-[0.05]"
          style={{ borderColor: accentColor, bottom: '20%', right: '20%' }}
        />
      </div>
      {/* Bottom gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    </div>
  )
}

export default function PortfolioSection() {
  const scrollRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    if (max > 0) setScrollProgress(el.scrollLeft / max)
  }, [])

  const scroll = (dir) => {
    const container = scrollRef.current
    if (!container) return
    const scrollAmount = container.clientWidth * 0.7
    container.scrollBy({ left: dir === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' })
  }

  return (
    <SectionWrapper id="portfolio" className="overflow-hidden">
      <div ref={sectionRef}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="section-label mb-4 block">OUR WORK</span>
            <h2
              className="font-display font-semibold tracking-super-tight text-text-primary"
              style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
            >
              Selected Case Studies
            </h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Progress bar */}
            <div className="hidden md:block w-24 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-accent/50 rounded-full transition-all duration-300"
                style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
              />
            </div>
            <button
              onClick={() => scroll('prev')}
              className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-text-tertiary hover:text-text-primary hover:border-accent/30 transition-all duration-300 cursor-pointer"
              aria-label="Previous project"
            >
              ←
            </button>
            <button
              onClick={() => scroll('next')}
              className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-text-tertiary hover:text-text-primary hover:border-accent/30 transition-all duration-300 cursor-pointer"
              aria-label="Next project"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none' }}
        >
          {portfolio.map((project, i) => (
            <motion.div
              key={project.id}
              className="group min-w-[340px] md:min-w-[640px] rounded-2xl overflow-hidden relative snap-center shrink-0 cursor-pointer border border-white/[0.04] hover:border-accent/15 transition-all duration-600"
              style={{ aspectRatio: '4/3' }}
              data-cursor="VIEW"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: easing.expoOut, delay: i * 0.1 }}
            >
              {/* Image or Gradient Art */}
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-cinema group-hover:scale-[1.04]"
                />
              ) : (
                <GradientArtVisual
                  gradient={project.gradient}
                  accentColor={project.accentColor}
                  title={project.title}
                />
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Project number */}
              <div className="absolute top-6 right-6">
                <span
                  className="text-[11px] font-display font-semibold tracking-wide"
                  style={{ color: project.accentColor + '40' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Tag pill */}
              <div className="absolute top-6 left-6">
                <span
                  className="text-[9px] px-3 py-1.5 rounded-full font-medium tracking-label uppercase border"
                  style={{
                    borderColor: project.accentColor + '25',
                    color: project.accentColor + '90',
                    background: project.accentColor + '08',
                  }}
                >
                  {project.tag}
                </span>
              </div>

              {/* Bottom content — slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-cinema">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-text-primary mb-2">{project.title}</h3>
                <p className="text-xs text-text-secondary/40 max-w-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {project.alt}
                </p>
                {/* View arrow */}
                <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-150">
                  <span className="text-[10px] font-medium tracking-label uppercase" style={{ color: project.accentColor }}>View Project</span>
                  <ArrowRight className="w-3 h-3" style={{ color: project.accentColor }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-8 flex justify-end">
          <button className="text-sm text-text-tertiary hover:text-text-primary transition-colors duration-300 font-medium flex items-center gap-2 group cursor-pointer">
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ease-expo" />
          </button>
        </div>
      </div>
    </SectionWrapper>
  )
}
