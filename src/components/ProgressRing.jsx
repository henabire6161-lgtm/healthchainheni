import { motion } from 'framer-motion'

export default function ProgressRing({ value, size = 120, strokeWidth = 10, color = '#4ade80', label }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - value / 100)

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth} fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 2,
      }}>
        <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: size / 4.5, color: 'white' }}>{value}%</span>
        {label && (
          <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)', textAlign: 'center', maxWidth: size * 0.72, lineHeight: 1.3 }}>
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
