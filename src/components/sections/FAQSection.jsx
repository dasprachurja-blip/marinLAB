import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionWrapper from '@/components/layout/SectionWrapper'
import GlassCard from '@/components/atoms/GlassCard'
import { faqs } from '@/data/faq'
import { cn } from '@/utils/cn'
import { useInView } from '@/hooks/useInView'

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false)
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-500',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <GlassCard
        hover={false}
        className={cn('overflow-hidden transition-all duration-300', open && 'border-primary/30')}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center p-6 md:p-8 text-left group"
        >
          <span className="text-lg md:text-xl font-bold pr-4">{question}</span>
          <ChevronDown
            className={cn(
              'w-5 h-5 text-primary shrink-0 transition-transform duration-300',
              open && 'rotate-180'
            )}
          />
        </button>
        <div
          className={cn(
            'overflow-hidden transition-all duration-500',
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="px-6 md:px-8 pb-6 md:pb-8">
            <p className="text-muted leading-relaxed">{answer}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}

export default function FAQSection() {
  return (
    <SectionWrapper>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-16 reveal-up">
          Common Inquiries
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.id} {...faq} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
