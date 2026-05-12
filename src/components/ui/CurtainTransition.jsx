import { motion } from 'motion/react'

/**
 * CurtainTransition — Full-bleed black curtain page transition
 * Slides DOWN to cover on exit, slides DOWN to reveal on enter
 * Inspired by Active Theory / Resn cinematic page transitions
 */
export default function CurtainTransition({ children }) {
  return (
    <>
      {children}
      
      {/* Entry curtain — slides down to reveal */}
      <motion.div
        className="curtain-panel"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.76, 0, 0.24, 1], // cinema easing
        }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          background: '#050507',
          transformOrigin: 'top',
          pointerEvents: 'none',
        }}
      />

      {/* Exit curtain — slides up as cover */}
      <motion.div
        className="curtain-panel-2"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.05,
        }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99998,
          background: '#0A0B0F',
          transformOrigin: 'bottom',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
