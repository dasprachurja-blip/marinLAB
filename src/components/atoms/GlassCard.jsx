import { cn } from '@/utils/cn'

export default function GlassCard({ children, className, hover = true, ...props }) {
  return (
    <div
      className={cn(
        'glass-card relative overflow-hidden',
        hover && 'transition-all duration-500 hover:border-white/10 hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
