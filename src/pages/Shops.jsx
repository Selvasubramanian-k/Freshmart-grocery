import { useNavigate } from 'react-router-dom'

export default function Shops() {
  const navigate = useNavigate()
  return (
    <div className="page-wrapper">
      <button className="page-back" onClick={() => navigate('/')}>← Back</button>
      <h1 className="page-title">🏪 Our Shops</h1>
      <div className="shops-grid">
        {[
          { name:'FreshMart Chennai',    area:'Anna Nagar',    time:'8AM - 10PM', rating:'4.8' },
          { name:'FreshMart Madurai',    area:'KK Nagar',      time:'7AM - 9PM',  rating:'4.6' },
          { name:'FreshMart Coimbatore', area:'RS Puram',      time:'8AM - 10PM', rating:'4.7' },
          { name:'FreshMart Trichy',     area:'Thillai Nagar', time:'7AM - 9PM',  rating:'4.5' },
        ].map((s, i) => (
          <div key={i} className="shop-card">
            <p className="shop-card-name">{s.name}</p>
            <p className="shop-card-info">📍 {s.area}</p>
            <p className="shop-card-info">🕐 {s.time}</p>
            <p className="shop-card-rating">⭐ {s.rating}</p>
          </div>
        ))}
      </div>
    </div>
  )
}