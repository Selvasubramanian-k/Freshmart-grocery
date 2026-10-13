import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CATEGORIES } from '../data/categories.js'

// ─────────────────────────────────────────────────────────────
//  Maathanum na inga mattum maathunga
// ─────────────────────────────────────────────────────────────
const DELIVERY_ETA = '10 minutes'
const SEARCH_HINTS = ['milk', 'tea powder', 'tomato', 'dish wash liquid', 'ice cream', 'bread', 'eggs', 'sugar']

const ADDRESS_KEY    = 'freshmart_address'
const ADDRESS_LABELS = ['Home', 'Work', 'Other']

function readAddress() {
  try {
    const a = JSON.parse(localStorage.getItem(ADDRESS_KEY))
    if (a && ADDRESS_LABELS.includes(a.label)) return { label: a.label, text: String(a.text || '') }
  } catch { /* storage blocked / bad json */ }
  return { label: 'Home', text: '' }
}

function writeAddress(a) {
  try { localStorage.setItem(ADDRESS_KEY, JSON.stringify(a)) } catch { /* ignore */ }
}

function Navbar({ onCartClick, cartCount, onSearch, user, onLogout, activeCat, onCategory }) {
  const [rightOpen, setRightOpen] = useState(false)
  const [query, setQuery]         = useState('')
  const [hintIdx, setHintIdx]     = useState(0)
  const [addrOpen, setAddrOpen]   = useState(false)
  const [address, setAddress]     = useState(readAddress)
  const [draft, setDraft]         = useState(address)

  const navigate = useNavigate()
  const location = useLocation()
  const isHome   = location.pathname === '/'

  // Search box la text thaanaave maaruthu (Zepto maathiri)
  useEffect(() => {
    const t = setInterval(() => setHintIdx((i) => (i + 1) % SEARCH_HINTS.length), 2600)
    return () => clearInterval(t)
  }, [])

  const goTo = (path) => {
    setRightOpen(false)
    navigate(path)
  }

  const handleLogout = () => {
    setRightOpen(false)
    onLogout()
  }

  const handleSearch = (value) => {
    setQuery(value)
    onSearch(value)
    if (!isHome) navigate('/')          // vera page la type panna Home ku povom
  }

  const openAddress = () => { setDraft(address); setAddrOpen(true) }
  const closeAddress = () => setAddrOpen(false)
  const saveAddress = (e) => {
    e.preventDefault()
    const next = { label: draft.label, text: draft.text.trim() }
    setAddress(next)
    writeAddress(next)
    setAddrOpen(false)
  }

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return '👤'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <>
      <header className="zn-header">
        <div className="zn-top">

          <button type="button" className="zn-logo" aria-label="FreshMart home" onClick={() => navigate('/')}>
            <svg width="38" height="38" viewBox="0 0 40 40" fill="none" aria-hidden="true"><rect width="40" height="40" rx="10" fill="#00a870"/><path d="M13 16h14l-2 13H15L13 16z" fill="white"/><path d="M17 16v-3a3 3 0 0 1 6 0v3" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
            <span>FreshMart</span>
          </button>

          {/* Delivery caption + address */}
          <div className="zn-deliver">
            <button
              type="button"
              className="zn-deliver-btn"
              aria-haspopup="dialog"
              aria-expanded={addrOpen}
              onClick={openAddress}
            >
              <span className="zn-eta">⚡ {DELIVERY_ETA}</span>
              <span className="zn-addr">
                <span className="zn-addr-text">{address.label} · {address.text || 'Add address'}</span>
                <span className="zn-caret" aria-hidden="true">▾</span>
              </span>
            </button>

            {addrOpen && (
              <>
                <div className="zn-pop-backdrop" onClick={closeAddress} />
                <form
                  className="zn-pop"
                  role="dialog"
                  aria-label="Delivery address"
                  onSubmit={saveAddress}
                  onKeyDown={(e) => { if (e.key === 'Escape') closeAddress() }}
                >
                  <div className="zn-pop-head">
                    <span>Delivery location</span>
                    <button type="button" className="zn-pop-close" aria-label="Close" onClick={closeAddress}>✕</button>
                  </div>

                  <div className="zn-chips" role="group" aria-label="Address type">
                    {ADDRESS_LABELS.map((l) => (
                      <button
                        key={l}
                        type="button"
                        className={`zn-chip ${draft.label === l ? 'active' : ''}`}
                        aria-pressed={draft.label === l}
                        onClick={() => setDraft((d) => ({ ...d, label: l }))}
                      >
                        {l}
                      </button>
                    ))}
                  </div>

                  <input
                    className="zn-pop-input"
                    type="text"
                    aria-label="Address"
                    placeholder="House no, street, area"
                    value={draft.text}
                    onChange={(e) => setDraft((d) => ({ ...d, text: e.target.value }))}
                    autoFocus
                  />
                  <button type="submit" className="zn-pop-save" disabled={!draft.text.trim()}>Save address</button>
                </form>
              </>
            )}
          </div>

          {/* Search with rotating hint */}
          <div className="zn-search">
            <span className="zn-search-icon" aria-hidden="true">🔍</span>
            <div className="zn-search-field">
              <input
                type="text"
                aria-label="Search products"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {query === '' && (
                <span className="zn-ph" aria-hidden="true">
                  Search for "<b key={hintIdx} className="zn-ph-word">{SEARCH_HINTS[hintIdx]}</b>"
                </span>
              )}
            </div>
          </div>

          <div className="zn-actions">
            <button type="button" className="zn-account" aria-label="My account" onClick={() => navigate('/account')}>
              {getInitials(user?.name)}
            </button>
            <button type="button" className="zn-cart" aria-label={`Cart, ${cartCount} items`} onClick={onCartClick}>
              🛒
              {cartCount > 0 && <span className="zn-cart-badge">{cartCount}</span>}
            </button>
            <button type="button" className="zn-menu" aria-label="Menu" onClick={() => setRightOpen(true)}>⋮</button>
          </div>
        </div>

        {/* Category icon strip (Home page la mattum) */}
        {isHome && (
          <nav className="zn-strip" aria-label="Categories">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`zn-cat ${activeCat === c.id ? 'active' : ''}`}
                aria-current={activeCat === c.id ? 'true' : undefined}
                onClick={() => onCategory(c.id)}
              >
                <span className="zn-cat-icon" aria-hidden="true">{c.icon}</span>
                <span className="zn-cat-label">{c.label}</span>
              </button>
            ))}
          </nav>
        )}
      </header>

      {rightOpen && <div className="right-drawer-backdrop" onClick={() => setRightOpen(false)} />}

      <div className={`right-drawer ${rightOpen ? 'open' : ''}`}>
        <div className="right-drawer-header">
          <span>Menu</span>
          <button onClick={() => setRightOpen(false)}>✕</button>
        </div>

        <a className="right-nav-link" onClick={() => goTo('/shops')}>🏪 Shops</a>
        <a className="right-nav-link" onClick={() => goTo('/offers')}>🎁 Offers</a>
        <a className="right-nav-link" onClick={() => goTo('/contact')}>📞 Contact</a>

        {/* Account in drawer */}
        <div className="right-drawer-account" onClick={() => goTo('/account')} style={{ cursor: 'pointer' }}>
          <div className="account-circle-sm">{getInitials(user?.name)}</div>
          <div>
            <p className="right-account-name">{user?.name || 'Guest User'}</p>
            <p className="right-account-email">{user?.email || user?.phone || 'guest@freshmart.com'}</p>
          </div>
        </div>

        <div className="right-drawer-btns">
          <button className="btn-seller" onClick={() => goTo('/seller')}>Become a Seller</button>
          <button className="btn-logout" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
    </>
  )
}

export default Navbar
