function OrderSuccess({ onBack }) {
  return (
    <div className="os-root">

      {/* Animated success card */}
      <div className="os-card">

        {/* Checkmark circle */}
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

        {/* Text */}
        <h2 className="os-title">Order Placed Successfully!</h2>
        <p className="os-sub">
          Thank you for shopping with <strong>FreshMart</strong>.<br />
          Your fresh groceries are on their way! 🚚
        </p>

        {/* Order info strips */}
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
          <button className="os-btn-secondary" onClick={onBack}>
            📋 View Orders
          </button>
        </div>

      </div>
    </div>
  )
}

export default OrderSuccess