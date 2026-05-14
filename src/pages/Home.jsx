import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight, Layers, Code2, Palette, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero3DSection from '@/components/sections/Hero3D/Hero3DSection'

import HorizontalScroll from '@/components/sections/HorizontalScroll'
import HowItWorks from '@/components/sections/HowItWorks'
import PortfolioSection from '@/components/sections/PortfolioSection'
import FAQSection from '@/components/sections/FAQSection'
import Button from '@/components/atoms/Button'
import AmbientOrbs from '@/components/ui/AmbientOrbs'
import { easing, viewportOnce, pageVariants } from '@/animations/motionPresets'

/* ── Animated Counter Hook ── */
function useCounter(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  useEffect(() => {
    if (!startOnView || !isInView) return
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, end, duration, startOnView])

  return { count, ref }
}

/* ── Floating Particles ── */
function FloatingParticles({ count = 6 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    top: `${10 + Math.random() * 80}%`,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 12,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-accent/20"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   ABOUT TEASER — Animated Stats Bento Grid
   ═══════════════════════════════════════════════ */

function AboutTeaser() {
  const navigate = useNavigate()
  const proj = useCounter(50)
  const retention = useCounter(100)

  return (
    <section className="py-28 md:py-44 bg-abyss relative overflow-hidden">
      <div className="noise-overlay" />
      <FloatingParticles count={8} />

      {/* Decorative diagonal line */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-accent/8 to-transparent hidden lg:block" style={{ right: '38%' }} />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easing.expoOut }}
          >
            <span className="section-label mb-6 block">THE STUDIO</span>
            <h2
              className="font-display font-semibold tracking-super-tight text-text-primary mb-6"
              style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}
            >
              We don't just build websites.<br />
              <span className="text-text-tertiary">We engineer experiences.</span>
            </h2>
            <p className="text-text-secondary/80 text-base leading-relaxed max-w-lg mb-8">
              ArcticFlow is a design & development studio obsessed with craft. Every pixel, every animation, every line of code is intentional.
            </p>
            <Button variant="secondary" onClick={() => navigate('/about')}>
              About Us <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Right — Bento Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easing.expoOut, delay: 0.15 }}
          >
            {/* Stat: Projects */}
            <div ref={proj.ref} className="glass-card p-6 md:p-8 group hover:border-accent/20 transition-all duration-500 cursor-default">
              <div className="text-4xl md:text-5xl font-display font-semibold text-text-primary mb-2 tracking-tight">
                {proj.count}<span className="text-accent">+</span>
              </div>
              <p className="text-[11px] uppercase tracking-label text-text-tertiary font-medium">Projects Delivered</p>
              {/* Mini bar chart decoration */}
              <div className="flex items-end gap-1 mt-5 h-8">
                {[40, 65, 45, 80, 55, 90, 70, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm bg-accent/10 group-hover:bg-accent/20 transition-colors duration-500"
                    style={{ height: `${h}%` }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.5, ease: easing.expoOut, delay: 0.3 + i * 0.05 }}
                  />
                ))}
              </div>
            </div>

            {/* Stat: Delivery */}
            <div className="glass-card p-6 md:p-8 group hover:border-accent/20 transition-all duration-500 cursor-default">
              <div className="text-4xl md:text-5xl font-display font-semibold text-text-primary mb-2 tracking-tight">
                3–7
              </div>
              <p className="text-[11px] uppercase tracking-label text-text-tertiary font-medium">Day Avg. Delivery</p>
              {/* Pulsing activity indicator */}
              <div className="flex items-center gap-3 mt-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent/40" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent/60" />
                </span>
                <span className="text-[10px] text-accent/70 font-medium tracking-wide uppercase">Lightning Fast</span>
              </div>
            </div>

            {/* Stat: Retention */}
            <div ref={retention.ref} className="glass-card p-6 md:p-8 group hover:border-accent/20 transition-all duration-500 cursor-default">
              <div className="text-4xl md:text-5xl font-display font-semibold text-text-primary mb-2 tracking-tight">
                {retention.count}<span className="text-accent">%</span>
              </div>
              <p className="text-[11px] uppercase tracking-label text-text-tertiary font-medium">Client Retention</p>
              {/* SVG arc progress */}
              <div className="mt-5 flex justify-center">
                <svg width="64" height="36" viewBox="0 0 64 36" className="overflow-visible">
                  <path d="M 4 32 A 28 28 0 0 1 60 32" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" strokeLinecap="round" />
                  <motion.path
                    d="M 4 32 A 28 28 0 0 1 60 32"
                    fill="none"
                    stroke="rgba(77,158,255,0.4)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 1.5, ease: easing.cinema, delay: 0.3 }}
                  />
                </svg>
              </div>
            </div>

            {/* Stat: Global */}
            <div className="glass-card p-6 md:p-8 group hover:border-accent/20 transition-all duration-500 cursor-default">
              <div className="text-xl md:text-2xl font-display font-semibold text-text-primary mb-2 tracking-tight">
                Est. <span className="text-accent">2024</span>
              </div>
              <p className="text-[11px] uppercase tracking-label text-text-tertiary font-medium">Dhaka → Global</p>
              {/* Dot map decoration */}
              <div className="mt-5 dot-grid rounded-lg h-10 w-full relative overflow-hidden">
                <motion.div
                  className="absolute w-2 h-2 rounded-full bg-accent/40 shadow-[0_0_8px_rgba(77,158,255,0.3)]"
                  style={{ top: '30%', left: '35%' }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, ease: easing.spring, delay: 0.5 }}
                />
                <motion.div
                  className="absolute w-1.5 h-1.5 rounded-full bg-accent/20"
                  style={{ top: '50%', left: '70%' }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, ease: easing.spring, delay: 0.7 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   SERVICES TEASER — Editorial Hover-Reveal
   ═══════════════════════════════════════════════ */

function ServicesTeaser() {
  const navigate = useNavigate()
  const services = [
    { num: '01', title: 'UI/UX Design', slug: 'ui-ux', desc: 'Research-driven interfaces engineered for conversion and engagement.', tags: ['Design Systems', 'Figma', 'Prototyping'], icon: Palette },
    { num: '02', title: 'Frontend Engineering', slug: 'frontend', desc: 'Pixel-perfect, buttery-smooth interfaces built with React and modern tooling.', tags: ['React', 'Next.js', 'Animation'], icon: Code2 },
    { num: '03', title: 'Full-Stack Development', slug: 'fullstack', desc: 'Robust architectures pairing scalable backends with dynamic frontends.', tags: ['Node.js', 'Databases', 'APIs'], icon: Layers },
    { num: '04', title: 'SEO & Growth', slug: 'seo', desc: 'Technical SEO, content strategy, and analytics that put you on page one.', tags: ['Analytics', 'Performance', 'Strategy'], icon: TrendingUp },
  ]

  return (
    <section className="py-28 md:py-44 bg-surface relative overflow-hidden">
      <div className="noise-overlay" />
      <div className="diagonal-grid absolute inset-0 pointer-events-none" />

      {/* Accent orb top-left */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: easing.expoOut }}
        >
          <div>
            <span className="section-label mb-4 block">WHAT WE DO</span>
            <h2 className="font-display font-semibold tracking-super-tight text-text-primary" style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}>
              Precision services.
            </h2>
          </div>
          <Button variant="ghost" onClick={() => navigate('/services')}>
            View All Services <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <div className="space-y-0">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.num}
                className="group border-b border-white/[0.04] cursor-pointer hover:border-accent/15 transition-all duration-400 relative"
                onClick={() => navigate(`/services#${s.slug}`)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: easing.expoOut, delay: i * 0.06 }}
              >
                {/* Ghost number background */}
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[6rem] md:text-[8rem] font-display font-semibold text-white/[0.03] pointer-events-none select-none leading-none hidden md:block group-hover:text-white/[0.05] transition-colors duration-700">
                  {s.num}
                </span>

                <div className="flex items-center gap-6 py-8 md:py-10 relative z-10">
                  <span className="text-xs text-accent/60 font-display tracking-label w-8">{s.num}</span>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl border border-white/[0.06] flex items-center justify-center text-text-tertiary group-hover:text-accent group-hover:border-accent/20 group-hover:bg-accent/[0.04] transition-all duration-400 shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>

                  <h3 className="text-xl md:text-3xl font-display font-semibold text-text-secondary group-hover:text-text-primary transition-colors duration-400 tracking-tight flex-1">
                    {s.title}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-text-tertiary group-hover:text-accent group-hover:translate-x-2 transition-all duration-400 shrink-0" />
                </div>

                {/* Accordion expand on hover */}
                <div className="max-h-0 overflow-hidden group-hover:max-h-28 transition-all duration-500 ease-cinema">
                  <div className="pb-6 pl-14 md:pl-24 flex flex-col md:flex-row md:items-center gap-3">
                    <p className="text-sm text-text-secondary/70 max-w-md">{s.desc}</p>
                    <div className="flex gap-2 flex-wrap">
                      {s.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full border border-white/[0.06] text-text-tertiary font-medium tracking-wide">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover background glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-accent/[0.02] via-transparent to-transparent rounded-lg" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   PREMIUM CTA — Full-Screen Cinematic
   ═══════════════════════════════════════════════ */

const TICKER_ITEMS = ['50+ Projects', 'Design & Development', '100% Client Retention', '3-7 Day Delivery', 'Based in Dhaka', 'Global Clients', 'Premium Quality', 'Est. 2024']

function PremiumCTA() {
  const navigate = useNavigate()
  return (
    <section className="py-36 md:py-56 bg-void relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="mesh-gradient-bg absolute inset-0 pointer-events-none" />
      <AmbientOrbs />
      <div className="noise-overlay" />

      {/* Marquee ticker strip */}
      <div className="absolute top-0 left-0 w-full border-b border-white/[0.04] overflow-hidden">
        <div className="py-4 flex">
          <div className="marquee-infinite">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="text-[10px] text-text-tertiary/70 font-medium uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-4">
                {item}
                <span className="w-1 h-1 rounded-full bg-accent/20" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easing.expoOut }}
          className="space-y-8"
        >
          {/* Giant editorial heading */}
          <h2
            className="font-display font-semibold tracking-ultra-tight text-text-primary leading-ultra-tight"
            style={{ fontSize: 'clamp(40px, 8vw, 120px)' }}
          >
            Let's create<br />
            something<br />
            <span className="text-text-tertiary">extraordinary.</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto leading-relaxed">
            Your brand deserves a digital experience that matches its ambition.
          </p>

          {/* Single pill CTA + ghost link */}
          <motion.div
            className="flex flex-wrap justify-center gap-5 pt-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: easing.expoOut, delay: 0.2 }}
          >
            <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
              Start a Project <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="lg" onClick={() => navigate('/work')}>
              View Our Work
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decorative accent line */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="accent-glow-line mx-auto max-w-2xl" />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════ */

export default function Home() {
  return (
    <motion.main
      className="bg-abyss overflow-x-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar />

      <Hero3DSection />
      <AboutTeaser />
      <HorizontalScroll />
      <ServicesTeaser />
      <HowItWorks />
      <PortfolioSection />
      <FAQSection />
      <PremiumCTA />

      <Footer />
    </motion.main>
  )
}
