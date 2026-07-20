import { AnimatePresence, motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import PlatformCard from './PlatformCard'
import FeatureList from './FeatureList'
import BenefitCard from './BenefitCard'
import { PLATFORMS } from '../data/platforms'

function StoryRibbon({ platformTitle }) {
  const steps = ['One Citizen', platformTitle, 'One Connected Health Ecosystem']
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, flexWrap: 'wrap', marginBottom: '3rem' }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
          <motion.span
            key={step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              padding: '0.4rem 0.9rem', borderRadius: 99, fontSize: '0.75rem', fontWeight: 700,
              background: i === 1 ? 'rgba(74,222,128,0.14)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${i === 1 ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.12)'}`,
              color: i === 1 ? '#4ade80' : 'rgba(255,255,255,0.6)',
              maxWidth: 220, textAlign: 'center',
            }}
          >
            {step}
          </motion.span>
          {i < steps.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              style={{ width: 32, height: 1, background: 'linear-gradient(90deg,rgba(74,222,128,0.6),rgba(74,222,128,0.15))', transformOrigin: 'left', margin: '0 6px' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function PlatformExplorer({ selectedId, onSelectId }) {
  const platform = PLATFORMS.find(p => p.id === selectedId) || PLATFORMS[0]
  const Icon = platform.icon

  return (
    <section id="platform-explorer" style={{ padding: '6rem 1.5rem 7rem', background: 'linear-gradient(180deg,#052e16,#0a3d24)', position: 'relative' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="PLATFORM EXPLORER"
          title="Go deeper into every national platform."
          subtitle="Ten systems, one architecture. Explore what each platform does, who it serves, and where it's headed."
          dark
        />

        <StoryRibbon platformTitle={platform.title} />

        <div className="explorer-layout" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem', alignItems: 'flex-start' }}>
          <nav aria-label="Select a platform" className="explorer-selector" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {PLATFORMS.map(p => (
              <PlatformCard
                key={p.id}
                platform={p}
                compact
                onSelect={pl => onSelectId(pl.id)}
                style={p.id === platform.id
                  ? { borderColor: 'rgba(74,222,128,0.6)', background: 'rgba(74,222,128,0.1)' }
                  : undefined}
              />
            ))}
          </nav>

          <div className="explorer-detail">
            <AnimatePresence mode="wait">
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* illustration */}
                <div style={{
                  position: 'relative', borderRadius: 24, padding: '3rem 2rem', marginBottom: '2rem',
                  background: 'radial-gradient(circle at 30% 20%,rgba(74,222,128,0.18),transparent 60%), rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem',
                }}>
                  <div style={{
                    width: 96, height: 96, borderRadius: 24,
                    background: 'linear-gradient(135deg,#16a34a,#4ade80)',
                    boxShadow: '0 0 70px rgba(74,222,128,0.45)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={44} color="#052e16" />
                  </div>
                  <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(1.3rem,2.6vw,1.8rem)', color: 'white', letterSpacing: '-0.01em' }}>
                    {platform.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', maxWidth: 560, lineHeight: 1.7 }}>
                    {platform.mission}
                  </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.72rem', color: '#4ade80', letterSpacing: '0.07em', marginBottom: '0.7rem' }}>OVERVIEW</h4>
                  <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>{platform.overview}</p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.72rem', color: '#4ade80', letterSpacing: '0.07em', marginBottom: '0.9rem' }}>CORE FEATURES</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '0.75rem' }}>
                    {platform.coreFeatures.map((f, i) => (
                      <BenefitCard key={f.title} title={f.title} desc={f.desc} delay={i * 0.05} />
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '2rem', marginBottom: '2rem' }}>
                  <div>
                    <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.72rem', color: '#4ade80', letterSpacing: '0.07em', marginBottom: '0.9rem' }}>WHO BENEFITS</h4>
                    <FeatureList items={platform.whoBenefits} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.72rem', color: '#4ade80', letterSpacing: '0.07em', marginBottom: '0.9rem' }}>TECHNOLOGY HIGHLIGHTS</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {platform.technologyHighlights.map(t => (
                        <span key={t} style={{
                          padding: '0.35rem 0.8rem', borderRadius: 99, fontSize: '0.75rem', fontWeight: 600,
                          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.7)',
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.72rem', color: '#4ade80', letterSpacing: '0.07em', marginBottom: '0.7rem' }}>FUTURE VISION</h4>
                  <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>{platform.futureVision}</p>
                </div>

                <div style={{
                  padding: '1.25rem 1.5rem', borderRadius: 16,
                  background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.22)',
                }}>
                  <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.72rem', color: '#4ade80', letterSpacing: '0.07em', marginBottom: '0.6rem' }}>GOVERNMENT IMPACT</h4>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{platform.governmentImpact}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .explorer-layout { grid-template-columns: 1fr !important; }
          .explorer-selector {
            flex-direction: row !important;
            overflow-x: auto;
            padding-bottom: 0.5rem;
            -webkit-overflow-scrolling: touch;
          }
          .explorer-selector .platform-card { width: 220px !important; flex-shrink: 0; }
        }
      `}</style>
    </section>
  )
}
