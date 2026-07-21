import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import JourneyStep from './JourneyStep'

export default function InteractiveTimeline({ steps, onSelect }) {
  const wrapRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start 0.85', 'end 0.5'] })
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={wrapRef}>
      <div className="journey-progress-track" style={{
        position: 'relative', height: 4, background: 'rgba(255,255,255,0.08)',
        borderRadius: 99, marginBottom: '2.5rem', overflow: 'hidden', maxWidth: 640, margin: '0 auto 2.5rem',
      }}>
        <motion.div style={{
          position: 'absolute', inset: 0, width: progressWidth,
          background: 'linear-gradient(90deg,#16a34a,#4ade80)', borderRadius: 99,
        }} />
      </div>

      <div
        className="journey-track"
        role="list"
        aria-label="Connected healthcare journey steps"
        style={{
          display: 'flex', alignItems: 'flex-start', overflowX: 'auto',
          padding: '0.5rem 1rem 1.25rem', scrollSnapType: 'x proximity', justifyContent: 'flex-start',
        }}
      >
        {steps.map((step, i) => (
          <div key={step.id} role="listitem" style={{ display: 'flex', alignItems: 'flex-start' }}>
            <JourneyStep step={step} index={i} onSelect={onSelect} />
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  width: 28, height: 2, flexShrink: 0, marginTop: 28,
                  background: 'linear-gradient(90deg,rgba(74,222,128,0.7),rgba(74,222,128,0.2))',
                  transformOrigin: 'left',
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="journey-mobile-stack" style={{ display: 'none', flexDirection: 'column', gap: '0.85rem' }}>
        {steps.map((step, i) => (
          <JourneyStep key={step.id} step={step} index={i} onSelect={onSelect} compact />
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .journey-track, .journey-progress-track { display: none !important; }
          .journey-mobile-stack { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
