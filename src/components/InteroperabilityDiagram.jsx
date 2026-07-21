import { Network } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import IntegrationCard from './IntegrationCard'
import TechBadge from './TechBadge'
import { EXTERNAL_SYSTEMS, STANDARDS } from '../data/interoperability'

export default function InteroperabilityDiagram() {
  return (
    <section id="interoperability" style={{ padding: '7rem 1.5rem 6rem', background: 'linear-gradient(180deg,#052e16,#0a3d24)' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="INTEROPERABILITY"
          title="Built for Interoperability"
          subtitle="HealthChain is architected to connect — not to lock in. Every service is designed around open standards so the wider health ecosystem can plug in as it grows."
          dark
          maxWidth={640}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            margin: '0 auto 2.5rem', width: 'fit-content',
            padding: '0.85rem 1.75rem', borderRadius: 99,
            background: 'linear-gradient(135deg,#16a34a,#4ade80)',
            boxShadow: '0 0 40px rgba(74,222,128,0.4)',
          }}
        >
          <Network size={20} color="#052e16" />
          <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '0.95rem', color: '#052e16' }}>HealthChain Platform</span>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {EXTERNAL_SYSTEMS.map((s, i) => (
            <IntegrationCard key={s.id} system={s} delay={i * 0.04} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.72rem', color: '#4ade80', letterSpacing: '0.07em' }}>
            STANDARDS &amp; PROTOCOLS
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
          {STANDARDS.map((s, i) => (
            <TechBadge key={s.name} label={s.name} sublabel={s.desc} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  )
}
