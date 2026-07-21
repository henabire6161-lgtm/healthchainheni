import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function FinalCTASection({ onRequestDemo, onExploreVision }) {
  return (
    <section
      id="contact"
      style={{ padding: '7rem 1.5rem', background: 'linear-gradient(155deg,#052e16,#0a6640)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 2 }}
      >
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(1.9rem,4.5vw,3rem)', color: 'white', letterSpacing: '-0.02em', marginBottom: '1.1rem' }}>
          Building Ethiopia's Digital Health Future
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.02rem', marginBottom: '2.5rem', lineHeight: 1.75 }}>
          HealthChain is designed to become the trusted digital foundation connecting every citizen, healthcare provider,
          and public institution through secure, interoperable technology.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={onRequestDemo} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '1rem 2.25rem', borderRadius: '99px', border: 'none', cursor: 'pointer',
            background: 'white', color: '#052e16',
            fontFamily: 'Sora', fontWeight: 700, fontSize: '0.95rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)', transition: 'transform 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Request a Demonstration <ArrowRight size={16} />
          </button>
          <button onClick={onExploreVision} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '1rem 2.25rem', borderRadius: '99px', cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)',
            color: 'white', fontFamily: 'Sora', fontWeight: 600, fontSize: '0.95rem', transition: 'background 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
          >
            Explore the Platform Vision
          </button>
        </div>
      </motion.div>
    </section>
  )
}
