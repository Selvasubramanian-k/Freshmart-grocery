import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProduct, DELIVERY } from '../data/products.js'
import ProductImage from '../components/ProductImage.jsx'
import Icon from '../components/Icon.jsx'
import Avatar, { AvatarPicker } from '../components/Avatar.jsx'

// ── Saved addresses -> localStorage (backend illa) ──
const addrKey   = (u) => `freshmart_addresses:${(u?.email || u?.phone || 'guest').toLowerCase()}`
const readAddrs = (u) => { try { const a = JSON.parse(localStorage.getItem(addrKey(u))); return Array.isArray(a) ? a : [] } catch { return [] } }
const saveAddrs = (u, list) => { try { localStorage.setItem(addrKey(u), JSON.stringify(list)) } catch { /* storage blocked */ } }

const TABS = [
  { id: 'orders',    label: 'Orders',          icon: 'shopping-bag' },
  { id: 'support',   label: 'Customer Support', icon: 'headphones' },
  { id: 'addresses', label: 'Saved Addresses',  icon: 'map-pin' },
  { id: 'profile',   label: 'Profile',          icon: 'user' },
]

const fmtDate = (iso) => {
  const d = new Date(iso)
  const day = d.getDate()
  const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th'
  const month = d.toLocaleString('en-IN', { month: 'short' })
  const time = d.toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase()
  return `${day}${suffix} ${month} ${d.getFullYear()}, ${time}`
}

const orderTotal = (items) => {
  const sub = items.reduce((s, [id, q]) => s + (getProduct(id)?.price || 0) * q, 0)
  return sub + (sub > 0 ? DELIVERY : 0)
}

