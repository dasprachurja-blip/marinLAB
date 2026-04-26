export function formatPrice(amount, currency = 'BDT') {
  if (amount === null || amount === undefined) return 'Custom'
  return `৳${amount.toLocaleString('en-BD')}`
}
