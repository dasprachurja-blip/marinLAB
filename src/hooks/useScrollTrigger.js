import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollTrigger(callback, deps = []) {
  const ctx = useRef(null)
  useEffect(() => {
    ctx.current = gsap.context(() => {
      callback(ScrollTrigger)
    })
    return () => {
      ctx.current?.revert()
    }
  }, deps)
}
