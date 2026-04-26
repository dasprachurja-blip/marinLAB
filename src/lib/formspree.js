const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || ''

export async function sendViaFormspree(data) {
  if (!ENDPOINT) {
    throw new Error('Formspree not configured')
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: data.name,
      businessType: data.businessType,
      budget: data.budget,
      message: data.message,
    }),
  })

  if (!res.ok) throw new Error('Formspree submission failed')
  return res.json()
}
