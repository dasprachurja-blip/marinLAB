import { useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/utils/cn'

export default function GlassCard({ children, className, style, ...props }) {
  const cardRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty('--mouse-x', `${x}%`)
    card.style.setProperty('--mouse-y', `${y}%`)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className={cn('glass-hz', className)}
      style={style}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.015, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
