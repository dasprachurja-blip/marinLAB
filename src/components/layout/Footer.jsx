import { useRef, useCallback } from 'react'
import { getLenis } from '@/hooks/useLenis'

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61560327915046',
    hoverColor: '#1877F2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    hoverColor: '#E4405F',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/8801768002784',
    hoverColor: '#25D366',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: '#',
    hoverColor: '#0088cc',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0 12 12 0 0011.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
]

/* ── Glow Wordmark ── */
function GlowWordmark() {
  const wordRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const el = wordRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--mx', `${x}%`)
    el.style.setProperty('--my', `${y}%`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = wordRef.current
    if (!el) return
    el.style.setProperty('--mx', '50%')
    el.style.setProperty('--my', '50%')
  }, [])

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-20">
      <div
        ref={wordRef}
        className="glow-wordmark-wrap"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-hidden="true"
        style={{ '--mx': '50%', '--my': '50%' }}
      >
        <span className="glow-wordmark-white">ARCTIC</span>
        <span className="glow-wordmark-blue">FLOW</span>
        <span className="glow-wordmark-spotlight" aria-hidden="true" />
      </div>

      <style>{`
        .glow-wordmark-wrap {
          position: relative;
          display: flex;
          align-items: baseline;
          gap: 0;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(72px, 13vw, 190px);
          line-height: 1;
          letter-spacing: -0.04em;
          cursor: default;
          user-select: none;
          overflow: visible;
        }

        .glow-wordmark-white,
        .glow-wordmark-blue {
          position: relative;
          display: inline-block;
          transition:
            opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            text-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glow-wordmark-white {
          color: rgba(240, 242, 245, 0.08);
          text-shadow: 0 0 60px rgba(240, 242, 245, 0.03);
        }

        .glow-wordmark-blue {
          color: rgba(77, 158, 255, 0.10);
          text-shadow: 0 0 60px rgba(77, 158, 255, 0.04);
        }

        .glow-wordmark-wrap:hover .glow-wordmark-white {
          color: rgba(240, 242, 245, 0.25);
          text-shadow:
            0 0 40px rgba(240, 242, 245, 0.15),
            0 0 80px rgba(77, 158, 255, 0.08);
        }

        .glow-wordmark-wrap:hover .glow-wordmark-blue {
          color: rgba(77, 158, 255, 0.80);
          text-shadow:
            0 0 30px rgba(77, 158, 255, 0.5),
            0 0 70px rgba(77, 158, 255, 0.25),
            0 0 120px rgba(42, 110, 204, 0.15);
        }

        .glow-wordmark-spotlight {
          position: absolute;
          inset: -20px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
          background: radial-gradient(
            circle 200px at var(--mx) var(--my),
            rgba(77, 158, 255, 0.07),
            rgba(42, 110, 204, 0.04) 40%,
            transparent 70%
          );
          border-radius: 8px;
        }

        .glow-wordmark-wrap:hover .glow-wordmark-spotlight {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

export default function Footer() {

  const handleClick = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(el, { offset: -80 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative bg-void overflow-hidden">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Animated gradient line at top */}
      <div className="accent-glow-line mx-auto" />

      <div className="section-container relative z-10">
        {/* Giant interactive wordmark */}
        <GlowWordmark />

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-12 md:mb-16" />

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Column 1 — Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="ArcticFlow Logo" className="w-10 h-10 object-contain" />
              <span className="text-lg font-display font-semibold tracking-tight text-text-primary">ArcticFlow</span>
            </div>
            <p className="text-sm text-text-secondary/60 leading-relaxed max-w-xs">
              Design &amp; development studio crafting premium digital experiences for ambitious brands.
            </p>
            <p className="text-xs text-text-tertiary">Based in Dhaka, Bangladesh</p>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-label text-text-tertiary mb-5">Navigation</p>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-sm text-text-secondary/60 hover:text-text-primary transition-colors duration-300 w-fit link-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3 — Contact + Socials */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-label text-text-tertiary mb-5">Connect</p>
            <a
              href="mailto:dasprachurja@gmail.com"
              className="text-sm text-text-secondary/60 hover:text-text-primary transition-colors duration-300 block mb-6 link-underline w-fit"
            >
              dasprachurja@gmail.com
            </a>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn w-9 h-9 rounded-full border border-white/8 flex items-center justify-center text-text-tertiary transition-all duration-300"
                  aria-label={social.label}
                  style={{ '--hover-color': social.hoverColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = social.hoverColor
                    e.currentTarget.style.borderColor = social.hoverColor + '40'
                    e.currentTarget.style.boxShadow = `0 0 16px ${social.hoverColor}20`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = ''
                    e.currentTarget.style.borderColor = ''
                    e.currentTarget.style.boxShadow = ''
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-white/[0.04] mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-8">
          <p className="text-xs text-text-tertiary">
            © {new Date().getFullYear()} ArcticFlow. Engineered for the digital era.
          </p>
          <p className="text-xs text-text-tertiary/60">
            Dhaka · Global
          </p>
        </div>
      </div>
    </footer>
  )
}
