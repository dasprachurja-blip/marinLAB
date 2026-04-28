import SectionWrapper from '@/components/layout/SectionWrapper'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'
import RotatingText from '@/components/ui/RotatingText'

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
          <span className="primary-gradient-text">Trusted Worldwide.</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
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

        {/* Glowing Badge with Rotating Text */}
        <div 
          className={cn(
            "inline-flex items-center justify-center transition-all duration-1000",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="relative group mt-4">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Badge Container */}
            <div className="relative flex items-center gap-4 px-8 py-4 rounded-full bg-navy-light border border-primary/30 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
              <span className="text-muted text-lg font-medium tracking-wide uppercase">We Build</span>
              
              <RotatingText
                texts={['Restaurants', 'Enterprises', 'Shops', 'Startups', 'Agencies']}
                mainClassName="text-primary font-bold text-2xl md:text-3xl overflow-hidden py-0.5 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
            </div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  )
}
