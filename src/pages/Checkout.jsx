import { useNavigate } from 'react-router-dom'
import CheckoutPage from '../components/CheckoutPage.jsx'

export default function Checkout({ cart, onPlaceOrder }) {
  const navigate = useNavigate()
  return (
    <CheckoutPage
      cart={cart}
      onBack={() => navigate('/')}
      onPlaceOrder={() => { onPlaceOrder(); navigate('/success') }}
    />
  )
}