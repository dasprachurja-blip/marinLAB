import { useEffect, useRef, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

/**
 * RefinedCursor — Small dot + expanding ring
 * Inspired by: Linear, Awwwards, Stripe
 * On hover: ring expands + shifts to accent color, dot shrinks
 */
const TargetCursor = ({
  targetSelector = 'button, a, .cursor-target',
  hideDefaultCursor = true,
}) => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    return hasTouchScreen && isSmallScreen;
  }, []);

  const moveDot = useCallback((x, y) => {
    if (!dotRef.current) return;
    gsap.to(dotRef.current, { x, y, duration: 0.08, ease: 'power2.out', overwrite: true });
  }, []);

  const moveRing = useCallback((x, y) => {
    if (!ringRef.current) return;
    gsap.to(ringRef.current, { x, y, duration: 0.18, ease: 'power3.out', overwrite: true });
  }, []);

  useEffect(() => {
    if (isMobile) return;

    if (hideDefaultCursor) {
      const style = document.createElement('style');
      style.id = 'cursor-hide';
      style.innerHTML = `*, *::before, *::after { cursor: none !important; }`;
      document.head.appendChild(style);
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Initial position off-screen
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      moveDot(e.clientX, e.clientY);
      moveRing(e.clientX, e.clientY);
    };

    const onMouseDown = () => {
      gsap.to(dot, { scale: 0.6, duration: 0.15 });
      gsap.to(ring, { scale: 0.85, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.4)' });
      gsap.to(ring, { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.4)' });
    };

    let activeEl = null;

    const onMouseOver = (e) => {
      let current = e.target;
      while (current && current !== document.body) {
        if (current.matches && current.matches(targetSelector)) {
          if (activeEl === current) return;
          activeEl = current;

          // Expand ring + accent tint
          gsap.to(ring, {
            width: 48, height: 48,
            borderColor: 'rgba(77,158,255,0.5)',
            backgroundColor: 'rgba(77,158,255,0.04)',
            duration: 0.35, ease: 'expo.out',
          });
          gsap.to(dot, { scale: 0.5, backgroundColor: '#4D9EFF', duration: 0.25 });
          return;
        }
        current = current.parentElement;
      }

      // Not hovering on target
      if (activeEl) {
        activeEl = null;
        gsap.to(ring, {
          width: 32, height: 32,
          borderColor: 'rgba(255,255,255,0.15)',
          backgroundColor: 'transparent',
          duration: 0.35, ease: 'expo.out',
        });
        gsap.to(dot, { scale: 1, backgroundColor: '#F0F2F5', duration: 0.25 });
      }
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const onMouseEnterDoc = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnterDoc);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnterDoc);
      document.getElementById('cursor-hide')?.remove();
    };
  }, [isMobile, hideDefaultCursor, targetSelector, moveDot, moveRing]);

  if (isMobile) return null;

  return (
    <>
      {/* Ring — follows with slight lag */}
      <div
        ref={ringRef}
        className="cursor-ring"
      />
      {/* Dot — follows precisely */}
      <div
        ref={dotRef}
        className="cursor-dot"
      />
    </>
  );
};

export default TargetCursor;
