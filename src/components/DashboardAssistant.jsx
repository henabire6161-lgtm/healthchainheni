import { useState, useRef, useEffect } from 'react'
import { Sparkles, X, Send, Heart, Stethoscope, Building2, Globe } from 'lucide-react'

const ROLE = {
  patient: {
    icon: Heart,
    color: '#16a34a',
    dark: '#052e16',
    who: 'HealthChain Assistant',
    sub: 'Linked to your Fayda ID',
    greeting: 'Hi Henok — ask me about your results, medications, or upcoming visits.',
    prompts: [
      'Why was my blood pressure medicine changed?',
      'When is my next appointment?',
      'Explain my last lab result',
    ],
  },
  doctor: {
    icon: Stethoscope,
    color: '#059669',
    dark: '#052e16',
    who: 'Clinical Assistant',
    sub: 'Black Lion Hospital · Internal Medicine',
    greeting: "Hi Dr. Wondimu — ask me to draft a note, check interactions, or pull up today's schedule.",
    prompts: [
      'Draft a note for my 9:45 encounter',
      'Check drug interactions for Almaz Bekele',
      "Summarize today's overdue labs",
    ],
  },
  hospital: {
    icon: Building2,
    color: '#0a6640',
    dark: '#052e16',
    who: 'Operations Assistant',
    sub: 'Black Lion Hospital · Facility ID ETH-FAC-0014',
    greeting: 'Ask me about bed capacity, supply chain, or staffing across the facility.',
    prompts: [
      'Which wards are near capacity?',
      'What supplies need reordering today?',
      "Summarize today's admissions",
    ],
  },
  government: {
    icon: Globe,
    color: '#0a5c2e',
    dark: '#052e16',
    who: 'National Intelligence Assistant',
    sub: 'Federal Ministry of Health',
    greeting: 'Ask me about disease surveillance, regional coverage, or policy reporting.',
    prompts: [
      "Summarize this week's outbreak alerts",
      'Which regions have the lowest reporting rates?',
      'Draft a briefing on the cholera outbreak',
    ],
  },
}

const CANNED_REPLY =
  "This feature will be available soon. You're looking at a preview of the HealthChain Assistant — once connected, it will answer this from your real, blockchain-verified data."

export default function DashboardAssistant({ role }) {
  const cfg = ROLE[role] || ROLE.patient
  const Icon = cfg.icon
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef(null)
  const seeded = useRef(false)

  useEffect(() => {
    if (open && !seeded.current) {
      seeded.current = true
      setMessages([{ role: 'ai', text: cfg.greeting }])
    }
  }, [open, cfg.greeting])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, typing])

  const send = (text) => {
    const t = text.trim()
    if (!t || typing) return
    setMessages((m) => [...m, { role: 'user', text: t }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { role: 'ai', text: CANNED_REPLY }])
    }, 1100)
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI assistant"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 300,
          width: 56, height: 56, borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: `linear-gradient(135deg, ${cfg.dark}, ${cfg.color})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 10px 30px ${cfg.color}55`,
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {open ? <X size={22} color="white" /> : <Sparkles size={22} color="white" />}
        {!open && <span className="hc-dash-ai-ping" style={{ borderColor: cfg.color }} />}
      </button>

      {open && (
        <div
          style={{
            position: 'fixed', bottom: 92, right: 24, zIndex: 300,
            width: 360, maxWidth: 'calc(100vw - 32px)', height: 480, maxHeight: 'calc(100vh - 140px)',
            background: 'white', borderRadius: 20, overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: '0 24px 60px rgba(5,46,22,0.28)',
            display: 'flex', flexDirection: 'column',
            animation: 'hc-dash-ai-in 0.22s ease',
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${cfg.dark}, ${cfg.color})`,
              padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, color: 'white', flexShrink: 0,
            }}
          >
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={16} color="white" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.875rem' }}>{cfg.who}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cfg.sub}</div>
            </div>
            <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em', color: '#4ade80', background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 99, padding: '2px 8px', flexShrink: 0 }}>
              PREVIEW
            </span>
          </div>

          <div ref={bodyRef} style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10, background: 'var(--surface)' }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '86%',
                  background: m.role === 'user' ? cfg.color : 'white',
                  color: m.role === 'user' ? 'white' : 'var(--ink)',
                  border: m.role === 'user' ? 'none' : '1px solid var(--border)',
                  borderRadius: 14,
                  borderBottomRightRadius: m.role === 'user' ? 4 : 14,
                  borderBottomLeftRadius: m.role === 'ai' ? 4 : 14,
                  padding: '9px 12px', fontSize: '0.83rem', lineHeight: 1.5,
                }}
              >
                {m.text}
              </div>
            ))}
            {typing && (
              <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 4, background: 'white', border: '1px solid var(--border)', borderRadius: 14, borderBottomLeftRadius: 4, padding: '10px 14px' }}>
                <span className="hc-dash-ai-dot" /><span className="hc-dash-ai-dot" /><span className="hc-dash-ai-dot" />
              </div>
            )}
            {messages.length <= 1 && !typing && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                {cfg.prompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    style={{
                      textAlign: 'left', padding: '8px 12px', borderRadius: 10,
                      border: '1px solid var(--border)', background: 'white',
                      color: 'var(--muted)', fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = cfg.color; e.currentTarget.style.color = 'var(--ink)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', padding: '10px 12px', display: 'flex', gap: 8, background: 'white', flexShrink: 0 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') send(input) }}
              placeholder="Type a message…"
              style={{ flex: 1, padding: '9px 13px', borderRadius: 99, border: '1.5px solid var(--border)', fontSize: '0.83rem', outline: 'none', background: 'var(--surface)' }}
            />
            <button
              onClick={() => send(input)}
              disabled={typing}
              style={{
                width: 36, height: 36, borderRadius: '50%', border: 'none', flexShrink: 0,
                background: `linear-gradient(135deg, ${cfg.dark}, ${cfg.color})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: typing ? 'default' : 'pointer', opacity: typing ? 0.5 : 1,
              }}
            >
              <Send size={14} color="white" />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes hc-dash-ai-in { from { opacity:0; transform:translateY(12px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes hc-dash-ai-bounce { 0%,60%,100%{ transform:translateY(0); opacity:.5; } 30%{ transform:translateY(-4px); opacity:1; } }
        @keyframes hc-dash-ai-ripple { 0%{ transform:scale(1); opacity:.55; } 100%{ transform:scale(1.9); opacity:0; } }
        .hc-dash-ai-dot { width:6px; height:6px; border-radius:50%; background:#a9b8ae; animation:hc-dash-ai-bounce 1.1s infinite ease-in-out; }
        .hc-dash-ai-dot:nth-child(2){ animation-delay:0.15s; }
        .hc-dash-ai-dot:nth-child(3){ animation-delay:0.3s; }
        .hc-dash-ai-ping { position:absolute; inset:0; border-radius:50%; border:2px solid; animation:hc-dash-ai-ripple 1.8s ease-out infinite; pointer-events:none; }
      `}</style>
    </>
  )
}
