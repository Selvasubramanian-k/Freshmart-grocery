import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Navbar      from './components/Navbar.jsx'
import Sidebar     from './components/Sidebar.jsx'
import CartDrawer  from './components/CartDrawer.jsx'
import Home        from './pages/Home.jsx'
import Checkout    from './pages/Checkout.jsx'
import Success     from './pages/Success.jsx'
import Shops       from './pages/Shops.jsx'
import Offers      from './pages/Offers.jsx'
import Contact     from './pages/Contact.jsx'
import Login       from './pages/Login.jsx'

export default function App() {
  const [cart, setCart]           = useState({})
  const [drawerOpen, setDrawer]   = useState(false)
  const [sidebarOpen, setSidebar] = useState(false)
  const [activeCat, setActiveCat] = useState('all')
  const [searchQuery, setSearch]  = useState('')
  const [user, setUser]           = useState(null)

  const location    = useLocation()
  const navigate    = useNavigate()
  const isLoginPage = location.pathname === '/login'

  useEffect(() => {
    navigate('/login')
  }, [])

  const addToCart  = (p)  => setCart(c => ({ ...c, [p.id]: (c[p.id] || 0) + 1 }))
  const increment  = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }))
  const decrement  = (id) => setCart(c => {
    const qty = (c[id] || 0) - 1
    if (qty <= 0) { const n = { ...c }; delete n[id]; return n }
    return { ...c, [id]: qty }
  })
  const removeItem = (id) => setCart(c => { const n = { ...c }; delete n[id]; return n })
  const clearCart  = ()   => setCart({})

  const cartProps = { cart, addToCart, increment, decrement, removeItem }

  const handleLogin = (userData) => {
    setUser(userData)
    navigate('/')
  }

  return (
    <div className="app">

      {!isLoginPage && (
        <Navbar
          onMenuClick={() => setSidebar(true)}
          onCartClick={() => setDrawer(true)}
          cartCount={Object.values(cart).reduce((s, q) => s + q, 0)}
          onSearch={setSearch}
          user={user}
        />
      )}

      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route path="/" element={
          <div className="layout">
            <Sidebar
              activeCat={activeCat}
              onSelect={(id) => { setActiveCat(id); setSidebar(false) }}
              isOpen={sidebarOpen}
              onClose={() => setSidebar(false)}
            />
            <main className="main-content">
              <Home
                activeCat={activeCat}
                searchQuery={searchQuery}
                {...cartProps}
              />
            </main>
          </div>
        }/>
        <Route path="/checkout" element={<Checkout cart={cart} onPlaceOrder={clearCart} />}/>
        <Route path="/success"  element={<Success />} />
        <Route path="/shops"    element={<Shops />} />
        <Route path="/offers"   element={<Offers />} />
        <Route path="/contact"  element={<Contact />} />
      </Routes>

      {!isLoginPage && (
        <CartDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawer(false)}
          onOpen={() => setDrawer(true)}
          {...cartProps}
        />
      )}

    </div>
  )
}