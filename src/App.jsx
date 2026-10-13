import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Navbar      from './components/Navbar.jsx'
import CartDrawer  from './components/CartDrawer.jsx'
import Home        from './pages/Home.jsx'
import Checkout    from './pages/Checkout.jsx'
import Success     from './pages/Success.jsx'
import Shops       from './pages/Shops.jsx'
import Offers      from './pages/Offers.jsx'
import Contact     from './pages/Contact.jsx'
import Login       from './pages/Login.jsx'
import Account     from './pages/Account.jsx'
import { loadOrders, saveOrder } from './utils/orderHistory.js'

export default function App() {
  const [cart, setCart]           = useState({})
  const [drawerOpen, setDrawer]   = useState(false)
  const [activeCat, setActiveCat] = useState('all')
  const [searchQuery, setSearch]  = useState('')
  const [user, setUser]           = useState(null)
  const [orders, setOrders]       = useState([])   // previous orders (localStorage)

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

  // Order place aanaa -> cart clear + order history save (recommendation ku use aagum)
  const handlePlaceOrder = (orderedItems) => {
    setOrders(saveOrder(user?.email || user?.phone, orderedItems))
    clearCart()
  }

  const handleLogout = () => {
    setUser(null)
    setOrders([])
    setDrawer(false)
    navigate('/login')
  }

  const cartProps = { cart, addToCart, increment, decrement, removeItem }

  const handleLogin = (userData) => {
    setUser(userData)
    setOrders(loadOrders(userData.email || userData.phone))
    navigate('/')
  }

  return (
    <div className="app">

      {!isLoginPage && (
        <Navbar
          activeCat={activeCat}
          onCategory={setActiveCat}
          onCartClick={() => setDrawer(true)}
          cartCount={Object.values(cart).reduce((s, q) => s + q, 0)}
          onSearch={setSearch}
          user={user}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route path="/" element={
          <div className="layout">
            <main className="main-content">
              <Home
                activeCat={activeCat}
                onCategory={setActiveCat}
                searchQuery={searchQuery}
                orders={orders}
                user={user}
                {...cartProps}
              />
            </main>
          </div>
        }/>
        <Route path="/account" element={
          user
            ? <Account user={user} orders={orders} increment={increment} onLogout={handleLogout} onOpenCart={() => setDrawer(true)} />
            : <Navigate to="/login" replace />
        }/>
        <Route path="/checkout" element={<Checkout cart={cart} user={user} onPlaceOrder={handlePlaceOrder} increment={increment} decrement={decrement} />}/>
        <Route path="/success"  element={<Success />} />
        <Route path="/shops"    element={<Shops />} />
        <Route path="/offers"   element={<Offers {...cartProps} onBrowse={setActiveCat} />} />
        <Route path="/contact"  element={<Contact />} />
      </Routes>

      {!isLoginPage && (
        <CartDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawer(false)}
          onOpen={() => setDrawer(true)}
          orders={orders}
          {...cartProps}
        />
      )}

    </div>
  )
}