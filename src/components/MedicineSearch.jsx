import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Pill } from 'lucide-react'
import { MEDICINES, stockStatusMeta, overallStatus } from '../data/medicines'

const SUGGESTIONS = ['Paracetamol', 'Amoxicillin', 'Insulin', 'ORS', 'Metformin']

export default function MedicineSearch({ selectedId, onSelect }) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return MEDICINES
    return MEDICINES.filter(m => m.name.toLowerCase().includes(q))
  }, [query])

  return (
    <div>
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <Search size={18} color="rgba(255,255,255,0.4)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a medicine..."
          aria-label="Search for a medicine"
          style={{
            width: '100%', padding: '0.9rem 1rem 0.9rem 3rem', borderRadius: 14,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)',
            color: 'white', fontSize: '0.92rem', fontFamily: 'DM Sans', outline: 'none',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(74,222,128,0.5)' }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)' }}
        />
      </div>

      {!query && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.25rem' }}>
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              style={{
                padding: '0.35rem 0.85rem', borderRadius: 99, fontSize: '0.75rem', fontWeight: 600,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
                color: 'rgba(255,255,255,0.65)', cursor: 'pointer',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }} aria-live="polite">
        <AnimatePresence mode="popLayout">
          {results.map(m => {
            const meta = stockStatusMeta(overallStatus(m))
            const active = m.id === selectedId
            return (
              <motion.button
                key={m.id}
                layout
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelect(m)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', cursor: 'pointer',
                  padding: '0.8rem 1rem', borderRadius: 14,
                  background: active ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${active ? 'rgba(74,222,128,0.5)' : 'rgba(255,255,255,0.1)'}`,
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'linear-gradient(135deg,#0a6640,#22c55e)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Pill size={16} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem', color: 'white' }}>{m.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>{m.category}</div>
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: meta.color, whiteSpace: 'nowrap' }}>{meta.label}</span>
              </motion.button>
            )
          })}
          {results.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', padding: '0.75rem 0' }}
            >
              No medicines found for "{query}".
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
