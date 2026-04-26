import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionLabel from '@/components/atoms/SectionLabel'
import GlassCard from '@/components/atoms/GlassCard'
import Button from '@/components/atoms/Button'
import { sendViaEmailJS } from '@/lib/emailjs'
import { sendViaFormspree } from '@/lib/formspree'
import { openWhatsApp } from '@/lib/whatsapp'

const INITIAL = { name: '', email: '', businessType: '', budget: '', message: '' }

const contactItems = [
  { icon: Mail, label: 'Email', value: 'hello@marinlab.com' },
  { icon: MapPin, label: 'Location', value: 'Dhaka, Bangladesh' },
  { icon: Clock, label: 'Response Time', value: 'Within 1 hour' },
]

export default function ContactSection() {
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  const { mutate: submit, isPending, isError } = useMutation({
    mutationFn: async (data) => {
      try {
        await sendViaEmailJS(data)
      } catch {
        await sendViaFormspree(data)
      }
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
    <SectionWrapper id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT — Info */}
        <div className="space-y-8 reveal-up">
          <div>
            <SectionLabel>GET STARTED</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to grow?</h2>
            <p className="text-muted text-lg leading-relaxed max-w-lg">
              Stop losing customers to poor web experiences. Let&apos;s build something exceptional together.
            </p>
          </div>

          {/* WhatsApp CTA */}
          <button
            onClick={() => openWhatsApp(form.message)}
            className="w-full glass-card px-6 py-5 flex items-center gap-4 hover:border-green-400/40 transition-all duration-300 animate-pulse-glow group"
          >
            <MessageCircle className="w-8 h-8 text-green-400" />
            <div className="text-left">
              <p className="text-white font-semibold">Chat on WhatsApp</p>
              <p className="text-muted text-sm">Reply within 1 hour</p>
            </div>
          </button>

          {/* Contact info cards */}
          {contactItems.map((item) => (
            <GlassCard key={item.label} hover={false} className="px-6 py-4 flex items-center gap-4">
              <item.icon className="w-5 h-5 text-teal" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">{item.label}</p>
                <p className="text-white font-medium">{item.value}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* RIGHT — Form */}
        <GlassCard hover={false} className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-semibold">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full bg-navy border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/40 focus:border-teal/50 focus:outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-semibold">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full bg-navy border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/40 focus:border-teal/50 focus:outline-none transition-colors duration-300"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-semibold">Business Type</label>
                <select
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
                  className="w-full bg-navy border border-white/10 rounded-xl px-5 py-4 text-white focus:border-teal/50 focus:outline-none transition-colors duration-300 appearance-none"
                >
                  <option value="">Select type</option>
                  {['Restaurant', 'Clinic', 'Shop', 'E-Commerce', 'Agency', 'Other'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-semibold">Budget Range</label>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="w-full bg-navy border border-white/10 rounded-xl px-5 py-4 text-white focus:border-teal/50 focus:outline-none transition-colors duration-300 appearance-none"
                >
                  <option value="">Select budget</option>
                  {['Under ৳35K', '৳35K–৳65K', '৳65K–৳120K', '৳120K+', 'Custom'].map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-semibold">Project Details</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Tell us about your project..."
                className="w-full bg-navy border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/40 focus:border-teal/50 focus:outline-none transition-colors duration-300 resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? 'Sending...' : submitted ? '✓ Sent!' : 'Start My Project →'}
            </Button>

            {submitted && (
              <p className="text-teal text-sm text-center animate-pulse">
                ✓ Message sent! We&apos;ll reply within 1 hour.
              </p>
            )}
            {isError && (
              <p className="text-red-400 text-sm text-center">
                Something went wrong. Try WhatsApp instead.
              </p>
            )}
          </form>
        </GlassCard>
      </div>
    </SectionWrapper>
  )
}
