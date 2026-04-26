import { cn } from '@/utils/cn'

export default function SectionWrapper({ children, className, id, ...props }) {
  return (
    <section
      id={id}
      className={cn('relative py-24 md:py-32', className)}
      {...props}
    >
      <div className="section-container relative z-10">
        {children}
      </div>
    </section>
  )
}
