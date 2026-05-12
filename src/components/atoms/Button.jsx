import { useRef, useState } from 'react'
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
  const [isPressed, setIsPressed] = useState(false)
  useMagneticHover(ref, 0.3)

  const base = 'relative overflow-hidden rounded-full font-medium inline-flex items-center justify-center gap-2 transition-all duration-300 ease-expo cursor-pointer'

  const variants = {
    primary: 'bg-accent text-void hover:shadow-[0_8px_32px_rgba(77,158,255,0.25)] hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-transparent border border-white/12 text-text-secondary backdrop-blur-sm hover:bg-white/5 hover:border-accent/30 hover:text-text-primary',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary',
    outline: 'bg-transparent border border-arctic-border text-text-primary hover:bg-accent-subtle hover:border-accent/30',
  }

  const sizes = {
    sm: 'px-5 py-2.5 text-[13px] tracking-wide',
    md: 'px-7 py-3.5 text-sm tracking-wide',
    lg: 'px-9 py-4 text-[15px] tracking-wide',
  }

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    isPressed && 'scale-[0.96]',
    className
  )

  const shimmer = variant === 'primary' ? (
    <span
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
        backgroundSize: '200% 100%',
        animation: 'btnShimmer 3s ease-in-out infinite',
      }}
    />
  ) : null

  const handleMouseDown = () => setIsPressed(true)
  const handleMouseUp = () => setIsPressed(false)
  const handleMouseLeave = () => setIsPressed(false)

  const commonProps = {
    ref,
    className: classes,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
    ...props,
  }

  if (href) {
    return (
      <a href={href} {...commonProps}>
        {shimmer}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </a>
    )
  }

  return (
    <button onClick={onClick} {...commonProps}>
      {shimmer}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  )
}

