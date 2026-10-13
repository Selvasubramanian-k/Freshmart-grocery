import ProductImage from './ProductImage.jsx'
import Icon from './Icon.jsx'

function ProductCard({product,qty,onAdd,onInc,onDec,reason}) {
  return (
    <div className='product-card'>
         {product.discount && (
        <span className="product-badge">{product.discount}%</span>
      )}
      <div className="product-img-wrap">
        <ProductImage className="product-img" product={product} />
      </div>
      
      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-unit">{product.unit}</p>
        {reason && <p className="product-reason">{reason}</p>}

        <div className="product-footer">
          <div className="price-block">
            {product.oldPrice && (
              <span className="price-old">₹{product.oldPrice.toFixed(2)}</span>
            )}
            <span className="price-new">₹{product.price.toFixed(2)}</span>
          </div>

          {qty === 0 ? (
            <button className="btn-add-cart" onClick={() => onAdd(product)}>
              <Icon name="shopping-cart" /> Cart
            </button>
          ) : (
            <div className="qty-stepper">
              <button className="qty-btn" onClick={() => onDec(product.id)}>−</button>
              <span className="qty-num">{qty}</span>
              <button className="qty-btn" onClick={() => onInc(product.id)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard