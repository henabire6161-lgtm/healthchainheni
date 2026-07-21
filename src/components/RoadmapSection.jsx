import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import MilestoneCard from './MilestoneCard'
import { ROADMAP_MILESTONES } from '../data/roadmap'

export default function RoadmapSection() {
  return (
    <section id="roadmap" style={{ padding: '7rem 1.5rem 6rem', background: 'linear-gradient(180deg,#052e16,#0a3d24)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="DIGITAL ETHIOPIA 2030"
          title="Roadmap to National Digital Health Transformation"
          subtitle="From today's vision prototype to a fully realized national ecosystem by 2030."
          dark
        />

        <div role="list" aria-label="Digital Ethiopia 2030 roadmap">
          {ROADMAP_MILESTONES.map((m, i) => {
            const isLast = i === ROADMAP_MILESTONES.length - 1
            return (
              <div key={m.year} role="listitem" style={{ display: 'flex', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 24 }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.35, delay: i * 0.1 }}
                    style={{
                      width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 20,
                      background: m.status === 'current' ? '#4ade80' : 'rgba(255,255,255,0.15)',
                      border: m.status === 'current' ? 'none' : '2px solid rgba(255,255,255,0.3)',
                      boxShadow: m.status === 'current' ? '0 0 16px rgba(74,222,128,0.7)' : 'none',
                    }}
                  />
                  {!isLast && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.4, delay: i * 0.1 + 0.1 }}
                      style={{
                        width: 2, flex: 1, minHeight: 36, transformOrigin: 'top',
                        background: 'linear-gradient(180deg,rgba(74,222,128,0.4),rgba(255,255,255,0.08))',
                      }}
                    />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0, paddingBottom: isLast ? 0 : '1.5rem' }}>
                  <MilestoneCard milestone={m} delay={i * 0.1} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
    </section>
  )
}
