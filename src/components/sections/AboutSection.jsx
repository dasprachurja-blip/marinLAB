import { useRef, useEffect, useCallback } from 'react'
import { Layers, Zap, Search, Sparkles, Palette, Settings2 } from 'lucide-react'
import './AboutSection.css'

/* ──────────────────────────────────────────────────
   Capabilities Data
   ────────────────────────────────────────────────── */
const capabilities = [
  {
    id: 1,
    icon: Layers,
    title: 'Cinematic UI/UX',
    desc: 'Interfaces that feel physical, layered, and immersive.',
  },
  {
    id: 2,
    icon: Zap,
    title: 'Performance-First',
    desc: 'Sub-second loads. 60fps motion. Zero compromise.',
  },
  {
    id: 3,
    icon: Search,
    title: 'SEO Architecture',
    desc: 'Built for discovery from the first line of code.',
  },
  {
    id: 4,
    icon: Sparkles,
    title: 'Motion Systems',
    desc: 'Scroll-driven choreography that guides attention.',
  },
  {
    id: 5,
    icon: Palette,
    title: 'Brand Experiences',
    desc: 'Visual identity translated into living digital form.',
  },
  {
    id: 6,
    icon: Settings2,
    title: 'Precision Engineering',
    desc: 'Clean code. Scalable systems. Long-term value.',
  },
]

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '100%', label: 'Custom Built' },
  { value: '< 2s', label: 'Avg. Load' },
]

/* ──────────────────────────────────────────────────
   Intersection Observer Hook (lightweight)
   ────────────────────────────────────────────────── */
function useRevealOnScroll(selector, options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll(selector)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [selector])

  return containerRef
}

/* ──────────────────────────────────────────────────
   AboutSection Component
   ────────────────────────────────────────────────── */
export default function AboutSection() {
  const sectionRef = useRevealOnScroll('.about-reveal, .about-card-reveal')

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section"
      style={{ padding: 'clamp(100px, 14vh, 180px) 0' }}
      aria-label="About ArctiqFlow"
    >
      {/* Atmospheric Background */}
      <div className="about-atmosphere" aria-hidden="true">
        <div className="about-atmosphere__orb-1" />
        <div className="about-atmosphere__orb-2" />
        <div className="about-atmosphere__line" />
        <div className="noise-overlay" />
      </div>

      <div className="section-container">
        {/* ─── TOP: Headline + Divider ─── */}
        <div className="mb-16 md:mb-24">
          <div className="about-reveal">
            <div className="about-eyebrow">
              <span className="about-eyebrow__line" />
              <span className="about-eyebrow__text">About</span>
            </div>
          </div>

          <h2
            className="about-headline about-reveal about-reveal--delay-1"
            style={{ fontSize: 'clamp(38px, 5.5vw, 80px)' }}
          >
            Building digital experiences
            <span className="about-headline__accent">
              {' '}that feel as powerful as they perform.
            </span>
          </h2>
        </div>

        <div className="about-divider about-reveal about-reveal--delay-2 mb-16 md:mb-24" />

        {/* ─── MIDDLE: Split — Body Left / Philosophy Right ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 md:mb-32">
          {/* LEFT — Body Copy + Stats */}
          <div className="about-body">
            <p className="about-body__text about-reveal about-reveal--delay-2">
              We combine <strong>cinematic design</strong>, modern frontend engineering,
              and performance-first architecture to build experiences that don't
              just look beautiful — they convert, rank, and scale.
            </p>
            <p className="about-body__text about-reveal about-reveal--delay-3 mt-6">
              Every project begins with intent. Every interaction is choreographed.
              Every pixel exists because it earned its place.
            </p>

            <div className="about-stats about-reveal about-reveal--delay-4">
              {stats.map((s) => (
                <div key={s.label} className="about-stat-pill">
                  <span className="about-stat-pill__value">{s.value}</span>
                  <span className="about-stat-pill__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Philosophy Panel */}
          <div className="about-reveal about-reveal--delay-3">
            <div className="about-philosophy">
              <div className="about-philosophy__noise" />
              <div className="about-philosophy__glow" />

              <div>
                <p className="about-philosophy__label">Philosophy</p>
                <blockquote className="about-philosophy__quote">
                  "We don't decorate screens.
                  <br />
                  We engineer <em>how things feel.</em>"
                </blockquote>
              </div>

              <div>
                <div className="about-philosophy__divider" />
                <div className="about-philosophy__signature">
                  <div className="about-philosophy__avatar">
                    <img
                      src="/logo.png"
                      alt=""
                      className="w-5 h-5 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="about-philosophy__name">ArctiqFlow Studio</p>
                    <p className="about-philosophy__role">Design & Engineering</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM: Capabilities Grid ─── */}
        <div className="about-capabilities">
          <p className="about-capabilities__heading about-reveal about-reveal--delay-2">
            What we do
          </p>

          <div className="about-grid">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon
              return (
                <div
                  key={cap.id}
                  className="about-card about-card-reveal"
                  style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
                >
                  <span className="about-card__number">
                    {String(cap.id).padStart(2, '0')}
                  </span>
                  <div className="about-card__icon">
                    <Icon size={16} strokeWidth={1.8} />
                  </div>
                  <h3 className="about-card__title">{cap.title}</h3>
                  <p className="about-card__desc">{cap.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
