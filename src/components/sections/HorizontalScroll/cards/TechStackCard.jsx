import GlassCard from '../atoms/GlassCard'

/* Inline SVG tech icons — monochrome */
const techIcons = [
  {
    id: 1,
    name: 'React',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Tailwind',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.4 10.85 14.5 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.6 7.15 14.5 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.4 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.6 13.15 9.5 12 7 12z" />
      </svg>
    ),
  },
  {
    id: 3,
    name: 'Vite',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.9 4.97L12.55 21.4a.5.5 0 01-.9-.03L2.1 4.97a.5.5 0 01.52-.74l9.28 1.63a.5.5 0 00.17 0l9.3-1.63a.5.5 0 01.53.74z" />
      </svg>
    ),
  },
  {
    id: 4,
    name: 'GSAP',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
      </svg>
    ),
  },
  {
    id: 5,
    name: 'CSS3',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.192 3.143h15.615l-1.42 16.034-6.404 1.812-6.369-1.813L4.192 3.143zm11.838 5.157H8.56l.26 2.866h6.946l-.778 8.766L12 21.009v.004l-.034.01-2.998-.868-.191-2.152h-2.86l.376 4.216L12 24l5.707-1.78.776-8.907z" />
      </svg>
    ),
  },
  {
    id: 6,
    name: 'HTML5',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.136 3.012h15.729l-1.431 16.15-6.451 1.826-6.414-1.826-1.433-16.15zm5.266 7.302l-.173-2.028h7.542l.173-2.028H6.936l.524 6.084h8.168l-.36 3.652-3.29.905-3.262-.905-.222-2.43H6.465l.39 4.758L12 19.903l5.114-1.447.72-8.142H9.402z" />
      </svg>
    ),
  },
]

const serviceLabels = [
  { id: 1, label: 'Web Design' },
  { id: 2, label: 'Frontend Development' },
  { id: 3, label: 'Brand Identity' },
  { id: 4, label: 'SEO Optimization' },
  { id: 5, label: 'Motion Design' },
]

export default function TechStackCard() {
  return (
    <div className="hz-card-tech flex items-center" data-card="4">
      <GlassCard className="w-full h-full flex flex-col justify-between p-8 md:p-12">
        {/* Header */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2563EB]">
            Our Stack
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white mt-2 tracking-tight">
            Built with Modern Tech
          </h3>
          <p className="text-sm text-white/40 mt-2 max-w-md">
            We leverage cutting-edge tools to deliver fast, scalable, and beautiful digital products.
          </p>
        </div>

        {/* Tech Icons Grid */}
        <div className="flex flex-wrap gap-4 my-8 md:my-10">
          {techIcons.map((tech) => (
            <div key={tech.id} className="tech-icon-wrapper group" title={tech.name}>
              {tech.svg}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/0 group-hover:text-white/50 transition-colors whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Service Labels */}
        <div className="flex flex-wrap gap-3">
          {serviceLabels.map((s) => (
            <span key={s.id} className="service-pill">
              {s.label}
            </span>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
