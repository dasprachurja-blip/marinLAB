import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionLabel from '@/components/atoms/SectionLabel'
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
        <div className="reveal-up">
          <SectionLabel>OUR WORK</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Selected Case Studies</h2>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => scroll('prev')}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors duration-300"
            aria-label="Previous project"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('next')}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors duration-300"
            aria-label="Next project"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {portfolio.map((project) => (
          <div
            key={project.id}
            className="group min-w-[300px] md:min-w-[600px] aspect-video rounded-2xl overflow-hidden relative snap-center shrink-0 glass-card cursor-pointer"
            data-cursor="VIEW"
          >
            <img
              src={project.image}
              alt={project.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-2">{project.tag}</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
