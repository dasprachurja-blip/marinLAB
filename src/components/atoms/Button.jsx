import { useRef } from 'react'
import { cn } from '@/utils/cn'
import { useMagneticHover } from '@/hooks/useMagneticHover'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  href,
  ...props
}) {
  const ref = useRef(null)
  useMagneticHover(ref)

  const base = 'relative overflow-hidden rounded-full font-semibold inline-flex items-center justify-center gap-2 transition-all duration-300 ease-expo-out'

  const variants = {
    primary: 'bg-white text-[#0A0B0F] hover:bg-white/90 hover:-translate-y-0.5 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]',
    secondary: 'bg-transparent border border-white/12 text-white/80 backdrop-blur-sm hover:bg-white/5 hover:border-white/25 hover:text-white',
    ghost: 'bg-transparent text-white/60 hover:text-white underline-offset-4 hover:underline',
    outline: 'bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/40',
  }

  const sizes = {
    sm: 'px-5 py-2.5 text-[13px] tracking-wide',
    md: 'px-7 py-3.5 text-sm tracking-wide',
    lg: 'px-9 py-4 text-[15px] tracking-wide',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </a>
    )
  }

  return (
    <button ref={ref} className={classes} onClick={onClick} {...props}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  )
}
