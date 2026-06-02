export default function Card({ title, subtitle, children, action, style={} }) {
  return (
    <div style={{background:'white',borderRadius:16,border:'1px solid var(--border)',overflow:'hidden',...style}}>
      {(title||action) && (
        <div style={{padding:'1rem 1.25rem',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            {title && <h4 style={{fontFamily:'Sora',fontWeight:700,fontSize:'0.95rem',color:'var(--ink)'}}>{title}</h4>}
            {subtitle && <p style={{fontSize:'0.775rem',color:'var(--muted)',marginTop:'2px'}}>{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div style={{padding:'1.25rem'}}>{children}</div>
    </div>
  )
}
