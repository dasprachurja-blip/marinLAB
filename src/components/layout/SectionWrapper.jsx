import { motion } from 'motion/react'
import { cn } from '@/utils/cn'
import { revealUp, viewportOnce } from '@/animations/motionPresets'

export default function SectionWrapper({ children, id, className }) {
  return (
    <motion.section
      id={id}
      data-section={id}
      className={cn('py-32 md:py-40 relative', className)}
      initial={revealUp.initial}
      whileInView={revealUp.animate}
      viewport={viewportOnce}
      transition={revealUp.transition}
    >
      <div className="section-container">
        {children}
      </div>
    </motion.section>
  )
}
