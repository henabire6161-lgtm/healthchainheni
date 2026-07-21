import { TrendingUp, TrendingDown } from 'lucide-react'

export default function TrendIndicator({ value, label = 'vs last month' }) {
  if (value == null) return null
  const positive = value > 0
  const Icon = positive ? TrendingUp : TrendingDown
  const color = positive ? '#4ade80' : '#f87171'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', fontWeight: 700, color }}>
      <Icon size={12} /> {Math.abs(value)}% {label}
    </span>
  )
}
