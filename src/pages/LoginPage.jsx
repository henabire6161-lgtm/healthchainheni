import { useState } from 'react'
import { Shield, ArrowLeft, Eye, EyeOff, Fingerprint } from 'lucide-react'

const ROLES = [
  { id:'patient',    icon:'👤', name:'Patient',   desc:'Health records & care' },
  { id:'doctor',     icon:'🩺', name:'Doctor',    desc:'Clinical workspace' },
  { id:'hospital',   icon:'🏥', name:'Hospital',  desc:'Facility operations' },
  { id:'government', icon:'🌐', name:'Government',desc:'National MOH dashboard' },
]

export default function LoginPage({ go }) {
  const [role,    setRole]    = useState('patient')
  const [faydaId, setFayda]   = useState('')
  const [pw,      setPw]      = useState('')
  const [showPw,  setShowPw]  = useState(false)
  const [loading, setLoading] = useState(false)

  const doLogin = () => {
    setLoading(true)
    setTimeout(() => go(role), 1500)
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', background:'#f8fafc' }}>
      {/* Left panel */}
      <div style={{
        flex:'0 0 420px', background:'linear-gradient(160deg,#052e16,#0a6640)',
        display:'flex', flexDirection:'column', padding:'3rem', position:'relative', overflow:'hidden'
      }}>
        <div style={{ position:'absolute', inset:0, opacity:0.04,
          backgroundImage:'radial-gradient(circle,white 1px,transparent 1px)',
          backgroundSize:'36px 36px' }}/>
        <div style={{ position:'absolute', bottom:'-10%', right:'-15%', width:400, height:400, borderRadius:'50%', background:'rgba(34,197,94,0.08)', filter:'blur(60px)' }}/>

        <div style={{ cursor:'pointer', display:'flex', alignItems:'center', gap:8, marginBottom:'auto', position:'relative' }}
             onClick={() => go('landing')}>
          <ArrowLeft size={16} color="rgba(255,255,255,0.5)"/>
          <span style={{ fontSize:'0.83rem', color:'rgba(255,255,255,0.5)' }}>Back to home</span>
        </div>

        <div style={{ position:'relative', zIndex:2, marginBottom:'auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:'2.5rem' }}>
            <div style={{ width:42, height:42, borderRadius:12, background:'rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Shield size={22} color="white"/>
            </div>
            <div>
              <div style={{ fontFamily:'Sora', fontWeight:800, fontSize:'1.05rem', color:'white' }}>HealthChainET</div>
              <div style={{ fontSize:'0.65rem', color:'#4ade80', fontWeight:700, letterSpacing:'0.08em' }}>ETHIOPIA</div>
            </div>
          </div>

          <h2 style={{ fontFamily:'Sora', fontWeight:800, fontSize:'2rem', color:'white', lineHeight:1.15, letterSpacing:'-0.02em', marginBottom:'1rem' }}>
            Your health data,<br/>secured on blockchain.
          </h2>
          <p style={{ fontSize:'0.9rem', color:'rgba(255,255,255,0.5)', lineHeight:1.7 }}>
            Authenticated with your Fayda National ID. Every login is cryptographically verified and audit-logged.
          </p>
        </div>

        {/* Trust badges */}
        <div style={{ display:'flex', flexDirection:'column', gap:'0.625rem', position:'relative', zIndex:2 }}>
          {['Fayda National ID Integrated','Hyperledger Fabric Blockchain','Government-Owned Infrastructure','WHO HL7 FHIR Compliant'].map(b => (
            <div key={b} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:18, height:18, borderRadius:'50%', background:'rgba(74,222,128,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ fontSize:'0.55rem', color:'#4ade80' }}>✓</span>
              </div>
              <span style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.45)' }}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem' }}>
        <div style={{ width:'100%', maxWidth:440 }}>
          <h3 style={{ fontFamily:'Sora', fontWeight:800, fontSize:'1.6rem', color:'#0f1a0f', marginBottom:'0.5rem' }}>Sign in to your portal</h3>
          <p style={{ fontSize:'0.875rem', color:'#475569', marginBottom:'2rem' }}>Select your role and sign in with your Fayda credentials.</p>

          {/* Role grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginBottom:'1.75rem' }}>
            {ROLES.map(r => (
              <button key={r.id} onClick={() => setRole(r.id)} style={{
                padding:'0.875rem 0.75rem', borderRadius:14,
                border: `1.5px solid ${role===r.id?'#0a6640':'#e2e8f0'}`,
                background: role===r.id?'#f0fdf4':'white',
                cursor:'pointer', textAlign:'left', transition:'all 0.15s'
              }}>
                <div style={{ fontSize:'1.35rem', marginBottom:'0.3rem' }}>{r.icon}</div>
                <div style={{ fontFamily:'Sora', fontWeight:700, fontSize:'0.9rem', color:'#0f1a0f', marginBottom:'2px' }}>{r.name}</div>
                <div style={{ fontSize:'0.72rem', color:'#94a3b8' }}>{r.desc}</div>
              </button>
            ))}
          </div>

          {/* Fayda ID display */}
          <div style={{
            display:'flex', alignItems:'center', gap:'0.75rem',
            padding:'0.75rem 1rem', background:'#f0fdf4',
            border:'1px solid #bbf7d0', borderRadius:12, marginBottom:'1.125rem'
          }}>
            <Fingerprint size={20} color='#0a6640'/>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:'0.65rem', fontWeight:700, color:'#0a6640', letterSpacing:'0.07em' }}>FAYDA NATIONAL ID</div>
              <div style={{ fontFamily:'Sora', fontSize:'0.875rem', fontWeight:700, color:'#052e16', marginTop:2 }}>
                {faydaId || 'ETH-XXXX-XXXX'}
              </div>
            </div>
            <span style={{ fontSize:'0.68rem', padding:'0.2rem 0.5rem', background:'#dcfce7', color:'#15803d', borderRadius:'99px', fontWeight:700 }}>VERIFIED</span>
          </div>

          <div style={{ marginBottom:'1rem' }}>
            <label style={{ display:'block', fontSize:'0.8rem', fontWeight:600, color:'#0f1a0f', marginBottom:'0.4rem' }}>Fayda ID Number</label>
            <input value={faydaId} onChange={e=>setFayda(e.target.value)}
              placeholder="e.g. ETH-1234-5678"
              style={{ width:'100%', padding:'0.7rem 1rem', borderRadius:10, border:'1.5px solid #e2e8f0', fontSize:'0.9rem', outline:'none', background:'#f8fafc', transition:'border-color 0.2s' }}
              onFocus={e=>e.target.style.borderColor='#22c55e'} onBlur={e=>e.target.style.borderColor='#e2e8f0'}/>
          </div>
          <div style={{ marginBottom:'1.5rem', position:'relative' }}>
            <label style={{ display:'block', fontSize:'0.8rem', fontWeight:600, color:'#0f1a0f', marginBottom:'0.4rem' }}>Password</label>
            <input type={showPw?'text':'password'} value={pw} onChange={e=>setPw(e.target.value)}
              placeholder="Enter your password"
              style={{ width:'100%', padding:'0.7rem 1rem', borderRadius:10, border:'1.5px solid #e2e8f0', fontSize:'0.9rem', outline:'none', background:'#f8fafc', transition:'border-color 0.2s' }}
              onFocus={e=>e.target.style.borderColor='#22c55e'} onBlur={e=>e.target.style.borderColor='#e2e8f0'}/>
            <button onClick={()=>setShowPw(!showPw)} style={{ position:'absolute', right:12, top:34, background:'none', border:'none', cursor:'pointer', color:'#94a3b8' }}>
              {showPw?<EyeOff size={18}/>:<Eye size={18}/>}
            </button>
          </div>

          <button onClick={doLogin} style={{
            width:'100%', padding:'0.9rem', borderRadius:12, border:'none', cursor:'pointer',
            background: loading ? '#86efac' : 'linear-gradient(135deg,#0a6640,#16a34a)',
            color:'white', fontFamily:'Sora', fontWeight:700, fontSize:'0.95rem',
            boxShadow:'0 4px 16px rgba(16,163,74,0.3)', transition:'all 0.2s'
          }}>
            {loading ? 'Authenticating with Fayda...' : `Sign In — ${ROLES.find(r=>r.id===role)?.name} Portal`}
          </button>

          <p style={{ textAlign:'center', fontSize:'0.75rem', color:'#94a3b8', marginTop:'1rem', lineHeight:1.6 }}>
            🔒 All data encrypted on government-owned blockchain infrastructure.<br/>
            Biometric authentication via Fayda NIDP.
          </p>
        </div>
      </div>
    </div>
  )
}
