// Order history -> browser localStorage la save aagum (backend illa).
// Each user (email) ku thani history. Browser/device mathina reset aagum.
const keyFor = (email) => `freshmart_orders:${(email || 'guest').toLowerCase()}`
const MAX_ORDERS = 50

export function loadOrders(email) {
  try {
    const raw = localStorage.getItem(keyFor(email))
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// items = [[productId, qty], ...]   (CheckoutPage la irundhu varum)
export function saveOrder(email, items) {
  const clean = (items || [])
    .map(([id, qty]) => [Number(id), Number(qty)])
    .filter(([id, qty]) => id && qty > 0)
  const existing = loadOrders(email)
  if (clean.length === 0) return existing

  const orders = [
    ...existing,
    { id: Date.now(), date: new Date().toISOString(), items: clean },
  ].slice(-MAX_ORDERS)

  try { localStorage.setItem(keyFor(email), JSON.stringify(orders)) } catch { /* storage full / blocked */ }
  return orders
}
