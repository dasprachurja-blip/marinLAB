import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './HorizontalScroll.css'

import BackgroundAtmosphere from './atmosphere/BackgroundAtmosphere'
import ProgressBar from './atoms/ProgressBar'
import IntroCard from './cards/IntroCard'
import BentoSocialCard from './cards/BentoSocialCard'
import ShowcaseCard from './cards/ShowcaseCard'
import CTACard from './cards/CTACard'

gsap.registerPlugin(ScrollTrigger)

const MOBILE_BREAKPOINT = 768

export default function HorizontalScroll() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // GSAP horizontal scroll — Desktop only
  useEffect(() => {
    if (isMobile || !containerRef.current || !trackRef.current) return

    const container = containerRef.current
    const track = trackRef.current
    let ctx

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const totalScroll = track.scrollWidth - window.innerWidth

        const scrollTween = gsap.to(track, {
          x: () => -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`
              }
            },
          },
        })

        // Card reveal animations
        const cards = track.querySelectorAll('[data-card]')
        cards.forEach((card) => {
          const inner = card.querySelector('.glass-hz') || card

          gsap.fromTo(
            inner,
            { opacity: 0, y: 40, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: 'left 90%',
                end: 'left 60%',
                scrub: true,
              },
            }
          )

          // Parallax
          const parallaxEls = card.querySelectorAll('.parallax-element')
          parallaxEls.forEach((el) => {
            const speed = el.dataset.parallaxSpeed === 'fast' ? 80 : 30
            gsap.fromTo(
              el,
              { x: speed },
              {
                x: -speed,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: 'left right',
                  end: 'right left',
                  scrub: true,
                },
              }
            )
          })
        })

        ScrollTrigger.refresh()
      }, container)
    }, 600)

    return () => {
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [isMobile])

  // Mobile scroll progress
  const handleMobileScroll = useCallback((e) => {
    const el = e.currentTarget
    const max = el.scrollWidth - el.clientWidth
    if (max > 0 && progressRef.current) {
      progressRef.current.style.transform = `scaleX(${el.scrollLeft / max})`
    }
  }, [])

  if (isMobile) {
    return (
      <section id="services" className="relative bg-[#07080A]">
        <div className="relative">
          <div ref={progressRef} className="hz-progress" />
          <div className="hz-pinned-label">WHAT WE DO</div>
          <div
            className="hz-section hz-track"
            onScroll={handleMobileScroll}
            style={{ overflowX: 'auto', overflowY: 'hidden' }}
          >
            <BackgroundAtmosphere trackRef={trackRef} />
            <IntroCard />
            <BentoSocialCard />
            <ShowcaseCard />
            <CTACard />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} id="services" className="hz-section" style={{ zIndex: 1 }}>
      <BackgroundAtmosphere trackRef={trackRef} />
      <div ref={progressRef} className="hz-progress" />

      <div className="hz-pinned-label">WHAT WE DO</div>

      <div ref={trackRef} className="hz-track">
        <IntroCard />
        <BentoSocialCard />
        <ShowcaseCard />
        <CTACard />
      </div>
    </section>
  )
}
