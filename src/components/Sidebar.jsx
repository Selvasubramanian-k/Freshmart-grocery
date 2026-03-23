import React from 'react'

const CATEGORIES = [
  { id: 'all',       label: 'All Products',       icon: '🛒' },
   { id: 'dairy',     label: 'Dairy',               icon: '🥛' },
  { id: 'fruits',    label: 'Fruits & Vegetables', icon: '🍎' },
  { id: 'meat',      label: 'Meat & Fish',         icon: '🐟' },
  { id: 'snacks',    label: 'Snacks',              icon: '🍿' },
  { id: 'beverage',  label: 'Beverage',            icon: '🍵' },
  { id: 'home',      label: 'Home & Cleaning',     icon: '🧹' },
  { id: 'petcare',   label: 'Pet Care',            icon: '🐾' },
]

function Sidebar({ activeCat, onSelect, isOpen, onClose }) {
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
          <div className="right-drawer-header">
              <span>Categories</span>
              <button onClick={onClose}>✕</button>
          </div>
        {CATEGORIES.map((cat) => (  
          <button
            key={cat.id}
            className={`sidebar-item ${activeCat === cat.id ? 'active' : ''}`}
            onClick={() => onSelect(cat.id)}
          >
            <span className="sidebar-item-left">
              <span className="sidebar-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </span>
            <span className="sidebar-chevron">›</span>
          </button>
        ))}
      </aside>
    </>
  )
}

export default Sidebar