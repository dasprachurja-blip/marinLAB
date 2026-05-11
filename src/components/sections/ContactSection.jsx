import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import SectionWrapper from '@/components/layout/SectionWrapper'
import Button from '@/components/atoms/Button'
import { sendViaEmailJS } from '@/lib/emailjs'
import { sendViaFormspree } from '@/lib/formspree'

const INITIAL = { name: '', email: '', businessType: '', budget: '', message: '' }

const contactItems = [
  { icon: Mail, label: 'Email', value: 'dasprachurja@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Dhaka, Bangladesh' },
  { icon: Clock, label: 'Response Time', value: 'Within 1 hour' },
]

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

  const inputClasses = 'w-full bg-surface border border-arctic-border rounded-lg px-5 py-4 text-text-primary text-sm placeholder:text-text-tertiary focus:border-accent/30 focus:outline-none transition-colors duration-300 font-sans'

  return (
    <SectionWrapper id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-10">
          <div>
            <span className="section-label mb-6 block">GET IN TOUCH</span>
            <h2 className="font-display font-semibold tracking-super-tight text-text-primary leading-editorial" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
              Let's work<br /><span className="text-text-tertiary">together.</span>
            </h2>
            <p className="text-text-secondary/60 text-base leading-relaxed max-w-md mt-6 tracking-tight">
              Stop losing customers to poor web experiences. Let's build something exceptional.
            </p>
          </div>

          <a href="https://wa.me/8801768002784" target="_blank" rel="noopener noreferrer"
            className="glass-card px-6 py-5 flex items-center gap-4 transition-all duration-300 group hover:border-accent/20 block">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-text-primary/80 font-medium text-sm">Chat on WhatsApp</p>
              <p className="text-text-tertiary text-xs">Reply within 1 hour</p>
            </div>
            <ArrowRight className="w-4 h-4 text-text-tertiary ml-auto group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
          </a>

          <div className="space-y-4">
            {contactItems.map((item) => (
              <div key={item.label} className="flex items-center gap-4 py-3 border-b border-white/[0.04] last:border-b-0">
                <item.icon className="w-4 h-4 text-text-tertiary shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-label text-text-tertiary font-medium">{item.label}</p>
                  <p className="text-text-secondary text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-label text-text-tertiary mb-2 font-medium">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className={inputClasses} />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-label text-text-tertiary mb-2 font-medium">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className={inputClasses} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-label text-text-tertiary mb-2 font-medium">Business Type</label>
                <select name="businessType" value={form.businessType} onChange={handleChange} className={`${inputClasses} appearance-none`}>
                  <option value="">Select type</option>
                  {['Restaurant', 'Clinic', 'Shop', 'E-Commerce', 'Agency', 'Other'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-label text-text-tertiary mb-2 font-medium">Budget</label>
                <select name="budget" value={form.budget} onChange={handleChange} className={`${inputClasses} appearance-none`}>
                  <option value="">Select budget</option>
                  {['Under ৳35K', '৳35K–৳65K', '৳65K–৳120K', '৳120K+', 'Custom'].map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-label text-text-tertiary mb-2 font-medium">Project Details</label>
              <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Tell us about your project..." className={`${inputClasses} resize-none`} />
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isPending}>
              {isPending ? 'Sending...' : submitted ? '✓ Sent!' : 'Start My Project'}
              {!isPending && !submitted && <ArrowRight className="w-4 h-4" />}
            </Button>
            {submitted && <p className="text-accent/60 text-xs text-center">✓ Message sent! We'll reply within 1 hour.</p>}
            {isError && <p className="text-red-400/60 text-xs text-center">Something went wrong. Try WhatsApp instead.</p>}
          </form>
        </div>
      </div>
    </SectionWrapper>
  )
}
