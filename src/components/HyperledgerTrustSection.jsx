import { ShieldCheck, Lock, Landmark, Award } from 'lucide-react'
import SectionHeader from './SectionHeader'
import BlockchainNetwork from './BlockchainNetwork'
import TechBadge from './TechBadge'

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'No Cryptocurrency' },
  { icon: Lock, label: 'Permissioned Network' },
  { icon: Landmark, label: 'Government Controlled' },
  { icon: Award, label: 'Enterprise-Grade Trust' },
]

export default function HyperledgerTrustSection() {
  return (
    <section id="trust-network" style={{ padding: '7rem 1.5rem 6rem', background: '#052e16', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <SectionHeader
          eyebrow="HYPERLEDGER TRUST NETWORK"
          title="Trust Built Into Every Transaction"
          subtitle="Every prescription, claim, and record you saw signed and verified earlier runs on this permissioned network — here's what it looks like underneath."
          dark
          maxWidth={640}
        />

        <div className="trust-network-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <BlockchainNetwork />

          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.75rem' }}>
              {TRUST_BADGES.map((b, i) => (
                <TechBadge key={b.label} icon={b.icon} label={b.label} delay={i * 0.06} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .trust-network-layout { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}
