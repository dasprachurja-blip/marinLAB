import GlassCard from '../atoms/GlassCard'

const SERVICES = ['Web Design', 'Development', 'Brand Identity', 'Motion Design', 'SEO', 'Performance']

export default function IntroCard() {
  return (
    <div className="hz-card-intro flex items-center" data-card="1">
      <GlassCard className="w-full h-full flex flex-col p-10 md:p-14 relative overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ArctiqFlow" className="w-8 h-8 object-contain" />
            <span className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.2em]">ArctiqFlow</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="text-[10px] text-white/25 font-medium tracking-wide">Available for projects</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center relative z-10 py-8">
          <h2
            className="font-heading font-bold tracking-ultra-tight leading-ultra-tight text-white mb-8"
            style={{ fontSize: 'clamp(44px, 4.5vw, 80px)' }}
          >
            Built for growth.
            <br />
            <span className="text-white/25">
              Designed for impact.
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/35 leading-relaxed max-w-[460px] font-medium tracking-tight">
            ArctiqFlow is a creative studio crafting modern, high-performance digital experiences for ambitious brands.
          </p>
        </div>

        {/* Bottom — Marquee strip */}
        <div className="relative z-10 pt-6 border-t border-white/[0.04] overflow-hidden">
          <div className="flex gap-12 marquee-track">
            {[...SERVICES, ...SERVICES].map((s, i) => (
              <span key={i} className="text-[11px] text-white/15 font-semibold uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-3">
                {s}
                <span className="w-1 h-1 rounded-full bg-white/10" />
              </span>
            ))}
          </div>
        </div>

        {/* Decorative corner light */}
        <div
          className="absolute top-0 left-0 w-[350px] h-[350px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.02), transparent 60%)',
          }}
        />
      </GlassCard>
    </div>
  )
}
