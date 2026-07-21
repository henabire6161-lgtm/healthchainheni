import { motion } from 'framer-motion'

export default function MilestoneCard({ milestone, delay = 0, side = 'right' }) {
  const isCurrent = milestone.status === 'current'

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'right' ? 24 : -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay }}
      style={{
        padding: '1.25rem 1.5rem', borderRadius: 18,
        background: isCurrent ? 'rgba(74,222,128,0.08)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${isCurrent ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.12)'}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.3rem', color: isCurrent ? '#4ade80' : 'white' }}>
          {milestone.year}
        </span>
        {isCurrent && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '0.2rem 0.6rem', borderRadius: 99, fontSize: '0.65rem', fontWeight: 700,
            background: 'rgba(74,222,128,0.15)', color: '#4ade80',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s infinite' }} />
            YOU ARE HERE
          </span>
        )}
      </div>
      <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1rem', color: 'white', marginBottom: 6 }}>{milestone.title}</h4>
      <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{milestone.description}</p>
    </motion.div>
  )
}
