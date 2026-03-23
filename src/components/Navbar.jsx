import { useState } from 'react'

function Navbar({ onMenuClick, onCartClick, cartCount, onSearch }) {
  const [rightOpen, setRightOpen] = useState(false)

  return (
    <>
      <header className="navbar">
        <button className="hamburger" onClick={onMenuClick}>☰</button>

        <div className="navbar-logo">
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill="#00a870"/><path d="M13 16h14l-2 13H15L13 16z" fill="white"/><path d="M17 16v-3a3 3 0 0 1 6 0v3" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/><path d="M18 22c1-2 3-2 4 0" stroke="#00a870" strokeWidth="1.2" strokeLinecap="round"/></svg>
  <span>FreshMart</span>
</div>

        <button className="navbar-cat">🥦 Grocery ▾</button>

        <div className="navbar-search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search for groceries..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="navbar-links">
          <a className="nav-link">Shops</a>
          <a className="nav-link">Offers</a>
          <a className="nav-link">Contact</a>
          <button className="btn-join">Join</button>
          <button className="btn-seller">Become a Seller</button>
        </div>

        <button className="cart-icon-btn" onClick={onCartClick}>
          🛒
          {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
        </button>

        <button className="three-dots" onClick={() => setRightOpen(true)}>⋮</button>
      </header>

      {/* Backdrop */}
      {rightOpen && <div className="right-drawer-backdrop" onClick={() => setRightOpen(false)} />}

      {/* Right Drawer */}
      <div className={`right-drawer ${rightOpen ? 'open' : ''}`}>
        <div className="right-drawer-header">
          <span>Menu</span>
          <button onClick={() => setRightOpen(false)}>✕</button>
        </div>

        <div className="right-drawer-search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <a className="right-nav-link" onClick={() => setRightOpen(false)}>🏪 Shops</a>
        <a className="right-nav-link" onClick={() => setRightOpen(false)}>🎁 Offers</a>
        <a className="right-nav-link" onClick={() => setRightOpen(false)}>📞 Contact</a>

        <div className="right-drawer-btns">
          <button className="btn-join">Join</button>
          <button className="btn-seller">Become a Seller</button>
        </div>
      </div>
    </>
  )
}

export default Navbar