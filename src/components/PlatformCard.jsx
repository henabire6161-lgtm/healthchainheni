import { motion } from 'framer-motion'

export default function PlatformCard({ platform, onSelect, delay = 0, style, compact = false }) {
  const { icon: Icon, title, shortDesc } = platform

  return (
    <motion.button
      className="platform-card"
      onClick={() => onSelect(platform)}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.45, delay }}
      style={{
        textAlign: 'left', cursor: 'pointer', appearance: 'none',
        width: compact ? '100%' : 178, borderRadius: 16,
        padding: compact ? '1rem 1.1rem' : '1.15rem 1.1rem',
        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.14)',
        display: 'flex', flexDirection: compact ? 'row' : 'column', alignItems: compact ? 'center' : 'flex-start',
        gap: compact ? 12 : 0,
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(74,222,128,0.55)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(34,197,94,0.25)'
        e.currentTarget.style.background = 'rgba(74,222,128,0.07)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
      }}
    >
      <div style={{
        width: compact ? 40 : 40, height: compact ? 40 : 40, borderRadius: 11, flexShrink: 0,
        background: 'linear-gradient(135deg,#0a6640,#22c55e)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: compact ? 0 : 10,
      }}>
        <Icon size={18} color="white" />
      </div>
      <div>
        <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem', color: 'white', marginBottom: 4, lineHeight: 1.3 }}>
          {title}
        </div>
        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.5 }}>
          {shortDesc}
        </div>
      </div>
    </motion.button>
  )
}
