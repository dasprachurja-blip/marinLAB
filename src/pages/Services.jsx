import { useEffect } from 'react'
import { motion } from 'motion/react'
import { Palette, Terminal, TrendingUp, Layers, ShoppingCart, MapPin, Settings, ArrowRight, ArrowLeft } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/sections/PageHero'
import Button from '@/components/atoms/Button'
import TargetCursor from '@/components/ui/TargetCursor'
import { easing, viewportOnce, pageVariants } from '@/animations/motionPresets'
import { useNavigate } from 'react-router-dom'

const services = [
  { icon: Palette, title: 'UI/UX Design', desc: 'Research-driven interfaces engineered for conversion. We map every interaction to maximize engagement and revenue.', tag: '01', slug: 'ui-ux' },
  { icon: Terminal, title: 'Frontend Engineering', desc: 'Pixel-perfect, buttery-smooth interfaces built with React, Next.js, and modern animation libraries.', tag: '02', slug: 'frontend' },
  { icon: Layers, title: 'Full-Stack Development', desc: 'Robust architectures pairing scalable backends with dynamic, data-driven frontends.', tag: '03', slug: 'fullstack' },
  { icon: TrendingUp, title: 'SEO & Growth', desc: 'Technical SEO, content strategy, and analytics pipelines that put you on page one and keep you there.', tag: '04', slug: 'seo' },
  { icon: ShoppingCart, title: 'E-Commerce', desc: 'High-performance online stores with optimized checkout flows, inventory systems, and payment integration.', tag: '05', slug: 'ecommerce' },
  { icon: Settings, title: 'Ongoing Maintenance', desc: 'Security patches, performance monitoring, content updates — everything running flawlessly, always.', tag: '06', slug: 'maintenance' },
]

const processSteps = [
  { num: '01', title: 'Discovery', desc: 'Deep-dive into your brand, goals, audience, and competitive landscape to define the strategy.' },
  { num: '02', title: 'Architecture', desc: 'Information architecture, user flows, wireframes — the blueprint before a single pixel is placed.' },
  { num: '03', title: 'Design', desc: 'High-fidelity prototypes with obsessive attention to typography, spacing, color, and interaction.' },
  { num: '04', title: 'Engineering', desc: 'Clean, performant code. Every animation hand-tuned. Every interaction tested across devices.' },
  { num: '05', title: 'Launch & Iterate', desc: 'Deployment, monitoring, analytics integration. Then we refine based on real user data.' },
]

function ServiceCard({ service, index }) {
  return (
    <motion.div
      id={service.slug}
      className="group relative border-b border-white/[0.04] py-10 md:py-14 scroll-mt-32"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: easing.expoOut, delay: index * 0.06 }}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
        <div className="flex items-center gap-4 md:w-72 shrink-0">
          <span className="text-xs text-accent/50 font-display font-medium tracking-label">{service.tag}</span>
          <div className="w-11 h-11 rounded-full border border-white/8 bg-surface flex items-center justify-center group-hover:border-accent/20 group-hover:bg-accent-subtle transition-all duration-400">
            <service.icon className="w-4.5 h-4.5 text-text-tertiary group-hover:text-accent transition-colors duration-400" />
          </div>
          <h3 className="text-xl md:text-2xl font-display font-semibold text-text-primary tracking-tight">{service.title}</h3>
        </div>
        <p className="text-text-secondary/60 text-base leading-relaxed max-w-xl md:pt-1">{service.desc}</p>
      </div>
    </motion.div>
  )
}

function ProcessStep({ step, index }) {
  return (
    <motion.div
      className="relative flex gap-8 md:gap-12"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: easing.expoOut, delay: index * 0.08 }}
    >
      <div className="flex flex-col items-center shrink-0">
        <div className="w-12 h-12 rounded-full border border-accent/20 bg-accent-subtle flex items-center justify-center">
          <span className="text-sm font-display font-semibold text-accent">{step.num}</span>
        </div>
        {index < processSteps.length - 1 && (
          <div className="w-px flex-1 bg-white/[0.06] mt-4" />
        )}
      </div>
      <div className="pb-14 md:pb-20">
        <h4 className="text-2xl md:text-3xl font-display font-semibold text-text-primary tracking-tight mb-3">{step.title}</h4>
        <p className="text-text-secondary/60 text-base leading-relaxed max-w-lg">{step.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  // Hash-based scroll to specific service
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 600);
    }
  }, []);

  return (
    <motion.main
      className="bg-abyss overflow-x-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <TargetCursor targetSelector="button, a, .cursor-target" spinDuration={2} hideDefaultCursor={true} parallaxOn={true} />
      <Navbar />

      <PageHero
        label="SERVICES"
        title={<>What we<br /><span className="text-text-tertiary">build.</span></>}
        subtitle="End-to-end digital product design and engineering. From strategy through launch and beyond."
      >
        <div className="flex items-center gap-4 mt-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/about')}>
            <ArrowLeft className="w-3.5 h-3.5" /> About
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate('/work')}>
            Work <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </PageHero>

      {/* Services List */}
      <section className="py-24 md:py-32 bg-abyss">
        <div className="section-container">
          {services.map((service, i) => (
            <ServiceCard key={service.tag} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* Separator */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
      </div>

      {/* Process Timeline */}
      <section className="py-24 md:py-40 bg-abyss">
        <div className="section-container">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: easing.expoOut }}
          >
            <span className="section-label mb-6 block">THE PROCESS</span>
            <h2 className="font-display font-semibold tracking-super-tight text-text-primary" style={{ fontSize: 'clamp(32px, 4vw, 64px)' }}>
              How we work.
            </h2>
          </motion.div>

          <div className="max-w-3xl">
            {processSteps.map((step, i) => (
              <ProcessStep key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40 bg-surface relative overflow-hidden">
        <div className="hero-glow z-0" />
        <div className="noise-overlay" />
        <div className="section-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easing.expoOut }}
          >
            <h2 className="font-display font-semibold tracking-super-tight text-text-primary mb-6" style={{ fontSize: 'clamp(32px, 5vw, 72px)' }}>
              Ready to build<br /><span className="text-text-tertiary">something exceptional?</span>
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto mb-10 text-lg">
              Let's discuss your project. No sales pitch — just a real conversation about what you need.
            </p>
            <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
              Start a Project <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.main>
  )
}
