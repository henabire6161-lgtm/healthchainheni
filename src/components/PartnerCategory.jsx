import { motion } from 'framer-motion'

export default function PartnerCategory({ category, delay = 0 }) {
  const Icon = category.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay }}
      style={{
        padding: '1.5rem', borderRadius: 18,
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.1rem' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
          background: 'linear-gradient(135deg,#0a6640,#22c55e)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={18} color="white" />
        </div>
        <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>{category.label}</h4>
      </div>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {category.items.map(item => (
          <li key={item} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
            padding: '0.55rem 0.75rem', borderRadius: 10, background: 'rgba(255,255,255,0.03)',
          }}>
            <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)' }}>{item}</span>
            <span style={{
              fontSize: '0.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: 99, padding: '0.15rem 0.5rem',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              FUTURE INTEGRATION
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
