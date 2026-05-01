import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './HorizontalScroll.css'

import BackgroundAtmosphere from './atmosphere/BackgroundAtmosphere'
import ProgressBar from './atoms/ProgressBar'
import IntroCard from './cards/IntroCard'
import SocialCards from './cards/SocialCards'
import ShowcaseCard from './cards/ShowcaseCard'
import TechStackCard from './cards/TechStackCard'
import FacebookCard from './cards/FacebookCard'
import InstagramCard from './cards/InstagramCard'
import CTACard from './cards/CTACard'
import PhilosophyCard from './cards/PhilosophyCard'

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

    // Allow other ScrollTriggers (Hero, HowItWorks) to settle first
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const totalScroll = track.scrollWidth - window.innerWidth

        // Main horizontal scroll tween
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
              // Update progress bar directly via ref for performance
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`
              }
            },
          },
        })

        // Staggered card reveal using containerAnimation
        const cards = track.querySelectorAll('[data-card]')
        cards.forEach((card, i) => {
          // Get the first child (the GlassCard wrapper)
          const inner = card.querySelector('.glass-hz') || card

          gsap.fromTo(
            inner,
            {
              opacity: 0,
              y: 40,
              scale: 0.96,
            },
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

          // Premium Parallax Effect inside cards
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

  // Mobile: native horizontal scroll with progress
  const handleMobileScroll = useCallback((e) => {
    const el = e.currentTarget
    const max = el.scrollWidth - el.clientWidth
    if (max > 0 && progressRef.current) {
      progressRef.current.style.transform = `scaleX(${el.scrollLeft / max})`
    }
  }, [])

  if (isMobile) {
    return (
      <section id="services" className="relative bg-[#040714]">
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
            <SocialCards />
            <ShowcaseCard />
            <TechStackCard />
            <FacebookCard />
            <InstagramCard />
            <CTACard />
            <PhilosophyCard />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} id="services" className="hz-section" style={{ zIndex: 1 }}>
      <BackgroundAtmosphere trackRef={trackRef} />
      <div ref={progressRef} className="hz-progress" />

      {/* Pinned label */}
      <div className="hz-pinned-label">WHAT WE DO</div>

      {/* Horizontal track */}
      <div ref={trackRef} className="hz-track">
        <IntroCard />
        <SocialCards />
        <ShowcaseCard />
        <TechStackCard />
        <FacebookCard />
        <InstagramCard />
        <CTACard />
        <PhilosophyCard />
      </div>
    </section>
  )
}
