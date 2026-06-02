export default function StatCard({ icon: Icon, label, value, sub, color='var(--g6)', trend }) {
  return (
    <div style={{
      background:'white',borderRadius:16,padding:'1.25rem 1.5rem',
      border:'1px solid var(--border)',display:'flex',gap:'1rem',alignItems:'flex-start',
      transition:'all 0.2s',cursor:'default'
    }}
    onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.08)';e.currentTarget.style.borderColor=color+'60'}}
    onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--border)'}}>
      <div style={{width:44,height:44,borderRadius:12,background:color+'18',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
        <Icon size={20} color={color}/>
      </div>
      <div style={{flex:1}}>
        <div style={{fontSize:'0.775rem',color:'var(--muted)',fontWeight:500,marginBottom:'0.25rem'}}>{label}</div>
        <div style={{fontFamily:'Sora',fontWeight:800,fontSize:'1.6rem',color:'var(--ink)',lineHeight:1}}>{value}</div>
        {sub && <div style={{fontSize:'0.72rem',color:'var(--dim)',marginTop:'0.3rem'}}>{sub}</div>}
        {trend && <div style={{fontSize:'0.72rem',color:trend>0?'var(--g5)':'var(--red)',marginTop:'0.3rem',fontWeight:600}}>
          {trend>0?'↑':'↓'} {Math.abs(trend)}% vs last month
        </div>}
      </div>
    </div>
  )
}
