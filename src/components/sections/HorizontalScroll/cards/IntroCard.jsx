import GlassCard from '../atoms/GlassCard'

export default function IntroCard() {
  return (
    <div className="hz-card-intro flex items-center" data-card="1">
      <GlassCard className="w-full h-full flex flex-col justify-between p-10 md:p-14">
        {/* Top — Logo & Status */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="ArctiqFlow"
              className="w-12 h-12 object-contain"
            />
            <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">
              ArctiqFlow
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/40 font-medium">Available</span>
          </div>
        </div>

        {/* Middle — Hero Copy */}
        <div className="flex-1 flex flex-col justify-center py-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-white mb-6">
            Built for growth.
            <br />
            <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">
              Designed for impact.
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-md font-light">
            ArctiqFlow is a creative web design and development studio crafting
            modern, high-performance digital experiences for ambitious brands.
          </p>
        </div>

        {/* Bottom — Subtle Info */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-white/25 uppercase tracking-wider mb-1">Based in</p>
            <p className="text-sm text-white/50">Dhaka, Bangladesh 🇧🇩</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/25 uppercase tracking-wider mb-1">Focus</p>
            <p className="text-sm text-white/50">Web · Brand · Motion</p>
          </div>
        </div>

        {/* Decorative Light Beam */}
        <div
          className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 0% 0%, rgba(37,99,235,0.08), transparent 60%)',
          }}
        />
      </GlassCard>
    </div>
  )
}
