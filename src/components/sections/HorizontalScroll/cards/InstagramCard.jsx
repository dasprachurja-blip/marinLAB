import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react'
import GlassCard from '../atoms/GlassCard'

export default function InstagramCard() {
  return (
    <div className="hz-card-instagram flex items-center" data-card="6">
      <GlassCard className="w-full h-full flex flex-col">
        {/* Label */}
        <div className="px-6 pt-6 pb-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2563EB]">
            Instagram
          </span>
        </div>

        {/* Instagram Post UI */}
        <div className="social-post mx-4 mb-4 flex-1 flex flex-col">
          {/* Post Header */}
          <div className="social-post-header">
            <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex-shrink-0">
              <div className="w-full h-full rounded-full bg-[#0B1225] flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="ArctiqFlow"
                  className="w-full h-full object-contain p-1"
                />
              </div>
            </div>
            <div className="social-post-meta">
              <div className="social-post-name text-sm">arctiqflow</div>
              <div className="social-post-time text-[11px]">Dhaka, Bangladesh</div>
            </div>
            <button className="text-white/30 hover:text-white/60 transition-colors" aria-label="More options">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Post Image */}
          <div className="w-full overflow-hidden" style={{ aspectRatio: '4/5' }}>
            <img
              src="/previews/shop.png"
              alt="Instagram post — project showcase"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Action Bar */}
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="text-white/60 hover:text-red-400 transition-colors" aria-label="Like">
                <Heart className="w-5 h-5" />
              </button>
              <button className="text-white/60 hover:text-white transition-colors" aria-label="Comment">
                <MessageCircle className="w-5 h-5" />
              </button>
              <button className="text-white/60 hover:text-white transition-colors" aria-label="Share">
                <Send className="w-5 h-5" />
              </button>
            </div>
            <button className="text-white/60 hover:text-white transition-colors" aria-label="Save">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>

          {/* Likes & Caption */}
          <div className="px-4 pb-4">
            <p className="text-sm font-semibold text-white/80 mb-1.5">2,847 likes</p>
            <p className="text-sm text-white/60 leading-relaxed">
              <span className="font-semibold text-white/80">arctiqflow</span>{' '}
              Crafting premium digital experiences that convert. Every pixel matters. ✨
            </p>
            <p className="text-xs text-white/25 mt-2">View all 43 comments</p>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
