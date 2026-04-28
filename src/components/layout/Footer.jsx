import { Waves } from 'lucide-react'
import { getLenis } from '@/hooks/useLenis'

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

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
    <footer className="bg-navy-dark border-t border-white/5">
      <div className="section-container py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-primary" />
              <span className="text-lg font-black uppercase tracking-tighter">marinLab</span>
            </div>
            <p className="text-muted text-sm">Made with love in Dhaka</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-muted text-sm uppercase tracking-wider hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-muted text-sm text-center md:text-right">
            © {new Date().getFullYear()} marinLab. Engineered for the deep tech era.
          </p>
        </div>
      </div>
    </footer>
  )
}
