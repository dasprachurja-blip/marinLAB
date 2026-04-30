import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero3DSection from '@/components/sections/Hero3D/Hero3DSection'
import StatsStrip from '@/components/sections/StatsStrip'
import ServicesSection from '@/components/sections/ServicesSection'
import HowItWorks from '@/components/sections/HowItWorks'
import PortfolioSection from '@/components/sections/PortfolioSection'
import PricingSection from '@/components/sections/PricingSection'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import FAQSection from '@/components/sections/FAQSection'
import TargetCursor from '@/components/ui/TargetCursor'

export default function Home() {
  return (
    <main className="bg-navy overflow-x-hidden">
      <TargetCursor 
        targetSelector="button, a, .cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      <Navbar />

      <Hero3DSection />
      <StatsStrip />
      <ServicesSection />
      <HowItWorks />
      <PortfolioSection />
      <PricingSection />
      <AboutSection />
      <ContactSection />
      <FAQSection />

      <Footer />
    </main>
  )
}
