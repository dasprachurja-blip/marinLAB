import { useState } from 'react'
import { motion } from 'motion/react'
import SectionWrapper from '@/components/layout/SectionWrapper'
import { faqs } from '@/data/faq'
import { cn } from '@/utils/cn'
import { easing, viewportOnce } from '@/animations/motionPresets'

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, ease: easing.expoOut, delay: index * 0.08 }}
    >
      <div className={cn('border-b border-white/[0.06] transition-colors duration-300', open && 'border-accent/15')}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center py-7 md:py-8 text-left group cursor-pointer"
        >
          <span className="text-base md:text-lg font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-300 pr-8">{question}</span>
          <span className="text-xl text-text-tertiary font-light shrink-0 transition-transform duration-300 w-6 h-6 flex items-center justify-center">
            {open ? '−' : '+'}
          </span>
        </button>
        <div className={cn(
          'overflow-hidden transition-all duration-500 ease-cinema',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}>
          <div className="pb-8">
            <p className="text-sm text-text-secondary/50 leading-relaxed max-w-2xl">{answer}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function FAQSection() {
  return (
    <SectionWrapper>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="font-display font-semibold tracking-super-tight text-text-primary"
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
