import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import SectionWrapper from '@/components/layout/SectionWrapper'
import { portfolio } from '@/data/portfolio'

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
            className="font-heading font-bold tracking-super-tight text-white"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            Selected Case Studies
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => scroll('prev')}
            className="text-sm text-white/25 hover:text-white transition-colors duration-300 font-medium"
            aria-label="Previous project"
          >
            ← Prev
          </button>
          <button
            onClick={() => scroll('next')}
            className="text-sm text-white/25 hover:text-white transition-colors duration-300 font-medium"
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
          <div
            key={project.id}
            className="group min-w-[320px] md:min-w-[640px] rounded-2xl overflow-hidden relative snap-center shrink-0 cursor-pointer border border-white/[0.04]"
            style={{ aspectRatio: '16/10' }}
            data-cursor="VIEW"
          >
            <img
              src={project.image}
              alt={project.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
            
            {/* Project number */}
            <div className="absolute top-6 right-6">
              <span className="text-[11px] text-white/15 font-heading font-bold tracking-wide">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-cinematic">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/30 mb-2">{project.tag}</p>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-white">{project.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* View all link */}
      <div className="mt-8 flex justify-end">
        <button className="text-sm text-white/20 hover:text-white transition-colors duration-300 font-medium flex items-center gap-2 group">
          View All Projects
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </SectionWrapper>
  )
}
