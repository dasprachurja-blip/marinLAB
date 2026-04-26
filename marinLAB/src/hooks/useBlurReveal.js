import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useBlurReveal(containerRef, selector, options = {}) {
  const ctx = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll(selector)
    if (!elements.length) return

    ctx.current = gsap.context(() => {
      gsap.from(elements, {
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          ...options.scrollTrigger,
        },
        opacity: 0,
        y: options.y ?? 30,
        filter: 'blur(8px)',
        stagger: { each: options.stagger ?? 0.06, ease: 'power2.out' },
        duration: options.duration ?? 0.7,
        ease: 'power3.out',
        delay: options.delay ?? 0,
      })
    }, container)

    return () => ctx.current?.revert()
  }, [])
}
