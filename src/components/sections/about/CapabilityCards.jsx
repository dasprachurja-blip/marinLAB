import { useRef, useEffect, useCallback } from 'react'
import { Layers, Zap, Search, Sparkles, Palette, Settings2 } from 'lucide-react'

const capabilities = [
  {
    id: 1,
    icon: Layers,
    title: 'Cinematic UI/UX',
    desc: 'Interfaces that feel physical, layered, and immersive — not flat templates.',
  },
  {
    id: 2,
    icon: Zap,
    title: 'Performance-First Development',
    desc: 'Sub-second loads. 60fps motion. Lighthouse scores that actually matter.',
  },
  {
    id: 3,
    icon: Search,
    title: 'SEO-Friendly Architecture',
    desc: 'Semantic structure, optimized assets, and discoverable from day one.',
  },
  {
    id: 4,
    icon: Sparkles,
    title: 'Premium Motion Systems',
    desc: 'Scroll-driven choreography. GSAP-powered transitions that guide attention.',
  },
  {
    id: 5,
    icon: Palette,
    title: 'Modern Brand Experiences',
    desc: 'Visual identity translated into living, breathing digital form.',
  },
  {
    id: 6,
    icon: Settings2,
    title: 'Precision Engineering',
    desc: 'Clean architecture. Scalable systems. Code that ages well.',
  },
]

export default function CapabilityCards() {
  const gridRef = useRef(null)
  const cardRefs = useRef([])

  // Observe the GRID container, then stagger-reveal child cards
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const cards = cardRefs.current.filter(Boolean)
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.classList.add('is-revealed')
            }, i * 120) // stagger 120ms per card
          })
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )

    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  // Magnetic spotlight on hover
  const handleMouseMove = useCallback((e, index) => {
    const card = cardRefs.current[index]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const spotlight = card.querySelector('.cap-card__spotlight')
    if (spotlight) {
      spotlight.style.background = `radial-gradient(320px circle at ${x}px ${y}px, rgba(255,255,255,0.04), transparent 60%)`
    }
  }, [])

  return (
    <section className="capabilities-section" aria-label="Our capabilities">
      <div className="capabilities-section__container">
        <div className="capabilities__eyebrow">
          <span className="about-hero__eyebrow-line" />
          <span className="about-hero__eyebrow-text">What We Do</span>
        </div>

        <h2 className="capabilities__title">
          Craft, code,{' '}
          <span className="capabilities__title-accent">and everything between.</span>
        </h2>

        <div className="capabilities__grid" ref={gridRef}>
          {capabilities.map((cap, i) => {
            const Icon = cap.icon
            return (
              <div
                key={cap.id}
                className="cap-card"
                ref={(el) => (cardRefs.current[i] = el)}
                onMouseMove={(e) => handleMouseMove(e, i)}
              >
                <div className="cap-card__spotlight" />
                <div className="cap-card__inner">
                  <span className="cap-card__number">
                    {String(cap.id).padStart(2, '0')}
                  </span>
                  <div className="cap-card__icon">
                    <Icon size={17} strokeWidth={1.6} />
                  </div>
                  <h3 className="cap-card__title">{cap.title}</h3>
                  <p className="cap-card__desc">{cap.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
