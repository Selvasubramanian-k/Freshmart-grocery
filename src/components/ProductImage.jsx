// Product image. Image illaina emoji placeholder kaattum (broken image varadhu)
import { useState } from 'react'

export default function ProductImage({ product, className = '', ...rest }) {
  const [failed, setFailed] = useState(false)

  if (!product.img || failed) {
    return (
      <div
        className={`${className} img-emoji`}
        role="img"
        aria-label={product.name}
      >
        {product.emoji || '🛒'}
      </div>
    )
  }

  return (
    <img
      className={className}
      src={product.img}
      alt={product.name}
      loading="lazy"
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}
