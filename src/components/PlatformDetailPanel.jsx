import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import FeatureList from './FeatureList'

export default function PlatformDetailPanel({ platform, onClose, onViewFull }) {
  const closeRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!platform) return
    closeRef.current?.focus()
    const onKey = e => { if (e.key === 'Escape') onCloseRef.current() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [platform])

  return createPortal(
    <AnimatePresence>
      {platform && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 400,
            background: 'rgba(2,20,10,0.75)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          }}
          className="platform-panel-backdrop"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="platform-panel-title"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%', maxWidth: 560, maxHeight: '85vh', overflowY: 'auto',
              background: 'linear-gradient(160deg,#052e16,#0a5c2e)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '22px 22px 0 0',
              padding: '2rem', margin: '0 1rem',
            }}
            className="platform-panel-sheet"
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                  background: 'linear-gradient(135deg,#0a6640,#22c55e)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <platform.icon size={22} color="white" />
                </div>
                <h3 id="platform-panel-title" style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.15rem', color: 'white', lineHeight: 1.3 }}>
                  {platform.title}
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

            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {platform.mission}
            </p>

            <div style={{ marginBottom: '1.4rem' }}>
              <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.72rem', color: '#4ade80', letterSpacing: '0.07em', marginBottom: '0.6rem' }}>PURPOSE</h4>
              <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{platform.purpose}</p>
            </div>

            <div style={{ marginBottom: '1.4rem' }}>
              <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.72rem', color: '#4ade80', letterSpacing: '0.07em', marginBottom: '0.6rem' }}>PRIMARY USERS</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {platform.primaryUsers.map(u => (
                  <span key={u} style={{
                    padding: '0.3rem 0.75rem', borderRadius: 99, fontSize: '0.75rem', fontWeight: 600,
                    background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80',
                  }}>{u}</span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.4rem' }}>
              <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.72rem', color: '#4ade80', letterSpacing: '0.07em', marginBottom: '0.6rem' }}>KEY BENEFITS</h4>
              <FeatureList items={platform.keyBenefits} size="sm" />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.72rem', color: '#4ade80', letterSpacing: '0.07em', marginBottom: '0.6rem' }}>FUTURE CAPABILITIES</h4>
              <FeatureList items={platform.futureCapabilities} size="sm" />
            </div>

            <button
              onClick={() => onViewFull?.(platform)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%',
                padding: '0.85rem', borderRadius: '99px', border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg,#16a34a,#4ade80)',
                color: '#052e16', fontFamily: 'Sora', fontWeight: 700, fontSize: '0.9rem',
              }}
            >
              Explore Full Details <ArrowRight size={16} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
