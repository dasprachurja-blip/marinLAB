import SectionWrapper from '@/components/layout/SectionWrapper'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

const microStats = ['50+ Projects', 'Dhaka HQ', 'Global Clients']

export default function AboutSection() {
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <SectionWrapper id="about" className="overflow-hidden">
      <div ref={ref} className={cn('transition-all duration-1000', inView ? 'opacity-100' : 'opacity-0')}>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* LEFT — Editorial content */}
          <div>
            <span className="section-label mb-6 block">ABOUT</span>
            
            {/* Year as giant decorative element */}
            <div className="relative mb-8">
              <span className="text-[120px] md:text-[180px] font-heading font-bold text-white/[0.03] leading-none select-none block" aria-hidden="true">
                '24
              </span>
              <div className="absolute top-1/2 -translate-y-1/2 left-0">
                <h2
                  className="font-heading font-bold text-white tracking-super-tight leading-editorial"
                  style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
                >
                  Built different,
                  <br />
                  <span className="text-white/25">by design.</span>
                </h2>
              </div>
            </div>

            <p className="text-base text-white/35 leading-relaxed max-w-lg tracking-tight mb-10">
              ArctiqFlow is a design and development studio that doesn't just build websites — we engineer digital experiences that drive measurable growth. Every pixel is intentional. Every interaction is optimized.
            </p>

            {/* Micro stats */}
            <div className="flex flex-wrap gap-6">
              {microStats.map((stat) => (
                <span
                  key={stat}
                  className="px-5 py-2.5 rounded-full border border-white/[0.06] text-[11px] font-medium text-white/25 tracking-wide"
                >
                  {stat}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — Light panel (luxury contrast moment) */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="bg-cream p-12 md:p-16 rounded-2xl relative">
              <div className="noise-overlay !opacity-[0.04]" />
              <div className="relative z-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#0A0B0F]/30 mb-6">Philosophy</p>
                <blockquote className="text-2xl md:text-3xl font-heading font-bold text-[#0A0B0F] leading-tight tracking-tight mb-8">
                  "Simple is harder than complex. But it's worth it."
                </blockquote>
                <div className="h-px bg-[#0A0B0F]/10 mb-6" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0A0B0F] flex items-center justify-center">
                    <img src="/logo.png" alt="" className="w-6 h-6 object-contain invert" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0A0B0F]">ArctiqFlow Studio</p>
                    <p className="text-xs text-[#0A0B0F]/40">Design & Development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
