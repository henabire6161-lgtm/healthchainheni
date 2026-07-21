import { motion } from 'framer-motion'

export default function IntegrationCard({ system, delay = 0 }) {
  const { icon: Icon, name, status, note } = system
  const isCore = status === 'core'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4, delay }}
      style={{
        padding: '1.1rem 1.15rem', borderRadius: 16,
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
        transition: 'border-color 0.25s ease, background 0.25s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(74,222,128,0.4)'; e.currentTarget.style.background = 'rgba(74,222,128,0.06)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 11, flexShrink: 0,
          background: 'linear-gradient(135deg,#0a6640,#22c55e)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={17} color="white" />
        </div>
        <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem', color: 'white', lineHeight: 1.3 }}>{name}</span>
      </div>
      <span style={{
        display: 'inline-block', padding: '0.25rem 0.65rem', borderRadius: 99, fontSize: '0.66rem', fontWeight: 700,
        background: isCore ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.06)',
        border: `1px solid ${isCore ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.14)'}`,
        color: isCore ? '#4ade80' : 'rgba(255,255,255,0.5)',
      }}>
        {note}
      </span>
    </motion.div>
  )
}
