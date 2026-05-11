import { useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import SectionWrapper from '@/components/layout/SectionWrapper'
import { portfolio } from '@/data/portfolio'
import { easing, viewportOnce } from '@/animations/motionPresets'

export default function PortfolioSection() {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    const container = scrollRef.current
    if (!container) return
    const scrollAmount = container.clientWidth * 0.7
    container.scrollBy({ left: dir === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' })
  }

  return (
    <SectionWrapper id="portfolio" className="overflow-hidden">
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
          <button
            onClick={() => scroll('prev')}
            className="text-sm text-text-tertiary hover:text-text-primary transition-colors duration-300 font-medium cursor-pointer"
            aria-label="Previous project"
          >
            ← Prev
          </button>
          <button
            onClick={() => scroll('next')}
            className="text-sm text-text-tertiary hover:text-text-primary transition-colors duration-300 font-medium cursor-pointer"
            aria-label="Next project"
          >
            Next →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {portfolio.map((project, i) => (
          <motion.div
            key={project.id}
            className="group min-w-[320px] md:min-w-[640px] rounded-2xl overflow-hidden relative snap-center shrink-0 cursor-pointer border border-white/[0.04] hover:border-accent/15 transition-colors duration-600"
            style={{ aspectRatio: '16/10' }}
            data-cursor="VIEW"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: easing.expoOut, delay: i * 0.1 }}
          >
            <img
              src={project.image}
              alt={project.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-600 ease-cinema group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
            
            {/* Project number */}
            <div className="absolute top-6 right-6">
              <span className="text-[11px] text-text-tertiary/40 font-display font-semibold tracking-wide">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-cinema">
              <p className="text-[10px] font-medium tracking-label uppercase text-accent/60 mb-2">{project.tag}</p>
              <h3 className="text-xl md:text-2xl font-display font-semibold text-text-primary">{project.title}</h3>
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
    </SectionWrapper>
  )
}
