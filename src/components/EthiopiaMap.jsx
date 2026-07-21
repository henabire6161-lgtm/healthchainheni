import { motion } from 'framer-motion'
import { CITIES } from '../data/medicines'
import CityMarker from './CityMarker'

export default function EthiopiaMap({ medicine }) {
  return (
    <div
      role="group"
      aria-label={`Simplified map of Ethiopia showing ${medicine.name} availability across ${CITIES.length} cities`}
      style={{
        position: 'relative', width: '100%', maxWidth: 460, aspectRatio: '1 / 1', margin: '0 auto',
      }}
    >
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
        <motion.path
          d="M 26,12 L 52,8 L 68,14 L 84,28 L 91,44 L 81,54 L 71,49 L 66,63 L 57,84 L 46,91 L 36,80 L 31,64 L 21,54 L 15,36 L 19,20 Z"
          fill="rgba(74,222,128,0.06)"
          stroke="rgba(74,222,128,0.35)"
          strokeWidth="0.6"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
      </svg>

      {CITIES.map(city => (
        <CityMarker key={city.id} city={city} stock={medicine.stockByCity[city.id]} />
      ))}

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .marker-pulse-ring { display: none !important; }
        }
      `}</style>
    </div>
  )
}
