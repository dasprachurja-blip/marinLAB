import { cn } from '@/utils/cn'

export default function Badge({ children, className }) {
  return (
    <div className={cn(
      'inline-flex items-center gap-3 px-4 py-1.5 rounded-full',
      'border border-teal/30 bg-teal/5',
      'text-teal text-[10px] font-bold tracking-[0.2em] uppercase',
      className
    )}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
      </span>
      {children}
    </div>
  )
}
