
function OrderSuccess({ onBack }) {
  return (
    <div className="success-page">
      <div className="success-icon">🎉</div>
      <h2>Order Placed Successfully!</h2>
      <p>
        Thank you for shopping with <strong>FreshMart</strong>.<br />
        Your fresh groceries are on their way!
      </p>
      <button className="btn-back-shop" onClick={onBack}>
        ← Continue Shopping
      </button>
    </div>    
)
}

export default OrderSuccess