import { motion } from 'framer-motion'

export default function JourneyStep({ step, index, onSelect, compact = false }) {
  const { icon: Icon, title, shortDesc } = step

  return (
    <motion.button
      className="journey-step"
      onClick={() => onSelect(step)}
      initial={{ opacity: 0, y: compact ? 16 : 0, scale: compact ? 1 : 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`${title} — view details`}
      style={{
        flexShrink: 0, textAlign: compact ? 'left' : 'center', cursor: 'pointer', appearance: 'none',
        width: compact ? '100%' : 172,
        display: 'flex', flexDirection: compact ? 'row' : 'column', alignItems: 'center', gap: compact ? 14 : 0,
        padding: compact ? '1rem 1.1rem' : '0 0.5rem',
        background: compact ? 'rgba(255,255,255,0.05)' : 'transparent',
        border: compact ? '1px solid rgba(255,255,255,0.12)' : 'none',
        borderRadius: compact ? 16 : 0,
        scrollSnapAlign: 'center',
        transition: 'border-color 0.25s ease, background 0.25s ease',
      }}
      onMouseEnter={e => { if (compact) { e.currentTarget.style.borderColor = 'rgba(74,222,128,0.5)'; e.currentTarget.style.background = 'rgba(74,222,128,0.07)' } }}
      onMouseLeave={e => { if (compact) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' } }}
    >
      <div
        className="journey-step-icon"
        style={{
          width: 56, height: 56, borderRadius: 16, flexShrink: 0,
          background: 'linear-gradient(135deg,#0a6640,#22c55e)',
          border: '3px solid #052e16',
          boxShadow: '0 0 0 1px rgba(74,222,128,0.35), 0 8px 24px rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: compact ? 0 : 12,
          transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        }}
      >
        <Icon size={24} color="white" />
      </div>
      <div>
        <div style={{
          fontFamily: 'Sora', fontWeight: 700, fontSize: '0.82rem', color: 'white',
          marginBottom: 4, lineHeight: 1.3,
        }}>
          {title}
        </div>
        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
          {shortDesc}
        </div>
      </div>
    </motion.button>
  )
}
