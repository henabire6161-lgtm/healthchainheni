import { useState } from 'react'
import SectionHeader from './SectionHeader'
import PlatformGrid from './PlatformGrid'
import PlatformDetailPanel from './PlatformDetailPanel'
import AnimatedCounter from './AnimatedCounter'
import { PLATFORMS } from '../data/platforms'

const STATS = [
  { value: 10, suffix: '', label: 'National Platforms' },
  { value: 11, suffix: '', label: 'Regional Nodes' },
  { value: 1, suffix: '', label: 'Unified Identity' },
]

export default function EcosystemSection({ onExploreFull }) {
  const [selected, setSelected] = useState(null)

  return (
    <section id="platform" style={{ padding: '7rem 1.5rem 6rem', background: '#052e16', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <SectionHeader
          eyebrow="THE ECOSYSTEM"
          title={<>One Platform.<br />Ten Interconnected Systems.</>}
          subtitle="HealthChain isn't a single application — it's Ethiopia's national digital health infrastructure: ten interoperable platforms, working as one. Select any node to explore it."
          dark
          maxWidth={620}
        />

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '2rem', color: '#4ade80' }}>
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500, letterSpacing: '0.03em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <PlatformGrid platforms={PLATFORMS} onSelect={setSelected} />
      </div>

      <PlatformDetailPanel
        platform={selected}
        onClose={() => setSelected(null)}
        onViewFull={p => { setSelected(null); onExploreFull?.(p.id) }}
      />
    </section>
  )
}
