import { useEffect } from 'react'
import { motion } from 'motion/react'
import { CheckCircle, ArrowRight, Zap, Shield, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/sections/PageHero'
import Button from '@/components/atoms/Button'
import { easing, viewportOnce, pageVariants } from '@/animations/motionPresets'
import { cn } from '@/utils/cn'

const plans = [
  {
    id: 'starter',
    label: 'STARTER',
    price: '৳35K',
    desc: 'Perfect for launching your digital presence with a single high-impact landing page.',
    features: ['Single Landing Page', 'Responsive Design', 'SEO Foundation', 'Contact Integration', '3-Day Delivery'],
    variant: 'secondary',
  },
  {
    id: 'growth',
    label: 'GROWTH',
    badge: 'Most Popular',
    price: '৳65K',
    desc: 'A complete multi-page website with CMS, animations, and conversion optimization.',
    features: ['Up to 5 Pages', 'CMS Integration', 'Custom Animations', 'Analytics Setup', 'Priority Support', '7-Day Delivery'],
    variant: 'primary',
    featured: true,
  },
  {
    id: 'enterprise',
    label: 'ENTERPRISE',
    price: '৳120K+',
    desc: 'Full custom web applications, e-commerce platforms, and ongoing partnership.',
    features: ['Custom Web Application', 'E-Commerce Engine', 'API Integration', 'Dedicated Support', 'Performance SLA'],
    variant: 'secondary',
  },
]

const valueProps = [
  { icon: Zap, title: 'Speed', desc: 'Websites delivered in days, not months. Our streamlined process eliminates waste.' },
  { icon: Shield, title: 'Quality', desc: 'Hand-crafted code, no templates. Every pixel intentional, every interaction refined.' },
  { icon: Clock, title: 'Support', desc: 'Ongoing maintenance and optimization. Your site stays fast, secure, and current.' },
]

function PricingCard({ plan, index }) {
  const navigate = useNavigate()
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: easing.expoOut, delay: index * 0.1 }}
    >
      <div className={cn(
        'glass-card p-8 md:p-10 flex flex-col h-full relative transition-all duration-400',
        plan.featured ? 'border-accent/20 hover:border-accent/35' : 'hover:border-white/12'
      )}>
        {plan.featured && (
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        )}
        {plan.badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-void text-[10px] font-semibold px-4 py-1 rounded-full uppercase tracking-label">
            {plan.badge}
          </div>
        )}

        <h4 className="text-xs font-medium uppercase tracking-label text-text-tertiary mb-4">{plan.label}</h4>
        <div className="text-4xl md:text-5xl font-display font-semibold text-text-primary mb-4 tracking-tight">{plan.price}</div>
        <p className="text-sm text-text-secondary/70 leading-relaxed mb-8">{plan.desc}</p>

        <ul className="space-y-3.5 mb-10 flex-grow">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-text-secondary/80 text-sm">
              <CheckCircle className="w-4 h-4 text-accent/60 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <Button variant={plan.featured ? 'primary' : 'secondary'} className="w-full" onClick={() => navigate('/contact')}>
          {plan.featured ? 'Get Started' : 'Learn More'}
        </Button>
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  const navigate = useNavigate()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <motion.main
      className="bg-abyss overflow-x-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar />

      <PageHero
        label="INVESTMENT"
        title={<>Transparent<br /><span className="text-text-tertiary">pricing.</span></>}
        subtitle="No hidden fees. No scope creep. Clear deliverables with fixed timelines."
      />

      {/* Value Propositions */}
      <section className="py-16 md:py-24 bg-abyss">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop, i) => (
              <motion.div
                key={prop.title}
                className="flex gap-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: easing.expoOut, delay: i * 0.08 }}
              >
                <div className="w-10 h-10 rounded-full border border-accent/15 bg-accent-subtle flex items-center justify-center shrink-0">
                  <prop.icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h4 className="text-base font-display font-semibold text-text-primary mb-1.5">{prop.title}</h4>
                  <p className="text-sm text-text-secondary/70 leading-relaxed">{prop.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-32 bg-surface relative overflow-hidden">
        <div className="noise-overlay" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, i) => (
              <PricingCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Custom Project CTA */}
      <section className="py-24 md:py-40 bg-abyss">
        <div className="section-container">
          <motion.div
            className="glass-card p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 md:gap-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easing.expoOut }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
            <div className="flex-1">
              <span className="section-label mb-4 block">CUSTOM SCOPE</span>
              <h3 className="font-display font-semibold tracking-super-tight text-text-primary mb-4" style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}>
                Need something unique?
              </h3>
              <p className="text-text-secondary/80 text-base leading-relaxed max-w-lg">
                Enterprise applications, complex integrations, and custom solutions. Let's scope it together — no obligation.
              </p>
            </div>
            <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
              Let's Talk <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.main>
  )
}
