import { CheckCircle } from 'lucide-react'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionLabel from '@/components/atoms/SectionLabel'
import GlassCard from '@/components/atoms/GlassCard'
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
      <GlassCard
        className={cn(
          'p-10 flex flex-col h-full relative',
          plan.featured && 'border-primary/40 !bg-navy-light md:scale-105 z-10 shadow-[0_0_40px_rgba(72,217,180,0.1)]'
        )}
      >
        {plan.badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-navy-dark text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider">
            {plan.badge}
          </div>
        )}

        <h4 className="text-lg font-bold uppercase tracking-wider mb-2">{plan.label}</h4>
        <div className="text-3xl md:text-4xl font-bold mb-8">
          {plan.pricePrefix || ''}{formatPrice(plan.price)}{plan.priceSuffix || ''}
        </div>

        <ul className="space-y-4 mb-10 flex-grow">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-muted">
              <CheckCircle className="w-5 h-5 text-primary shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={plan.variant}
          className="w-full"
          onClick={scrollToContact}
        >
          {plan.cta}
        </Button>
      </GlassCard>
    </div>
  )
}

export default function PricingSection() {
  return (
    <SectionWrapper id="pricing" className="bg-navy-dark/50">
      <div className="text-center mb-16 reveal-up">
        <SectionLabel>PRICING</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Transparent Investment</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, i) => (
          <PricingCard key={plan.id} plan={plan} delay={i * 100} />
        ))}
      </div>
    </SectionWrapper>
  )
}
