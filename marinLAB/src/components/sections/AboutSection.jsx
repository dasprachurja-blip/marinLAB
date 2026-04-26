import SectionWrapper from '@/components/layout/SectionWrapper'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

const tags = ['DHAKA HEADQUARTERS', 'GLOBAL CLIENTS', 'PRECISION ENGINEERING']

export default function AboutSection() {
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <SectionWrapper>
      <div
        ref={ref}
        className={cn(
          'max-w-3xl mx-auto text-center transition-all duration-700',
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-12">
          Built in Bangladesh.{' '}
          <span className="teal-gradient-text">Trusted Worldwide.</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {tags.map((tag, i) => (
            <span
              key={tag}
              className={cn(
                'px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm tracking-widest text-muted transition-all duration-500',
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: `${400 + i * 100}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
