/* ═══════════════════════════════════════════
   ARCTICFLOW — MOTION PRESETS
   Centralized Framer Motion variants
   Philosophy: "Gravity, Not Flash"
   ═══════════════════════════════════════════ */

// ── Easing Constants ──
export const easing = {
  expoOut:  [0.16, 1, 0.3, 1],
  quartOut: [0.25, 1, 0.5, 1],
  cinema:   [0.76, 0, 0.24, 1],
  spring:   [0.34, 1.56, 0.64, 1],
}

// ── Reveal from below — standard section entry ──
export const revealUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: easing.expoOut },
}

// ── Subtle reveal — lighter motion ──
export const revealUpLight = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easing.expoOut },
}

// ── Fade in — minimal content reveal ──
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: easing.quartOut },
}

// ── Scale in — for cards and images ──
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: easing.expoOut },
}

// ── Stagger container — for lists/grids ──
export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

// ── Stagger child — each item in a list ──
export const staggerChild = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easing.expoOut },
  },
}

// ── Image reveal — clip-path mask ──
export const imageReveal = {
  initial: { clipPath: 'inset(0 100% 0 0)' },
  animate: { clipPath: 'inset(0 0% 0 0)' },
  transition: { duration: 1.0, ease: easing.cinema },
}

// ── Hero word split — for display text ──
export const wordReveal = {
  initial: { y: '110%', opacity: 0 },
  animate: { y: '0%', opacity: 1 },
  transition: { duration: 0.9, ease: easing.expoOut },
}

// ── Line expand — horizontal rule animation ──
export const lineExpand = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  transition: { duration: 0.8, ease: easing.cinema },
}

// ── Page transitions ──
export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easing.expoOut },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: easing.cinema },
  },
}

// ── Viewport trigger defaults ──
export const viewportOnce = {
  once: true,
  margin: '-10%',
}

// ── Hover presets for interactive elements ──
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.4, ease: easing.expoOut } },
}

export const hoverScale = {
  whileHover: { scale: 1.03, transition: { duration: 0.6, ease: easing.cinema } },
}
