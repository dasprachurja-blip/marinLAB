import { Suspense, lazy } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import StatsStrip from '@/components/sections/StatsStrip'
import { ServicesSkeleton } from '@/components/sections/skeletons/ServicesSkeleton'
import { PricingSkeleton } from '@/components/sections/skeletons/PricingSkeleton'
import { PortfolioSkeleton, GenericSkeleton } from '@/components/sections/skeletons/PortfolioSkeleton'

const ServicesSection = lazy(() => import('@/components/sections/ServicesSection'))
const HowItWorks = lazy(() => import('@/components/sections/HowItWorks'))
const PortfolioSection = lazy(() => import('@/components/sections/PortfolioSection'))
const PricingSection = lazy(() => import('@/components/sections/PricingSection'))
const AboutSection = lazy(() => import('@/components/sections/AboutSection'))
const ContactSection = lazy(() => import('@/components/sections/ContactSection'))
const FAQSection = lazy(() => import('@/components/sections/FAQSection'))

export default function Home() {
  return (
    <main className="bg-navy overflow-x-hidden">
      <Navbar />

      {/* Critical path — no lazy loading */}
      <HeroSection />
      <StatsStrip />

      {/* Deferred sections with skeleton fallbacks */}
      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={<GenericSkeleton />}>
        <HowItWorks />
      </Suspense>

      <Suspense fallback={<PortfolioSkeleton />}>
        <PortfolioSection />
      </Suspense>

      <Suspense fallback={<PricingSkeleton />}>
        <PricingSection />
      </Suspense>

      <Suspense fallback={<GenericSkeleton />}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<GenericSkeleton />}>
        <ContactSection />
      </Suspense>

      <Suspense fallback={<GenericSkeleton />}>
        <FAQSection />
      </Suspense>

      <Footer />
    </main>
  )
}
