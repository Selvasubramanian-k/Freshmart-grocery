import { useNavigate } from 'react-router-dom'

export default function Contact() {
  const navigate = useNavigate()
  return (
    <div className="page-wrapper" style={{ maxWidth: 500 }}>
      <button className="page-back" onClick={() => navigate('/')}>← Back</button>
      <h1 className="page-title">📞 Contact Us</h1>
      <div className="contact-card">
        <div className="contact-info"><span>📧</span> support@freshmart.com</div>
        <div className="contact-info"><span>📞</span> +91 98765 43210</div>
        <div className="contact-info"><span>🕐</span> Mon-Sat, 9AM - 6PM</div>
        <textarea className="contact-textarea" placeholder="Write your message..." />
        <button className="btn-send">Send Message</button>
      </div>
      
    </div>

  )
}