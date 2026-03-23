import { useNavigate } from 'react-router-dom'

export default function Offers() {
  const navigate = useNavigate()
  return (
    <div className="page-wrapper">
      <button className="page-back" onClick={() => navigate('/')}>← Back</button>
      <h1 className="page-title">🎁 Special Offers</h1>
      <div className="offers-grid-page">
        {[
          { title:'Fresh Fruits',  sub:'Up to 30% off',     color:'#00a870', emoji:'🍎' },
          { title:'Dairy & Eggs',  sub:'Free delivery ₹299+',color:'#f5a623', emoji:'🥛' },
          { title:'Meat & Fish',   sub:'15% off today',      color:'#3b82f6', emoji:'🐟' },
          { title:'Snacks',        sub:'Buy 2 Get 1 Free',   color:'#ec4899', emoji:'🍿' },
        ].map((o, i) => (
          <div key={i} className="offer-card-page" style={{ background: o.color }}>
            <div>
              <p className="offer-page-title">{o.title}</p>
              <p className="offer-page-sub">{o.sub}</p>
              <button className="offer-page-btn" onClick={() => navigate('/')}>Shop Now</button>
            </div>
            <span className="offer-page-emoji">{o.emoji}</span>
          </div>
        ))}
      </div>
    </div>
  )
}