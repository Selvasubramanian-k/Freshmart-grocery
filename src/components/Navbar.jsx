import { useState } from 'react'

function Navbar({ onMenuClick, onCartClick, cartCount, onSearch }) {
  const [rightOpen, setRightOpen] = useState(false)

  return (
    <>
      <header className="navbar">
        <button className="hamburger" onClick={onMenuClick}>☰</button>

        <div className="navbar-logo">
          <div className="navbar-logo-icon">🌿</div>
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