import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'

export default function SocialLink({ icon: Icon, label, sublabel, href = '#' }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-link-card"
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium text-white/90 truncate">{label}</span>
        {sublabel && (
          <span className="text-xs text-white/30 truncate">{sublabel}</span>
        )}
      </div>
      <ArrowUpRight className="social-arrow w-4 h-4 flex-shrink-0" />
      <div className="social-underline" />
    </motion.a>
  )
}
