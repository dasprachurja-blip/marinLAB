import GlassCard from '../atoms/GlassCard'

const projectTags = ['Restaurant Site', 'E-Commerce', 'Portfolio', 'Landing Page']

export default function ShowcaseCard() {
  return (
    <div className="hz-card-showcase flex items-center" data-card="3">
      <GlassCard className="w-full h-full flex flex-col md:flex-row overflow-hidden">
        {/* Left — Content */}
        <div className="showcase-content">
          <div>
            <span className="showcase-eyebrow">
              Featured Work
            </span>
            <h3 className="showcase-headline">
              Responsive
              <br />
              <span className="showcase-headline-dim">by default.</span>
            </h3>
            <p className="showcase-description">
              Every project is crafted to perform flawlessly across all devices and screen sizes.
            </p>
          </div>

          {/* Project tags */}
          <div className="showcase-tags">
            {projectTags.map((tag) => (
              <span key={tag} className="showcase-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right — Cinematic Device Scene */}
        <div className="showcase-device-scene" aria-hidden="true">
          {/* Ambient glow orbs */}
          <div className="showcase-orb showcase-orb--1" />
          <div className="showcase-orb showcase-orb--2" />
          <div className="showcase-orb showcase-orb--3" />

          {/* ── Laptop ── */}
          <div className="showcase-laptop">
            {/* Screen */}
            <div className="showcase-laptop-screen">
              {/* Browser chrome */}
              <div className="showcase-laptop-chrome">
                <div className="showcase-chrome-dots">
                  <span className="showcase-dot showcase-dot--red" />
                  <span className="showcase-dot showcase-dot--yellow" />
                  <span className="showcase-dot showcase-dot--green" />
                </div>
                <div className="showcase-chrome-url">
                  <span>arctiqflow.com</span>
                </div>
              </div>

              {/* Inner scrolling mini-website */}
              <div className="showcase-laptop-viewport">
                <div className="showcase-minisite">
                  {/* Hero section */}
                  <div className="minisite-hero">
                    <div className="minisite-hero-badge">Creative Studio</div>
                    <div className="minisite-hero-heading" />
                    <div className="minisite-hero-sub" />
                    <div className="minisite-hero-cta" />
                  </div>

                  {/* Grid cards */}
                  <div className="minisite-grid">
                    <div className="minisite-card minisite-card--wide">
                      <div className="minisite-card-img" />
                      <div className="minisite-card-text" />
                      <div className="minisite-card-text minisite-card-text--short" />
                    </div>
                    <div className="minisite-card">
                      <div className="minisite-card-img minisite-card-img--alt" />
                      <div className="minisite-card-text" />
                    </div>
                    <div className="minisite-card">
                      <div className="minisite-card-img minisite-card-img--alt2" />
                      <div className="minisite-card-text" />
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="minisite-stats">
                    <div className="minisite-stat">
                      <div className="minisite-stat-num" />
                      <div className="minisite-stat-label" />
                    </div>
                    <div className="minisite-stat">
                      <div className="minisite-stat-num" />
                      <div className="minisite-stat-label" />
                    </div>
                    <div className="minisite-stat">
                      <div className="minisite-stat-num" />
                      <div className="minisite-stat-label" />
                    </div>
                  </div>

                  {/* Feature section */}
                  <div className="minisite-feature">
                    <div className="minisite-feature-heading" />
                    <div className="minisite-feature-row">
                      <div className="minisite-feature-box" />
                      <div className="minisite-feature-box" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop hinge */}
            <div className="showcase-laptop-hinge" />

            {/* Laptop base */}
            <div className="showcase-laptop-base">
              <div className="showcase-laptop-trackpad" />
            </div>
          </div>

          {/* ── Phone ── */}
          <div className="showcase-phone">
            <div className="showcase-phone-notch" />
            <div className="showcase-phone-screen">
              <div className="showcase-phone-minisite">
                {/* Phone hero */}
                <div className="phone-hero">
                  <div className="phone-hero-heading" />
                  <div className="phone-hero-sub" />
                  <div className="phone-hero-cta" />
                </div>
                {/* Phone cards */}
                <div className="phone-card">
                  <div className="phone-card-img" />
                  <div className="phone-card-text" />
                  <div className="phone-card-text phone-card-text--short" />
                </div>
                <div className="phone-card">
                  <div className="phone-card-img phone-card-img--alt" />
                  <div className="phone-card-text" />
                </div>
                {/* Phone nav bar */}
                <div className="phone-nav">
                  <div className="phone-nav-icon" />
                  <div className="phone-nav-icon" />
                  <div className="phone-nav-icon phone-nav-icon--active" />
                  <div className="phone-nav-icon" />
                </div>
              </div>
            </div>
            {/* Home indicator */}
            <div className="showcase-phone-homebar" />
          </div>

          {/* Floating connection lines */}
          <svg className="showcase-connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <line x1="65" y1="50" x2="82" y2="35" className="showcase-connector-line" />
          </svg>
        </div>
      </GlassCard>
    </div>
  )
}
