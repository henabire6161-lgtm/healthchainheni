import { motion } from 'framer-motion'

export default function AnimatedConnection({ x1, y1, x2, y2, delay = 0, active = false }) {
  return (
    <motion.line
      x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
      stroke={active ? 'rgba(74,222,128,0.85)' : 'rgba(74,222,128,0.25)'}
      strokeWidth={active ? 1.6 : 1}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: active ? [0.5, 1, 0.5] : [0.35, 0.6, 0.35] }}
      transition={{
        pathLength: { duration: 1, delay, ease: 'easeOut' },
        opacity: { duration: active ? 1.6 : 3, repeat: Infinity, ease: 'easeInOut', delay: delay + 1 },
      }}
    />
  )
}
