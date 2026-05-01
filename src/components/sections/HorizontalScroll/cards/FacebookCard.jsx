import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'
import GlassCard from '../atoms/GlassCard'

export default function FacebookCard() {
  return (
    <div className="hz-card-facebook flex items-center" data-card="5">
      <GlassCard className="w-full h-full flex flex-col">
        {/* Label */}
        <div className="px-6 pt-6 pb-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2563EB]">
            Social Presence
          </span>
        </div>

        {/* Facebook Post UI */}
        <div className="social-post mx-4 mb-4 flex-1 flex flex-col">
          {/* Post Header */}
          <div className="social-post-header">
            <div className="social-post-avatar">
              <img
                src="/logo.png"
                alt="ArctiqFlow"
                className="w-full h-full object-contain p-1.5"
              />
            </div>
            <div className="social-post-meta">
              <div className="social-post-name">ArctiqFlow</div>
              <div className="social-post-time">2h · 🌐</div>
            </div>
            <button className="text-white/30 hover:text-white/60 transition-colors" aria-label="More options">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Post Content */}
          <div className="px-5 pb-4">
            <p className="text-sm text-white/70 leading-relaxed">
              🚀 Just launched a brand new website for our latest client. Clean design,
              blazing performance, and fully responsive.
              <br /><br />
              From concept to deployment in under 3 weeks. This is what happens when you
              combine modern tech with creative vision.
              <br /><br />
              <span className="text-[#2563EB]">#WebDesign #ArctiqFlow #DigitalExperience</span>
            </p>
          </div>

          {/* Post Image */}
          <div className="mx-4 mb-4 rounded-xl overflow-hidden border border-white/5">
            <img
              src="/previews/clinic.png"
              alt="Featured project"
              className="w-full h-40 object-cover"
            />
          </div>

          {/* Reactions Bar */}
          <div className="px-5 py-3 border-t border-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="flex -space-x-1">
                  <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[8px]">👍</span>
                  <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[8px]">❤️</span>
                </span>
                <span className="text-xs text-white/40 ml-1">128</span>
              </div>
              <div className="text-xs text-white/30">
                24 comments · 12 shares
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center border-t border-white/5 pt-3">
              <button className="flex-1 flex items-center justify-center gap-2 text-white/40 hover:text-white/70 transition-colors py-1.5 text-sm">
                <ThumbsUp className="w-4 h-4" />
                <span>Like</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 text-white/40 hover:text-white/70 transition-colors py-1.5 text-sm">
                <MessageCircle className="w-4 h-4" />
                <span>Comment</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 text-white/40 hover:text-white/70 transition-colors py-1.5 text-sm">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
