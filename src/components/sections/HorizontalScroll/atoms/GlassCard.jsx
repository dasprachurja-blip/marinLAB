import { useRef, useCallback } from 'react'
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
    <div
      ref={cardRef}
      className={cn('glass-hz', className)}
      style={style}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <div className="hz-noise opacity-[0.03] pointer-events-none absolute inset-0 z-0" />
      {children}
    </div>
  )
}
