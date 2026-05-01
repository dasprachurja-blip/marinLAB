import GlassCard from '../atoms/GlassCard'

export default function PhilosophyCard() {
  return (
    <div className="hz-card-philosophy flex items-center" data-card="8">
      <GlassCard className="w-full h-full flex flex-col justify-center items-center text-center p-10 md:p-14 relative">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.04), transparent 60%)',
          }}
        />

        <div className="relative z-10 max-w-sm">
          {/* Minimal typography */}
          <div className="mb-10">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/15 to-transparent mx-auto mb-8" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/20 mb-6">
              Philosophy
            </p>
          </div>

          <blockquote className="text-xl md:text-2xl font-light text-white/70 leading-relaxed tracking-tight italic mb-8">
            "Good design is not what it looks like — it's how it makes people feel."
          </blockquote>

          <div className="w-8 h-px bg-white/10 mx-auto mb-6" />

          <p className="text-sm text-white/30 leading-relaxed">
            We believe in the quiet power of intentional design. Every interaction,
            every transition, every pixel serves a purpose.
          </p>

          <div className="mt-12">
            <div className="w-px h-16 bg-gradient-to-b from-white/10 via-transparent to-transparent mx-auto" />
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
