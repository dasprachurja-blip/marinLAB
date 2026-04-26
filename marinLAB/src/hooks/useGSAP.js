import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useGSAP(callback, deps = []) {
  const ctx = useRef(null)
  useEffect(() => {
    ctx.current = gsap.context(callback)
    return () => ctx.current?.revert()
  }, deps)
}
