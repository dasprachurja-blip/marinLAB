import { cn } from '@/utils/cn'

export default function SkeletonBlock({ className, ...props }) {
  return (
    <div
      className={cn('bg-white/5 rounded-lg animate-pulse', className)}
      {...props}
    />
  )
}
