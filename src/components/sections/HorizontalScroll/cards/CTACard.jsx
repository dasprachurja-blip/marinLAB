import { ArrowRight } from 'lucide-react'
import GlassCard from '../atoms/GlassCard'
import Button from '@/components/atoms/Button'

export default function CTACard() {
  return (
    <div className="hz-card-cta flex items-center" data-card="4">
      <GlassCard className="w-full h-full flex flex-col justify-center items-center text-center p-10 md:p-16 relative overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, rgba(255,255,255,0.02), transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(255,255,255,0.015), transparent 50%)
            `,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/20 mb-8 block">
            Let's Talk
          </span>

          <h3
            className="font-heading font-bold text-white tracking-ultra-tight leading-ultra-tight mb-8"
            style={{ fontSize: 'clamp(42px, 4.5vw, 80px)' }}
          >
            Let's build something
            <br />
            <span className="text-white/25">exceptional.</span>
            <span className="inline-block w-[3px] h-[0.8em] bg-white/30 ml-2 animate-pulse align-middle" />
          </h3>

          <p className="text-sm md:text-base text-white/30 leading-relaxed mb-12 max-w-md mx-auto tracking-tight">
            Ready to transform your digital presence? We partner with ambitious brands to create experiences that convert.
          </p>

          {/* CTA */}
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              const el = document.querySelector('#contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Start a Project <ArrowRight className="w-4 h-4" />
          </Button>

          {/* Email */}
          <div className="mt-8">
            <a
              href="mailto:dasprachurja@gmail.com"
              className="text-xs text-white/20 hover:text-white/50 transition-colors duration-300"
            >
              dasprachurja@gmail.com
            </a>
          </div>
        </div>

        {/* Decorative vertical line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-white/[0.06] to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-white/[0.06] to-transparent" />
      </GlassCard>
    </div>
  )
}
