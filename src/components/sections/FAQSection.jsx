import { useState } from 'react'
import SectionWrapper from '@/components/layout/SectionWrapper'
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
      <div className={cn('border-b border-white/[0.06] transition-colors duration-300', open && 'border-white/[0.12]')}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center py-7 md:py-8 text-left group"
        >
          <span className="text-base md:text-lg font-semibold text-white/70 group-hover:text-white transition-colors duration-300 pr-8">{question}</span>
          <span className="text-xl text-white/20 font-light shrink-0 transition-transform duration-300 w-6 h-6 flex items-center justify-center">
            {open ? '−' : '+'}
          </span>
        </button>
        <div
          className={cn(
            'overflow-hidden transition-all duration-500 ease-cinematic',
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="pb-8">
            <p className="text-sm text-white/30 leading-relaxed max-w-2xl">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  return (
    <SectionWrapper>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="font-heading font-bold tracking-super-tight text-white"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
          >
            Questions answered.
          </h2>
        </div>
        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={faq.id} {...faq} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
