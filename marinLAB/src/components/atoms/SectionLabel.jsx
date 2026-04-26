import { cn } from '@/utils/cn'

export default function SectionLabel({ children, className }) {
  return (
    <div className={cn(
      'inline-block text-teal text-xs font-semibold uppercase tracking-widest mb-4',
      className
    )}>
      {children}
      <div className="mt-1.5 h-0.5 w-10 bg-teal rounded-full" />
    </div>
  )
}
