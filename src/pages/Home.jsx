import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero3DSection from '@/components/sections/Hero3D/Hero3DSection'
import StatsStrip from '@/components/sections/StatsStrip'
import HorizontalScroll from '@/components/sections/HorizontalScroll'
import HowItWorks from '@/components/sections/HowItWorks'
import PortfolioSection from '@/components/sections/PortfolioSection'
import FAQSection from '@/components/sections/FAQSection'
import Button from '@/components/atoms/Button'
import TargetCursor from '@/components/ui/TargetCursor'
import { easing, viewportOnce, pageVariants } from '@/animations/motionPresets'

/* ── About Teaser — cinematic split section ── */
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

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easing.expoOut, delay: 0.15 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '50+', label: 'Projects Shipped' },
                { value: '100%', label: 'Client Retention' },
                { value: '3-7', label: 'Day Delivery' },
                { value: '24/7', label: 'Active Support' },
              ].map((stat, i) => (
                <div key={stat.label} className="glass-card p-6 text-center hover:border-accent/15 transition-colors duration-400">
                  <div className="text-2xl md:text-3xl font-display font-semibold text-text-primary mb-1 tracking-tight">{stat.value}</div>
                  <p className="text-[10px] uppercase tracking-label text-text-tertiary font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Services Teaser — editorial with links to services page ── */
function ServicesTeaser() {
  const navigate = useNavigate()
  const services = [
    { num: '01', title: 'UI/UX Design' },
    { num: '02', title: 'Frontend Engineering' },
    { num: '03', title: 'Full-Stack Development' },
    { num: '04', title: 'SEO & Growth' },
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
              className="group flex items-center gap-6 py-8 border-b border-white/[0.04] cursor-pointer hover:border-accent/15 transition-colors duration-400"
              onClick={() => navigate('/services')}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: easing.expoOut, delay: i * 0.06 }}
            >
              <span className="text-xs text-accent/40 font-display tracking-label w-8">{s.num}</span>
              <h3 className="text-xl md:text-3xl font-display font-semibold text-text-secondary group-hover:text-text-primary transition-colors duration-400 tracking-tight flex-1">
                {s.title}
              </h3>
              <ArrowRight className="w-5 h-5 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0" />
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
      <div className="hero-glow z-0" />
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
      <StatsStrip />
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
