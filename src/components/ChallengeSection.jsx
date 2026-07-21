import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  FileWarning, Building2, Copy, PackageX, Clock, Network, CheckCircle2,
} from 'lucide-react'

const CARDS = [
  { icon: FileWarning, label: 'Paper Records', desc: 'Lost files, illegible charts, no backups.', scatter: { x: -260, y: -120, r: -14 }, angle: -110 },
  { icon: Building2, label: 'Disconnected Hospitals', desc: 'Every facility keeps its own silo.', scatter: { x: 220, y: -150, r: 10 }, angle: -35 },
  { icon: Copy, label: 'Duplicate Patient Records', desc: 'Same patient, five different identities.', scatter: { x: -300, y: 90, r: 9 }, angle: -180 },
  { icon: PackageX, label: 'Medicine Shortages', desc: 'No visibility into national drug stock.', scatter: { x: 260, y: 110, r: -11 }, angle: 35 },
  { icon: Clock, label: 'Insurance Delays', desc: 'Claims stuck for weeks without records.', scatter: { x: 0, y: 190, r: 6 }, angle: 110 },
]

function ChallengeCard({ card, scrollYProgress }) {
  const { icon: Icon, label, desc, scatter, angle } = card
  const radius = 210
  const rad = (angle * Math.PI) / 180
  const targetX = Math.cos(rad) * radius
  const targetY = Math.sin(rad) * radius

  const x = useTransform(scrollYProgress, [0.05, 0.6], [scatter.x, targetX])
  const y = useTransform(scrollYProgress, [0.05, 0.6], [scatter.y, targetY])
  const rotate = useTransform(scrollYProgress, [0.05, 0.6], [scatter.r, 0])
  const scale = useTransform(scrollYProgress, [0.05, 0.6, 0.85], [1, 0.86, 0.72])
  const borderColor = useTransform(scrollYProgress, [0.1, 0.6], ['rgba(239,68,68,0.45)', 'rgba(74,222,128,0.55)'])
  const iconColor = useTransform(scrollYProgress, [0.1, 0.6], ['#fca5a5', '#4ade80'])
  const badgeOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1])

  return (
    <motion.div
      style={{
        position: 'absolute', top: '50%', left: '50%',
        x, y, rotate, scale,
        translateX: '-50%', translateY: '-50%',
        width: 190, borderRadius: 16, padding: '1.1rem 1.15rem',
        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
        border: '1px solid', borderColor,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, position: 'relative' }}>
        <motion.div style={{ color: iconColor }}>
          <Icon size={18} />
        </motion.div>
        <motion.div style={{ opacity: badgeOpacity, marginLeft: 'auto', color: '#4ade80', display: 'flex' }}>
          <CheckCircle2 size={15} />
        </motion.div>
      </div>
      <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem', color: 'white', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.5 }}>{desc}</div>
    </motion.div>
  )
}

function DesktopStage({ sectionRef }) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  const fromOpacity = useTransform(scrollYProgress, [0, 0.32, 0.45], [1, 1, 0])
  const toOpacity = useTransform(scrollYProgress, [0.45, 0.6, 1], [0, 1, 1])
  const hubScale = useTransform(scrollYProgress, [0.55, 0.78], [0, 1])
  const hubOpacity = useTransform(scrollYProgress, [0.55, 0.72], [0, 1])
  const ringScale = useTransform(scrollYProgress, [0.6, 1], [0.9, 1.08])
  const ringOpacity = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 0.5, 0.25])

  return (
    <div className="challenge-desktop-stage" style={{
      position: 'sticky', top: 0, height: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'relative', textAlign: 'center', marginBottom: '2.5rem', height: 90, width: '100%' }}>
        <motion.h2 style={{
          position: 'absolute', inset: 0, opacity: fromOpacity,
          fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,2.6rem)',
          color: 'white', letterSpacing: '-0.02em',
        }}>
          From Fragmented Healthcare
        </motion.h2>
        <motion.h2 style={{
          position: 'absolute', inset: 0, opacity: toOpacity,
          fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,2.6rem)',
          color: 'white', letterSpacing: '-0.02em',
        }}>
          To One Connected <span style={{ color: '#4ade80' }}>Health Ecosystem</span>
        </motion.h2>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 900, height: 480 }}>
        <motion.div style={{
          position: 'absolute', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%',
          width: 380, height: 380, borderRadius: '50%',
          border: '1px solid rgba(74,222,128,0.35)', scale: ringScale, opacity: ringOpacity,
        }} />
        <motion.div style={{
          position: 'absolute', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%',
          scale: hubScale, opacity: hubOpacity,
          width: 108, height: 108, borderRadius: 26,
          background: 'linear-gradient(135deg,#16a34a,#4ade80)',
          boxShadow: '0 0 60px rgba(74,222,128,0.5)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
          zIndex: 5,
        }}>
          <Network size={30} color="#052e16" />
          <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '0.62rem', color: '#052e16' }}>HealthChain</span>
        </motion.div>

        {CARDS.map(card => (
          <ChallengeCard key={card.label} card={card} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </div>
  )
}

function MobileStack() {
  return (
    <div className="challenge-mobile-stack" style={{ padding: '5rem 1.5rem', maxWidth: 560, margin: '0 auto' }}>
      <h2 style={{
        fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(1.7rem,7vw,2.2rem)',
        color: 'white', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: '2.25rem',
      }}>
        From Fragmented Healthcare
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
        {CARDS.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '1rem 1.1rem', borderRadius: 14,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(239,68,68,0.35)',
              }}
            >
              <Icon size={18} color="#fca5a5" />
              <div>
                <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem', color: 'white' }}>{card.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.62)' }}>{card.desc}</div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{
          width: 56, height: 56, borderRadius: '50%', margin: '0 auto 1rem',
          background: 'linear-gradient(135deg,#16a34a,#4ade80)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 40px rgba(74,222,128,0.4)',
        }}>
          <Network size={26} color="#052e16" />
        </div>
        <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(1.4rem,6vw,1.8rem)', color: 'white', marginBottom: '0.75rem' }}>
          To One Connected <span style={{ color: '#4ade80' }}>Health Ecosystem</span>
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {CARDS.map(card => (
            <span key={card.label} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '0.4rem 0.75rem', borderRadius: 99,
              background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)',
              fontSize: '0.72rem', color: '#4ade80', fontWeight: 600,
            }}>
              <CheckCircle2 size={12} /> {card.label}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function ChallengeSection() {
  const sectionRef = useRef(null)

  return (
    <section
      id="the-challenge"
      ref={sectionRef}
      style={{
        position: 'relative', background: '#052e16',
        height: '320vh',
      }}
      className="challenge-section"
    >
      <DesktopStage sectionRef={sectionRef} />
      <MobileStack />

      <style>{`
        .challenge-mobile-stack { display: none; }
        @media (max-width: 860px), (prefers-reduced-motion: reduce) {
          .challenge-section { height: auto !important; }
          .challenge-desktop-stage { display: none !important; }
          .challenge-mobile-stack { display: block !important; }
        }
      `}</style>
    </section>
  )
}
