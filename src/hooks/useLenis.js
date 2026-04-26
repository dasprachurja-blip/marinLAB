import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

export function useLenis() {
  const rafId = useRef(null)

  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
    })

    // Bridge Lenis with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenisInstance?.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenisInstance?.destroy()
      lenisInstance = null
    }
  }, [])
}

export const getLenis = () => lenisInstance
