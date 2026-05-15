import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import GlassCard from '../atoms/GlassCard'

const concepts = [
  {
    id: 'reserve',
    label: 'Reserve',
    category: 'Restaurant booking',
    accent: '#f6b453',
    accentRgb: '246, 180, 83',
    brand: 'Harbor Table',
    nav: ['Menu', 'Private', 'Visit'],
    kicker: 'Tonight at 8:30',
    title: 'Coastal dining, booked in seconds.',
    shortTitle: 'Reserve a table.',
    subline: 'Seasonal menus, private tables, and a reservation flow that stays effortless on every screen.',
    cta: 'Reserve',
    heroMeta: '12 tables',
    heroLabel: 'available tonight',
    tiles: [
      ['Tasting', '7 courses'],
      ['Private room', '12 seats'],
      ['Rating', '4.9'],
    ],
  },
  {
    id: 'shop',
    label: 'Shop',
    category: 'E-commerce product',
    accent: '#66d9c4',
    accentRgb: '102, 217, 196',
    brand: 'Aster Goods',
    nav: ['New', 'Journal', 'Cart'],
    kicker: 'Signature drop',
    title: 'Premium products with zero friction.',
    shortTitle: 'Shop the drop.',
    subline: 'Product discovery, sizing, trust details, and checkout actions stay clear from phone to desktop.',
    cta: 'Add to cart',
    heroMeta: '$128',
    heroLabel: 'studio knit',
    tiles: [
      ['Stock', 'Ready'],
      ['Ships', '48 hrs'],
      ['Returns', '30 days'],
    ],
  },
  {
    id: 'care',
    label: 'Care',
    category: 'Clinic booking',
    accent: '#8fa7ff',
    accentRgb: '143, 167, 255',
    brand: 'Northline Care',
    nav: ['Services', 'Doctors', 'Book'],
    kicker: 'Next opening',
    title: 'Care journeys that feel calm and clear.',
    shortTitle: 'Book care fast.',
    subline: 'Appointments, service details, and contact paths are composed for trust on every device.',
    cta: 'Book visit',
    heroMeta: '10:45 AM',
    heroLabel: 'first slot',
    tiles: [
      ['Wait time', '8 min'],
      ['Doctors', '14'],
      ['Reviews', '4.8'],
    ],
  },
]

const breakpoints = [
  { label: 'Mobile', value: '360' },
  { label: 'Tablet', value: '768' },
  { label: 'Laptop', value: '1024' },
  { label: 'Desktop', value: '1440' },
]

