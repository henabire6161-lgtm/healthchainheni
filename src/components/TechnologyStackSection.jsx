import SectionHeader from './SectionHeader'
import DashboardGrid from './DashboardGrid'
import ChartCard from './ChartCard'
import TechBadge from './TechBadge'
import { TECH_CATEGORIES } from '../data/technology'

export default function TechnologyStackSection() {
  return (
    <section id="technology" style={{ padding: '7rem 1.5rem 6rem', background: '#052e16' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="TECHNOLOGY STACK"
          title="Built on Proven Enterprise Technologies"
          subtitle="A technology foundation chosen for interoperability, resilience, and long-term government ownership — not vendor lock-in."
          dark
          maxWidth={620}
        />

        <DashboardGrid minColWidth={260}>
          {TECH_CATEGORIES.map((cat, i) => (
            <ChartCard key={cat.id} title={cat.label} delay={i * 0.05}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {cat.items.map((item, j) => (
                  <TechBadge key={item} label={item} delay={i * 0.05 + j * 0.03} />
                ))}
              </div>
            </ChartCard>
          ))}
        </DashboardGrid>
      </div>
    </section>
  )
}
