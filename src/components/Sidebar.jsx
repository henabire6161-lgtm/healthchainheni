import { Shield, LogOut } from 'lucide-react'

const ROLE_COLORS = {
  patient:'#16a34a', doctor:'#059669', hospital:'#0a6640', government:'#052e16'
}

export default function Sidebar({ items, active, setActive, role, go }) {
  return (
    <aside style={{
      width:'var(--sidebar-w)', minHeight:'100vh', position:'fixed',
      left:0, top:0, zIndex:50,
      background:'linear-gradient(180deg,#052e16 0%,#0a5c2e 100%)',
      display:'flex', flexDirection:'column',
      boxShadow:'4px 0 24px rgba(0,0,0,0.18)'
    }}>
      {/* Logo */}
      <div style={{padding:'1.25rem 1.5rem', borderBottom:'1px solid rgba(255,255,255,0.08)', cursor:'pointer'}}
           onClick={()=>go('landing')}>
        <div style={{display:'flex',alignItems:'center',gap:'9px'}}>
          <div style={{width:34,height:34,borderRadius:'9px',background:'rgba(255,255,255,0.12)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <Shield size={18} color="white"/>
          </div>
          <div>
            <div style={{fontFamily:'Sora',fontWeight:800,fontSize:'0.9rem',color:'white',lineHeight:1}}>HealthChain</div>
            <div style={{fontSize:'0.6rem',color:'#4ade80',fontWeight:600,letterSpacing:'0.08em',marginTop:'2px'}}>ETHIOPIA</div>
          </div>
        </div>
      </div>

      {/* Role badge */}
      <div style={{padding:'0.875rem 1.5rem', borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{
          display:'inline-flex',alignItems:'center',gap:'6px',
          padding:'0.3rem 0.75rem',borderRadius:'99px',
          background:'rgba(255,255,255,0.08)',
          fontSize:'0.68rem',color:'#4ade80',fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase'
        }}>
          <div style={{width:5,height:5,borderRadius:'50%',background:'#4ade80'}}/>
          {role} Portal
        </div>
      </div>

      {/* Nav */}
      <nav style={{flex:1,padding:'0.75rem 0.625rem',overflowY:'auto'}}>
        {items.map(item=>{
          const Icon = item.icon
          const isActive = active===item.id
          return (
            <div key={item.id} onClick={()=>setActive(item.id)} style={{
              display:'flex',alignItems:'center',gap:'0.7rem',
              padding:'0.625rem 0.875rem',borderRadius:'10px',
              margin:'2px 0',cursor:'pointer',
              transition:'all 0.15s',
              background:isActive?'rgba(255,255,255,0.13)':'transparent',
              borderLeft:isActive?'3px solid #4ade80':'3px solid transparent',
            }}
            onMouseEnter={e=>{if(!isActive)e.currentTarget.style.background='rgba(255,255,255,0.07)'}}
            onMouseLeave={e=>{if(!isActive)e.currentTarget.style.background='transparent'}}>
              <Icon size={17} color={isActive?'#4ade80':'rgba(255,255,255,0.5)'}/>
              <span style={{fontSize:'0.845rem',fontWeight:isActive?600:400,color:isActive?'white':'rgba(255,255,255,0.6)',flex:1}}>
                {item.label}
              </span>
              {item.badge!=null && (
                <span style={{background:isActive?'#22c55e':'rgba(255,255,255,0.15)',color:'white',borderRadius:'99px',padding:'1px 7px',fontSize:'0.68rem',fontWeight:700}}>
                  {item.badge}
                </span>
              )}
            </div>
          )
        })}
      </nav>

      {/* Logout */}
      <div style={{padding:'1rem 1.5rem',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
        <div onClick={()=>go('landing')} style={{display:'flex',alignItems:'center',gap:'0.625rem',cursor:'pointer',padding:'0.4rem 0',color:'rgba(255,255,255,0.4)',fontSize:'0.83rem',transition:'color 0.15s'}}
             onMouseEnter={e=>e.currentTarget.style.color='white'}
             onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.4)'}>
          <LogOut size={15}/>
          <span>Sign Out</span>
        </div>
      </div>
    </aside>
  )
}
