import { useRef } from 'react'
import { X, Pill, Clock, Tag } from 'lucide-react'
import DetailSheet from './DetailSheet'
import MedicineAvailabilityCard from './MedicineAvailabilityCard'
import { CITIES, stockStatusMeta, overallStatus, totalUnits } from '../data/medicines'

export default function MedicineDetailPanel({ medicine, onClose }) {
  const closeRef = useRef(null)

  return (
    <DetailSheet open={!!medicine} onClose={onClose} labelledBy="medicine-panel-title" initialFocusRef={closeRef} maxWidth={560}>
      {medicine && (
        <>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                background: 'linear-gradient(135deg,#0a6640,#22c55e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Pill size={22} color="white" />
              </div>
              <div>
                <h3 id="medicine-panel-title" style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.1rem', color: 'white', lineHeight: 1.3 }}>
                  {medicine.name}
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>{medicine.category}</span>
              </div>
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

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {(() => {
              const meta = stockStatusMeta(overallStatus(medicine))
              return (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '0.35rem 0.85rem', borderRadius: 99, fontSize: '0.75rem', fontWeight: 700,
                  background: `${meta.color}1a`, border: `1px solid ${meta.color}55`, color: meta.color,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: meta.color }} />
                  {meta.label} Nationally
                </span>
              )
            })()}
            <span style={{
              padding: '0.35rem 0.85rem', borderRadius: 99, fontSize: '0.75rem', fontWeight: 700,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.65)',
            }}>
              {totalUnits(medicine).toLocaleString()} total units
            </span>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.72rem', color: '#4ade80', letterSpacing: '0.07em', marginBottom: '0.7rem' }}>
              NEARBY FACILITIES / CITY STOCK
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {CITIES.map(city => {
                const stock = medicine.stockByCity[city.id]
                return <MedicineAvailabilityCard key={city.id} cityName={city.name} status={stock?.status} units={stock?.units} />
              })}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.9rem 1rem', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Tag size={13} color="#4ade80" />
                <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>ESTIMATED PRICE</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'white', fontWeight: 700 }}>{medicine.priceRange}</div>
            </div>
            <div style={{ padding: '0.9rem 1rem', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Clock size={13} color="#4ade80" />
                <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>LAST UPDATE</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'white', fontWeight: 700 }}>{medicine.lastUpdate}</div>
            </div>
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.72rem', color: '#4ade80', letterSpacing: '0.07em', marginBottom: '0.7rem' }}>
              ALTERNATIVE MEDICINES
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {medicine.alternatives.map(a => (
                <span key={a} style={{
                  padding: '0.3rem 0.75rem', borderRadius: 99, fontSize: '0.75rem', fontWeight: 600,
                  background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80',
                }}>{a}</span>
              ))}
            </div>
          </div>

          <button
            disabled
            title="Reservation will be available in a future release"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%',
              padding: '0.85rem', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.15)', cursor: 'not-allowed',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.45)', fontFamily: 'Sora', fontWeight: 700, fontSize: '0.9rem',
            }}
          >
            Reserve This Medicine — Coming Soon
          </button>
        </>
      )}
    </DetailSheet>
  )
}
