import { useState, useEffect, useRef } from 'react'
import { getProduct, DELIVERY } from '../data/products.js'
import ProductImage from './ProductImage.jsx'

// ─────────────────────────────────────────────────────────────
//  Timeline checkout: Address -> Time & tip -> Payment (slide to pay)
//  Offers below are DEMO values. Real offers backend-la irundhu varanum.
//  Maathanum na inga mattum maathunga.
// ─────────────────────────────────────────────────────────────
const COUPON_CODE = 'FRESH20'
const COUPON_OFF  = 20
const COUPON_MIN  = 100

// type: 'pct' (percent off, capped) | 'flat' (rupees off) | 'cashback' (comes later, price same)
const PAY_METHODS = [
  { group:'UPI',   id:'gpay',    logo:'G',  color:'#4285F4', name:'GPay',    sub:'Pay with GPay UPI',          offer:{ type:'pct',      value:10, cap:30, label:'10% off, up to ₹30' }, best:true },
  { group:'UPI',   id:'phonepe', logo:'P',  color:'#7a3fc4', name:'PhonePe', sub:'Pay with any bank account',  offer:{ type:'cashback', value:15,         label:'₹15 cashback later' } },
  { group:'UPI',   id:'paytm',   logo:'Pt', color:'#00a3d9', name:'Paytm',   sub:'UPI or Paytm balance',       offer:{ type:'flat',     value:10,         label:'₹10 off on first Paytm order' } },
  { group:'UPI',   id:'bhim',    logo:'B',  color:'#138808', name:'BHIM',    sub:'Any UPI app' },
  { group:'Cards', id:'card',    icon:'💳', name:'Credit / Debit Card', sub:'Visa, Mastercard, RuPay',        offer:{ type:'pct',      value:5,  cap:25, label:'5% off on cards' } },
  { group:'More',  id:'nb',      icon:'🏦', name:'Net Banking',         sub:'All major banks' },
  { group:'More',  id:'cod',     icon:'💵', name:'Cash on Delivery',    sub:'Pay at the door' },
]
const GROUP_TITLES = { UPI:'Pay with UPI', Cards:'Cards', More:'More ways to pay' }

const BANKS = ['State Bank of India','HDFC Bank','ICICI Bank','Axis Bank','Kotak Bank','Punjab National Bank']

const SLOTS = [
  { id:'now',   title:'Now',       sub:'Arrives in 10 min' },
  { id:'hour',  title:'In 1 hour', sub:'About 60 min' },
  { id:'night', title:'Tonight',   sub:'7:00 to 9:00 pm' },
  { id:'morn',  title:'Tomorrow',  sub:'7:00 to 9:00 am' },
]
const INSTRUCTIONS = ['Leave at the door', 'Do not ring the bell', 'Call on arrival', 'Avoid calling']
const TIPS = [0, 10, 20, 30]

// ── Saved addresses (same storage as Account page) ──
const addrKey   = (u) => `freshmart_addresses:${(u?.email || u?.phone || 'guest').toLowerCase()}`
const readAddrs = (u) => { try { const a = JSON.parse(localStorage.getItem(addrKey(u))); return Array.isArray(a) ? a : [] } catch { return [] } }
const saveAddrs = (u, list) => { try { localStorage.setItem(addrKey(u), JSON.stringify(list)) } catch { /* storage blocked */ } }

const rs = (n) => `₹${n.toFixed(2)}`

function methodOffer(method, base) {
  const o = method?.offer
  if (!o) return { off: 0, cashback: 0 }
  if (o.type === 'pct')      return { off: Math.min((base * o.value) / 100, o.cap), cashback: 0 }
  if (o.type === 'flat')     return { off: o.value, cashback: 0 }
  if (o.type === 'cashback') return { off: 0, cashback: o.value }
  return { off: 0, cashback: 0 }
}

