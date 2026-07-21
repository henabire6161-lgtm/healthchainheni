import { stockStatusMeta } from '../data/medicines'

export default function MedicineAvailabilityCard({ cityName, status, units, compact = false }) {
  const meta = stockStatusMeta(status)
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      padding: compact ? '0.6rem 0.85rem' : '0.75rem 1rem',
      borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: meta.color, flexShrink: 0 }} />
        <span style={{ fontSize: compact ? '0.78rem' : '0.85rem', fontWeight: 600, color: 'white' }}>{cityName}</span>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: compact ? '0.7rem' : '0.75rem', fontWeight: 700, color: meta.color }}>{meta.label}</div>
        {units != null && (
          <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)' }}>{units.toLocaleString()} units</div>
        )}
      </div>
    </div>
  )
}
