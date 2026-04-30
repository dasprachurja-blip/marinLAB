const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '8801XXXXXXXXX'

export function openWhatsApp(message = '') {
  const text = encodeURIComponent(
    message || 'Hi ArctiqFlow! I want to discuss a web project.'
  )
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank')
}
