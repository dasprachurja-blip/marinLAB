import gsap from 'gsap'

export function animateBlobs(containerSelector) {
  const blobs = document.querySelectorAll(`${containerSelector} .glow-blob`)

  blobs.forEach((blob, i) => {
    gsap.to(blob, {
      x: `random(-80, 80)`,
      y: `random(-80, 80)`,
      scale: `random(0.8, 1.3)`,
      duration: `random(4, 8)`,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: i * 0.5,
    })
  })
}
