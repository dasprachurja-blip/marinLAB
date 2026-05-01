import { ExternalLink, Briefcase, Camera, Mail, MessageCircle, Send, Globe } from 'lucide-react'

/* Icon mapping for social platforms — using generic icons since lucide doesn't have brand icons.
   Facebook → ExternalLink, LinkedIn → Briefcase, Instagram → Camera */
import SocialLink from '../atoms/SocialLink'
import GlassCard from '../atoms/GlassCard'

const SOCIALS_COL_1 = [
  {
    id: 1,
    icon: ExternalLink,
    label: '@arctiqflow',
    sublabel: 'Facebook',
    href: '#', /* PLACEHOLDER — replace with your Facebook profile URL */
  },
  {
    id: 2,
    icon: Briefcase,
    label: '@arctiqflow',
    sublabel: 'LinkedIn',
    href: '#', /* PLACEHOLDER — replace with your LinkedIn URL */
  },
  {
    id: 3,
    icon: Camera,
    label: '@arctiqflow',
    sublabel: 'Instagram',
    href: '#', /* PLACEHOLDER — replace with your Instagram URL */
  },
  {
    id: 4,
    icon: Mail,
    label: 'hello@arctiqflow.com',
    sublabel: 'Email',
    href: '#', /* PLACEHOLDER — replace with mailto: link */
  },
]

const SOCIALS_COL_2 = [
  {
    id: 5,
    icon: MessageCircle,
    label: '+880 XXXX XXXXX',
    sublabel: 'WhatsApp',
    href: '#', /* PLACEHOLDER — replace with WhatsApp link */
  },
  {
    id: 6,
    icon: Send,
    label: '@arctiqflow',
    sublabel: 'Telegram',
    href: '#', /* PLACEHOLDER — replace with Telegram link */
  },
  {
    id: 7,
    icon: Globe,
    label: 'arctiqflow.com',
    sublabel: 'Facebook Page',
    href: '#', /* PLACEHOLDER — replace with Facebook page URL */
  },
]

export default function SocialCards() {
  return (
    <div className="hz-card-social flex items-center" data-card="2">
      <div className="w-full h-full grid grid-cols-2 gap-4 auto-rows-fr">
        {/* Left Column — Taller card with 4 links + header */}
        <GlassCard className="flex flex-col p-6 md:p-8">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-white/90 mb-1">Connect</h3>
            <p className="text-xs text-white/30">Find us everywhere</p>
          </div>
          <div className="flex flex-col gap-3 flex-1 justify-center">
            {SOCIALS_COL_1.map((s) => (
              <SocialLink key={s.id} icon={s.icon} label={s.label} sublabel={s.sublabel} href={s.href} />
            ))}
          </div>
        </GlassCard>

        {/* Right Column — Asymmetric stacked layout */}
        <div className="flex flex-col gap-4">
          {/* Top — Availability card */}
          <GlassCard className="p-6 md:p-8 flex flex-col justify-center flex-[1.2]">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <span className="text-sm font-medium text-white/70">Open to projects</span>
            </div>
            <p className="text-xs text-white/30 leading-relaxed">
              Currently accepting new projects for Q3 2025. Let's discuss your vision.
            </p>
          </GlassCard>

          {/* Bottom — Remaining socials */}
          <GlassCard className="p-6 md:p-8 flex flex-col justify-center flex-[1.8]">
            <div className="flex flex-col gap-3">
              {SOCIALS_COL_2.map((s) => (
                <SocialLink key={s.id} icon={s.icon} label={s.label} sublabel={s.sublabel} href={s.href} />
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
