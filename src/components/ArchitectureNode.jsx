import { motion } from 'framer-motion'

export default function ArchitectureNode({ platform, active, onSelect, onHover, style, delay = 0 }) {
  const Icon = platform.icon

  return (
    <motion.button
      className="architecture-node"
      onClick={() => onSelect(platform)}
      onMouseEnter={() => onHover?.(platform.id)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(platform.id)}
      onBlur={() => onHover?.(null)}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.4, delay }}
      aria-label={`${platform.title} — view details`}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        width: 108, cursor: 'pointer', background: 'none', border: 'none', textAlign: 'center',
        ...style,
      }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: active ? 'linear-gradient(135deg,#16a34a,#4ade80)' : 'rgba(255,255,255,0.06)',
        border: `1px solid ${active ? 'rgba(74,222,128,0.7)' : 'rgba(255,255,255,0.14)'}`,
        boxShadow: active ? '0 0 26px rgba(74,222,128,0.5)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
      }}>
        <Icon size={22} color={active ? '#052e16' : '#4ade80'} />
      </div>
      <span style={{
        fontSize: '0.68rem', fontWeight: 600, lineHeight: 1.3,
        color: active ? 'white' : 'rgba(255,255,255,0.55)', transition: 'color 0.25s ease',
      }}>
        {platform.title}
      </span>
    </motion.button>
  )
}
