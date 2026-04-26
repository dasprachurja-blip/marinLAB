import { useState, useEffect } from 'react'
import { Waves, Menu, X } from 'lucide-react'
import Button from '@/components/atoms/Button'
import { cn } from '@/utils/cn'
import { getLenis } from '@/hooks/useLenis'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.querySelector(href)
    if (el) {
      const lenis = getLenis()
      if (lenis) {
        lenis.scrollTo(el, { offset: -80 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className={cn(
      'navbar fixed top-0 w-full z-50 transition-all duration-500',
      scrolled
        ? 'bg-navy-dark/90 backdrop-blur-xl border-b border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)]'
        : 'bg-transparent'
    )}>
      <div className="section-container flex justify-between items-center h-20">
        {/* Logo */}
        <a href="#" onClick={(e) => handleNavClick(e, '#')} className="flex items-center gap-2 group">
          <Waves className="w-6 h-6 text-teal group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xl font-black tracking-tighter text-white uppercase">marinLab</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-muted text-xs font-semibold uppercase tracking-widest hover:text-teal transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Get Website
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        'md:hidden overflow-hidden transition-all duration-500',
        mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="bg-navy-dark/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block text-muted text-sm font-semibold uppercase tracking-widest hover:text-teal transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="primary"
            size="sm"
            className="w-full mt-4"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Get Website
          </Button>
        </div>
      </div>
    </nav>
  )
}
