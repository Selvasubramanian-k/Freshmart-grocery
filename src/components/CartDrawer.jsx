import { useNavigate } from 'react-router-dom'
import ghee from '../assets/ghee.jpg'
import Brinjal from '../assets/Brinja.jpg'
import liver from '../assets/liver.jpg'
import banana from'../assets/banana.jpg'

const PRODUCTS_MAP = [
  { id:1,  name:'Red Apples',       unit:'1 kg',    price:120, img:'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&q=80' },
  { id:2,  name:'Banana',        unit:'1 dozen', price:60,  img:banana},
  { id:3,  name:'Orange',           unit:'1 kg',    price:80,  img:'https://images.unsplash.com/photo-1547514701-42782101795e?w=300&q=80' },
  { id:4,  name:'Pineapple',        unit:'1 pc',    price:90,  img:'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=300&q=80' },
  { id:5,  name:'Carrot',           unit:'500 g',   price:40,  img:'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&q=80' },
  { id:6,  name:'Beetroot',         unit:'500 g',   price:35,  img:'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=300&q=80' },
  { id:7,  name:'Potato',           unit:'1 kg',    price:30,  img:'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80' },
  { id:8,  name:'Tomato',           unit:'500 g',   price:25,  img:'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=300&q=80' },
  { id:9,  name:'Brinjal',          unit:'500 g',   price:30,  img:Brinjal },
  { id:10, name:'Fish (Rohu)',       unit:'500 g',   price:180, img:'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=300&q=80' },
  { id:11, name:'Chicken Boneless', unit:'500 g',   price:220, img:'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&q=80' },
  { id:12, name:'Chicken Liver',    unit:'250 g',   price:90,  img:liver },
  { id:13, name:'Mutton',           unit:'500 g',   price:450, img:'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&q=80' },
  { id:14, name:'Lays Classic',     unit:'100 g',   price:20,  img:'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&q=80' },
  { id:15, name:'Bingo Mad Angles', unit:'90 g',    price:20,  img:'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=300&q=80' },
  { id:16, name:'Soft Drinks',      unit:'500 ml',  price:40,  img:'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=300&q=80' },
  { id:17, name:'Cookies',          unit:'200 g',   price:30,  img:'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80' },
  { id:18, name:'Pedigree Dog Food',unit:'1 kg',    price:350, img:'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=300&q=80' },
  { id:19, name:'Pet Biscuits',     unit:'500 g',   price:150, img:'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&q=80' },
  { id:20, name:'Pet Shampoo',      unit:'200 ml',  price:250, img:'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=300&q=80' },
  { id:21, name:'Pet Collar',       unit:'1 pc',    price:199, img:'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=300&q=80' },
  { id:22, name:'Full Cream Milk',  unit:'1 L',     price:68,  img:'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80' },
  { id:23, name:'Butter',           unit:'100 g',   price:55,  img:'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&q=80' },
  { id:24, name:'Ghee',             unit:'500 ml',  price:350, img:ghee },
  { id:25, name:'Sembal (Curd)',    unit:'500 g',   price:40,  img:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80' },
  { id:26, name:'Egg (Farm Fresh)', unit:'12 pcs',  price:90,  img:'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&q=80' },
  { id:27, name:'Mango Juice',      unit:'1 L',     price:60,  img:'https://images.unsplash.com/photo-1546173159-315724a31696?w=300&q=80' },
  { id:28, name:'Choco Milk',       unit:'500 ml',  price:45,  img:'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&q=80' },
]

const DELIVERY = 5.00

function CartDrawer({ isOpen, onClose, onOpen, cart, increment, decrement, removeItem }) {
  const navigate = useNavigate()
  const getP     = (id) => PRODUCTS_MAP.find(p => p.id === Number(id))

  const entries  = Object.entries(cart).filter(([, q]) => q > 0)
  const subtotal = entries.reduce((s, [id, q]) => s + (getP(id)?.price || 0) * q, 0)
  const total    = subtotal + (subtotal > 0 ? DELIVERY : 0)
  const totalQty = entries.reduce((s, [, q]) => s + q, 0)

  const goCheckout = () => { onClose(); navigate('/checkout') }

  return (
    <>
      <div className={`drawer-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose} />

      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`}>

        <div className="drawer-header">
          <button className="drawer-back" onClick={onClose}>← Back</button>
          <span className="drawer-title">
            🛒 Cart
            {totalQty > 0 && <span className="drawer-badge">{totalQty}</span>}
          </span>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>

        <div className="drawer-items">
          {entries.length === 0 ? (
            <div className="drawer-empty">
              <span className="drawer-empty-icon">🛒</span>
              <p style={{ fontWeight: 700 }}>Your cart is empty</p>
              <p style={{ fontSize: 13 }}>Add some fresh items!</p>
            </div>
          ) : entries.map(([id, qty]) => {
            const p = getP(id)
            if (!p) return null
            return (
              <div className="cart-item-row" key={id}>
                <img className="cart-item-img" src={p.img} alt={p.name} />
                <div className="cart-item-info">
                  <p className="cart-item-name">{p.name}</p>
                  <p className="cart-item-price">₹{p.price * qty}</p>
                  <div className="qty-stepper" style={{ marginTop: 4 }}>
                    <button className="qty-btn" onClick={() => decrement(Number(id))}>−</button>
                    <span className="qty-num">{qty}</span>
                    <button className="qty-btn" onClick={() => increment(Number(id))}>+</button>
                  </div>
                </div>
                <button className="cart-item-remove" onClick={() => removeItem(Number(id))}>🗑</button>
              </div>
            )
          })}
        </div>

        {entries.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div className="summary-row"><span>Delivery</span><span>₹{DELIVERY}</span></div>
            <div className="summary-row total"><span>Total</span><span>₹{total}</span></div>
            <button className="btn-checkout" onClick={goCheckout}>Proceed to Checkout →</button>
          </div>
        )}

      </aside>

      {totalQty > 0 && !isOpen && (
        <button className="cart-float" onClick={onOpen}>
          <span className="cf-icon">🛍️</span>
          <div>
            <div className="cf-label">{totalQty} item{totalQty > 1 ? 's' : ''}</div>
            <div className="cf-total">₹{subtotal}</div>
          </div>
          <span className="cf-arrow">›</span>
        </button>
      )}
    </>
  )
}

export default CartDrawer