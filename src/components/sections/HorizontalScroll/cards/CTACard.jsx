import { ArrowRight, CalendarClock, CheckCircle2, ClipboardList, Mail, Target } from 'lucide-react'
import GlassCard from '../atoms/GlassCard'
import Button from '@/components/atoms/Button'

const briefItems = [
  {
    icon: Target,
    label: 'Goal',
    value: 'Define the experience, audience, and conversion path.',
  },
  {
    icon: CalendarClock,
    label: 'Timeline',
    value: 'Map a focused launch sprint with clear checkpoints.',
  },
  {
    icon: CheckCircle2,
    label: 'Next step',
    value: 'Send a short brief. We reply with a practical direction.',
  },
]

export default function CTACard() {
  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="hz-card-cta flex items-center" data-card="4">
      <GlassCard className="project-brief-card w-full h-full">
        <div className="project-brief-ambient" aria-hidden="true" />
        <div className="project-brief-orbit" aria-hidden="true" />

        <div className="project-brief-copy">
          <span className="project-brief-eyebrow">Project Brief</span>
          <h3>
            Tell us what you want to build.
          </h3>
          <p>
            Share the goal, timeline, and scope. We will turn it into a clear launch path.
          </p>

          <div className="project-brief-actions">
            <Button variant="primary" size="lg" onClick={scrollToContact}>
              Start a Project <ArrowRight className="w-4 h-4" />
            </Button>

            <a href="mailto:dasprachurja@gmail.com" className="project-brief-email">
              <Mail size={15} strokeWidth={1.8} />
              dasprachurja@gmail.com
            </a>
          </div>
        </div>

        <aside className="project-brief-panel" aria-label="Project brief preview">
          <div className="project-brief-panel-header">
            <div>
              <span>Launch Path</span>
              <strong>01 / Brief Intake</strong>
            </div>
            <ClipboardList size={20} strokeWidth={1.6} />
          </div>

          <div className="project-brief-list">
            {briefItems.map(({ icon: Icon, label, value }) => (
              <div className="project-brief-item" key={label}>
                <span className="project-brief-item-icon">
                  <Icon size={16} strokeWidth={1.8} />
                </span>
                <span>
                  <strong>{label}</strong>
                  <small>{value}</small>
                </span>
              </div>
            ))}
          </div>

          <div className="project-brief-progress" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </aside>
      </GlassCard>
    </div>
  )
}
