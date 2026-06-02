import { useState } from 'react'
import { Shield, Menu, X } from 'lucide-react'

export default function Navbar({ navigate, currentPage }) {
  const [open, setOpen] = useState(false)
  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      background:'rgba(255,255,255,0.95)', backdropFilter:'blur(12px)',
      borderBottom:'1px solid var(--gray-200)',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 2rem', height:'68px'
    }}>
      <div style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer'}}
           onClick={() => navigate('landing')}>
        <div style={{
          width:36,height:36,borderRadius:'10px',
          background:'linear-gradient(135deg,var(--green-700),var(--green-500))',
          display:'flex',alignItems:'center',justifyContent:'center'
        }}>
          <Shield size={20} color="white" />
        </div>
        <span style={{fontFamily:'Sora',fontWeight:700,fontSize:'1.15rem',color:'var(--green-800)'}}>
          HealthChain<span style={{color:'var(--green-500)'}}>ET</span>
        </span>
      </div>

      <div style={{display:'flex',gap:'2rem',alignItems:'center'}}>
        {['Features','How It Works','Impact'].map(l => (
          <span key={l} style={{
            fontSize:'0.9rem',fontWeight:500,color:'var(--gray-600)',
            cursor:'pointer',transition:'color .2s'
          }}
          onMouseEnter={e=>e.target.style.color='var(--green-600)'}
          onMouseLeave={e=>e.target.style.color='var(--gray-600)'}>{l}</span>
        ))}
        <button onClick={() => navigate('login')} style={{
          padding:'0.5rem 1.3rem',borderRadius:'99px',border:'none',
          background:'linear-gradient(135deg,var(--green-700),var(--green-500))',
          color:'white',fontFamily:'Sora',fontWeight:600,fontSize:'0.875rem',
          cursor:'pointer',transition:'transform .15s, box-shadow .15s',
          boxShadow:'0 2px 12px rgba(16,163,74,0.3)'
        }}
        onMouseEnter={e=>{e.target.style.transform='translateY(-1px)';e.target.style.boxShadow='0 6px 20px rgba(16,163,74,0.4)'}}
        onMouseLeave={e=>{e.target.style.transform='translateY(0)';e.target.style.boxShadow='0 2px 12px rgba(16,163,74,0.3)'}}>
          Sign In
        </button>
      </div>
    </nav>
  )
}
