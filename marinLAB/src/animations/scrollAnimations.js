import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initScrollAnimations() {
  // Stats counter animation
  gsap.utils.toArray('.stat-value').forEach((el) => {
    const target = parseInt(el.dataset.value) || 0
    const suffix = el.dataset.suffix || ''

    gsap.fromTo(el, { innerText: 0 }, {
      innerText: target,
      duration: 2,
      ease: 'power2.out',
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
      onUpdate: function () {
        el.textContent = Math.round(this.targets()[0].innerText) + suffix
      },
    })
  })

  // Fade-up reveal for section headers
  gsap.utils.toArray('.reveal-up').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      filter: 'blur(6px)',
      duration: 0.8,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    })
  })

  // Stagger cards
  gsap.utils.toArray('.stagger-cards').forEach((container) => {
    const cards = container.querySelectorAll('.card-item')
    gsap.from(cards, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
      },
    })
  })

  // Parallax blobs
  gsap.utils.toArray('.parallax-blob').forEach((blob) => {
    gsap.to(blob, {
      y: -100,
      scrollTrigger: {
        trigger: blob.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  })

  // Navbar background on scroll
  ScrollTrigger.create({
    start: 80,
    onUpdate: (self) => {
      const nav = document.querySelector('.navbar')
      if (!nav) return
      if (self.direction === 1 && self.scroll() > 80) {
        nav.classList.add('navbar-scrolled')
      }
      if (self.scroll() <= 80) {
        nav.classList.remove('navbar-scrolled')
      }
    },
  })
}
