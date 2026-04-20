import { useNavigate, useLocation } from 'react-router-dom'
import OrderSuccess from '../components/OrderSuccess.jsx'

export default function Success() {
  const navigate     = useNavigate()
  const location     = useLocation()
  const orderedItems = location.state?.orderedItems || []

  return (
    <OrderSuccess
      onBack={() => navigate('/')}
      orderedItems={orderedItems}
    />
  )
}