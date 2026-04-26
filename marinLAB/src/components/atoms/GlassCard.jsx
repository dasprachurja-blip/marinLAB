import { cn } from '@/utils/cn'

export default function GlassCard({ children, className, hover = true, ...props }) {
  return (
    <div
      className={cn(
        'glass-card relative overflow-hidden',
        hover && 'transition-all duration-500 hover:border-teal/40 hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
