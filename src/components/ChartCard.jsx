import { motion } from 'framer-motion'

export default function ChartCard({ title, subtitle, action, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      style={{
        borderRadius: 18, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
      }}
    >
      {(title || action) && (
        <div style={{
          padding: '1.1rem 1.4rem', borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
        }}>
          <div>
            {title && <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>{title}</h4>}
            {subtitle && <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div style={{ padding: '1.4rem' }}>{children}</div>
    </motion.div>
  )
}
