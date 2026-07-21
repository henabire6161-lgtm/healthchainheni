import { useState, lazy, Suspense } from 'react'
import SectionHeader from './SectionHeader'
import MedicineSearch from './MedicineSearch'
import MedicineDetailPanel from './MedicineDetailPanel'
import Skeleton from './Skeleton'
import { MEDICINES } from '../data/medicines'

const EthiopiaMap = lazy(() => import('./EthiopiaMap'))

export default function NPIPSection() {
  const [activeMedicine, setActiveMedicine] = useState(MEDICINES[0])
  const [detailMedicine, setDetailMedicine] = useState(null)

  const handleSelect = (medicine) => {
    setActiveMedicine(medicine)
    setDetailMedicine(medicine)
  }

  return (
    <section id="npip" style={{ padding: '7rem 1.5rem 6rem', background: 'linear-gradient(180deg,#052e16,#0a3d24)', position: 'relative' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="NATIONAL PHARMACEUTICAL INTELLIGENCE PLATFORM"
          title="Real-time medicine intelligence, nationwide."
          subtitle="Real-time nationwide medicine intelligence connecting patients, pharmacies, healthcare providers, regulators, and government."
          dark
          maxWidth={640}
        />

        <div className="npip-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <MedicineSearch selectedId={activeMedicine.id} onSelect={handleSelect} />
          </div>
          <div>
            <Suspense fallback={<Skeleton height={460} borderRadius={24} label="Loading map" />}>
              <EthiopiaMap medicine={activeMedicine} />
            </Suspense>
            <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'rgba(255,255,255,0.62)', marginTop: '1rem' }}>
              Showing live stock for <strong style={{ color: '#4ade80' }}>{activeMedicine.name}</strong> · demo data
            </p>
          </div>
        </div>
      </div>

      <MedicineDetailPanel medicine={detailMedicine} onClose={() => setDetailMedicine(null)} />

      <style>{`
        @media (max-width: 900px) {
          .npip-layout { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}