function CheckoutPage({ cart, user, onBack, onPlaceOrder, increment, decrement }) {
  const [step, setStep]         = useState(1)
  const [stripOpen, setStrip]   = useState(false)
  const [error, setError]       = useState('')

  // address
  const [saved, setSaved]       = useState(() => readAddrs(user))
  const [addrId, setAddrId]     = useState(() => { const s = readAddrs(user); return s.length ? s[0].id : 'new' })
  const [newAddr, setNewAddr]   = useState({ label: 'Home', text: '' })
  const [instr, setInstr]       = useState({})

  // time & tip
  const [slot, setSlot]         = useState('now')
  const [tip, setTip]           = useState(10)

  // payment
  const [methodId, setMethodId] = useState('gpay')
  const [bank, setBank]         = useState('')
  const [card, setCard]         = useState({ no: '', name: '', exp: '', cvv: '' })
  const [couponText, setCouponText] = useState('')
  const [coupon, setCoupon]     = useState(false)
  const [slide, setSlide]       = useState(0)
  const placedRef               = useRef(false)   // double submit aagaama thadukka

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const entries  = Object.entries(cart).filter(([, q]) => q > 0)
  const subtotal = entries.reduce((s, [id, q]) => s + (getProduct(id)?.price || 0) * q, 0)
  const count    = entries.reduce((s, [, q]) => s + q, 0)

  const method      = PAY_METHODS.find(m => m.id === methodId)
  const couponOff   = coupon ? COUPON_OFF : 0
  const base        = subtotal + DELIVERY - couponOff
  const { off: methodOff, cashback } = methodOffer(method, base)
  const total       = Math.max(0, base + tip - methodOff)
  const isCOD       = methodId === 'cod'

  const addr = saved.find(a => a.id === addrId)
  const slotInfo = SLOTS.find(s => s.id === slot)
  const instrList = INSTRUCTIONS.filter((_, i) => instr[i])

  if (entries.length === 0) {
    return (
      <div className="ck-page">
        <button className="ck-back" onClick={onBack}>← Back to Shop</button>
        <div className="ck-card ck-empty">
          <div className="ck-empty-emoji">🛒</div>
          <p>Your cart is empty</p>
          <button className="ck-btn" onClick={onBack}>Start shopping</button>
        </div>
      </div>
    )
  }

  // ── step 1: address ──
  const submitAddress = () => {
    setError('')
    if (addrId === 'new') {
      if (!newAddr.text.trim()) { setError('Please enter your delivery address.'); return }
      const entry = { id: Date.now(), label: newAddr.label, text: newAddr.text.trim() }
      const next = [...saved, entry]
      setSaved(next); saveAddrs(user, next)
      setAddrId(entry.id)
      setNewAddr({ label: 'Home', text: '' })
    }
    setStep(2)
  }

  // ── step 3: pay ──
  const validatePayment = () => {
    if (methodId === 'nb' && !bank) return 'Please choose your bank.'
    if (methodId === 'card') {
      if (card.no.replace(/\s/g, '').length < 16) return 'Enter the 16-digit card number.'
      if (!card.name.trim())                      return 'Enter the name on the card.'
      if (!/^\d{2}\/\d{2}$/.test(card.exp))       return 'Enter expiry as MM/YY.'
      if (card.cvv.length < 3)                    return 'Enter the 3-digit CVV.'
    }
    return ''
  }

  const finishSlide = (value = slide) => {
    if (placedRef.current) return
    if (value < 95) { setSlide(0); return }
    const msg = validatePayment()
    if (msg) { setError(msg); setSlide(0); return }
    setError('')
    placedRef.current = true
    onPlaceOrder(entries)
  }

  const timelineState = (n) => (step === n ? 'open' : step > n ? 'done' : '')

  const billRows = (
    <>
      <div className="ck-tr"><span>Subtotal</span><span>{rs(subtotal)}</span></div>
      <div className="ck-tr"><span>Delivery</span><span>{rs(DELIVERY)}</span></div>
      {tip > 0 && <div className="ck-tr"><span>Delivery partner tip</span><span>{rs(tip)}</span></div>}
      {couponOff > 0 && <div className="ck-tr good"><span>Coupon {COUPON_CODE}</span><span>−{rs(couponOff)}</span></div>}
      {methodOff > 0 && <div className="ck-tr good"><span>{method.name} offer</span><span>−{rs(methodOff)}</span></div>}
      {cashback > 0 && <div className="ck-tr good"><span>Cashback later</span><span>{rs(cashback)}</span></div>}
      <div className="ck-tr total"><span>To pay</span><span>{rs(total)}</span></div>
    </>
  )

  return (
    <div className="ck-page">
      <button className="ck-back" onClick={onBack}>← Back to Shop</button>
      <div className="ck-top"><h1 className="ck-title">Checkout</h1><span className="ck-secure">🔒 Secure payment</span></div>

      {/* ORDER STRIP */}
      <div className={`ck-strip ${stripOpen ? 'open' : ''}`}>
        <button className="ck-strip-head" onClick={() => setStrip(o => !o)} aria-expanded={stripOpen}>
          <div className="ck-stack">
            {entries.slice(0, 5).map(([id]) => {
              const p = getProduct(id)
              return p ? <div className="ck-stack-img" key={id}><ProductImage product={p} /></div> : null
            })}
          </div>
          <div className="ck-strip-text">
            <b>{count} item{count > 1 ? 's' : ''}</b>
            <span>{stripOpen ? 'Tap to hide order' : 'Tap to view or edit order'}</span>
          </div>
          <div className="ck-strip-amt">{rs(total)}</div>
          <span className="ck-chev">⌄</span>
        </button>

        {stripOpen && (
          <div className="ck-strip-body">
            {entries.map(([id, qty]) => {
              const p = getProduct(id)
              if (!p) return null
              return (
                <div className="ck-item" key={id}>
                  <div className="ck-item-img"><ProductImage product={p} /></div>
                  <div className="ck-item-info">
                    <p className="ck-item-name">{p.name}</p>
                    <p className="ck-item-meta">{p.unit}</p>
                  </div>
                  <div className="ck-qty">
                    <button aria-label={`Remove one ${p.name}`} onClick={() => decrement(id)}>−</button>
                    <span>{qty}</span>
                    <button aria-label={`Add one ${p.name}`} onClick={() => increment(id)}>+</button>
                  </div>
                  <p className="ck-item-price">{rs(p.price * qty)}</p>
                </div>
              )
            })}
            <div className="ck-bill">{billRows}</div>
          </div>
        )}
      </div>

      {/* STEP 1: ADDRESS */}
      <div className={`ck-tl ${timelineState(1)}`}>
        <div className="ck-dot">{step > 1 ? '✓' : 1}</div>
        <div className="ck-th">
          <div>
            <b>Delivery address</b>
            {step > 1 && addr && (
              <div className="ck-sum">
                {addr.label} · {addr.text}{instrList.length ? ` · ${instrList.join(', ')}` : ''}
              </div>
            )}
          </div>
          {step > 1 && <button className="ck-edit" onClick={() => { setError(''); setStep(1) }}>Edit</button>}
        </div>

        {step === 1 && (
          <div className="ck-body">
            <div className="ck-addrs">
              {saved.map(a => (
                <button key={a.id} className={`ck-addr ${addrId === a.id ? 'on' : ''}`} onClick={() => setAddrId(a.id)}>
                  <span className="ck-addr-ic">{a.label === 'Work' ? '🏢' : a.label === 'Home' ? '🏠' : '📍'}</span>
                  <div><b>{a.label}</b><span>{a.text}</span></div>
                </button>
              ))}
              <button className={`ck-addr ${addrId === 'new' ? 'on' : ''}`} onClick={() => setAddrId('new')}>
                <span className="ck-addr-ic">＋</span>
                <div><b>Add a new address</b></div>
              </button>
            </div>

            {addrId === 'new' && (
              <div className="ck-newaddr">
                <div className="ck-chips">
                  {['Home', 'Work', 'Other'].map(l => (
                    <button key={l} className={`ck-chip ${newAddr.label === l ? 'on' : ''}`} onClick={() => setNewAddr(a => ({ ...a, label: l }))}>{l}</button>
                  ))}
                </div>
                <label className="ck-lab" htmlFor="ck-addr-text">Flat, street, area and pincode</label>
                <textarea
                  id="ck-addr-text"
                  className="ck-input"
                  rows={3}
                  placeholder="No. 12, Gandhi Street, T Nagar, Chennai 600017"
                  value={newAddr.text}
                  onChange={(e) => setNewAddr(a => ({ ...a, text: e.target.value }))}
                />
              </div>
            )}

            <p className="ck-sub">Delivery instructions</p>
            <div className="ck-chips">
              {INSTRUCTIONS.map((t, i) => (
                <button key={t} className={`ck-chip ${instr[i] ? 'on' : ''}`} onClick={() => setInstr(s => ({ ...s, [i]: !s[i] }))}>{t}</button>
              ))}
            </div>

            {error && <p className="ck-error" role="alert">{error}</p>}
            <div className="ck-acts"><span /><button className="ck-btn" onClick={submitAddress}>Deliver here</button></div>
          </div>
        )}
      </div>

      {/* STEP 2: TIME & TIP */}
      <div className={`ck-tl ${timelineState(2)}`}>
        <div className="ck-dot">{step > 2 ? '✓' : 2}</div>
        <div className="ck-th">
          <div>
            <b>Delivery time</b>
            {step > 2 && <div className="ck-sum">{slotInfo.title} · {slotInfo.sub}{tip > 0 ? ` · Tip ₹${tip}` : ''}</div>}
          </div>
          {step > 2 && <button className="ck-edit" onClick={() => setStep(2)}>Edit</button>}
        </div>

        {step === 2 && (
          <div className="ck-body">
            <div className="ck-slots">
              {SLOTS.map(s => (
                <button key={s.id} className={`ck-slot ${slot === s.id ? 'on' : ''}`} onClick={() => setSlot(s.id)}>
                  <b>{s.title}</b><span>{s.sub}</span>
                </button>
              ))}
            </div>
            <p className="ck-sub">Tip your delivery partner</p>
            <div className="ck-chips">
              {TIPS.map(t => (
                <button key={t} className={`ck-chip ${tip === t ? 'on' : ''}`} onClick={() => setTip(t)}>{t ? `₹${t}` : 'No tip'}</button>
              ))}
            </div>
            <div className="ck-note">100% of the tip goes to the delivery partner.</div>
            <div className="ck-acts">
              <button className="ck-btn ghost" onClick={() => setStep(1)}>Back</button>
              <button className="ck-btn" onClick={() => setStep(3)}>Continue</button>
            </div>
          </div>
        )}
      </div>

      {/* STEP 3: PAYMENT */}
      <div className={`ck-tl ${timelineState(3)}`}>
        <div className="ck-dot">3</div>
        <div className="ck-th"><div><b>Payment</b></div></div>

        {step === 3 && (
          <div className="ck-body">
            <div className="ck-paytop">
              <span>Offers update the amount instantly</span>
              <div className="ck-payamt">
                {(methodOff > 0 || couponOff > 0) && <s>{rs(subtotal + DELIVERY + tip)}</s>}
                <b>{rs(total)}</b>
              </div>
            </div>

            {['UPI', 'Cards', 'More'].map(g => (
              <div key={g}>
                <p className="ck-group">{GROUP_TITLES[g]}</p>
                {PAY_METHODS.filter(m => m.group === g).map(m => {
                  const on = methodId === m.id
                  const { off } = methodOffer(m, base)
                  return (
                    <div key={m.id}>
                      <button className={`ck-method ${on ? 'on' : ''}`} onClick={() => { setMethodId(m.id); setError('') }}>
                        <span className={`ck-logo ${m.icon ? 'em' : ''}`} style={m.color ? { background: m.color } : undefined}>{m.icon || m.logo}</span>
                        <div className="ck-method-name">
                          <b>{m.name}</b>
                          <span>{m.sub}</span>
                          {m.offer && (
                            <div>
                              <span className="ck-badge">{m.offer.label}</span>
                              {m.best && <span className="ck-badge best">Best offer</span>}
                            </div>
                          )}
                        </div>
                        <div className="ck-method-price">
                          {rs(base + tip - off)}
                          {off > 0 && <s>{rs(base + tip)}</s>}
                        </div>
                        <span className="ck-radio" />
                      </button>

                      {on && m.id === 'card' && (
                        <div className="ck-extra">
                          <div className="ck-grid">
                            <div className="full">
                              <label className="ck-lab" htmlFor="ck-cn">Card number</label>
                              <input id="ck-cn" className="ck-input" inputMode="numeric" placeholder="4242 4242 4242 4242" maxLength={19}
                                value={card.no}
                                onChange={(e) => setCard(c => ({ ...c, no: e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim() }))} />
                            </div>
                            <div className="full">
                              <label className="ck-lab" htmlFor="ck-cm">Name on card</label>
                              <input id="ck-cm" className="ck-input" placeholder="Name" value={card.name}
                                onChange={(e) => setCard(c => ({ ...c, name: e.target.value }))} />
                            </div>
                            <div>
                              <label className="ck-lab" htmlFor="ck-ce">Expiry</label>
                              <input id="ck-ce" className="ck-input" placeholder="MM/YY" maxLength={5} value={card.exp}
                                onChange={(e) => {
                                  const v = e.target.value.replace(/\D/g, '').slice(0, 4)
                                  setCard(c => ({ ...c, exp: v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v }))
                                }} />
                            </div>
                            <div>
                              <label className="ck-lab" htmlFor="ck-cv">CVV</label>
                              <input id="ck-cv" className="ck-input" type="password" inputMode="numeric" placeholder="•••" maxLength={3} value={card.cvv}
                                onChange={(e) => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, '') }))} />
                            </div>
                          </div>
                        </div>
                      )}

                      {on && m.id === 'nb' && (
                        <div className="ck-extra">
                          <div className="ck-chips">
                            {BANKS.map(b => (
                              <button key={b} className={`ck-chip ${bank === b ? 'on' : ''}`} onClick={() => setBank(b)}>{b}</button>
                            ))}
                          </div>
                        </div>
                      )}

                      {on && m.id === 'cod' && (
                        <div className="ck-extra"><div className="ck-note">Please keep exact change ready.</div></div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}

            <div className="ck-coupon">
              <input
                className="ck-input"
                placeholder="Coupon code"
                aria-label="Coupon code"
                value={coupon ? COUPON_CODE : couponText}
                disabled={coupon}
                onChange={(e) => setCouponText(e.target.value)}
              />
              <button
                className="ck-btn ghost sm"
                onClick={() => {
                  setError('')
                  if (coupon) { setCoupon(false); setCouponText(''); return }
                  if (couponText.trim().toUpperCase() !== COUPON_CODE) { setError('That coupon code is not valid.'); return }
                  if (subtotal < COUPON_MIN) { setError(`Coupon needs a minimum order of ₹${COUPON_MIN}.`); return }
                  setCoupon(true)
                }}
              >{coupon ? 'Remove' : 'Apply'}</button>
            </div>
            {!coupon && <div className="ck-hintrow"><span className="ck-badge">{COUPON_CODE} saves ₹{COUPON_OFF}</span></div>}

            <div className="ck-bill boxed">{billRows}</div>

            {error && <p className="ck-error" role="alert">{error}</p>}

            <div className="ck-slide">
              <div className="ck-slide-lbl">{isCOD ? `Slide to place order · ${rs(total)}` : `Slide to pay ${rs(total)}`}  ›››</div>
              <input
                type="range" min="0" max="100" value={slide}
                aria-label={isCOD ? 'Slide to place order' : 'Slide to pay'}
                onChange={(e) => setSlide(Number(e.target.value))}
                onPointerUp={() => finishSlide()}
                onKeyDown={(e) => { if (e.key === 'Enter') { setSlide(100); finishSlide(100) } }}
              />
            </div>
            <p className="ck-slide-hint">Drag the handle all the way to the right. Keyboard: focus the slider and press Enter.</p>
            <div className="ck-trust"><span>🔒 Encrypted</span><span>↩ Easy refunds</span><span>✓ Fresh or free</span></div>
            <div className="ck-acts"><button className="ck-btn ghost" onClick={() => setStep(2)}>Back</button><span /></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckoutPage
