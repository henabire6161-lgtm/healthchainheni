import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

export default function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { stiffness: 60, damping: 18 })
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, value, motionValue])

  useEffect(() => (
    springValue.on('change', latest => {
      if (ref.current) {
        const formatted = latest.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        ref.current.textContent = `${prefix}${formatted}${suffix}`
      }
    })
  ), [springValue, prefix, suffix, decimals])

  return <span ref={ref}>{prefix}0{suffix}</span>
}
