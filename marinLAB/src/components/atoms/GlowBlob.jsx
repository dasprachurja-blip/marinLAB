import { cn } from '@/utils/cn'

export default function GlowBlob({ color = 'teal', size = 500, className, ...props }) {
  const colors = {
    teal: 'rgba(72,217,180,0.08)',
    blue: 'rgba(43,130,173,0.12)',
    mixed: 'rgba(72,217,180,0.06)',
  }

  return (
    <div
      className={cn('absolute rounded-full pointer-events-none parallax-blob', className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colors[color]}, transparent 70%)`,
        filter: `blur(${Math.min(size * 0.2, 120)}px)`,
      }}
      {...props}
    />
  )
}
