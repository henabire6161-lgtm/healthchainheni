import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { stockStatusMeta } from '../data/medicines'
import MedicineAvailabilityCard from './MedicineAvailabilityCard'

export default function CityMarker({ city, stock }) {
  const [hovered, setHovered] = useState(false)
  const meta = stockStatusMeta(stock?.status)

  return (
    <div
      style={{ position: 'absolute', top: `${city.y}%`, left: `${city.x}%`, transform: 'translate(-50%,-50%)', zIndex: hovered ? 20 : 5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <button
        aria-label={`${city.name}: ${meta.label}${stock ? `, ${stock.units.toLocaleString()} units` : ''}`}
        style={{ position: 'relative', width: 22, height: 22, background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <motion.span
          className="marker-pulse-ring"
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%', background: meta.color,
          }}
        />
        <span style={{
          position: 'absolute', inset: 6, borderRadius: '50%', background: meta.color,
          border: '2px solid #052e16', boxShadow: `0 0 12px ${meta.color}`,
        }} />
      </button>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute', bottom: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)',
              width: 190, pointerEvents: 'none',
            }}
          >
            <MedicineAvailabilityCard cityName={city.name} status={stock?.status} units={stock?.units} compact />
          </motion.div>
        )}
      </AnimatePresence>

      <span style={{
        position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 4,
        fontSize: '0.62rem', fontWeight: 600, color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap',
      }}>
        {city.name}
      </span>
    </div>
  )
}
