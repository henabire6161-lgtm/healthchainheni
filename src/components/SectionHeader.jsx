import { motion } from 'framer-motion'

export default function SectionHeader({ eyebrow, title, subtitle, dark, align = 'center', maxWidth = 560 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      style={{ textAlign: align, marginBottom: '3rem' }}
    >
      {eyebrow && (
        <span style={{
          display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '99px',
          background: dark ? 'rgba(255,255,255,0.1)' : '#f0fdf4',
          color: dark ? '#4ade80' : '#0a6640',
          fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.07em', marginBottom: '0.875rem',
        }}>
          {eyebrow}
        </span>
      )}
      <h2 style={{
        fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,2.8rem)',
        color: dark ? 'white' : '#0f1a0f', letterSpacing: '-0.02em', lineHeight: 1.15,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          color: dark ? 'rgba(255,255,255,0.55)' : '#475569', marginTop: '0.75rem', fontSize: '1rem',
          maxWidth, marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0,
          lineHeight: 1.7,
        }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
