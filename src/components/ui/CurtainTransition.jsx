import { motion } from 'motion/react'

/**
 * CurtainTransition — Polished black curtain with accent flash
 * Entry: curtain slides down to reveal content
 * Exit: curtain slides up to cover content
 * Accent line shoots across at peak transition
 */
export default function CurtainTransition({ children }) {
  return (
    <>
      {children}
      
      {/* Primary curtain — covers on exit, reveals on enter */}
      <motion.div
        className="curtain-panel"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          background: '#050507',
          transformOrigin: 'top',
          pointerEvents: 'none',
        }}
      >
        {/* Accent line flash at bottom edge */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 1, 0] }}
          exit={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(77,158,255,0.6), rgba(77,158,255,0.8), rgba(77,158,255,0.6), transparent)',
            transformOrigin: 'left',
            boxShadow: '0 0 20px rgba(77,158,255,0.3)',
          }}
        />
      </motion.div>

      {/* Secondary curtain — slight delay for layered depth */}
      <motion.div
        className="curtain-panel-2"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.55,
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
