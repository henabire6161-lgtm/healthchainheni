import { CheckCircle2 } from 'lucide-react'

export default function FeatureList({ items, dark = true, size = 'md' }) {
  const fontSize = size === 'sm' ? '0.78rem' : '0.86rem'
  const iconSize = size === 'sm' ? 13 : 15
  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: size === 'sm' ? 7 : 9 }}>
      {items.map(item => (
        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <CheckCircle2 size={iconSize} color="#4ade80" style={{ flexShrink: 0, marginTop: 2 }} />
          <span style={{ fontSize, color: dark ? 'rgba(255,255,255,0.7)' : '#475569', lineHeight: 1.55 }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}
