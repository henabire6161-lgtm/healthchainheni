import SectionHeader from './SectionHeader'
import SecurityCard from './SecurityCard'
import { SECURITY_ITEMS } from '../data/security'

export default function SecuritySection() {
  return (
    <section id="security" style={{ padding: '7rem 1.5rem 6rem', background: 'linear-gradient(180deg,#052e16,#0a3d24)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="PLATFORM SECURITY"
          title="Security by Design"
          subtitle="Government-grade security isn't a feature added later — it's built into every layer of the architecture from day one."
          dark
          maxWidth={620}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
          {SECURITY_ITEMS.map((item, i) => (
            <SecurityCard key={item.id} item={item} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  )
}
