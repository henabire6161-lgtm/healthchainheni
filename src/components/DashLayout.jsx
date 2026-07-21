import Sidebar from './Sidebar'
import DashboardAssistant from './DashboardAssistant'

export default function DashLayout({ items, active, setActive, role, go, topbar, children }) {
  return (
    <div style={{display:'flex',minHeight:'100vh',background:'var(--surface)'}}>
      <Sidebar items={items} active={active} setActive={setActive} role={role} go={go}/>
      <DashboardAssistant role={role}/>
      <div style={{marginLeft:'var(--sidebar-w)',flex:1,display:'flex',flexDirection:'column',minHeight:'100vh'}}>
        {/* Topbar */}
        <header style={{
          height:62,background:'white',borderBottom:'1px solid var(--border)',
          display:'flex',alignItems:'center',justifyContent:'space-between',
          padding:'0 1.75rem',position:'sticky',top:0,zIndex:40
        }}>
          <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
            <span style={{fontFamily:'Sora',fontWeight:700,fontSize:'1rem',color:'var(--g8)'}}>
              {items.find(i=>i.id===active)?.label||'Dashboard'}
            </span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'1.25rem'}}>
            {topbar}
            <div style={{
              width:36,height:36,borderRadius:'50%',
              background:'linear-gradient(135deg,var(--g7),var(--g4))',
              display:'flex',alignItems:'center',justifyContent:'center',
              color:'white',fontSize:'0.8rem',fontWeight:700,cursor:'pointer'
            }}>
              {role==='patient'?'HK':role==='doctor'?'DR':role==='hospital'?'HA':'MH'}
            </div>
          </div>
        </header>
        {/* Main */}
        <main style={{flex:1,padding:'1.75rem',overflowY:'auto'}}>
          {children}
        </main>
      </div>
    </div>
  )
}
