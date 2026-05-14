import { useRef, useState } from 'react'
import { cn } from '@/utils/cn'

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

  const base = 'relative overflow-hidden rounded-full font-medium inline-flex items-center justify-center gap-2 cursor-pointer select-none transition-all duration-400 ease-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-void'

  const variants = {
    primary: cn(
      'bg-accent text-void',
      'hover:shadow-[0_8px_32px_rgba(77,158,255,0.25)]',
      'hover:-translate-y-0.5',
      'active:translate-y-0 active:shadow-[0_4px_16px_rgba(77,158,255,0.2)]',
    ),
    secondary: cn(
      'bg-white/[0.03] border border-white/10 text-text-secondary backdrop-blur-sm',
      'hover:bg-white/[0.06] hover:border-accent/25 hover:text-text-primary',
      'active:bg-white/[0.08]',
    ),
    ghost: cn(
      'bg-transparent text-text-secondary',
      'hover:text-text-primary',
      'active:text-accent/80',
    ),
    outline: cn(
      'bg-transparent border border-arctic-border text-text-primary',
      'hover:bg-accent-subtle hover:border-accent/30',
      'active:bg-accent/[0.08]',
    ),
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
    isPressed && 'scale-[0.97]',
    className
  )

  /* ── Shimmer for primary variant ── */
  const shimmer = variant === 'primary' ? (
    <span
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)',
        backgroundSize: '200% 100%',
        animation: 'btnShimmer 4s ease-in-out infinite',
      }}
    />
  ) : null

  /* ── Ghost underline effect ── */
  const underline = variant === 'ghost' ? (
    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-accent/40 transition-all duration-400 ease-expo group-hover:w-[60%]" />
  ) : null

  const handleMouseDown = () => setIsPressed(true)
  const handleMouseUp = () => setIsPressed(false)
  const handleMouseLeave = () => setIsPressed(false)

  const commonProps = {
    ref,
    className: cn('group', classes),
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
    ...props,
  }

  const content = (
    <>
      {shimmer}
      {underline}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  )

  if (href) {
    return <a href={href} {...commonProps}>{content}</a>
  }

  return <button onClick={onClick} {...commonProps}>{content}</button>
}
