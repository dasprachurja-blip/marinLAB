import { useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AboutHero from '@/components/sections/about/AboutHero'
import CapabilityCards from '@/components/sections/about/CapabilityCards'
import FoundersSection from '@/components/sections/about/FoundersSection'
import TargetCursor from '@/components/ui/TargetCursor'
import './About.css'

export default function About() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="about-page bg-navy overflow-x-hidden">
      <TargetCursor
        targetSelector="button, a, .cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      <Navbar />

      <AboutHero />
      <CapabilityCards />
      <FoundersSection />

      <Footer />
    </main>
  )
}
