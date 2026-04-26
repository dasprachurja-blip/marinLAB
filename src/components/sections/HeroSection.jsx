import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import GlowBlob from '@/components/atoms/GlowBlob'
import GlassCard from '@/components/atoms/GlassCard'
import { getLenis } from '@/hooks/useLenis'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Trigger CSS entrance after mount
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) {
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(el, { offset: -80 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const anim = (delay = 0) => ({
    className: `transition-all duration-[800ms] ease-out ${loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`,
    style: { transitionDelay: `${delay}ms` },
  })

  return (
    <header className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-navy via-navy to-navy-light">
      {/* Ambient blobs */}
      <GlowBlob color="teal" size={600} className="-top-40 -left-20" />
      <GlowBlob color="blue" size={500} className="bottom-0 -right-40" />

      <div className="section-container grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        {/* Left Column */}
        <div className="text-left space-y-8">
          <div {...anim(200)}>
            <Badge>Web Agency · Dhaka, Bangladesh</Badge>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[76px] font-bold leading-[1.08] tracking-tighter text-white">
            <span {...anim(350)} className={`block ${anim(350).className}`} style={anim(350).style}>
              We Build Websites
            </span>
            <span {...anim(500)} className={`block teal-gradient-text ${anim(500).className}`} style={anim(500).style}>
              That Bring You Customers
            </span>
          </h1>

          <p {...anim(650)} className={`text-lg text-muted max-w-xl leading-relaxed ${anim(650).className}`} style={anim(650).style}>
            High-performance digital engineering for ambitious brands. We ship premium
            experiences that turn browsers into believers within 3-7 days.
          </p>

          <div {...anim(800)} className={`flex flex-wrap gap-5 pt-2 ${anim(800).className}`} style={anim(800).style}>
            <Button variant="primary" size="lg" onClick={() => scrollTo('#contact')}>
              GET YOUR WEBSITE <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => scrollTo('#portfolio')}>
              VIEW OUR WORK
            </Button>
          </div>

          <div {...anim(950)} className={`flex flex-wrap gap-6 pt-6 border-t border-white/5 ${anim(950).className}`} style={anim(950).style}>
            <div className="flex items-center gap-2 text-sm text-muted">
              <span className="text-teal">⭐</span> 50+ Projects
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <span className="text-teal">⚡</span> 3-7 Day Delivery
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <span className="text-teal">🌍</span> International Quality
            </div>
          </div>
        </div>

        {/* Right Column — Mockup */}
        <div
          className={`relative flex justify-center lg:justify-end transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
          style={{ transitionDelay: '600ms' }}
        >
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative w-full max-w-[580px] animate-float">
            {/* Laptop */}
            <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] rounded-[2rem] p-3 shadow-2xl border border-white/10">
              <div className="w-full h-full bg-navy rounded-xl overflow-hidden relative border border-white/5">
                {/* Browser chrome */}
                <div className="h-6 flex items-center justify-between px-4 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/40" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                    <div className="w-2 h-2 rounded-full bg-green-500/40" />
                  </div>
                  <div className="w-24 h-2 bg-white/10 rounded-full" />
                  <div className="w-4" />
                </div>
                {/* Mock UI */}
                <div className="p-6 space-y-4">
                  <div className="h-3 w-28 bg-teal/20 rounded-full" />
                  <div className="text-lg font-bold text-white leading-tight">We Build Websites</div>
                  <div className="h-7 w-20 bg-teal rounded-full" />
                  <div className="flex gap-2">
                    <GlassCard hover={false} className="flex-1 h-14 !rounded-lg" />
                    <GlassCard hover={false} className="flex-1 h-14 !rounded-lg" />
                    <GlassCard hover={false} className="flex-1 h-14 !rounded-lg" />
                  </div>
                  <div className="flex items-end gap-1 h-10">
                    {[30, 50, 70, 40, 60].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm origin-bottom"
                        style={{
                          height: `${h}%`,
                          background: `rgba(72, 217, 180, ${0.2 + i * 0.12})`,
                          animation: `growBar 3s ease-in-out infinite ${i * 0.15}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90%] h-2 bg-[#0a0a0a] rounded-b-xl" />
            </div>

            {/* Phone */}
            <div className="absolute -bottom-10 -right-4 w-[160px] h-[300px] bg-[#1a1a1a] rounded-[2rem] p-2 shadow-2xl border border-white/10 z-20">
              <div className="w-full h-full bg-navy rounded-[1.5rem] overflow-hidden relative border border-white/5">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-full" />
                <div className="p-5 pt-10 space-y-4">
                  <div className="w-7 h-7 rounded-lg bg-teal/20" />
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/10 rounded-full" />
                    <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                  </div>
                  <div className="h-8 w-full bg-teal rounded-xl" />
                  <GlassCard hover={false} className="h-20 !rounded-xl" />
                </div>
              </div>
            </div>

            {/* Floating Tags */}
            {[
              { text: '🔍 SEO Ready', pos: '-top-6 -left-8', delay: '1000ms' },
              { text: '📱 Mobile First', pos: 'top-12 -right-6', delay: '1100ms' },
              { text: '⚡ 3-Day Delivery', pos: '-bottom-4 -left-6', delay: '1200ms' },
              { text: '💯 99 Perf Score', pos: 'bottom-16 -right-16', delay: '1300ms' },
            ].map((tag) => (
              <div
                key={tag.text}
                className={`glass-card absolute ${tag.pos} px-3 py-2 rounded-full text-xs font-bold text-white shadow-lg z-30 transition-all duration-500 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                style={{ transitionDelay: tag.delay }}
              >
                {tag.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes growBar {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        .blur-sm { filter: blur(4px); }
        .blur-0 { filter: blur(0px); }
      `}</style>
    </header>
  )
}
