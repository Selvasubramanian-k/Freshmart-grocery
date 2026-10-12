import { useState } from 'react'
import { getProduct, DELIVERY } from '../data/products.js'
import ProductImage from './ProductImage.jsx'



const PAYMENT_TYPES = [
  { id:'card', label:'Credit / Debit Card', icon:'💳' },
  { id:'upi',  label:'UPI',                 icon:'📱' },
  { id:'nb',   label:'Net Banking',          icon:'🏦' },
  { id:'cod',  label:'Cash on Delivery',     icon:'💵' },
]

const UPI_APPS = [
  { id:'gpay',    label:'GPay',    color:'#4285F4' },
  { id:'phonepe', label:'PhonePe', color:'#5f259f' },
  { id:'paytm',   label:'Paytm',   color:'#00BAF2' },
  { id:'bhim',    label:'BHIM',    color:'#138808' },
]

const BANKS = [
  'State Bank of India','HDFC Bank','ICICI Bank',
  'Axis Bank','Kotak Bank','Punjab National Bank',
]

function CheckoutPage({ cart, onBack, onPlaceOrder }) {
  const [payType, setPayType] = useState('card')
  const [upiApp,  setUpiApp]  = useState('')
  const [upiId,   setUpiId]   = useState('')
  const [bank,    setBank]    = useState('')

  const entries  = Object.entries(cart).filter(([, q]) => q > 0)
  const subtotal = entries.reduce((s, [id, q]) => s + (getProduct(id)?.price || 0) * q, 0)
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
            const p = getProduct(id)
            if (!p) return null
            return (
              <div className="co-item" key={id}>
                <ProductImage className="co-item-img" product={p} />
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
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

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
              <div className="form-grid" style={{ marginTop:16 }}>
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
              <div style={{ marginTop:16 }}>
                <p className="form-label" style={{ marginBottom:10 }}>Select UPI App</p>
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
                <div style={{ marginTop:16 }}>
                  <label className="form-label">Or enter UPI ID</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    style={{ marginTop:6 }}
                  />
                </div>
                <div className="card-secure-note" style={{ marginTop:12 }}>
                  📱 You will receive a payment request on your UPI app
                </div>
              </div>
            )}

            {/* Net Banking */}
            {payType === 'nb' && (
              <div style={{ marginTop:16 }}>
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
                <div className="card-secure-note" style={{ marginTop:12 }}>
                  🔒 You will be redirected to your bank's secure page
                </div>
              </div>
            )}

            {/* COD */}
            {payType === 'cod' && (
              <div className="cod-box">
                <div className="cod-icon">💵</div>
                <p className="cod-title">Cash on Delivery</p>
                <p className="cod-sub">Pay ₹{total.toFixed(2)} when your order arrives at your doorstep.</p>
                <div className="cod-note">⚠️ Please keep exact change ready</div>
              </div>
            )}
          </div>

          <button className="btn-place-order" onClick={() => onPlaceOrder(entries)}>
            🎉 Place Order — ₹{total.toFixed(2)}
          </button>

        </div>
      </div>
    </div>
  )
}

export default CheckoutPage