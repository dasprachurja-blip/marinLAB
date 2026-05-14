import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import SectionWrapper from '@/components/layout/SectionWrapper'
import { faqs } from '@/data/faq'
import { cn } from '@/utils/cn'
import { easing, viewportOnce } from '@/animations/motionPresets'

function FAQItem({ question, answer, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, ease: easing.expoOut, delay: index * 0.08 }}
    >
      <div className={cn(
        'border-b border-white/[0.06] transition-all duration-500 relative',
        isOpen && 'border-accent/15'
      )}>
        {/* Active indicator — left accent bar */}
        <div className={cn(
          'absolute left-0 top-0 bottom-0 w-[2px] rounded-full transition-all duration-500',
          isOpen ? 'bg-accent/50 shadow-[0_0_8px_rgba(77,158,255,0.2)]' : 'bg-transparent'
        )} />

        <button
          onClick={onToggle}
          className="w-full flex justify-between items-center py-7 md:py-8 text-left group cursor-pointer pl-5"
        >
          <div className="flex items-center gap-4 pr-8">
            <span className={cn(
              'text-[11px] font-display font-semibold tracking-wide transition-colors duration-300 shrink-0',
              isOpen ? 'text-accent/60' : 'text-text-tertiary/30'
            )}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className={cn(
              'text-base md:text-lg font-medium transition-colors duration-300',
              isOpen ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'
            )}>
              {question}
            </span>
          </div>

          {/* Animated icon — rotates between + and × */}
          <span className={cn(
            'w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500',
            isOpen
              ? 'border-accent/20 bg-accent/[0.06] text-accent rotate-45'
              : 'border-white/[0.08] text-text-tertiary group-hover:border-accent/15 rotate-0'
          )}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="6" y1="0" x2="6" y2="12" />
              <line x1="0" y1="6" x2="12" y2="6" />
            </svg>
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: easing.cinema }}
              className="overflow-hidden"
            >
              <div className="pb-8 pl-5 md:pl-14">
                <p className="text-sm text-text-secondary/60 leading-relaxed max-w-2xl">{answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="py-28 md:py-40 relative overflow-hidden bg-gradient-to-b from-abyss via-surface/50 to-abyss">
      <div className="noise-overlay" />

      {/* Decorative accent orb */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-accent/[0.02] blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column — Sticky heading + decoration */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: easing.expoOut }}
            >
              <span className="section-label mb-6 block">FAQ</span>
              <h2
                className="font-display font-semibold tracking-super-tight text-text-primary mb-6"
                style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
              >
                Questions<br />
                <span className="text-text-tertiary">answered.</span>
              </h2>
              <p className="text-text-secondary/50 text-sm leading-relaxed max-w-xs mb-8">
                Everything you need to know about working with ArcticFlow.
              </p>

              {/* Decorative element — vertical dotted line */}
              <div className="hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-accent/20" />
                  <span className="text-[10px] text-accent/40 font-medium tracking-label uppercase">{faqs.length} Questions</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column — Accordion */}
          <div className="lg:col-span-8">
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq.id}
                {...faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
