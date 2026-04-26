import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''

export async function sendViaEmailJS(data) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('EmailJS not configured')
  }

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    from_name: data.name,
    business_type: data.businessType,
    budget: data.budget,
    message: data.message,
  }, PUBLIC_KEY)
}
