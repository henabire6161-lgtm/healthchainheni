import { Info } from 'lucide-react'
import SectionHeader from './SectionHeader'
import PartnerCategory from './PartnerCategory'
import { PARTNER_CATEGORIES } from '../data/partners'

export default function PartnershipSection() {
  return (
    <section id="partnerships" style={{ padding: '7rem 1.5rem 6rem', background: '#052e16' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="ECOSYSTEM"
          title="Designed for National Collaboration"
          subtitle="HealthChain is architected to eventually work with every category of stakeholder in Ethiopia's health system."
          dark
          maxWidth={620}
        />

        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 10, maxWidth: 700, margin: '0 auto 2.5rem',
          padding: '0.9rem 1.1rem', borderRadius: 14,
          background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.3)',
        }}>
          <Info size={16} color="#fbbf24" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
            These are the <strong style={{ color: '#fbbf24' }}>categories</strong> of organizations HealthChain is designed to work with —
            not confirmed or official partnerships. No integration or endorsement should be inferred from this list.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.25rem' }}>
          {PARTNER_CATEGORIES.map((cat, i) => (
            <PartnerCategory key={cat.id} category={cat} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  )
}
