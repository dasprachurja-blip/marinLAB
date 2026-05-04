import GlassCard from '../atoms/GlassCard'

const projectTags = ['Restaurant Site', 'E-Commerce', 'Portfolio', 'Landing Page']

export default function ShowcaseCard() {
  return (
    <div className="hz-card-showcase flex items-center" data-card="3">
      <GlassCard className="w-full h-full flex flex-col md:flex-row overflow-hidden">
        {/* Left — Content */}
        <div className="flex-1 flex flex-col p-10 md:p-14 justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25">
              Featured Work
            </span>
            <h3
              className="font-heading font-bold text-white mt-5 tracking-super-tight leading-super-tight"
              style={{ fontSize: 'clamp(36px, 3.5vw, 60px)' }}
            >
              Responsive
              <br />
              <span className="text-white/25">by default.</span>
            </h3>
            <p className="text-sm md:text-base text-white/30 mt-5 max-w-sm tracking-tight leading-relaxed">
              Every project is crafted to perform flawlessly across all devices and screen sizes.
            </p>
          </div>

          {/* Project tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {projectTags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full text-[11px] font-medium text-white/30 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:text-white/50 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right — CSS Wavy Visual Panel */}
        <div className="flex-1 min-h-[300px] relative">
          <div className="wave-panel">
            <div className="wave-ridges" />
            
            {/* Browser mockup floating on top */}
            <div className="absolute inset-0 flex items-center justify-center z-10 p-8">
              <div className="mockup-browser w-full max-w-sm parallax-element" data-parallax-speed="slow">
                <div className="mockup-browser-bar">
                  <div className="mockup-dot" />
                  <div className="mockup-dot" />
                  <div className="mockup-dot" />
                  <div className="flex-1 mx-4">
                    <div className="h-4 bg-white/[0.04] rounded-full flex items-center px-3">
                      <span className="text-[9px] text-white/15">arctiqflow.com</span>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                  <img
                    src="/previews/restaurant.png"
                    alt="Website showcase — desktop view"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, transparent 50%, rgba(12,13,17,0.9) 100%)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
