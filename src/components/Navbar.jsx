import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Menu, X, ArrowRight } from 'lucide-react'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'platform', label: 'Platform' },
  { id: 'vision', label: 'Vision' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ onRequestDemo }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const sectionsRef = useRef({})

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS
      .map(l => document.getElementById(l.id))
      .filter(Boolean)
    sectionsRef.current = sections

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const scrollTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
          height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(1.25rem, 4vw, 3rem)',
          background: scrolled ? 'rgba(5,46,22,0.72)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(160%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.18)' : 'none',
          transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        }}
      >
        <button
          onClick={() => scrollTo('home')}
          aria-label="HealthChain ET — Home"
          style={{
            display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
            background: 'none', border: 'none', padding: 0,
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg,#0a6640,#22c55e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(34,197,94,0.35)',
          }}>
            <Shield size={18} color="white" />
          </div>
          <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.05rem', color: 'white', letterSpacing: '-0.01em' }}>
            HealthChain<span style={{ color: '#4ade80' }}>ET</span>
          </span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }} className="nav-links-desktop">
          {LINKS.map(l => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{
                position: 'relative', background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'DM Sans', fontSize: '0.875rem', fontWeight: 500,
                padding: '0.4rem 0.1rem',
                color: active === l.id ? '#4ade80' : 'rgba(255,255,255,0.75)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => { if (active !== l.id) e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { if (active !== l.id) e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-active-underline"
                  style={{ position: 'absolute', left: 0, right: 0, bottom: -4, height: 2, borderRadius: 2, background: '#4ade80' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          ))}
          <button
            onClick={onRequestDemo}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '0.55rem 1.35rem', borderRadius: '99px', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg,#16a34a,#4ade80)',
              color: '#052e16', fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem',
              boxShadow: '0 4px 18px rgba(34,197,94,0.4)', transition: 'transform 0.18s ease, box-shadow 0.18s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(34,197,94,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(34,197,94,0.4)' }}
          >
            Request Demo <ArrowRight size={14} />
          </button>
        </div>

        <button
          className="nav-toggle-mobile"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{
            display: 'none', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 10, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          {open ? <X size={20} color="white" /> : <Menu size={20} color="white" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 290,
              background: 'rgba(5,46,22,0.98)', backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column',
              padding: '6.5rem 2rem 2.5rem',
            }}
            role="dialog"
            aria-modal="true"
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  onClick={() => scrollTo(l.id)}
                  style={{
                    textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
                    padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'Sora', fontWeight: 700, fontSize: '1.4rem',
                    color: active === l.id ? '#4ade80' : 'white',
                  }}
                >
                  {l.label}
                </motion.button>
              ))}
            </nav>
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * LINKS.length, duration: 0.3 }}
              onClick={() => { setOpen(false); onRequestDemo?.() }}
              style={{
                marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '1rem', borderRadius: '99px', border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg,#16a34a,#4ade80)',
                color: '#052e16', fontFamily: 'Sora', fontWeight: 700, fontSize: '1rem',
                boxShadow: '0 8px 24px rgba(34,197,94,0.4)',
              }}
            >
              Request Demo <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .nav-links-desktop { display: none !important; }
          .nav-toggle-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}
