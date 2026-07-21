import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function SecurityCard({ item, delay = 0 }) {
  const [expanded, setExpanded] = useState(false)
  const panelId = useId()
  const Icon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay }}
      style={{
        borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
        overflow: 'hidden', transition: 'border-color 0.25s ease',
        borderColor: expanded ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.12)',
      }}
    >
      <button
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
        aria-controls={panelId}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
          padding: '1.15rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer',
        }}
      >
        <div style={{
          width: 42, height: 42, borderRadius: 12, flexShrink: 0,
          background: 'linear-gradient(135deg,#0a6640,#22c55e)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={19} color="white" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.88rem', color: 'white' }}>{item.title}</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.62)', marginTop: 2 }}>{item.shortDesc}</div>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ flexShrink: 0 }}>
          <ChevronDown size={18} color="rgba(255,255,255,0.5)" />
        </motion.div>
      </button>

      <motion.div
        id={panelId}
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{ padding: '0 1.25rem 1.25rem 4.15rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>
          {item.detail}
        </p>
      </motion.div>
    </motion.div>
  )
}
