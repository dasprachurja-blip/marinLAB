import { motion } from 'motion/react'
import { easing } from '@/animations/motionPresets'

/**
 * Cinematic page hero — used on every internal page.
 * Large editorial heading with staggered word reveal.
 */
export default function PageHero({ label, title, subtitle, children }) {
  return (
    <header className="relative min-h-[70vh] flex items-end pb-20 md:pb-28 pt-32 overflow-hidden bg-void">
      {/* Ambient glow */}
      <div className="hero-glow z-0" />
      <div className="noise-overlay" />

      {/* Structural accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-white/[0.04] rounded-tl-2xl pointer-events-none z-10 hidden md:block" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-white/[0.04] rounded-tr-2xl pointer-events-none z-10 hidden md:block" />

      <div className="section-container relative z-10 w-full">
        {label && (
          <motion.span
            className="section-label mb-6 block"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing.expoOut, delay: 0.1 }}
          >
            {label}
          </motion.span>
        )}

        <motion.h1
          className="font-display font-semibold text-text-primary tracking-ultra-tight leading-ultra-tight"
          style={{ fontSize: 'clamp(40px, 7vw, 100px)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing.expoOut, delay: 0.2 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-lg md:text-xl text-text-secondary max-w-2xl mt-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing.expoOut, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing.expoOut, delay: 0.7 }}
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
    </header>
  )
}
