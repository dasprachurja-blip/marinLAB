import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Radio } from 'lucide-react'
import GlassCard from '../atoms/GlassCard'

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const contactActions = [
  {
    label: 'WhatsApp',
    value: '+880 1768 002784',
    meta: 'Fastest route for quick questions',
    href: 'https://wa.me/8801768002784',
    icon: <WhatsAppIcon />,
    tone: 'whatsapp',
    featured: true,
  },
  {
    label: 'Email',
    value: 'dasprachurja@gmail.com',
    meta: 'Best for project briefs and details',
    href: 'mailto:dasprachurja@gmail.com',
    icon: <Mail size={18} strokeWidth={1.8} />,
    tone: 'email',
  },
  {
    label: 'Facebook',
    value: '@arctiqflow',
    meta: 'Studio updates and direct messages',
    href: 'https://www.facebook.com/profile.php?id=61560327915046',
    icon: <FacebookIcon />,
    tone: 'facebook',
  },
]

const signalItems = [
  { icon: Clock, label: 'Response', value: 'Within 1 hour' },
  { icon: MapPin, label: 'Location', value: 'Dhaka + global' },
  { icon: Radio, label: 'Availability', value: 'Q2 2026' },
]

export default function BentoSocialCard() {
  return (
    <div className="hz-card-social flex items-center" data-card="2">
      <GlassCard className="contact-command-card w-full h-full">
        <div className="contact-command-ambient" aria-hidden="true" />
        <div className="contact-command-map" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="contact-command-shell">
          <header className="contact-command-header">
            <div>
              <span className="contact-command-eyebrow">Contact Command</span>
              <h3>
                Start the conversation
                <span> through the right channel.</span>
              </h3>
            </div>

            <div className="contact-command-status">
              <span />
              Available for Q2 2026
            </div>
          </header>

          <div className="contact-command-body">
            <section className="contact-command-summary" aria-label="Contact details">
              <div className="contact-command-radar" aria-hidden="true">
                <span />
                <span />
                <span />
                <MessageCircle size={20} strokeWidth={1.7} />
              </div>

              <p>
                Tell us what you are building. We will help shape the next step with a clear,
                calm, launch-ready path.
              </p>

              <div className="contact-signal-grid">
                {signalItems.map(({ icon: Icon, label, value }) => (
                  <div className="contact-signal" key={label}>
                    <Icon size={15} strokeWidth={1.8} />
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="contact-action-stack" aria-label="Contact actions">
              {contactActions.map((action) => (
                <a
                  className={`contact-action contact-action--${action.tone} ${action.featured ? 'contact-action--featured' : ''}`}
                  href={action.href}
                  target={action.href.startsWith('http') ? '_blank' : undefined}
                  rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  key={action.label}
                >
                  <span className="contact-action-icon">{action.icon}</span>
                  <span className="contact-action-copy">
                    <span>{action.label}</span>
                    <strong>{action.value}</strong>
                    <small>{action.meta}</small>
                  </span>
                  <ArrowUpRight className="contact-action-arrow" size={16} strokeWidth={1.8} />
                </a>
              ))}
            </section>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
