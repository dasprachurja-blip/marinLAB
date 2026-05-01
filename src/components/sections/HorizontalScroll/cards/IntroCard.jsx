import GlassCard from '../atoms/GlassCard'

export default function IntroCard() {
  return (
    <div className="hz-card-intro flex items-center" data-card="1">
      <GlassCard className="w-full h-full flex flex-col p-10 md:p-12 relative overflow-hidden">
        {/* Top Content Group */}
        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="ArctiqFlow" className="w-10 h-10 object-contain" />
              <span className="text-white/60 text-[11px] font-semibold uppercase tracking-widest">ArctiqFlow</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-[11px] text-white/40 font-medium tracking-wide">Available</span>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight leading-[1.1] text-white mb-5">
              Built for growth.<br />
              <span className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
                Designed for impact.
              </span>
            </h2>
            <p className="text-[15px] md:text-base text-white/50 leading-relaxed max-w-[340px] font-light">
              ArctiqFlow is a creative web design and development studio crafting
              modern, high-performance digital experiences for ambitious brands.
            </p>
          </div>
        </div>

        {/* Bottom — Subtle Info */}
        <div className="mt-auto flex items-end justify-between relative z-10 pt-8 border-t border-white/5">
          <div>
            <p className="text-[10px] text-white/25 uppercase tracking-widest mb-1.5 font-semibold">Based in</p>
            <p className="text-[13px] text-white/50">Dhaka, Bangladesh</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-white/25 uppercase tracking-widest mb-1.5 font-semibold">Focus</p>
            <p className="text-[13px] text-white/50">Web · Brand · Motion</p>
          </div>
        </div>

        {/* Decorative Light Beam */}
        <div
          className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.03), transparent 60%)',
          }}
        />
      </GlassCard>
    </div>
  )
}
