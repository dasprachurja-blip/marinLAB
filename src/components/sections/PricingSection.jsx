import { CheckCircle } from 'lucide-react'
import SectionWrapper from '@/components/layout/SectionWrapper'
import Button from '@/components/atoms/Button'
import { plans } from '@/data/pricing'
import { formatPrice } from '@/utils/formatPrice'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'
import { getLenis } from '@/hooks/useLenis'

function PricingCard({ plan, delay }) {
  const [ref, inView] = useInView({ threshold: 0.2 })

  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) {
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(el, { offset: -80 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={cn(
          'glass-card p-10 flex flex-col h-full relative',
          plan.featured && 'border-white/15'
        )}
      >
        {/* Featured accent line */}
        {plan.featured && (
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        )}

        {plan.badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#0A0B0F] text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">
            {plan.badge}
          </div>
        )}

        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">{plan.label}</h4>
        <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-10 tracking-tight">
          {plan.pricePrefix || ''}{formatPrice(plan.price)}{plan.priceSuffix || ''}
        </div>

        <ul className="space-y-4 mb-10 flex-grow">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-white/40 text-sm">
              <CheckCircle className="w-4 h-4 text-white/30 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={plan.featured ? 'primary' : 'secondary'}
          className="w-full"
          onClick={scrollToContact}
        >
          {plan.cta}
        </Button>
      </div>
    </div>
  )
}

export default function PricingSection() {
  return (
    <SectionWrapper id="pricing" className="bg-[#08090D]">
      <div className="text-center mb-20">
        <span className="section-label mb-4 block mx-auto justify-center">PRICING</span>
        <h2
          className="font-heading font-bold tracking-super-tight text-white"
          style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
        >
          Transparent Investment
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan, i) => (
          <PricingCard key={plan.id} plan={plan} delay={i * 100} />
        ))}
      </div>
    </SectionWrapper>
  )
}
