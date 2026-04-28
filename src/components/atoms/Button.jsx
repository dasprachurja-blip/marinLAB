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
    primary: 'bg-gradient-to-r from-primary to-[#4F46E5] text-white shadow-[0_0_24px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.7)] hover:-translate-y-1',
    secondary: 'bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10 hover:border-primary/50 hover:text-primary',
    outline: 'bg-transparent border border-primary/40 text-primary hover:bg-primary/10',
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
