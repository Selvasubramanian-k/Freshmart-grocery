import Egg from '../assets/Eggs.jpg'
import cool from '../assets/soft-drinks.jpg'
import fruits from '../assets/fruits.jpg'
import { useState, useEffect } from 'react'

const BANNERS = [
  { id:1, title:'Fresh Fruits',    sub:'Up to 30% off',          img:fruits },
  { id:2, title:'Dairy & Eggs',    sub:'Free delivery over ₹200', img:Egg },
  { id:3, title:'Snacks & Drinks', sub:'New arrivals weekly',     img:cool },
]

function Banner() {
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % 3), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      {/* Desktop */}
      <div className="banner-desktop">
        {BANNERS.map(b => (
          <div key={b.id} className="banner-card" style={{ backgroundImage:`url(${b.img})` }}>
            <div className="banner-overlay" />
            <div className="banner-content">
              <h3>{b.title}</h3>
              <p>{b.sub}</p>
              <button className="banner-btn">Shop Now →</button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="banner-carousel">
        <div className="carousel-track" style={{ transform:`translateX(-${cur * 100}%)` }}>
          {BANNERS.map(b => (
            <div key={b.id} className="banner-card carousel-slide" style={{ backgroundImage:`url(${b.img})` }}>
              <div className="banner-overlay" />
              <div className="banner-content">
                <h3>{b.title}</h3>
                <p>{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="c-btn c-left" onClick={() => setCur(c => (c - 1 + 3) % 3)}>‹</button>
        <button className="c-btn c-right" onClick={() => setCur(c => (c + 1) % 3)}>›</button>
        <div className="c-dots">
          {BANNERS.map((_, i) => (
            <span key={i} className={`c-dot ${cur === i ? 'active' : ''}`} onClick={() => setCur(i)} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Banner