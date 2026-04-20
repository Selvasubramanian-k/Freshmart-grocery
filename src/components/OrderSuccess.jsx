import { useState } from 'react'
import ghee    from '../assets/ghee.jpg'
import Brinjal from '../assets/Brinja.jpg'
import liver   from '../assets/liver.jpg'
import banana  from '../assets/banana.jpg'

const PRODUCTS_MAP = [
  { id:1,  name:'Red Apples',       unit:'1 kg',    price:120, img:'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&q=80' },
  { id:2,  name:'Banana',           unit:'1 dozen', price:60,  img:banana },
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

function OrderSuccess({ onBack, orderedItems = [] }) {
  const [showOrders, setShowOrders] = useState(false)

  const getP     = (id) => PRODUCTS_MAP.find(p => p.id === Number(id))
  const subtotal = orderedItems.reduce((s, [id, qty]) => s + (getP(id)?.price || 0) * qty, 0)
  const total    = subtotal + (subtotal > 0 ? DELIVERY : 0)

  return (
    <div className="os-root">
      <div className="os-card">

        {/* Checkmark */}
        <div className="os-check-wrap">
          <div className="os-check-ring" />
          <div className="os-check-circle">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <path
                d="M14 26L22 34L38 18"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="os-check-path"
              />
            </svg>
          </div>
        </div>

        <h2 className="os-title">Order Placed Successfully!</h2>
        <p className="os-sub">
          Thank you for shopping with <strong>FreshMart</strong>.<br />
          Your fresh groceries are on their way! 🚚
        </p>

        {/* Info strips */}
        <div className="os-info-strips">
          <div className="os-strip">
            <span className="os-strip-icon">📦</span>
            <div>
              <p className="os-strip-label">Order Status</p>
              <p className="os-strip-value">Confirmed & Processing</p>
            </div>
          </div>
          <div className="os-strip">
            <span className="os-strip-icon">🚚</span>
            <div>
              <p className="os-strip-label">Estimated Delivery</p>
              <p className="os-strip-value">Within 30–45 minutes</p>
            </div>
          </div>
          <div className="os-strip">
            <span className="os-strip-icon">📱</span>
            <div>
              <p className="os-strip-label">Tracking</p>
              <p className="os-strip-value">SMS will be sent to your phone</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="os-btns">
          <button className="os-btn-primary" onClick={onBack}>
            🛒 Continue Shopping
          </button>
          <button className="os-btn-secondary" onClick={() => setShowOrders(o => !o)}>
            📋 {showOrders ? 'Hide Orders' : 'View Orders'}
          </button>
        </div>

        {/* Order items panel */}
        {showOrders && (
          <div className="os-order-panel">
            <h3 className="os-order-panel-title">🧾 Your Order</h3>

            {orderedItems.length === 0 ? (
              <p style={{ textAlign:'center', color:'#aaa', fontSize:13 }}>No items found.</p>
            ) : (
              <>
                {orderedItems.map(([id, qty]) => {
                  const p = getP(id)
                  if (!p) return null
                  return (
                    <div className="os-order-item" key={id}>
                      <img className="os-order-img" src={p.img} alt={p.name} />
                      <div className="os-order-info">
                        <p className="os-order-name">{p.name}</p>
                        <p className="os-order-meta">{p.unit} × {qty}</p>
                      </div>
                      <p className="os-order-price">₹{(p.price * qty).toFixed(2)}</p>
                    </div>
                  )
                })}

                <div className="os-order-totals">
                  <div className="os-order-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                  <div className="os-order-row"><span>Delivery</span><span>₹{DELIVERY.toFixed(2)}</span></div>
                  <div className="os-order-row os-order-grand"><span>Total Paid</span><span>₹{total.toFixed(2)}</span></div>
                </div>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default OrderSuccess