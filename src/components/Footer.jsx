import { Shield, Linkedin, Github } from 'lucide-react'

const LINKS = [
  { label: 'Platform Overview', id: 'platform' },
  { label: 'Technology', id: 'technology' },
  { label: 'Architecture', id: 'architecture' },
  { label: 'Roadmap', id: 'roadmap' },
  { label: 'Contact', id: 'contact' },
]

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{ background: '#052e16', padding: '3rem 1.5rem 1.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '0.625rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={16} color="white" />
              </div>
              <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '0.95rem', color: '#4ade80' }}>HealthChainET</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', maxWidth: 280, lineHeight: 1.65 }}>
              A vision prototype for Ethiopia's future National Digital Health Infrastructure. Built to demonstrate,
              not yet in production.
            </p>
          </div>

          <nav aria-label="Footer navigation" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <h5 style={{ fontFamily: 'Sora', fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.07em', marginBottom: '0.25rem' }}>
              PLATFORM
            </h5>
            {LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                style={{
                  textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#4ade80' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div>
            <h5 style={{ fontFamily: 'Sora', fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.07em', marginBottom: '0.75rem' }}>
              CONNECT
            </h5>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <a
                href="https://github.com/henabire6161-lgtm/healthchainheni"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source on GitHub"
                style={{
                  width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', transition: 'background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(74,222,128,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              >
                <Github size={16} color="white" />
              </a>
              <span
                aria-disabled="true"
                title="LinkedIn — coming soon"
                style={{
                  width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'not-allowed',
                }}
              >
                <Linkedin size={16} color="rgba(255,255,255,0.25)" />
              </span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.22)' }}>© 2026 HealthChain Ethiopia · Vision Prototype</p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {['Fayda Integrated', 'Blockchain Verified', 'Digital Ethiopia 2030'].map(t => (
              <span key={t} style={{ padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
