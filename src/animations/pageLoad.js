import gsap from 'gsap'

export function playPageLoad() {
  // Set initial visibility for all hero elements
  gsap.set(['.hero-badge', '.hero-title-line', '.hero-desc', '.hero-actions > *', '.hero-features > *', '.hero-mockup', '.floating-tag'], {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  })

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.6, delay: 0.3 })
    .from('.hero-title-line', { opacity: 0, y: 60, duration: 0.8, stagger: 0.15 }, '-=0.3')
    .from('.hero-desc', { opacity: 0, y: 30, duration: 0.7 }, '-=0.4')
    .from('.hero-actions > *', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, '-=0.3')
    .from('.hero-features > *', { opacity: 0, y: 15, stagger: 0.08, duration: 0.4 }, '-=0.2')
    .from('.hero-mockup', { opacity: 0, scale: 0.9, y: 40, duration: 1, ease: 'power2.out' }, '-=0.6')
    .from('.floating-tag', { opacity: 0, scale: 0.8, stagger: 0.1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.4')

  return tl
}
