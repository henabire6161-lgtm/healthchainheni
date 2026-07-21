import { motion } from 'framer-motion'
import {
  ArrowRight, Stethoscope, HeartPulse, Syringe, Pill,
  FileText, ShieldCheck, Database, Users,
} from 'lucide-react'

const NETWORK_NODES = [
  { Icon: Stethoscope, top: '14%', left: '10%', delay: 0 },
  { Icon: HeartPulse, top: '62%', left: '6%', delay: 0.6 },
  { Icon: Syringe, top: '20%', left: '86%', delay: 1.1 },
  { Icon: Pill, top: '72%', left: '90%', delay: 0.3 },
  { Icon: FileText, top: '8%', left: '48%', delay: 0.9 },
  { Icon: ShieldCheck, top: '85%', left: '46%', delay: 1.4 },
  { Icon: Database, top: '44%', left: '4%', delay: 1.7 },
  { Icon: Users, top: '40%', left: '93%', delay: 0.5 },
]

const LINES = [
  [10, 14, 48, 8], [48, 8, 86, 20], [10, 14, 6, 62],
  [86, 20, 93, 40], [6, 62, 46, 85], [93, 40, 90, 72],
  [46, 85, 4, 44], [4, 44, 6, 62],
]

export default function Hero({ onExplore, onRequestDemo }) {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '8rem 1.5rem 5rem', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(155deg,#052e16 0%,#0a5c2e 45%,#0a6640 100%)',
      }}
    >
      {/* grid texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
      }} />
      {/* glow orbs */}
      <div style={{ position: 'absolute', top: '12%', right: '8%', width: 500, height: 500, borderRadius: '50%', background: 'rgba(34,197,94,0.12)', filter: 'blur(90px)' }} />
      <div style={{ position: 'absolute', bottom: '8%', left: '5%', width: 360, height: 360, borderRadius: '50%', background: 'rgba(201,168,76,0.08)', filter: 'blur(70px)' }} />

      {/* animated healthcare network — hidden on small screens to avoid clutter/perf cost */}
      <div className="hero-network" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {LINES.map(([x1, y1, x2, y2], i) => (
            <motion.line
              key={i}
              x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
              stroke="rgba(74,222,128,0.28)" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.6, delay: 0.4 + i * 0.12, ease: 'easeOut' }}
            />
          ))}
        </svg>
        {NETWORK_NODES.map(({ Icon, top, left, delay }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
            transition={{
              opacity: { duration: 0.6, delay },
              scale: { duration: 0.6, delay },
              y: { duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay },
            }}
            style={{
              position: 'absolute', top, left,
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.16)',
              backdropFilter: 'blur(6px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Icon size={19} color="#86efac" />
          </motion.div>
        ))}
      </div>

      <div style={{ maxWidth: 880, textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: '99px', padding: '0.35rem 1rem', marginBottom: '0.75rem',
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: 700, letterSpacing: '0.07em' }}>
            SUPPORTING DIGITAL ETHIOPIA 2030
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.62)', letterSpacing: '0.03em', marginBottom: '2rem' }}
        >
          Interactive Vision Prototype · Demonstration Data
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: 'Sora', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em',
            fontSize: 'clamp(2.4rem,6vw,4.6rem)', color: 'white', marginBottom: '1.5rem',
          }}
        >
          One Citizen.<br />
          <span style={{ color: '#4ade80' }}>One Identity.</span><br />
          <span style={{ color: '#f0d98a' }}>One Connected Health Ecosystem.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.65)', maxWidth: 660, margin: '0 auto 2.5rem', lineHeight: 1.75, fontWeight: 300 }}
        >
          HealthChain Ethiopia Platform is building Ethiopia's future National Digital Health Infrastructure
          by securely connecting patients, healthcare providers, laboratories, pharmacies, insurers, and
          government through interoperable digital technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4.5rem' }}
        >
          <button onClick={onExplore} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '0.9rem 2rem', borderRadius: '99px', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#4ade80,#16a34a)',
            color: 'white', fontFamily: 'Sora', fontWeight: 700, fontSize: '0.95rem',
            boxShadow: '0 8px 32px rgba(34,197,94,0.4)', transition: 'transform 0.18s ease, box-shadow 0.18s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Explore Platform <ArrowRight size={17} />
          </button>
          <button onClick={onRequestDemo} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '0.9rem 2rem', borderRadius: '99px', cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.25)',
            background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)',
            color: 'white', fontFamily: 'Sora', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
          >
            Request Demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 18, overflow: 'hidden',
          }}
        >
          {[
            { value: '130M+', label: 'Citizens Connected' },
            { value: '21,581', label: 'Health Facilities' },
            { value: '100%', label: 'Data Sovereignty' },
            { value: 'Real-Time', label: 'Disease Surveillance' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '1.5rem 1rem', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
              <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.9rem', color: '#4ade80', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.62)', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        <p style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.55)', marginTop: '0.75rem' }}>
          Illustrative national-scale figures for this vision prototype, not live platform metrics.
        </p>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
        @media (max-width: 720px) {
          .hero-network { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-network { display: none; }
        }
      `}</style>
    </section>
  )
}
