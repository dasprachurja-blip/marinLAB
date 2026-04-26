import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initGSAP() {
  gsap.registerPlugin(ScrollTrigger)

  // Custom eases
  gsap.registerEase('cinematic', (progress) => {
    return progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2
  })

  // Global defaults
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  })

  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none none',
  })
}
