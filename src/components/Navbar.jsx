import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar({ onMenuClick, onCartClick, cartCount, onSearch, user }) {
  const [rightOpen, setRightOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const navigate = useNavigate()

  const goTo = (path) => {
    setRightOpen(false)
    navigate(path)
  }

  const handleLogout = () => {
    setAccountOpen(false)
    navigate('/login')
  }

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return '👤'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <>
      <header className="navbar">
        <button className="hamburger" onClick={onMenuClick}>☰</button>

       <div className="navbar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill="#00a870"/><path d="M13 16h14l-2 13H15L13 16z" fill="white"/><path d="M17 16v-3a3 3 0 0 1 6 0v3" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/><path d="M18 22c1-2 3-2 4 0" stroke="#00a870" strokeWidth="1.2" strokeLinecap="round"/></svg>
  <span>FreshMart</span>
</div>
        <button className="navbar-cat">🥦 Grocery ▾</button>

        <div className="navbar-search">
          <span>🔍</span>
          <input type="text" placeholder="Search for groceries..." onChange={(e) => onSearch(e.target.value)} />
        </div>

        <div className="navbar-links">
          <a className="nav-link" onClick={() => goTo('/shops')}>Shops</a>
          <a className="nav-link" onClick={() => goTo('/offers')}>Offers</a>
          <a className="nav-link" onClick={() => goTo('/contact')}>Contact</a>
          

          {/* Account Circle */}
          <div className="account-wrapper">
            <button className="account-circle" onClick={() => setAccountOpen(o => !o)}>
              {getInitials(user?.name)}
            </button>

            {/* Account Dropdown Drawer */}
            {accountOpen && (
              <>
                <div className="account-backdrop" onClick={() => setAccountOpen(false)} />
                <div className="account-drawer">
                  <div className="account-drawer-top">
                    <div className="account-drawer-circle">
                      {getInitials(user?.name)}
                    </div>
                    <div className="account-drawer-info">
                      <p className="account-drawer-name">{user?.name || 'Guest User'}</p>
                      <p className="account-drawer-email">{user?.email || 'guest@freshmart.com'}</p>
                    </div>
                  </div>
                  <div className="account-drawer-divider" />
                  <button className="account-drawer-logout" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <button className="cart-icon-btn" onClick={onCartClick}>
          🛒
          {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
        </button>

        <button className="three-dots" onClick={() => setRightOpen(true)}>⋮</button>
      </header>

      {rightOpen && <div className="right-drawer-backdrop" onClick={() => setRightOpen(false)} />}

      <div className={`right-drawer ${rightOpen ? 'open' : ''}`}>
        <div className="right-drawer-header">
          <span>Menu</span>
          <button onClick={() => setRightOpen(false)}>✕</button>
        </div>

        <div className="right-drawer-search">
          <span>🔍</span>
          <input type="text" placeholder="Search..." onChange={(e) => onSearch(e.target.value)} />
        </div>

        <a className="right-nav-link" onClick={() => goTo('/shops')}>🏪 Shops</a>
        <a className="right-nav-link" onClick={() => goTo('/offers')}>🎁 Offers</a>
        <a className="right-nav-link" onClick={() => goTo('/contact')}>📞 Contact</a>

        {/* Account in mobile drawer */}
        <div className="right-drawer-account">
          <div className="account-circle-sm">{getInitials(user?.name)}</div>
          <div>
            <p className="right-account-name">{user?.name || 'Guest User'}</p>
            <p className="right-account-email">{user?.email || 'guest@freshmart.com'}</p>
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