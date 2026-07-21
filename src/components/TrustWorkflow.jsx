import { motion } from 'framer-motion'
import { PenTool, ShieldCheck, Link2, Lock, Landmark, ArrowRight } from 'lucide-react'
import SectionHeader from './SectionHeader'

const STEPS = [
  { icon: PenTool, label: 'Doctor signs prescription' },
  { icon: ShieldCheck, label: 'Digital verification' },
  { icon: Link2, label: 'Hyperledger Fabric audit' },
  { icon: Lock, label: 'Tamper-proof record' },
  { icon: Landmark, label: 'Government compliance' },
]

export default function TrustWorkflow() {
  return (
    <section id="trust" style={{ padding: '6rem 1.5rem 7rem', background: '#052e16', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <SectionHeader
          eyebrow="SYSTEM TRUST"
          title="Trust you can see, not just take our word for."
          subtitle="Every prescription, every record, every claim — provably real, provably unaltered."
          dark
        />

        <div className="trust-flow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: i * 0.12 }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                    width: 150, textAlign: 'center',
                  }}
                >
                  <div style={{
                    width: 60, height: 60, borderRadius: 18,
                    background: 'linear-gradient(135deg,#16a34a,#4ade80)',
                    boxShadow: '0 0 32px rgba(74,222,128,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={26} color="#052e16" />
                  </div>
                  <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.8rem', color: 'white', lineHeight: 1.4 }}>
                    {step.label}
                  </span>
                </motion.div>

                {i < STEPS.length - 1 && (
                  <motion.div
                    className="trust-arrow"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: i * 0.12 + 0.2 }}
                    style={{ color: 'rgba(74,222,128,0.5)', flexShrink: 0 }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .trust-flow { flex-direction: column; }
          .trust-arrow { transform: rotate(90deg); margin-top: 0 !important; }
        }
      `}</style>
    </section>
  )
}
