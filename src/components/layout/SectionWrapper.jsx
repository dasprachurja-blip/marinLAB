import { cn } from '@/utils/cn'

export default function SectionWrapper({ children, id, className }) {
  return (
    <section
      id={id}
      data-section={id}
      className={cn('py-32 md:py-40 relative', className)}
    >
      <div className="section-container">
        {children}
      </div>
    </section>
  )
}
