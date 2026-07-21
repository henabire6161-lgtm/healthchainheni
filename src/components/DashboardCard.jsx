import { motion } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'
import TrendIndicator from './TrendIndicator'

export default function DashboardCard({ icon: Icon, label, value, decimals = 0, suffix = '', sub, trend, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay }}
      style={{
        padding: '1.25rem 1.4rem', borderRadius: 16,
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
        display: 'flex', gap: '1rem', alignItems: 'flex-start',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(74,222,128,0.4)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.25)'
        e.currentTarget.style.background = 'rgba(74,222,128,0.06)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
        background: 'linear-gradient(135deg,#0a6640,#22c55e)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={20} color="white" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginBottom: '0.3rem' }}>{label}</div>
        <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.55rem', color: 'white', lineHeight: 1 }}>
          <AnimatedCounter value={value} decimals={decimals} suffix={suffix} />
        </div>
        {sub && <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.62)', marginTop: '0.35rem' }}>{sub}</div>}
        {trend != null && <div style={{ marginTop: '0.35rem' }}><TrendIndicator value={trend} /></div>}
      </div>
    </motion.div>
  )
}