export default function Account({ user, orders, increment, onLogout, onOpenCart }) {
  const navigate = useNavigate()
  const [tab, setTab] = useState('orders')
  const [showList, setShowList] = useState(true) // mobile: list <-> detail

  const [addrs, setAddrs] = useState(() => readAddrs(user))
  const [addrForm, setAddrForm] = useState({ label: 'Home', text: '' })

  const sub = user?.phone || user?.email || ''

  const pick = (id) => { setTab(id); setShowList(false) }

  const orderAgain = (items) => {
    items.forEach(([id, qty]) => { for (let i = 0; i < qty; i++) increment(id) })
    onOpenCart()
  }

  const addAddress = (e) => {
    e.preventDefault()
    if (!addrForm.text.trim()) return
    const next = [...addrs, { id: Date.now(), label: addrForm.label, text: addrForm.text.trim() }]
    setAddrs(next); saveAddrs(user, next)
    setAddrForm({ label: 'Home', text: '' })
  }
  const removeAddress = (id) => {
    const next = addrs.filter(a => a.id !== id)
    setAddrs(next); saveAddrs(user, next)
  }

  const history = [...orders].reverse()
  const goBack = () => (window.history.length > 1 ? navigate(-1) : navigate('/'))

  return (
    <div className="acc-page">
      <div className="acc-shell">
        <button type="button" className="acc-exit" aria-label="Go back" onClick={goBack}>
          <span aria-hidden="true">←</span> Back
        </button>

        {/* ───── LEFT ───── */}
        <aside className={`acc-left ${showList ? '' : 'acc-hide-m'}`}>
          <div className="acc-user">
            <Avatar user={user} size={56} />
            <div>
              <h2 className="acc-name">{user?.name || 'Guest'}</h2>
              <p className="acc-sub">{sub}</p>
            </div>
          </div>
          <AvatarPicker user={user} onPick={() => setTimeout(goBack, 450)} />

          <button className="acc-wallet" onClick={() => navigate('/offers')}>
            <div className="acc-wallet-top">
              <span><Icon name="wallet" /> FreshMart Cash &amp; Gift Card</span><span><Icon name="chevron-right" /></span>
            </div>
            <div className="acc-wallet-bottom">
              <span>Available Balance: <b>₹0</b></span>
              <span className="acc-wallet-btn">Add Balance</span>
            </div>
          </button>

          <nav className="acc-menu">
            {TABS.map(t => (
              <button key={t.id} className={`acc-menu-item ${tab === t.id ? 'active' : ''}`} onClick={() => pick(t.id)}>
                <span className="acc-menu-icon"><Icon name={t.icon} /></span>{t.label}
              </button>
            ))}
          </nav>

          <button className="acc-logout" onClick={onLogout}>Log Out</button>
        </aside>

        {/* ───── RIGHT ───── */}
        <section className={`acc-right ${showList ? 'acc-hide-m' : ''}`}>
          <div className="acc-right-head">
            <button className="acc-back" aria-label="Back" onClick={() => setShowList(true)}>‹</button>
            <span>{TABS.find(t => t.id === tab)?.label}</span>
          </div>

          <div className="acc-right-body">

            {/* ORDERS */}
            {tab === 'orders' && (
              history.length === 0 ? (
                <div className="acc-empty">
                  <div className="acc-empty-emoji"><Icon name="shopping-cart" /></div>
                  <p>No orders yet</p>
                  <button className="acc-primary" onClick={() => navigate('/')}>Start shopping</button>
                </div>
              ) : history.map(o => (
                <div className="acc-order" key={o.id}>
                  <div className="acc-order-top">
                    <div>
                      <div className="acc-order-status">Order delivered <span className="acc-tick"><Icon name="check" /></span></div>
                      <div className="acc-order-date">Placed at {fmtDate(o.date)}</div>
                    </div>
                    <div className="acc-order-amt">₹{orderTotal(o.items)} <Icon name="chevron-right" /></div>
                  </div>
                  <div className="acc-thumbs">
                    {o.items.map(([id, qty]) => {
                      const p = getProduct(id)
                      return p ? (
                        <div className="acc-thumb" key={id} title={`${p.name} × ${qty}`}>
                          <ProductImage product={p} />
                          {qty > 1 && <span className="acc-qty">{qty}</span>}
                        </div>
                      ) : null
                    })}
                  </div>
                  <button className="acc-again" onClick={() => orderAgain(o.items)}>Order Again</button>
                </div>
              ))
            )}

            {/* SUPPORT */}
            {tab === 'support' && (
              <div className="acc-card">
                <h3>How can we help?</h3>
                <p className="acc-muted">Order issue, refund, or any doubt? Reach out to us.</p>
                <button className="acc-primary" onClick={() => navigate('/contact')}>Contact FreshMart</button>
              </div>
            )}

            {/* ADDRESSES */}
            {tab === 'addresses' && (
              <>
                {addrs.map(a => (
                  <div className="acc-card acc-addr" key={a.id}>
                    <div>
                      <b>{a.label}</b>
                      <p className="acc-muted">{a.text}</p>
                    </div>
                    <button className="acc-del" onClick={() => removeAddress(a.id)}>Delete</button>
                  </div>
                ))}
                <form className="acc-card" onSubmit={addAddress}>
                  <h3>Add new address</h3>
                  <div className="acc-chips">
                    {['Home', 'Work', 'Other'].map(l => (
                      <button type="button" key={l} className={`acc-chip ${addrForm.label === l ? 'on' : ''}`} onClick={() => setAddrForm(f => ({ ...f, label: l }))}>{l}</button>
                    ))}
                  </div>
                  <textarea
                    className="acc-input"
                    rows={3}
                    placeholder="Flat / street / area / pincode"
                    value={addrForm.text}
                    onChange={(e) => setAddrForm(f => ({ ...f, text: e.target.value }))}
                  />
                  <button type="submit" className="acc-primary">Save address</button>
                </form>
              </>
            )}

            {/* PROFILE */}
            {tab === 'profile' && (
              <div className="acc-card">
                <div className="acc-row"><span className="acc-muted">Name</span><b>{user?.name || 'Guest'}</b></div>
                {user?.phone && <div className="acc-row"><span className="acc-muted">Phone</span><b>{user.phone}</b></div>}
                {user?.email && <div className="acc-row"><span className="acc-muted">Email</span><b>{user.email}</b></div>}
                <div className="acc-row"><span className="acc-muted">Orders placed</span><b>{orders.length}</b></div>
              </div>
            )}

          </div>
        </section>
      </div>
    </div>
  )
}
