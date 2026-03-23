import { useNavigate } from 'react-router-dom'
import OrderSuccess from '../components/OrderSuccess.jsx'

export default function Success() {
  const navigate = useNavigate()
  return <OrderSuccess onBack={() => navigate('/')} />
}