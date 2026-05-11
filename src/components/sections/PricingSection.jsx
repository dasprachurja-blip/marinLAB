import { motion } from 'motion/react'
import { CheckCircle } from 'lucide-react'
import SectionWrapper from '@/components/layout/SectionWrapper'
import Button from '@/components/atoms/Button'
import { plans } from '@/data/pricing'
import { formatPrice } from '@/utils/formatPrice'
import { easing, viewportOnce } from '@/animations/motionPresets'
import { getLenis } from '@/hooks/useLenis'
import { cn } from '@/utils/cn'

function PricingCard({ plan, delay }) {
  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) {
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(el, { offset: -80 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: easing.expoOut, delay }}
    >
      <div className={cn(
        'glass-card p-10 flex flex-col h-full relative transition-colors duration-400',
        plan.featured ? 'border-accent/20 hover:border-accent/30' : 'hover:border-white/10'
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
        <div className="text-4xl md:text-5xl font-display font-semibold text-text-primary mb-10 tracking-tight">
          {plan.pricePrefix || ''}{formatPrice(plan.price)}{plan.priceSuffix || ''}
        </div>
        <ul className="space-y-4 mb-10 flex-grow">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-text-secondary/60 text-sm">
              <CheckCircle className="w-4 h-4 text-accent/40 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button variant={plan.featured ? 'primary' : 'secondary'} className="w-full" onClick={scrollToContact}>
          {plan.cta}
        </Button>
      </div>
    </motion.div>
  )
}

export default function PricingSection() {
  return (
    <SectionWrapper id="pricing" className="bg-surface">
      <div className="text-center mb-20">
        <span className="section-label mb-4 block mx-auto justify-center">PRICING</span>
        <h2 className="font-display font-semibold tracking-super-tight text-text-primary" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
          Transparent Investment
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan, i) => (
          <PricingCard key={plan.id} plan={plan} delay={i * 0.1} />
        ))}
      </div>
    </SectionWrapper>
  )
}
