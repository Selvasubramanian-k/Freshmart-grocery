// Profile picture. Google/photo URL irundha adhu, illaina name-based illustrated avatar (letter alla).
// user.picture / user.photo / user.avatar irundha adha use pannum.
const PALETTES = [
  { bg: '#d4f3e5', skin: '#f2c9a0', hair: '#2b2118', shirt: '#00a870' },
  { bg: '#fde9c8', skin: '#d99b6c', hair: '#1a1411', shirt: '#f5a623' },
  { bg: '#dbe8fb', skin: '#e8b88a', hair: '#4a2f1b', shirt: '#4285f4' },
  { bg: '#fbd9e3', skin: '#c88a5e', hair: '#161010', shirt: '#d6457a' },
  { bg: '#e6dcf7', skin: '#f0c19a', hair: '#7a4a21', shirt: '#7a3fc4' },
]

function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h
}

export default function Avatar({ user, size = 40, className = '' }) {
  const src = user?.picture || user?.photo || user?.avatar
  const style = { width: size, height: size, borderRadius: '50%', display: 'block', flexShrink: 0 }
  if (src) return <img className={className} src={src} alt="" style={{ ...style, objectFit: 'cover' }} referrerPolicy="no-referrer" />

  const seed = (user?.name || user?.email || user?.phone || '').trim()
  const p = PALETTES[seed ? hash(seed) % PALETTES.length : 0]
  const long = seed ? hash(seed) % 2 === 0 : false
  return (
    <svg className={className} style={style} viewBox="0 0 64 64" role="img" aria-label={user?.name || 'Guest'}>
      <rect width="64" height="64" fill={p.bg} />
      <path d="M10 64c2-14 11-20 22-20s20 6 22 20z" fill={p.shirt} />
      <rect x="28" y="36" width="8" height="9" rx="3" fill={p.skin} />
      {long && <path d="M17 30c0-12 7-18 15-18s15 6 15 18v14H40V30H24v14H17z" fill={p.hair} />}
      <circle cx="32" cy="29" r="12" fill={p.skin} />
      <path d={long ? 'M20 27c1-9 7-12 12-12s11 3 12 12c-4-3-9-5-12-5s-8 2-12 5z' : 'M20 28c-1-9 5-15 12-15s13 6 12 15c-2-4-5-7-8-7-4 2-12 2-16 7z'} fill={p.hair} />
      <circle cx="27.500" cy="30" r="1.400" fill="#2b2118" />
      <circle cx="36.500" cy="30" r="1.400" fill="#2b2118" />
      <path d="M28 35c2.500 2 5.500 2 8 0" stroke="#8a4b2d" strokeWidth="1.500" strokeLinecap="round" fill="none" />
    </svg>
  )
}
