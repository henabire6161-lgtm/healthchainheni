import { useState } from 'react'
import { motion } from 'framer-motion'
import { Network, Link2 } from 'lucide-react'
import SectionHeader from './SectionHeader'
import ArchitectureNode from './ArchitectureNode'
import AnimatedConnection from './AnimatedConnection'
import PlatformDetailPanel from './PlatformDetailPanel'
import { PLATFORMS } from '../data/platforms'

const TOP_Y = 8
const MID_Y = 50
const BOTTOM_Y = 92

export default function EnterpriseArchitecture() {
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const count = PLATFORMS.length
  const step = 92 / (count - 1)
  const nodeX = (i) => 4 + i * step

  return (
    <section id="architecture" style={{ padding: '7rem 1.5rem 6rem', background: '#052e16', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <SectionHeader
          eyebrow="ENTERPRISE ARCHITECTURE"
          title="Enterprise Digital Health Architecture"
          subtitle="A modular Digital Public Infrastructure designed to securely connect every healthcare stakeholder across Ethiopia."
          dark
          maxWidth={640}
        />

        <div className="architecture-stage" style={{ position: 'relative', height: 560 }}>
          <svg className="architecture-lines" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            {PLATFORMS.map((p, i) => (
              <AnimatedConnection key={`top-${p.id}`} x1={50} y1={TOP_Y} x2={nodeX(i)} y2={MID_Y} delay={i * 0.04} active={hovered === p.id} />
            ))}
            {PLATFORMS.map((p, i) => (
              <AnimatedConnection key={`bottom-${p.id}`} x1={nodeX(i)} y1={MID_Y} x2={50} y2={BOTTOM_Y} delay={i * 0.04 + 0.2} active={hovered === p.id} />
            ))}
          </svg>

          {/* top tier */}
          <motion.div
            className="architecture-tier-bar"
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute', top: `${TOP_Y}%`, left: '50%', transform: 'translate(-50%,-50%)',
              display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap',
              padding: '0.85rem 1.75rem', borderRadius: 99,
              background: 'linear-gradient(135deg,#16a34a,#4ade80)',
              boxShadow: '0 0 40px rgba(74,222,128,0.4)',
            }}
          >
            <Network size={20} color="#052e16" />
            <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '0.95rem', color: '#052e16' }}>
              HealthChain Ethiopia Platform
            </span>
          </motion.div>

          {/* middle tier — services */}
          <div className="architecture-nodes">
            {PLATFORMS.map((p, i) => (
              <div
                key={p.id}
                className="architecture-node-slot"
                style={{ position: 'absolute', top: `${MID_Y}%`, left: `${nodeX(i)}%`, transform: 'translate(-50%,-50%)' }}
              >
                <ArchitectureNode platform={p} active={hovered === p.id} onSelect={setSelected} onHover={setHovered} delay={i * 0.04} />
              </div>
            ))}
          </div>

          {/* bottom tier */}
          <motion.div
            className="architecture-tier-bar"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              position: 'absolute', top: `${BOTTOM_Y}%`, left: '50%', transform: 'translate(-50%,-50%)',
              display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap',
              padding: '0.85rem 1.75rem', borderRadius: 16,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(74,222,128,0.3)',
            }}
          >
            <Link2 size={18} color="#4ade80" />
            <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem', color: 'white' }}>
              Shared Trusted Infrastructure — Hyperledger Fabric
            </span>
          </motion.div>
        </div>
      </div>

      <PlatformDetailPanel platform={selected} onClose={() => setSelected(null)} />

      <style>{`
        @media (max-width: 999px) {
          .architecture-lines { display: none !important; }
          .architecture-stage {
            height: auto !important; display: flex !important; flex-direction: column;
            align-items: center; gap: 1.75rem;
          }
          .architecture-tier-bar { position: static !important; transform: none !important; white-space: normal !important; text-align: center; }
          .architecture-nodes { position: static !important; display: grid !important; grid-template-columns: repeat(auto-fit,minmax(90px,1fr)); gap: 1.25rem 0.5rem; width: 100%; }
          .architecture-node-slot { position: static !important; transform: none !important; display: flex !important; justify-content: center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .architecture-lines { display: none !important; }
        }
      `}</style>
    </section>
  )
}
