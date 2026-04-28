import { useRef } from 'react'
import * as Icons from 'lucide-react'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionLabel from '@/components/atoms/SectionLabel'
import MagicBento from '@/components/ui/MagicBento'
import { services } from '@/data/services'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

export default function ServicesSection() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  // Map our services data into the format expected by MagicBento
  // We apply the col-span classes to match our original 6-column grid layout
  const bentoItems = services.map(s => ({
    title: s.title,
    description: s.desc,
    icon: Icons[s.icon],
    className: cn(
      s.span === 2 && 'md:col-span-2',
      s.span === 3 && 'md:col-span-3'
    )
  }))

  return (
    <SectionWrapper id="services">
      <div className="text-center mb-16">
        <SectionLabel>WHAT WE DO</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Precision Services</h2>
      </div>

      <div 
        ref={ref}
        className={cn(
          "transition-all duration-1000",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}
      >
        <MagicBento 
          items={bentoItems}
          className="grid grid-cols-1 md:grid-cols-6 gap-6"
          textAutoHide={false}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={800}
          particleCount={12}
          glowColor="37, 99, 235"
        />
      </div>
    </SectionWrapper>
  )
}
