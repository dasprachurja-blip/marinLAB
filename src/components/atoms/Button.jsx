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

  const base = 'relative overflow-hidden rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2'

  const variants = {
    primary: 'bg-teal text-white shadow-[0_0_24px_rgba(255,42,85,0.4)] hover:shadow-[0_0_40px_rgba(255,42,85,0.7)] hover:bg-white hover:text-navy-dark',
    secondary: 'bg-transparent border border-white/25 text-white hover:border-teal hover:text-teal',
    outline: 'bg-transparent border border-teal/40 text-teal hover:bg-teal/10',
  }

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-9 py-4 text-lg',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {variant === 'primary' && (
          <span className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full animate-shimmer pointer-events-none" />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </a>
    )
  }

  return (
    <button ref={ref} className={classes} onClick={onClick} {...props}>
      {variant === 'primary' && (
        <span className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full animate-shimmer pointer-events-none" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  )
}
