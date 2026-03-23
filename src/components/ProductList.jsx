import { useState, useMemo } from 'react'
import ProductCard from './ProductCard'
import ghee from'../assets/ghee.jpg'
import Brinjal from'../assets/Brinja.jpg'
import liver from'../assets/liver.jpg'
import banana from'../assets/banana.jpg'
  const PRODUCTS = [

  // ── FRUITS ──────────────────────────────
  { id:1,  name:'Red Apples',    unit:'1 kg',    price:120, oldPrice:150,  discount:20,  cat:'fruits',  tag:'popular', img:'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&q=80' },
  { id:2,  name:'Banana',        unit:'1 dozen', price:60,  oldPrice:null, discount:null, cat:'fruits',  tag:'organic', img:banana },
  { id:3,  name:'Orange',        unit:'1 kg',    price:80,  oldPrice:100,  discount:20,  cat:'fruits',  tag:'popular', img:'https://images.unsplash.com/photo-1547514701-42782101795e?w=300&q=80' },
  { id:4,  name:'Pineapple',     unit:'1 pc',    price:90,  oldPrice:110,  discount:18,  cat:'fruits',  tag:'new',     img:'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=300&q=80' },

  // ── VEGETABLES ───────────────────────────
  { id:5,  name:'Carrot',        unit:'500 g',   price:40,  oldPrice:50,   discount:20,  cat:'fruits',  tag:'organic', img:'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&q=80' },
  { id:6,  name:'Beetroot',      unit:'500 g',   price:35,  oldPrice:null, discount:null, cat:'fruits',  tag:'organic', img:'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=300&q=80' },
  { id:7,  name:'Potato',        unit:'1 kg',    price:30,  oldPrice:40,   discount:25,  cat:'fruits',  tag:'popular', img:'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80' },
  { id:8, name:'Tomato', unit:'500 g', price:25, oldPrice:35, discount:28, cat:'fruits', tag:'sale', img:'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=300&q=80' },
  { id:9,  name:'Brinjal',       unit:'500 g',   price:30,  oldPrice:null, discount:null, cat:'fruits',  tag:'new',     img:Brinjal },

  // ── MEAT & FISH ──────────────────────────
  { id:10, name:'Fish (Rohu)', unit:'500 g', price:180, oldPrice:220, discount:18, cat:'meat', tag:'popular', img:'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=300&q=80' },
  { id:11, name:'Chicken Boneless',   unit:'500 g', price:220, oldPrice:260, discount:15,  cat:'meat', tag:'sale',    img:'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&q=80' },
  { id:12, name:'Chicken Liver',      unit:'250 g', price:90,  oldPrice:110, discount:18,  cat:'meat', tag:'new',     img:liver },
  { id:13, name:'Mutton',             unit:'500 g', price:450, oldPrice:500, discount:10,  cat:'meat', tag:'popular', img:'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&q=80' },

  // ── SNACKS ───────────────────────────────
  { id:14, name:'Lays Classic',    unit:'100 g',  price:20,  oldPrice:null, discount:null, cat:'snacks', tag:'popular', img:'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&q=80' },
  { id:15, name:'Bingo Mad Angles',unit:'90 g',   price:20,  oldPrice:25,   discount:20,  cat:'snacks', tag:'sale',    img:'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=300&q=80' },
  { id:16, name:'Soft Drinks',     unit:'500 ml', price:40,  oldPrice:50,   discount:20,  cat:'snacks', tag:'popular', img:'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=300&q=80' },
  { id:17, name:'Cookies',    unit:'200 g',  price:30,  oldPrice:null, discount:null, cat:'snacks', tag:'new',     img:'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80' },

  // ── PET CARE ─────────────────────────────
  { id:18, name:'Pedigree Dog Food', unit:'1 kg',   price:350, oldPrice:400, discount:12,  cat:'petcare', tag:'popular', img:'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=300&q=80' },
  { id:19, name:'Pet Biscuits',      unit:'500 g',  price:150, oldPrice:180, discount:16,  cat:'petcare', tag:'sale',    img:'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&q=80' },
  { id:20, name:'Pet Shampoo',       unit:'200 ml', price:250, oldPrice:300, discount:16,  cat:'petcare', tag:'new',     img:'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=300&q=80' },
  { id:21, name:'Pet Collar',        unit:'1 pc',   price:199, oldPrice:250, discount:20,  cat:'petcare', tag:'popular', img:'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=300&q=80' },

  // ── DAIRY ────────────────────────────────
  { id:22, name:'Full Cream Milk',  unit:'1 L',    price:68,  oldPrice:null, discount:null, cat:'dairy', tag:'popular', img:'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80' },
  { id:23, name:'Butter',           unit:'100 g',  price:55,  oldPrice:65,   discount:15,  cat:'dairy', tag:'sale',    img:'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&q=80' },
 { id:24, name:'Ghee', unit:'500 ml', price:350, oldPrice:400, discount:12, cat:'dairy', tag:'popular', img:ghee },
  { id:25, name:'Sembal (Curd)',    unit:'500 g',  price:40,  oldPrice:null, discount:null, cat:'dairy', tag:'organic', img:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80' },
  { id:26, name:'Egg (Farm Fresh)', unit:'12 pcs', price:90,  oldPrice:110,  discount:18,  cat:'dairy', tag:'popular', img:'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&q=80' },


  // ── BEVERAGE ─────────────────────────────
{ id:27, name:'Mango Juice', unit:'1 L', price:60, oldPrice:80, discount:25, cat:'beverage', tag:'popular', img:'https://images.unsplash.com/photo-1546173159-315724a31696?w=300&q=80' },
{ id:28, name:'Choco Milk', unit:'500 ml', price:45, oldPrice:55, discount:18, cat:'beverage', tag:'popular', img:'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&q=80' },
]


const FILTERS  = ['All', 'Organic', 'On Sale', 'Popular', 'New Arrival']
const CAT_LABELS = {
  all:'🛒 All Products', fruits:'🍎 Fruits & Vegetables', meat:'🐟 Meat & Fish',
  dairy:'🥛 Dairy', breakfast:'🥞 Breakfast', beverage:'🍵 Beverage',
  snacks:'🍿 Snacks', home:'🧹 Home & Cleaning', health:'💊 Health & Beauty',
  petcare:'🐾 Pet Care', cooking:'🧂 Cooking',
}

function ProductList({ activeCat, cart, addToCart, increment, decrement, searchQuery }) {  

  const [activeFilter, setFilter] = useState('All')

  const filtered = useMemo(() => PRODUCTS.filter(p => {
    const catOk    = activeCat === 'all' || p.cat === activeCat
    const filterOk = activeFilter === 'All'
      || (activeFilter === 'On Sale'     && p.discount)
      || (activeFilter === 'Organic'     && p.tag === 'organic')
      || (activeFilter === 'Popular'     && p.tag === 'popular')
      || (activeFilter === 'New Arrival' && p.tag === 'new')

    
    const searchOk = searchQuery === ''
      || p.name.toLowerCase().includes(searchQuery.toLowerCase())

    return catOk && filterOk && searchOk 
  }), [activeCat, activeFilter, searchQuery])
  return (
    <div>
        {/* Section header */}
      <div className="section-header">
        <h2 className="section-title">
          {CAT_LABELS[activeCat] || '🛒 All Products'}
          <span className="product-count">{filtered.length} items</span>
        </h2>
        
      </div>

      {/* Filter chips */}
      <div className="filter-bar">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-chip ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

        {/* Grid */}
      {filtered.length === 0 ? (
        <div className="grid-empty">
          <span className="grid-empty-icon">🔍</span>
          <p style={{ fontWeight: 700, fontSize: 16 }}>No products found</p>
          <p style={{ fontSize: 13, marginTop: 6 }}>Try a different category or filter.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              qty={cart[p.id] || 0}
              onAdd={addToCart}
              onInc={increment}
              onDec={decrement}
            />
          ))}
        </div>
      )}


    </div>

    
   

  )
}

export default ProductList