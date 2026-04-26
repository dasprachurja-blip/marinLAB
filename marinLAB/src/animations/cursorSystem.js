import gsap from 'gsap'
import { isTouch } from '@/utils/deviceDetect'

let cursor, follower, label

export function initCursorSystem() {
  if (isTouch()) return

  // Create cursor elements
  cursor = document.createElement('div')
  cursor.className = 'custom-cursor'
  cursor.innerHTML = `
    <div class="cursor-dot"></div>
    <div class="cursor-ring"></div>
    <div class="cursor-label"></div>
  `

  // Inject styles
  const style = document.createElement('style')
  style.textContent = `
    .custom-cursor {
      position: fixed;
      top: 0; left: 0;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
    }
    .cursor-dot {
      width: 8px; height: 8px;
      background: #48D9B4;
      border-radius: 50%;
      position: absolute;
      top: -4px; left: -4px;
      transition: transform 0.15s ease;
    }
    .cursor-ring {
      width: 40px; height: 40px;
      border: 1.5px solid rgba(72,217,180,0.4);
      border-radius: 50%;
      position: absolute;
      top: -20px; left: -20px;
      transition: transform 0.3s ease, border-color 0.3s;
    }
    .cursor-label {
      position: absolute;
      top: 24px; left: 24px;
      font-size: 11px;
      font-weight: 600;
      color: #48D9B4;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      white-space: nowrap;
      opacity: 0;
      transform: translateY(4px);
      transition: opacity 0.3s, transform 0.3s;
    }
    .custom-cursor.hovering .cursor-ring {
      transform: scale(1.5);
      border-color: rgba(72,217,180,0.7);
    }
    .custom-cursor.hovering .cursor-dot {
      transform: scale(0.5);
    }
    .custom-cursor.has-label .cursor-label {
      opacity: 1;
      transform: translateY(0);
    }
  `
  document.head.appendChild(style)
  document.body.appendChild(cursor)

  follower = cursor.querySelector('.cursor-ring')
  label = cursor.querySelector('.cursor-label')

  // Track mouse with GSAP for smoothness
  const pos = { x: 0, y: 0 }
  const mouse = { x: 0, y: 0 }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })

  gsap.ticker.add(() => {
    pos.x += (mouse.x - pos.x) * 0.15
    pos.y += (mouse.y - pos.y) * 0.15
    gsap.set(cursor, { x: pos.x, y: pos.y })
  })

  // Interactive hover states
  document.addEventListener('mouseover', (e) => {
    const interactive = e.target.closest('a, button, [data-cursor]')
    if (interactive) {
      cursor.classList.add('hovering')
      const cursorLabel = interactive.dataset.cursor
      if (cursorLabel) {
        label.textContent = cursorLabel
        cursor.classList.add('has-label')
      }
    }
  })

  document.addEventListener('mouseout', (e) => {
    const interactive = e.target.closest('a, button, [data-cursor]')
    if (interactive) {
      cursor.classList.remove('hovering', 'has-label')
      label.textContent = ''
    }
  })
}
