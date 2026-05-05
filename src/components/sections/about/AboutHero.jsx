import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import CodeWindow from './CodeWindow'

export default function AboutHero() {
  const contentRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const container = contentRef.current
    if (!container) return

    // Word reveal
    const words = container.querySelectorAll('.ah-word-inner')
    const fadeEls = container.querySelectorAll('.ah-fade')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          words.forEach((w, i) => setTimeout(() => w.classList.add('is-in'), 100 + i * 70))
          fadeEls.forEach((el, i) => setTimeout(() => el.classList.add('is-in'), 600 + i * 120))
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(container)



    return () => observer.disconnect()
  }, [])

  const words = ['We', 'make', 'the', 'web']
  const accentWords = ['feel', 'alive.']

  return (
    <section className="ah-section" aria-label="About ArctiqFlow">

      {/* ── LAYER 1: Base gradient ── */}
      <div className="ah-bg" aria-hidden="true">
        {/* Layer 2: Blue ambient diffusion */}
        <div className="ah-bg__blue-orb ah-bg__blue-orb--1" />
        <div className="ah-bg__blue-orb ah-bg__blue-orb--2" />
        {/* Layer 3: Noise */}
        <div className="noise-overlay" style={{ opacity: 0.035 }} />
        {/* Layer 4: Architectural grid lines */}
        <div className="ah-bg__grid" />
        {/* Layer 5: Watermark */}
        <div className="ah-bg__watermark" aria-hidden="true">ARCTIQFLOW</div>
      </div>

      {/* ── MAIN SPLIT LAYOUT ── */}
      <div className="ah-layout">

        {/* ══ LEFT COLUMN ══ */}
        <div className="ah-left" ref={contentRef}>
          {/* Back button */}
          <button 
            className="ah-back-btn ah-fade" 
            onClick={() => navigate('/')}
            aria-label="Back to home"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </button>

          {/* Eyebrow */}
          <div className="ah-eyebrow ah-fade">
            <span className="ah-eyebrow__line" />
            <span className="ah-eyebrow__text">About ArctiqFlow</span>
          </div>

          {/* Blue accent bar */}
          <div className="ah-accent-bar ah-fade" />

          {/* Headline */}
          <h1 className="ah-headline">
            {words.map((w, i) => (
              <span key={w} className="ah-word">
                <span className="ah-word-inner" style={{ transitionDelay: `${0.1 + i * 0.07}s` }}>
                  {w}
                </span>
              </span>
            ))}
            <br />
            {accentWords.map((w, i) => (
              <span key={w} className="ah-word">
                <span
                  className="ah-word-inner ah-word--accent"
                  style={{ transitionDelay: `${0.1 + (words.length + i) * 0.07}s` }}
                >
                  {w}
                </span>
              </span>
            ))}
          </h1>

          {/* Supporting paragraph */}
          <p className="ah-sub ah-fade" style={{ transitionDelay: '0.1s' }}>
            A design and engineering studio crafting cinematic digital
            experiences for brands that refuse to blend in.
          </p>

          {/* Micro stats row */}
          <div className="ah-stats ah-fade" style={{ transitionDelay: '0.22s' }}>
            {[['50+', 'Projects Delivered'], ['< 2s', 'Average Load Time'], ['100%', 'Custom Built']].map(([val, lbl]) => (
              <div key={lbl} className="ah-stat">
                <span className="ah-stat__val">{val}</span>
                <span className="ah-stat__lbl">{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ RIGHT COLUMN — Animated Code Editor ══ */}
        <div className="ah-right">
          <CodeWindow />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="ah-scroll-cue" aria-hidden="true">
        <div className="ah-scroll-cue__line" />
        <span className="ah-scroll-cue__text">Scroll</span>
      </div>
    </section>
  )
}
