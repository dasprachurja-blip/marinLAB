import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import './Navbar.css';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const navRef = useRef(null);
  const containerRef = useRef(null);
  const linkRefs = useRef([]);
  const menuContentRef = useRef(null);
  const tlRef = useRef(null);
  const lastScrollY = useRef(0);

  // Click-outside-to-close
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }, 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Auto-close on route change
  useEffect(() => {
    if (isMenuOpen) closeMenu();
  }, [location.pathname]);

  // Scroll behavior — hide on down, show on up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
        if (isMenuOpen) closeMenu();
      } else if (lastScrollY.current - currentScrollY > 15) {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // GSAP timeline for menu open/close
  useLayoutEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    linkRefs.current.forEach(el => {
      if (el) gsap.set(el, { y: 20, opacity: 0 });
    });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: 'auto',
      duration: 0.5,
      ease: 'expo.inOut',
    });

    tl.to(linkRefs.current.filter(Boolean), {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power3.out',
      stagger: 0.04,
    }, '-=0.2');

    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, []);

  const openMenu = () => {
    setIsMenuOpen(true);
    tlRef.current?.play(0);
  };

  const closeMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    tl.eventCallback('onReverseComplete', () => setIsMenuOpen(false));
    tl.reverse();
  };

  const toggleMenu = () => {
    if (isMenuOpen) closeMenu();
    else openMenu();
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (isMenuOpen) closeMenu();
    navigate(href);
    window.scrollTo(0, 0);
  };

  const setLinkRef = (i) => (el) => {
    if (el) linkRefs.current[i] = el;
  };

  return (
    <div
      ref={containerRef}
      className={cn('card-nav-container', !isVisible && 'nav-hidden')}
    >
      <nav ref={navRef} className={cn('card-nav', isMenuOpen ? 'open' : '')}>
        {/* Top bar */}
        <div className="card-nav-top">
          {/* Hamburger */}
          <div
            className={cn('hamburger-menu', isMenuOpen ? 'open' : '')}
            onClick={toggleMenu}
            role="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            tabIndex={0}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          {/* Logo */}
          <a href="/" onClick={(e) => handleNavClick(e, '/')} className="logo-container group">
            <img src="/logo.png" alt="ArcticFlow Logo" className="logo transition-transform duration-500 ease-expo group-hover:scale-105" />
            <span className="logo-text">ArcticFlow</span>
          </a>

          {/* CTA — Solid accent pill */}
          <button
            type="button"
            className="card-nav-cta-button"
            onClick={(e) => handleNavClick(e, '/contact')}
          >
            Let's Talk
          </button>
        </div>

        {/* Expanded menu content */}
        <div
          ref={menuContentRef}
          className="card-nav-content"
          aria-hidden={!isMenuOpen}
        >
          {/* Navigation links — clean, minimal, large */}
          <div className="nav-links-grid">
            {navItems.map((item, idx) => (
              <a
                key={item.label}
                ref={setLinkRef(idx)}
                className={cn(
                  'nav-link-item',
                  location.pathname === item.href && 'nav-link-item--active'
                )}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <span className="nav-link-num">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="nav-link-label">{item.label}</span>
                {location.pathname === item.href && (
                  <span className="nav-link-active-dot" />
                )}
              </a>
            ))}
          </div>

          {/* Bottom info strip */}
          <div className="nav-bottom-strip">
            <span className="nav-bottom-item">
              <span className="nav-status-dot" />
              Available for projects
            </span>
            <span className="nav-bottom-item">Dhaka, Bangladesh</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
