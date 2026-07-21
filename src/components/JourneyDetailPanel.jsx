import { useRef } from 'react'
import { X } from 'lucide-react'
import DetailSheet from './DetailSheet'
import FeatureList from './FeatureList'

export default function JourneyDetailPanel({ step, onClose }) {
  const closeRef = useRef(null)

  return (
    <DetailSheet open={!!step} onClose={onClose} labelledBy="journey-panel-title" initialFocusRef={closeRef} maxWidth={520}>
      {step && (
        <>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                background: 'linear-gradient(135deg,#0a6640,#22c55e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <step.icon size={22} color="white" />
              </div>
              <h3 id="journey-panel-title" style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.1rem', color: 'white', lineHeight: 1.3 }}>
                {step.title}
              </h3>
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close details"
              style={{
                width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}
            >
              <X size={16} color="white" />
            </button>
          </div>

          <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            {step.summary}
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.72rem', color: '#4ade80', letterSpacing: '0.07em', marginBottom: '0.7rem' }}>WHAT HAPPENS</h4>
            <FeatureList items={step.whatHappens} size="sm" />
          </div>

          <div style={{
            padding: '0.85rem 1.1rem', borderRadius: 12,
            background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          }}>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>POWERED BY</span>
            <span style={{ fontSize: '0.8rem', color: '#4ade80', fontWeight: 700, textAlign: 'right' }}>{step.poweredBy}</span>
          </div>
        </>
      )}
    </DetailSheet>
  )
}
