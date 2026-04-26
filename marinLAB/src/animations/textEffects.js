import gsap from 'gsap'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'

export function scrambleText(element, finalText, options = {}) {
  const duration = options.duration || 1
  const steps = options.steps || 8

  let iteration = 0
  const interval = setInterval(() => {
    element.textContent = finalText
      .split('')
      .map((char, i) => {
        if (i < iteration) return char
        if (char === ' ') return ' '
        return chars[Math.floor(Math.random() * chars.length)]
      })
      .join('')

    iteration += finalText.length / steps
    if (iteration >= finalText.length) {
      element.textContent = finalText
      clearInterval(interval)
    }
  }, (duration * 1000) / steps)
}

export function revealWords(container, selector = '.reveal-word') {
  const words = container.querySelectorAll(selector)

  gsap.from(words, {
    opacity: 0,
    y: 30,
    filter: 'blur(8px)',
    stagger: 0.06,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
    },
  })
}
