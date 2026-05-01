import GlassCard from '../atoms/GlassCard'

export default function ShowcaseCard() {
  return (
    <div className="hz-card-showcase flex items-center" data-card="3">
      <GlassCard className="w-full h-full flex flex-col p-8 md:p-12">
        {/* Label */}
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
            Featured Work
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white mt-2 tracking-tight">
            Responsive by Default
          </h3>
          <p className="text-sm text-white/40 mt-2 max-w-sm">
            Every project is crafted to perform flawlessly across all devices and screen sizes.
          </p>
        </div>

        {/* Mockup Container */}
        <div className="flex-1 relative flex items-center justify-center">
          {/* Desktop Browser Mockup */}
          <div className="mockup-browser w-full max-w-lg relative parallax-element" data-parallax-speed="slow">
            {/* Browser Bar */}
            <div className="mockup-browser-bar">
              <div className="mockup-dot" />
              <div className="mockup-dot" />
              <div className="mockup-dot" />
              <div className="flex-1 mx-4">
                <div className="h-5 bg-white/5 rounded-full flex items-center px-3">
                  <span className="text-[10px] text-white/20">arctiqflow.com</span>
                </div>
              </div>
            </div>
            {/* Screen Content */}
            <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
              <img
                src="/previews/restaurant.png"
                alt="Website showcase — desktop view"
                className="w-full h-full object-cover object-top"
              />
              {/* Ambient shadow overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, transparent 60%, rgba(15,17,21,0.9) 100%)',
                }}
              />
            </div>

            {/* Mobile Mockup Overlay */}
            <div className="mockup-phone parallax-element" data-parallax-speed="fast">
              <div className="mockup-phone-notch" />
              <div className="overflow-hidden" style={{ aspectRatio: '9/19' }}>
                <img
                  src="/previews/restaurant.png"
                  alt="Website showcase — mobile view"
                  className="w-full h-full object-cover object-top scale-150"
                />
              </div>
            </div>
          </div>

          {/* Soft highlight behind mockup */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 60%, rgba(255,255,255,0.03), transparent 60%)',
            }}
          />
        </div>
      </GlassCard>
    </div>
  )
}
