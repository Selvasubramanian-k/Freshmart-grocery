import { useState, useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────────────────
//  Tagline maathanum na inga mattum maathunga
// ─────────────────────────────────────────────────────────────
const TAGLINE = 'Your kitchen, always stocked'
const SUBLINE = 'Fruits, vegetables, dairy and daily essentials, delivered to your door.'

// Backend illa, so OTP demo mode. Real SMS venumna Firebase Auth / MSG91 use pannalam.
const DEMO_OTP = '1234'
const RESEND_SECONDS = 30

// ── helpers ──────────────────────────────────────────────────
const profileKey   = (digits) => `freshmart_profile:${digits}`
const readProfile  = (digits) => { try { return JSON.parse(localStorage.getItem(profileKey(digits))) } catch { return null } }
const writeProfile = (digits, profile) => { try { localStorage.setItem(profileKey(digits), JSON.stringify(profile)) } catch { /* storage blocked */ } }
const formatPhone  = (d) => (d.length > 5 ? `${d.slice(0, 5)} ${d.slice(5)}` : d)
const validPhone   = (d) => /^[6-9]\d{9}$/.test(d)

// ── Background: green waves + fruit / vegetable silhouettes ──
function ProduceBg() {
  return (
    <svg className="login-bg" viewBox="0 0 640 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <symbol id="lg-leaf" viewBox="0 0 100 100"><path fillRule="evenodd" d="M12 88 C8 40 40 8 90 10 C92 58 62 92 12 88 Z M18 82 L68 32 L71 35 L21 85 Z" /></symbol>
        <symbol id="lg-apple" viewBox="0 0 100 100"><path d="M50 30 C38 18 12 24 12 54 C12 80 30 96 42 92 C46 90 54 90 58 92 C70 96 88 80 88 54 C88 24 62 18 50 30 Z" /><path d="M50 30 C48 20 52 10 62 4 C64 14 60 24 50 30 Z" /></symbol>
        <symbol id="lg-carrot" viewBox="0 0 100 100"><path d="M30 40 C40 30 58 34 64 46 L92 86 C96 94 86 100 80 94 L26 54 C22 48 24 44 30 40 Z" /><path d="M34 38 C24 28 24 14 34 6 C40 18 40 28 38 36 Z" /><path d="M46 34 C46 20 54 10 64 8 C64 20 58 30 52 36 Z" /></symbol>
        <symbol id="lg-tomato" viewBox="0 0 100 100"><path d="M50 24 C78 22 94 44 90 64 C86 86 66 96 50 96 C34 96 14 86 10 64 C6 44 22 22 50 24 Z" /><path d="M50 26 L42 8 L52 16 L60 6 L60 22 L76 16 L62 30 Z" /></symbol>
        <symbol id="lg-banana" viewBox="0 0 100 100"><path d="M8 22 C2 62 34 96 90 80 C92 76 90 72 86 72 C48 74 28 54 22 22 C20 18 10 18 8 22 Z" /></symbol>
        <symbol id="lg-broc" viewBox="0 0 100 100"><circle cx="34" cy="40" r="22" /><circle cx="64" cy="36" r="24" /><circle cx="50" cy="56" r="22" /><path d="M42 70 L58 70 L62 96 L38 96 Z" /></symbol>
      </defs>

      <rect width="640" height="760" fill="#007a50" />
      <path d="M-40 520 C120 430 260 520 380 600 C520 700 700 640 780 760 L-40 760 Z" fill="#00a870" opacity="0.4" />
      <path d="M0 0 L640 0 C580 90 430 120 330 76 C220 28 100 44 0 126 Z" fill="#0b3d2e" opacity="0.35" />
      <path d="M380 370 C460 320 570 350 610 436 C650 520 566 584 470 562 C386 542 316 432 380 370 Z" fill="#00a870" opacity="0.28" />

      <g fill="#0b3d2e" opacity="0.2">
        <use href="#lg-leaf"   x="250" y="20"  width="100" height="100" transform="rotate(40 300 70)" />
        <use href="#lg-carrot" x="90"  y="420" width="120" height="120" transform="rotate(-35 150 480)" />
        <use href="#lg-apple"  x="250" y="520" width="90"  height="90"  transform="rotate(-10 295 565)" />
        <use href="#lg-broc"   x="560" y="540" width="100" height="100" />
        <use href="#lg-tomato" x="560" y="180" width="90"  height="90" />
      </g>
      <g fill="#ffffff" opacity="0.1">
        <use href="#lg-leaf"   x="40"  y="50"  width="110" height="110" transform="rotate(-25 95 105)" />
        <use href="#lg-apple"  x="500" y="40"  width="120" height="120" transform="rotate(12 560 100)" />
        <use href="#lg-carrot" x="520" y="330" width="120" height="120" transform="rotate(20 580 390)" />
        <use href="#lg-tomato" x="30"  y="560" width="110" height="110" />
        <use href="#lg-banana" x="330" y="600" width="130" height="130" transform="rotate(-15 395 665)" />
        <use href="#lg-broc"   x="20"  y="300" width="100" height="100" />
        <use href="#lg-leaf"   x="440" y="640" width="90"  height="90"  transform="rotate(30 485 685)" />
      </g>
    </svg>
  )
}

function Logo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#ffffff" />
      <path d="M13 16h14l-2 13H15L13 16z" fill="#007a50" />
      <path d="M17 16v-3a3 3 0 0 1 6 0v3" stroke="#007a50" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

export default function Login({ onLogin }) {
  // step: 'phone' -> 'otp' -> ('name' for first time users) | 'email'
  const [step, setStep]         = useState('phone')
  const [phone, setPhone]       = useState('')            // digits only
  const [otp, setOtp]           = useState(['', '', '', ''])
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [seconds, setSeconds]   = useState(0)
  const otpRefs = useRef([])

  // resend countdown
  useEffect(() => {
    if (step !== 'otp' || seconds <= 0) return
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [step, seconds])

  // first OTP box focus
  useEffect(() => {
    if (step === 'otp') otpRefs.current[0]?.focus()
  }, [step])

  const go = (nextStep) => { setStep(nextStep); setError('') }

  const finishLogin = (user) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin(user)
    }, 700)
  }

  // ── PHONE ──
  const submitPhone = (e) => {
    e.preventDefault()
    if (!validPhone(phone)) { setError('Enter a valid 10-digit mobile number.'); return }
    setOtp(['', '', '', ''])
    setSeconds(RESEND_SECONDS)
    go('otp')
  }

  // ── OTP ──
  const focusBox = (i) => otpRefs.current[i]?.focus()

  const changeOtp = (i, value) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[i] = digit
    setOtp(next)
    setError('')
    if (digit && i < 3) focusBox(i + 1)
  }

  const keyOtp = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) focusBox(i - 1)
  }

  const pasteOtp = (e) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    if (!digits) return
    e.preventDefault()
    setOtp(Array.from({ length: 4 }, (_, k) => digits[k] || ''))
    focusBox(Math.min(digits.length, 3))
  }

  const resend = () => {
    if (seconds > 0) return
    setOtp(['', '', '', ''])
    setSeconds(RESEND_SECONDS)
    setError('')
    focusBox(0)
  }

  const verifyOtp = (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < 4)    { setError('Enter the 4-digit code.'); return }
    if (code !== DEMO_OTP)  { setError('Wrong code. In demo mode use 1234.'); return }

    const profile = readProfile(phone)
    if (profile?.name) {
      finishLogin({ name: profile.name, email: '', phone: `+91 ${formatPhone(phone)}` })
    } else {
      go('name')
    }
  }

  // ── NAME (first time) ──
  const submitName = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) { setError('Please enter your name.'); return }
    writeProfile(phone, { name: trimmed })
    finishLogin({ name: trimmed, email: '', phone: `+91 ${formatPhone(phone)}` })
  }

  // ── EMAIL ──
  const submitEmail = (e) => {
    e.preventDefault()
    if (!email || !password)     { setError('Please fill in all fields.'); return }
    if (isSignup && !name.trim()) { setError('Please enter your name.');   return }
    finishLogin({ name: name.trim() || email.split('@')[0], email, phone: '' })
  }

  const handleGoogle = () => finishLogin({ name: 'Google User', email: 'googleuser@gmail.com', phone: '' })
  const handleGuest  = () => onLogin({ name: 'Guest', email: 'guest@freshmart.com', phone: '' })

  const errorBlock = error && <p className="login-error" role="alert">{error}</p>

  const spinnerOr = (label) => (loading ? <span className="login-spinner" /> : label)

  const altLogins = (
    <>
      <div className="login-divider"><span>or</span></div>
      <button type="button" className="login-google-btn" onClick={handleGoogle} disabled={loading}>
        <GoogleIcon />
        Continue with Google
      </button>
    </>
  )

  return (
    <div className="login-root">

      {/* LEFT: green waves + produce */}
      <div className="login-left">
        <ProduceBg />
        <div className="login-brand">
          <Logo />
          <span className="login-brand-name">FreshMart</span>
        </div>
        <div className="login-hero">
          <h1 className="login-hero-title">{TAGLINE}</h1>
          <p className="login-hero-sub">{SUBLINE}</p>
        </div>
      </div>

      {/* RIGHT: form */}
      <div className="login-right">
        <svg className="login-wave login-wave-side" viewBox="0 0 90 760" preserveAspectRatio="none" aria-hidden="true">
          <path d="M90 0 L90 760 L45 760 C5 640 85 500 35 380 C-5 280 65 140 45 0 Z" fill="#ffffff" />
        </svg>
        <svg className="login-wave login-wave-top" viewBox="0 0 390 56" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 56 L0 30 C60 -6 130 10 200 30 C270 50 330 40 390 8 L390 56 Z" fill="#ffffff" />
        </svg>

        <div className="login-card">

          {/* ───────── PHONE ───────── */}
          {step === 'phone' && (
            <form className="login-form" onSubmit={submitPhone} noValidate>
              <div className="login-head">
                <h2 className="login-title">Log in or sign up</h2>
                <p className="login-sub">Enter your phone number to continue</p>
              </div>

              <div className="login-phone">
                <span className="login-prefix">+91</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  aria-label="Phone number"
                  placeholder="Enter phone number"
                  value={formatPhone(phone)}
                  onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError('') }}
                />
              </div>
              {errorBlock}

              <button type="submit" className="login-btn" disabled={loading}>Continue</button>

              {altLogins}

              <div className="login-links">
                <button type="button" className="login-link" onClick={() => { setPassword(''); go('email') }}>Use email instead</button>
                <button type="button" className="login-link muted" onClick={handleGuest}>Continue as guest</button>
              </div>
              <p className="login-terms">By continuing you agree to our Terms of Service and Privacy Policy.</p>
            </form>
          )}

          {/* ───────── OTP ───────── */}
          {step === 'otp' && (
            <form className="login-form" onSubmit={verifyOtp} noValidate>
              <button type="button" className="login-back" aria-label="Go back" onClick={() => go('phone')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
              </button>

              <div className="login-head">
                <h2 className="login-title">Verify your number</h2>
                <p className="login-sub">
                  Enter the 4-digit code we sent to <b>+91 {formatPhone(phone)}</b>
                </p>
                <button type="button" className="login-link left" onClick={() => go('phone')}>Change number</button>
              </div>

              <div className="otp-row" onPaste={pasteOtp}>
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el }}
                    className="otp-box"
                    type="text"
                    inputMode="numeric"
                    autoComplete={i === 0 ? 'one-time-code' : 'off'}
                    maxLength={1}
                    aria-label={`Digit ${i + 1}`}
                    value={d}
                    onChange={(e) => changeOtp(i, e.target.value)}
                    onKeyDown={(e) => keyOtp(i, e)}
                  />
                ))}
              </div>
              {errorBlock}
              <p className="login-hint">Demo mode: use code <b>1234</b></p>

              <p className="login-resend">
                {seconds > 0
                  ? <>Resend code in <b>0:{String(seconds).padStart(2, '0')}</b></>
                  : <button type="button" className="login-link left" onClick={resend}>Resend code</button>}
              </p>

              <button type="submit" className="login-btn" disabled={loading}>{spinnerOr('Verify and continue')}</button>
            </form>
          )}

          {/* ───────── NAME (first time) ───────── */}
          {step === 'name' && (
            <form className="login-form" onSubmit={submitName} noValidate>
              <div className="login-head">
                <h2 className="login-title">Welcome to FreshMart</h2>
                <p className="login-sub">What should we call you?</p>
              </div>
              <input
                className="login-input"
                type="text"
                autoComplete="name"
                aria-label="Your name"
                placeholder="Your name"
                value={name}
                onChange={(e) => { setName(e.target.value); setError('') }}
                autoFocus
              />
              {errorBlock}
              <button type="submit" className="login-btn" disabled={loading}>{spinnerOr('Start shopping')}</button>
            </form>
          )}

          {/* ───────── EMAIL ───────── */}
          {step === 'email' && (
            <form className="login-form" onSubmit={submitEmail} noValidate>
              <div className="login-head">
                <h2 className="login-title">{isSignup ? 'Create account' : 'Welcome back'}</h2>
                <p className="login-sub">{isSignup ? 'Join FreshMart today' : 'Sign in with your email'}</p>
              </div>

              {isSignup && (
                <input
                  className="login-input"
                  type="text"
                  autoComplete="name"
                  aria-label="Full name"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError('') }}
                />
              )}
              <input
                className="login-input"
                type="email"
                autoComplete="email"
                aria-label="Email address"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
              />
              <input
                className="login-input"
                type="password"
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                aria-label="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
              />
              {errorBlock}

              <button type="submit" className="login-btn" disabled={loading}>
                {spinnerOr(isSignup ? 'Create account' : 'Sign in')}
              </button>

              <div className="login-links">
                <button type="button" className="login-link" onClick={() => go('phone')}>Use phone instead</button>
                <button type="button" className="login-link muted" onClick={() => { setIsSignup((s) => !s); setError('') }}>
                  {isSignup ? 'I have an account' : 'New here? Sign up'}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  )
}
