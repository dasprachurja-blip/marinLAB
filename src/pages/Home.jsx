import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero3DSection from '@/components/sections/Hero3D/Hero3DSection'

import HorizontalScroll from '@/components/sections/HorizontalScroll'
import HowItWorks from '@/components/sections/HowItWorks'
import PortfolioSection from '@/components/sections/PortfolioSection'
import FAQSection from '@/components/sections/FAQSection'
import Button from '@/components/atoms/Button'
import TargetCursor from '@/components/ui/TargetCursor'
import AmbientOrbs from '@/components/ui/AmbientOrbs'
import { easing, viewportOnce, pageVariants } from '@/animations/motionPresets'

/* ── About Teaser — cinematic split section ── */
const MARQUEE_ITEMS = ['50+ Projects', '3–7 Day Delivery', '100% Client Retention', 'Est. 2024', 'Available for Projects', 'Dhaka → Global']

function AboutTeaser() {
  const navigate = useNavigate()
  return (
    <section className="py-24 md:py-40 bg-abyss relative overflow-hidden">
      <div className="noise-overlay" />
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easing.expoOut }}
          >
            <span className="section-label mb-6 block">THE STUDIO</span>
            <h2 className="font-display font-semibold tracking-super-tight text-text-primary mb-6" style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}>
              We don't just build websites.<br />
              <span className="text-text-tertiary">We engineer experiences.</span>
            </h2>
            <p className="text-text-secondary/60 text-base leading-relaxed max-w-lg mb-8">
              ArcticFlow is a design & development studio obsessed with craft. Every pixel, every animation, every line of code is intentional.
            </p>
            <Button variant="secondary" onClick={() => navigate('/about')}>
              About Us <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Marquee credibility strip — replaces stats grid */}
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-white/[0.04] bg-surface/50 py-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easing.expoOut, delay: 0.15 }}
          >
            <div className="flex gap-12 animate-marquee">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span key={i} className="text-[11px] text-text-tertiary font-medium uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-4">
                  {item}
                  <span className="w-1 h-1 rounded-full bg-accent/30" />
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Services Teaser — editorial accordion with deep links ── */
function ServicesTeaser() {
  const navigate = useNavigate()
  const services = [
    { num: '01', title: 'UI/UX Design', slug: 'ui-ux', desc: 'Research-driven interfaces engineered for conversion and engagement.', tags: ['Design Systems', 'Figma', 'Prototyping'] },
    { num: '02', title: 'Frontend Engineering', slug: 'frontend', desc: 'Pixel-perfect, buttery-smooth interfaces built with React and modern tooling.', tags: ['React', 'Next.js', 'Animation'] },
    { num: '03', title: 'Full-Stack Development', slug: 'fullstack', desc: 'Robust architectures pairing scalable backends with dynamic frontends.', tags: ['Node.js', 'Databases', 'APIs'] },
    { num: '04', title: 'SEO & Growth', slug: 'seo', desc: 'Technical SEO, content strategy, and analytics that put you on page one.', tags: ['Analytics', 'Performance', 'Strategy'] },
  ]

  return (
    <section className="py-24 md:py-40 bg-surface relative overflow-hidden">
      <div className="noise-overlay" />
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
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              className="group border-b border-white/[0.04] cursor-pointer hover:border-accent/15 transition-all duration-400"
              onClick={() => navigate(`/services#${s.slug}`)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: easing.expoOut, delay: i * 0.06 }}
            >
              <div className="flex items-center gap-6 py-8">
                <span className="text-xs text-accent/40 font-display tracking-label w-8">{s.num}</span>
                <h3 className="text-xl md:text-3xl font-display font-semibold text-text-secondary group-hover:text-text-primary transition-colors duration-400 tracking-tight flex-1">
                  {s.title}
                </h3>
                <ArrowRight className="w-5 h-5 text-text-tertiary group-hover:text-accent group-hover:translate-x-2 transition-all duration-400 shrink-0" />
              </div>
              {/* Accordion expand on hover */}
              <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 ease-cinema">
                <div className="pb-6 pl-14 flex flex-col md:flex-row md:items-center gap-3">
                  <p className="text-sm text-text-secondary/50 max-w-md">{s.desc}</p>
                  <div className="flex gap-2 flex-wrap">
                    {s.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full border border-white/[0.06] text-text-tertiary font-medium tracking-wide">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Premium CTA Section ── */
function PremiumCTA() {
  const navigate = useNavigate()
  return (
    <section className="py-32 md:py-48 bg-void relative overflow-hidden">
      <AmbientOrbs />
      <div className="noise-overlay" />
      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easing.expoOut }}
          className="space-y-8"
        >
          <h2 className="font-display font-semibold tracking-ultra-tight text-text-primary leading-ultra-tight" style={{ fontSize: 'clamp(36px, 6vw, 88px)' }}>
            Let's create something<br />
            <span className="text-text-tertiary">extraordinary.</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Your brand deserves a digital experience that matches its ambition.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
              Start a Project <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="lg" onClick={() => navigate('/work')}>
              View Our Work
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <motion.main
      className="bg-abyss overflow-x-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <TargetCursor
        targetSelector="button, a, .cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
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
