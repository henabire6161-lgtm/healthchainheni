import { motion } from 'framer-motion'

export default function TechBadge({ icon: Icon, label, sublabel, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.35, delay }}
      style={{
        display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4,
        padding: sublabel ? '0.7rem 1rem' : '0.5rem 1rem',
        borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {Icon && <Icon size={14} color="#4ade80" />}
        <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.8rem', color: 'white' }}>{label}</span>
      </span>
      {sublabel && <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>{sublabel}</span>}
    </motion.div>
  )
}
