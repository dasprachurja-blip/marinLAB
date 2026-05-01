import { ArrowRight, Mail, ExternalLink, Camera, Briefcase } from 'lucide-react'
import GlassCard from '../atoms/GlassCard'
import Button from '@/components/atoms/Button'

export default function CTACard() {
  return (
    <div className="hz-card-cta flex items-center" data-card="7">
      <GlassCard className="w-full h-full flex flex-col justify-center items-center text-center p-10 md:p-16 relative overflow-hidden">
        {/* Animated background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(37,99,235,0.08), transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(139,92,246,0.06), transparent 50%)
            `,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-lg">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-6 block">
            Let's Talk
          </span>

          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            Let's Build Something{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">
              Exceptional
            </span>
          </h3>

          <p className="text-base text-white/40 leading-relaxed mb-10 max-w-md mx-auto">
            Ready to transform your digital presence? We partner with ambitious brands
            to create experiences that leave lasting impressions.
          </p>

          {/* CTA Button */}
          <div className="cta-glow-btn inline-block mb-10">
            <Button variant="primary" size="lg" onClick={() => {
              const el = document.querySelector('#contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}>
              Start a Project
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <a
              href="mailto:hello@arctiqflow.com" /* PLACEHOLDER */
              className="text-sm text-white/40 hover:text-white/70 transition-colors block"
            >
              hello@arctiqflow.com
            </a>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-4">
              {[ExternalLink, Camera, Briefcase].map((Icon, i) => (
                <a
                  key={i}
                  href="#" /* PLACEHOLDER */
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/30 hover:text-white/70 hover:border-white/15 transition-all"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
