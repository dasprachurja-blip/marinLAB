import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLenis } from '@/hooks/useLenis'
import { initGSAP } from '@/animations/gsap.config'
import PageWrapper from '@/components/layout/PageWrapper'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'

export default function App() {
  useLenis()

  useEffect(() => {
    initGSAP()
  }, [])

  return (
    <PageWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageWrapper>
  )
}
