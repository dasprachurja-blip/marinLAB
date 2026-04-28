import { cn } from '@/utils/cn'

export default function Badge({ children, className }) {
  return (
    <div className={cn(
      'inline-flex items-center gap-3 px-4 py-1.5 rounded-full',
      'border border-primary/30 bg-primary/5',
      'text-primary text-[10px] font-bold tracking-[0.2em] uppercase',
      className
    )}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
      </span>
      {children}
    </div>
  )
}
