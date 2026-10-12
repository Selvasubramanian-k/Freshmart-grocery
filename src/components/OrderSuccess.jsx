import { useState } from 'react'
import { getProduct, DELIVERY } from '../data/products.js'
import ProductImage from './ProductImage.jsx'



function OrderSuccess({ onBack, orderedItems = [] }) {
  const [showOrders, setShowOrders] = useState(false)

  const getP     = (id) => getProduct(id)
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
                      <ProductImage className="os-order-img" product={p} />
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