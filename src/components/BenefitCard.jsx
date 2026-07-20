import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function BenefitCard({ title, desc, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45, delay }}
      style={{
        padding: '1rem 1.1rem', borderRadius: 14,
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
        transition: 'border-color 0.2s ease, background 0.2s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(74,222,128,0.4)'; e.currentTarget.style.background = 'rgba(74,222,128,0.06)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
        <Sparkles size={13} color="#4ade80" />
        <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem', color: 'white' }}>{title}</span>
      </div>
      {desc && <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>{desc}</p>}
    </motion.div>
  )
}
