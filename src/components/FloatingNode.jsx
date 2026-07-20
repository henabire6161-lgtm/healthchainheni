import { motion } from 'framer-motion'

export default function FloatingNode({
  icon: Icon, label, size = 108, iconSize = 30, float = true, delay = 0, style, labelStyle,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      animate={float ? { y: [0, -10, 0] } : {}}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay },
      }}
      style={{
        width: size, height: size, borderRadius: size * 0.24,
        background: 'linear-gradient(135deg,#16a34a,#4ade80)',
        boxShadow: '0 0 60px rgba(74,222,128,0.5)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
        ...style,
      }}
    >
      {Icon && <Icon size={iconSize} color="#052e16" />}
      {label && (
        <span style={{
          fontFamily: 'Sora', fontWeight: 800, fontSize: size < 90 ? '0.58rem' : '0.68rem',
          color: '#052e16', textAlign: 'center', padding: '0 8px', ...labelStyle,
        }}>
          {label}
        </span>
      )}
    </motion.div>
  )
}