function ConceptScreen({ concept, device }) {
  return (
    <div className={`concept-screen concept-screen--${concept.id} concept-screen--${device}`}>
      <div className="concept-topbar">
        <span className="concept-brand">{concept.brand}</span>
        <span className="concept-status">{concept.category}</span>
      </div>

      <div className="concept-nav">
        {concept.nav.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="concept-hero">
        <div className="concept-hero-copy">
          <span className="concept-kicker">{concept.kicker}</span>
          <h4>{device === 'phone' ? concept.shortTitle : concept.title}</h4>
          <p>{concept.subline}</p>
          <span className="concept-cta">{concept.cta}</span>
        </div>

        <div className="concept-visual">
          <div className="concept-visual-main">
            <span>{concept.heroMeta}</span>
            <small>{concept.heroLabel}</small>
          </div>
          <div className="concept-visual-chip concept-visual-chip--one" />
          <div className="concept-visual-chip concept-visual-chip--two" />
        </div>
      </div>

      <div className="concept-grid">
        {concept.tiles.map(([label, value]) => (
          <div className="concept-tile" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <div className="concept-flow" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

function DeviceFrame({ type, concept }) {
  return (
    <div className={`responsive-device responsive-device--${type}`}>
      <div className="responsive-device-shell">
        {type === 'phone' && <div className="responsive-phone-notch" />}
        {type !== 'phone' && (
          <div className="responsive-browser-bar">
            <span />
            <span />
            <span />
            <div>{type === 'desktop' ? 'arctiqflow.preview' : 'adaptive view'}</div>
          </div>
        )}
        <div className="responsive-device-screen" key={`${concept.id}-${type}`}>
          <ConceptScreen concept={concept} device={type} />
        </div>
        {type === 'phone' && <div className="responsive-phone-home" />}
      </div>
    </div>
  )
}

export default function ShowcaseCard() {
  const cardRef = useRef(null)
  const manualChangeAt = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const activeConcept = concepts[activeIndex]

  const goToSlide = useCallback((index) => {
    manualChangeAt.current = performance.now()
    setActiveIndex((index + concepts.length) % concepts.length)
  }, [])

  const goBy = useCallback((offset) => {
    manualChangeAt.current = performance.now()
    setActiveIndex((current) => (current + offset + concepts.length) % concepts.length)
  }, [])

  useEffect(() => {
    if (isPaused) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % concepts.length)
    }, 5200)

    return () => window.clearInterval(timer)
  }, [isPaused])

  useEffect(() => {
    const syncSlideWithScroll = () => {
      const card = cardRef.current
      if (!card || isPaused) return
      if (performance.now() - manualChangeAt.current < 2400) return

      const rect = card.getBoundingClientRect()
      const viewport = window.innerWidth
      const visible = rect.left < viewport * 0.88 && rect.right > viewport * 0.12

      if (!visible) return

      const rawProgress = (viewport * 0.72 - rect.left) / Math.max(rect.width * 0.72, 1)
      const progress = Math.min(0.999, Math.max(0, rawProgress))
      const nextIndex = Math.min(concepts.length - 1, Math.floor(progress * concepts.length))

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex))
    }

    window.addEventListener('scroll', syncSlideWithScroll, { passive: true })
    window.addEventListener('resize', syncSlideWithScroll)
    syncSlideWithScroll()

    return () => {
      window.removeEventListener('scroll', syncSlideWithScroll)
      window.removeEventListener('resize', syncSlideWithScroll)
    }
  }, [isPaused])

  return (
    <div
      ref={cardRef}
      className="hz-card-showcase flex items-center"
      data-card="3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <GlassCard
        className="responsive-showcase-card w-full h-full"
        style={{
          '--showcase-accent': activeConcept.accent,
          '--showcase-accent-rgb': activeConcept.accentRgb,
        }}
      >
        <div className="responsive-showcase">
          <div className="responsive-copy">
            <span className="responsive-eyebrow">Adaptive Design</span>
            <h3>Built to feel native on every screen.</h3>
            <p>
              Layouts, motion, spacing, and interactions are tuned across devices so your site
              feels intentional everywhere.
            </p>

            <div className="responsive-slide-tabs" role="tablist" aria-label="Concept previews">
              {concepts.map((concept, index) => (
                <button
                  key={concept.id}
                  type="button"
                  className={index === activeIndex ? 'is-active' : undefined}
                  onClick={() => goToSlide(index)}
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Show ${concept.label} concept`}
                >
                  <span>{concept.label}</span>
                  <small>{concept.category}</small>
                </button>
              ))}
            </div>

            <div className="responsive-breakpoints" aria-label="Responsive breakpoint coverage">
              <div className="responsive-breakpoint-line" />
              {breakpoints.map((point) => (
                <div className="responsive-breakpoint" key={point.value}>
                  <span>{point.label}</span>
                  <strong>{point.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="responsive-stage" aria-live="polite">
            <div className="responsive-stage-grid" aria-hidden="true" />
            <div className="responsive-stage-sheen" aria-hidden="true" />

            <DeviceFrame type="desktop" concept={activeConcept} />
            <DeviceFrame type="tablet" concept={activeConcept} />
            <DeviceFrame type="phone" concept={activeConcept} />

            <div className="responsive-controls">
              <button type="button" onClick={() => goBy(-1)} aria-label="Previous concept">
                <ChevronLeft size={16} strokeWidth={1.8} />
              </button>
              <span>
                {String(activeIndex + 1).padStart(2, '0')} / {String(concepts.length).padStart(2, '0')}
              </span>
              <button type="button" onClick={() => goBy(1)} aria-label="Next concept">
                <ChevronRight size={16} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
