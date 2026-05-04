import { cn } from '@/utils/cn'

export default function SectionLabel({ children, className }) {
  return (
    <span className={cn('section-label', className)}>
      {children}
    </span>
  )
}
