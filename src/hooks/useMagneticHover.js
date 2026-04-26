import { useEffect } from 'react'
import gsap from 'gsap'
import { isTouch } from '@/utils/deviceDetect'

export function useMagneticHover(ref, strength = 0.25) {
  useEffect(() => {
    const el = ref.current
    if (!el || isTouch()) return

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * strength
      const y = (e.clientY - rect.top - rect.height / 2) * strength
      gsap.to(el, { x, y, duration: 0.4, ease: 'power2.out' })
    }

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [ref, strength])
}
