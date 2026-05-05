import { useRef, useCallback } from 'react'
import GlassCard from '../atoms/GlassCard'
import { ArrowUpRight, Mail } from 'lucide-react'

/* ── Brand SVG Icons ── */
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="#1877F2" width="20" height="20">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <defs>
      <radialGradient id="ig-grad-bento" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497"/>
        <stop offset="5%" stopColor="#fdf497"/>
        <stop offset="45%" stopColor="#fd5949"/>
        <stop offset="60%" stopColor="#d6249f"/>
        <stop offset="90%" stopColor="#285AEB"/>
      </radialGradient>
    </defs>
    <path fill="url(#ig-grad-bento)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="#25D366" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="#26A5E4" width="20" height="20">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0 12 12 0 0011.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

/* ── Social link data ── */
const SOCIALS = [
  {
    icon: <FacebookIcon />,
    label: 'Facebook',
    handle: '@arctiqflow',
    href: 'https://www.facebook.com/profile.php?id=61560327915046',
    accent: '#1877F2',
  },
  {
    icon: <InstagramIcon />,
    label: 'Instagram',
    handle: '@arctiqflow',
    href: '#',
    accent: '#E1306C',
  },
  {
    icon: <TelegramIcon />,
    label: 'Telegram',
    handle: '@arctiqflow',
    href: '#',
    accent: '#26A5E4',
  },
  {
    icon: <WhatsAppIcon />,
    label: 'WhatsApp',
    handle: '+880 1768 002784',
    href: 'https://wa.me/8801768002784',
    accent: '#25D366',
  },
]

export default function BentoSocialCard() {
  const cardRefs = useRef([])

  const handleMouseMove = useCallback((e, idx) => {
    const card = cardRefs.current[idx]
    if (!card) return
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - r.left}px`)
    card.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])

  return (
    <div className="hz-card-social flex items-center" data-card="2">
      <GlassCard className="w-full h-full flex flex-col relative overflow-hidden">

        {/* ── Ambient background glow ── */}
        <div className="bento-ambient" />

        {/* ── Header ── */}
        <div className="bento-header">
          <div>
            <span className="bento-eyebrow">Connect</span>
            <h3 className="bento-headline">
              Let's build<br />
              <span className="bento-headline-accent">something great.</span>
            </h3>
          </div>
          <div className="bento-status-pill">
            <span className="bento-status-dot" />
            <span className="bento-status-text">Available for Q2 2026</span>
          </div>
        </div>

        {/* ── Social Grid ── */}
        <div className="bento-grid">
          {SOCIALS.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bento-cell"
              ref={el => (cardRefs.current[i] = el)}
              onMouseMove={e => handleMouseMove(e, i)}
              style={{ '--accent': s.accent }}
            >
              {/* Spotlight */}
              <div className="bento-cell-spotlight" />
              {/* Gradient border glow on hover */}
              <div className="bento-cell-border" />

              <div className="bento-cell-icon">{s.icon}</div>
              <div className="bento-cell-info">
                <span className="bento-cell-handle">{s.handle}</span>
                <span className="bento-cell-label">{s.label}</span>
              </div>
              <ArrowUpRight className="bento-cell-arrow" size={14} strokeWidth={2} />
            </a>
          ))}
        </div>

        {/* ── Email CTA ── */}
        <a href="mailto:dasprachurja@gmail.com" className="bento-email">
          <div className="bento-email-icon">
            <Mail size={16} strokeWidth={1.8} />
          </div>
          <div className="bento-email-content">
            <span className="bento-email-label">Email us directly</span>
            <span className="bento-email-addr">dasprachurja@gmail.com</span>
          </div>
          <ArrowUpRight size={14} className="bento-email-arrow" />
        </a>

        {/* ── Decorative orbital ring ── */}
        <div className="bento-orbital" />
        <div className="bento-orbital bento-orbital--2" />
      </GlassCard>
    </div>
  )
}
