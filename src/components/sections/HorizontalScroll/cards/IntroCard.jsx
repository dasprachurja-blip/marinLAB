import { useRef, useEffect, useState } from 'react'
import Hls from 'hls.js'
import GlassCard from '../atoms/GlassCard'

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const SERVICES = ['Web Design', 'Development', 'Brand Identity', 'Motion Design', 'SEO', 'Performance']

export default function IntroCard() {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Lazy visibility detection — don't load video until card is near viewport
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // HLS setup — only when visible
  useEffect(() => {
    if (!isVisible) return
    const video = videoRef.current
    if (!video) return

    let hls

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        maxBufferLength: 10,
        maxMaxBufferLength: 30,
        startLevel: -1,          // auto quality
      })
      hls.loadSource(HLS_SRC)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
        setVideoLoaded(true)
      })
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls.startLoad()
          else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError()
        }
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS
      video.src = HLS_SRC
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {})
        setVideoLoaded(true)
      })
    }

    return () => {
      if (hls) { hls.destroy() }
    }
  }, [isVisible])

  return (
    <div ref={containerRef} className="hz-card-intro flex items-center" data-card="1">
      <GlassCard className="w-full h-full flex flex-col relative overflow-hidden">

        {/* ═══ VIDEO BACKGROUND ═══ */}
        <div className="intro-video-wrap" aria-hidden="true">
          {/* Static fallback color — shows before video loads */}
          <div className="intro-video-fallback" />

          {isVisible && (
            <video
              ref={videoRef}
              className={`intro-video-el ${videoLoaded ? 'intro-video-el--ready' : ''}`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
            />
          )}

          {/* Cinematic vignette for text readability */}
          <div className="intro-video-vignette" />

          {/* Film grain texture */}
          <div className="intro-video-grain" />
        </div>

        {/* Top bar */}
        <div className="flex items-center justify-between relative z-10 p-10 md:p-14 pb-0">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="ArctiqFlow"
              className="w-8 h-8 object-contain"
              width={32}
              height={32}
            />
            <span className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.2em]">ArctiqFlow</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="text-[10px] text-white/25 font-medium tracking-wide">Available for projects</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center relative z-10 px-10 md:px-14 py-8">
          <h2
            className="font-heading font-bold tracking-ultra-tight leading-ultra-tight text-white mb-8"
            style={{ fontSize: 'clamp(44px, 4.5vw, 80px)' }}
          >
            Built for growth.
            <br />
            <span className="text-white/25">
              Designed for impact.
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/35 leading-relaxed max-w-[460px] font-medium tracking-tight">
            ArctiqFlow is a creative studio crafting modern, high-performance digital experiences for ambitious brands.
          </p>
        </div>

        {/* Bottom — Marquee strip */}
        <div className="relative z-10 mx-10 md:mx-14 pt-6 pb-10 border-t border-white/[0.04] overflow-hidden">
          <div className="flex gap-12 marquee-track">
            {[...SERVICES, ...SERVICES].map((s, i) => (
              <span key={i} className="text-[11px] text-white/15 font-semibold uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-3">
                {s}
                <span className="w-1 h-1 rounded-full bg-white/10" />
              </span>
            ))}
          </div>
        </div>

        {/* Decorative corner light */}
        <div
          className="absolute top-0 left-0 w-[350px] h-[350px] pointer-events-none z-[5]"
          style={{
            background: 'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.02), transparent 60%)',
          }}
        />
      </GlassCard>
    </div>
  )
}
