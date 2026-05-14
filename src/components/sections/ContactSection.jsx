import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useMutation } from '@tanstack/react-query'
import { Mail, MapPin, Clock, ArrowRight, Check, Loader2 } from 'lucide-react'
import SectionWrapper from '@/components/layout/SectionWrapper'
import Button from '@/components/atoms/Button'
import { sendViaEmailJS } from '@/lib/emailjs'
import { sendViaFormspree } from '@/lib/formspree'
import { easing, viewportOnce } from '@/animations/motionPresets'

const INITIAL = { name: '', email: '', businessType: '', budget: '', message: '' }

const contactItems = [
  { icon: Mail, label: 'Email', value: 'dasprachurja@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Dhaka, Bangladesh' },
  { icon: Clock, label: 'Response Time', value: 'Within 1 hour' },
]

/* ── Floating Label Input ── */
function FloatingInput({ label, name, type = 'text', value, onChange, required, ...props }) {
  const [focused, setFocused] = useState(false)
  const hasValue = value && value.length > 0

  return (
    <div className="relative group">
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 pt-7 pb-3 text-text-primary text-sm placeholder:text-transparent focus:border-accent/30 focus:bg-white/[0.03] focus:outline-none transition-all duration-400 font-sans peer"
        placeholder={label}
        {...props}
      />
      <label className={`absolute left-5 transition-all duration-300 pointer-events-none font-medium ${
        focused || hasValue
          ? 'top-2.5 text-[10px] tracking-label uppercase text-accent/60'
          : 'top-1/2 -translate-y-1/2 text-sm text-text-tertiary'
      }`}>
        {label}
      </label>
      {/* Focus glow line at bottom */}
      <div className={`absolute bottom-0 left-4 right-4 h-px transition-all duration-500 ${
        focused ? 'bg-accent/30 shadow-[0_0_8px_rgba(77,158,255,0.15)]' : 'bg-transparent'
      }`} />
    </div>
  )
}

/* ── Floating Select ── */
function FloatingSelect({ label, name, value, onChange, options }) {
  const hasValue = value && value.length > 0

  return (
    <div className="relative group">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 pt-7 pb-3 text-text-primary text-sm focus:border-accent/30 focus:bg-white/[0.03] focus:outline-none transition-all duration-400 font-sans appearance-none cursor-pointer"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <label className={`absolute left-5 transition-all duration-300 pointer-events-none font-medium ${
        hasValue
          ? 'top-2.5 text-[10px] tracking-label uppercase text-accent/60'
          : 'top-2.5 text-[10px] tracking-label uppercase text-text-tertiary'
      }`}>
        {label}
      </label>
      {/* Chevron */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-tertiary">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <polyline points="2,4 6,8 10,4" />
        </svg>
      </div>
    </div>
  )
}

export default function ContactSection() {
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  const { mutate: submit, isPending, isError } = useMutation({
    mutationFn: async (data) => {
      try { await sendViaEmailJS(data) }
      catch { await sendViaFormspree(data) }
    },
    onSuccess: () => {
      setSubmitted(true)
      setForm(INITIAL)
      setTimeout(() => setSubmitted(false), 5000)
    },
  })

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    submit(form)
  }

  return (
    <section id="contact" className="py-28 md:py-40 relative overflow-hidden bg-abyss">
      <div className="noise-overlay" />

      {/* Dot grid background */}
      <div className="dot-grid absolute inset-0 pointer-events-none opacity-50" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Info */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easing.expoOut }}
          >
            <div>
              <span className="section-label mb-6 block">GET IN TOUCH</span>
              <h2 className="font-display font-semibold tracking-super-tight text-text-primary leading-editorial" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
                Let's work<br /><span className="text-text-tertiary">together.</span>
              </h2>
              <p className="text-text-secondary/60 text-base leading-relaxed max-w-md mt-6 tracking-tight">
                Stop losing customers to poor web experiences. Let's build something exceptional.
              </p>
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#25D366]/20 bg-[#25D366]/[0.04]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-[#25D366]/50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]/70" />
              </span>
              <span className="text-[11px] text-[#25D366]/80 font-medium tracking-wide">Available for new projects</span>
            </div>

            {/* WhatsApp CTA */}
            <a href="https://wa.me/8801768002784" target="_blank" rel="noopener noreferrer"
              className="glass-card px-6 py-5 flex items-center gap-4 transition-all duration-300 group hover:border-[#25D366]/20 block">
              <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-text-primary/80 font-medium text-sm">Chat on WhatsApp</p>
                <p className="text-text-tertiary text-xs">Reply within 1 hour</p>
              </div>
              <ArrowRight className="w-4 h-4 text-text-tertiary ml-auto group-hover:text-[#25D366] group-hover:translate-x-1 transition-all duration-300" />
            </a>

            {/* Contact info items */}
            <div className="space-y-0">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-center gap-4 py-4 border-b border-white/[0.04] last:border-b-0 group">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center group-hover:border-accent/15 transition-colors duration-300">
                    <item.icon className="w-3.5 h-3.5 text-text-tertiary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-label text-text-tertiary font-medium">{item.label}</p>
                    <p className="text-text-secondary text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easing.expoOut, delay: 0.1 }}
          >
            {/* Accent top border glow */}
            <div className="rounded-2xl overflow-hidden">
              <div className="h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              <div className="glass-card rounded-t-none p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <FloatingInput
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <FloatingInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatingSelect
                      label="Business Type"
                      name="businessType"
                      value={form.businessType}
                      onChange={handleChange}
                      options={['Restaurant', 'Clinic', 'Shop', 'E-Commerce', 'Agency', 'Other']}
                    />
                    <FloatingSelect
                      label="Budget Range"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      options={['Under ৳35K', '৳35K–৳65K', '৳65K–৳120K', '৳120K+', 'Custom']}
                    />
                  </div>
                  <div className="relative group">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder=" "
                      onFocus={(e) => e.target.previousSibling?.classList?.add('hidden')}
                      className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 pt-7 pb-3 text-text-primary text-sm focus:border-accent/30 focus:bg-white/[0.03] focus:outline-none transition-all duration-400 font-sans resize-none peer"
                    />
                    <label className="absolute left-5 top-2.5 text-[10px] tracking-label uppercase text-text-tertiary font-medium pointer-events-none peer-focus:text-accent/60 transition-colors duration-300">
                      Project Details
                    </label>
                  </div>

                  {/* Animated submit button */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full relative overflow-hidden rounded-full bg-accent text-void font-medium py-4 text-[15px] tracking-wide transition-all duration-300 hover:shadow-[0_8px_32px_rgba(77,158,255,0.25)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <AnimatePresence mode="wait">
                      {isPending ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                        </motion.span>
                      ) : submitted ? (
                        <motion.span
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" /> Message Sent!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-2"
                        >
                          Start My Project <ArrowRight className="w-4 h-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Shimmer effect */}
                    <span
                      className="absolute inset-0 pointer-events-none z-0"
                      style={{
                        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
                        backgroundSize: '200% 100%',
                        animation: 'btnShimmer 3s ease-in-out infinite',
                      }}
                    />
                  </button>

                  {submitted && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-accent/60 text-xs text-center"
                    >
                      ✓ Message sent! We'll reply within 1 hour.
                    </motion.p>
                  )}
                  {isError && <p className="text-red-400/60 text-xs text-center">Something went wrong. Try WhatsApp instead.</p>}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
