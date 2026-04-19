import { useState } from 'react'
import ghee from '../assets/ghee.jpg'
import Brinjal from '../assets/Brinja.jpg'
import liver from '../assets/liver.jpg'
import banana from '../assets/banana.jpg'

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

const PAYMENT_TYPES = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'upi',  label: 'UPI',                 icon: '📱' },
  { id: 'nb',   label: 'Net Banking',          icon: '🏦' },
  { id: 'cod',  label: 'Cash on Delivery',     icon: '💵' },
]

const UPI_APPS = [
  { id: 'gpay',    label: 'GPay',    color: '#4285F4' },
  { id: 'phonepe', label: 'PhonePe', color: '#5f259f' },
  { id: 'paytm',   label: 'Paytm',   color: '#00BAF2' },
  { id: 'bhim',    label: 'BHIM',    color: '#138808' },
]

const BANKS = [
  'State Bank of India', 'HDFC Bank', 'ICICI Bank',
  'Axis Bank', 'Kotak Bank', 'Punjab National Bank',
]

function CheckoutPage({ cart, onBack, onPlaceOrder }) {
  const [payType, setPayType] = useState('card')
  const [upiApp, setUpiApp]   = useState('')
  const [upiId, setUpiId]     = useState('')
  const [bank, setBank]       = useState('')

  const entries  = Object.entries(cart).filter(([, q]) => q > 0)
  const subtotal = entries.reduce((s, [id, q]) => s + (PRODUCTS_MAP.find(p => p.id === Number(id))?.price || 0) * q, 0)
  const total    = subtotal + DELIVERY

  return (
    <div className="checkout-page">
      <button className="checkout-back" onClick={onBack}>← Back to Shop</button>
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">

        {/* LEFT — Order Summary */}
        <div className="co-card">
          <h3 className="co-card-title">🛒 Order Summary</h3>
          {entries.map(([id, qty]) => {
            const p = PRODUCTS_MAP.find(p => p.id === Number(id))
            if (!p) return null
            return (
              <div className="co-item" key={id}>
                <img className="co-item-img" src={p.img} alt={p.name} />
                <div>
                  <p className="co-item-name">{p.name}</p>
                  <p className="co-item-meta">{p.unit} × {qty}</p>
                </div>
                <p className="co-item-price">₹{(p.price * qty).toFixed(2)}</p>
              </div>
            )
          })}
          <div style={{ marginTop: 12 }}>
            <div className="co-total-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div className="co-total-row"><span>Delivery</span><span>₹{DELIVERY.toFixed(2)}</span></div>
            <div className="co-total-row grand"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
          </div>
        </div>

        {/* RIGHT — Forms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Delivery Info */}
          <div className="co-card">
            <h3 className="co-card-title">📦 Delivery Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input className="form-input" type="text" placeholder="John" />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input className="form-input" type="text" placeholder="Doe" />
              </div>
              <div className="form-group full">
                <label className="form-label">Address</label>
                <input className="form-input" type="text" placeholder="123 Main Street" />
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <input className="form-input" type="text" placeholder="Chennai" />
              </div>
              <div className="form-group">
                <label className="form-label">Postal Code</label>
                <input className="form-input" type="text" placeholder="600001" />
              </div>
              <div className="form-group full">
                <label className="form-label">Phone</label>
                <input className="form-input" type="tel" placeholder="+91 98765 43210" />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="co-card">
            <h3 className="co-card-title">💳 Payment Details</h3>

            {/* Payment Type Tabs */}
            <div className="pay-type-tabs">
              {PAYMENT_TYPES.map(pt => (
                <button
                  key={pt.id}
                  className={`pay-type-tab ${payType === pt.id ? 'active' : ''}`}
                  onClick={() => setPayType(pt.id)}
                >
                  <span>{pt.icon}</span>
                  <span>{pt.label}</span>
                </button>
              ))}
            </div>

            {/* Card */}
            {payType === 'card' && (
              <div className="form-grid" style={{ marginTop: 16 }}>
                <div className="form-group full">
                  <label className="form-label">Card Number</label>
                  <input className="form-input" type="text" placeholder="4242 4242 4242 4242" maxLength={19} />
                </div>
                <div className="form-group full">
                  <label className="form-label">Cardholder Name</label>
                  <input className="form-input" type="text" placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label className="form-label">Expiry</label>
                  <input className="form-input" type="text" placeholder="MM / YY" maxLength={7} />
                </div>
                <div className="form-group">
                  <label className="form-label">CVV</label>
                  <input className="form-input" type="password" placeholder="•••" maxLength={3} />
                </div>
                <div className="form-group full">
                  <div className="card-secure-note">🔒 Your card details are encrypted and secure</div>
                </div>
              </div>
            )}

            {/* UPI */}
            {payType === 'upi' && (
              <div style={{ marginTop: 16 }}>
                <p className="form-label" style={{ marginBottom: 10 }}>Select UPI App</p>
                <div className="upi-apps-grid">
                  {UPI_APPS.map(app => (
                    <button
                      key={app.id}
                      className={`upi-app-btn ${upiApp === app.id ? 'active' : ''}`}
                      style={{ '--upi-color': app.color }}
                      onClick={() => setUpiApp(app.id)}
                    >
                      {app.label}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 16 }}>
                  <label className="form-label">Or enter UPI ID</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    style={{ marginTop: 6 }}
                  />
                </div>
                <div className="card-secure-note" style={{ marginTop: 12 }}>
                  📱 You will receive a payment request on your UPI app
                </div>
              </div>
            )}

            {/* Net Banking */}
            {payType === 'nb' && (
              <div style={{ marginTop: 16 }}>
                <label className="form-label">Select Your Bank</label>
                <div className="nb-banks-grid">
                  {BANKS.map(b => (
                    <button
                      key={b}
                      className={`nb-bank-btn ${bank === b ? 'active' : ''}`}
                      onClick={() => setBank(b)}
                    >
                      🏦 {b}
                    </button>
                  ))}
                </div>
                <div className="card-secure-note" style={{ marginTop: 12 }}>
                  🔒 You will be redirected to your bank's secure page
                </div>
              </div>
            )}

            {/* Cash on Delivery */}
            {payType === 'cod' && (
              <div className="cod-box">
                <div className="cod-icon">💵</div>
                <p className="cod-title">Cash on Delivery</p>
                <p className="cod-sub">Pay ₹{total.toFixed(2)} when your order arrives at your doorstep.</p>
                <div className="cod-note">⚠️ Please keep exact change ready</div>
              </div>
            )}

          </div>

          <button className="btn-place-order" onClick={onPlaceOrder}>
            🎉 Place Order — ₹{total.toFixed(2)}
          </button>

        </div>
      </div>
    </div>
  )
}

export default CheckoutPage