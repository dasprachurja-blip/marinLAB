import { useRef, useEffect } from 'react'

const founders = [
  {
    name: 'Prachurja Das',
    role: 'Founder & Creative Director',
    bio: 'Obsessed with the intersection of design and engineering. Believes the best interfaces are the ones you don\'t notice — they just feel right.',
    image: '/team/founder-1.webp',
  },
  {
    name: 'Co-Founder',
    role: 'Lead Developer & Technical Architect',
    bio: 'Turns ambitious designs into performant reality. Specializes in motion systems, scroll choreography, and architecture that scales.',
    image: '/team/founder-2.webp',
  },
]

const philosophyText =
  'We don\'t just build websites. We engineer how the digital world feels when you touch it.'

export default function FoundersSection() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const wordRefs = useRef([])

  // Founder card reveal
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)
    if (!cards.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  // Philosophy word-by-word scroll reveal
  useEffect(() => {
    const words = wordRefs.current.filter(Boolean)
    if (!words.length) return

    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top
      const windowH = window.innerHeight

      // Progress: 0 → 1 as section scrolls through viewport
      const progress = Math.max(0, Math.min(1, 1 - (sectionTop / (windowH * 0.6))))

      const wordsToLight = Math.floor(progress * words.length)

      words.forEach((word, i) => {
        if (i < wordsToLight) {
          word.classList.add('is-lit')
        } else {
          word.classList.remove('is-lit')
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const philosophyWords = philosophyText.split(' ')

  return (
    <section className="founders-section" ref={sectionRef} aria-label="Our team">
      <div className="founders-section__container">
        <div className="founders__divider" />

        <div className="founders__eyebrow">
          <span className="about-hero__eyebrow-line" />
          <span className="about-hero__eyebrow-text">Who We Are</span>
        </div>

        <h2 className="founders__title">
          The people{' '}
          <span className="founders__title-accent">behind the pixels.</span>
        </h2>

        <div className="founders__grid">
          {founders.map((person, i) => (
            <article
              key={person.name}
              className="founder-card"
              ref={(el) => (cardRefs.current[i] = el)}
              style={{ transitionDelay: `${0.15 + i * 0.15}s` }}
            >
              <div className="founder-card__image-wrap">
                <img
                  src={person.image}
                  alt={`${person.name} — ${person.role}`}
                  className="founder-card__image"
                  loading="lazy"
                  decoding="async"
                />
                <div className="founder-card__vignette" />
              </div>
              <div className="founder-card__info">
                <h3 className="founder-card__name">{person.name}</h3>
                <p className="founder-card__role">{person.role}</p>
                <p className="founder-card__bio">{person.bio}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Philosophy statement — word-by-word scroll reveal */}
        <div className="founders__philosophy">
          <p className="founders__philosophy-quote" aria-label={philosophyText}>
            {philosophyWords.map((word, i) => (
              <span
                key={i}
                className="founders__philosophy-word"
                ref={(el) => (wordRefs.current[i] = el)}
              >
                {word}
              </span>
            ))}
          </p>
          <p className="founders__philosophy-sub">
            — ArctiqFlow Studio, Dhaka
          </p>
        </div>
      </div>
    </section>
  )
}
