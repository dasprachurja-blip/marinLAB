import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import { useLenis } from '@/hooks/useLenis'
import { initGSAP } from '@/animations/gsap.config'
import PageWrapper from '@/components/layout/PageWrapper'
import AnimatedGrain from '@/components/ui/AnimatedGrain'
import CurtainTransition from '@/components/ui/CurtainTransition'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/Services'
import Work from '@/pages/Work'
import Pricing from '@/pages/Pricing'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'

export default function App() {
  useLenis()
  const location = useLocation()

  useEffect(() => {
    initGSAP()
  }, [])

  return (
    <PageWrapper>
      {/* Global animated film grain overlay */}
      <AnimatedGrain />
      
      <AnimatePresence mode="wait">
        <CurtainTransition key={location.pathname}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CurtainTransition>
      </AnimatePresence>
    </PageWrapper>
  )
}

