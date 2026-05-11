import { useEffect } from 'react'
import { motion } from 'motion/react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AboutHero from '@/components/sections/about/AboutHero'
import CapabilityCards from '@/components/sections/about/CapabilityCards'
import FoundersSection from '@/components/sections/about/FoundersSection'
import TargetCursor from '@/components/ui/TargetCursor'
import { pageVariants } from '@/animations/motionPresets'
import './About.css'

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.main
      className="about-page bg-abyss overflow-x-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
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
    </motion.main>
  )
}
