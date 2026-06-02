import { useState } from 'react'
import { Building2, Users, Bed, Package, BarChart3, FileCheck, Bell, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react'
import DashLayout from '../components/DashLayout'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import Badge from '../components/Badge'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'

const NAV = [
  { id:'overview',   label:'Operations Overview', icon:BarChart3 },
  { id:'patients',   label:'Patient Flow',         icon:Users },
  { id:'beds',       label:'Bed Management',       icon:Bed },
  { id:'supply',     label:'Supply Chain',         icon:Package, badge:3 },
  { id:'staff',      label:'Staff Dashboard',      icon:Users },
  { id:'compliance', label:'Compliance & Reports', icon:FileCheck },
]

const ADMISSIONS = [
  { time:'06:40', name:'Almaz Bekele',    id:'ETH-2293-6711', ward:'Internal Medicine', status:'admitted', dx:'Type 2 DM — hyperglycemia' },
  { time:'07:15', name:'Tesfaye Girma',   id:'ETH-8821-3340', ward:'Emergency',          status:'critical', dx:'Acute MI — pending cath' },
  { time:'08:02', name:'Mekdes Haile',    id:'ETH-6612-9921', ward:'Maternity',          status:'admitted', dx:'Active labour — 39 weeks' },
  { time:'09:30', name:'Yonas Worku',     id:'ETH-1104-5577', ward:'Surgery',            status:'preop',    dx:'Appendicitis — scheduled lap' },
  { time:'10:45', name:'Selamawit Nega',  id:'ETH-5523-8811', ward:'Paediatrics',        status:'admitted', dx:'Pneumonia — bacterial' },
]

const BEDS = [
  { ward:'Emergency',       total:24, occupied:21, available:3,  pct:88 },
  { ward:'Internal Medicine',total:60,occupied:52, available:8,  pct:87 },
  { ward:'Surgery',         total:40, occupied:31, available:9,  pct:78 },
  { ward:'Maternity',       total:35, occupied:28, available:7,  pct:80 },
  { ward:'Paediatrics',     total:30, occupied:18, available:12, pct:60 },
  { ward:'ICU',             total:12, occupied:11, available:1,  pct:92 },
  { ward:'Cardiology',      total:20, occupied:14, available:6,  pct:70 },
]

const SUPPLY = [
  { item:'Amlodipine 5mg tablets',   stock:1240, min:500,  status:'green',  expiry:'Dec 2026' },
  { item:'IV Normal Saline 0.9%',    stock:88,   min:200,  status:'red',    expiry:'Aug 2026' },
  { item:'Amoxicillin 500mg caps',   stock:340,  min:300,  status:'amber',  expiry:'Mar 2027' },
  { item:'Surgical Gloves (M)',      stock:620,  min:400,  status:'green',  expiry:'N/A' },
  { item:'Insulin (Actrapid)',       stock:48,   min:100,  status:'red',    expiry:'Jan 2027' },
  { item:'Metformin 500mg tabs',     stock:890,  min:400,  status:'green',  expiry:'Jul 2027' },
]

const ADMIT_DATA = [
  { day:'Mon', admissions:38, discharges:35 },
  { day:'Tue', admissions:42, discharges:40 },
  { day:'Wed', admissions:35, discharges:38 },
  { day:'Thu', admissions:48, discharges:42 },
  { day:'Fri', admissions:52, discharges:44 },
  { day:'Sat', admissions:61, discharges:55 },
  { day:'Sun', admissions:44, discharges:48 },
]

const STAFF = [
  { dept:'Emergency',        doctors:8,  nurses:24, hews:0,  coverage:'100%', status:'green' },
  { dept:'Internal Medicine',doctors:14, nurses:32, hews:4,  coverage:'100%', status:'green' },
  { dept:'Surgery',          doctors:9,  nurses:18, hews:2,  coverage:'89%',  status:'amber' },
  { dept:'Maternity',        doctors:6,  nurses:22, hews:8,  coverage:'100%', status:'green' },
  { dept:'Paediatrics',      doctors:5,  nurses:14, hews:3,  coverage:'92%',  status:'green' },
  { dept:'ICU',              doctors:4,  nurses:16, hews:0,  coverage:'100%', status:'green' },
]

export default function HospitalDashboard({ go }) {
  const [active, setActive] = useState('overview')

  const content = {
    overview: (
      <div>
        <div style={{ padding:'1.25rem 1.5rem', background:'linear-gradient(135deg,#052e16,#0a6640)', borderRadius:16, color:'white', marginBottom:'1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontFamily:'Sora', fontWeight:800, fontSize:'1.15rem' }}>Black Lion Hospital</div>
            <div style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.55)', marginTop:3 }}>Addis Ababa · Federal Referral Hospital · HealthChain Node: Active · Facility ID: ETH-FAC-0014</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(74,222,128,0.15)', border:'1px solid rgba(74,222,128,0.3)', borderRadius:'99px', padding:'0.35rem 0.875rem' }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:'#4ade80' }}/>
            <span style={{ fontSize:'0.72rem', fontWeight:700, color:'#4ade80' }}>BLOCKCHAIN REPORTING: LIVE</span>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1.5rem' }}>
          <StatCard icon={Users}       label="Total In-Patients"   value="175"  sub="221 beds total"       color='var(--g6)'   trend={8}/>
          <StatCard icon={Bed}         label="Bed Occupancy"       value="79%"  sub="46 beds available"    color='var(--amber)'/>
          <StatCard icon={TrendingUp}  label="Admissions Today"    value="44"   sub="32 discharges"        color='var(--blue)' trend={12}/>
          <StatCard icon={Package}     label="Supply Alerts"       value="2"    sub="Critical stock low"   color='var(--red)'/>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:'1.25rem', marginBottom:'1.25rem' }}>
          <Card title="Weekly Admissions vs Discharges">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ADMIT_DATA} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke='#f1f5f9' vertical={false}/>
                <XAxis dataKey="day" tick={{ fontSize:12, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ borderRadius:10, border:'1px solid #e2e8f0', fontSize:13 }}/>
                <Bar dataKey="admissions" fill='#0a6640' radius={[6,6,0,0]} name="Admissions"/>
                <Bar dataKey="discharges"  fill='#4ade80' radius={[6,6,0,0]} name="Discharges"/>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Ward Occupancy">
            <div style={{ display:'flex', flexDirection:'column', gap:'0.625rem' }}>
              {BEDS.slice(0,5).map((b,i)=>(
                <div key={i}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.78rem', marginBottom:3 }}>
                    <span style={{ fontWeight:500, color:'var(--ink)' }}>{b.ward}</span>
                    <span style={{ color: b.pct>90?'var(--red)':b.pct>80?'var(--amber)':'var(--g6)', fontWeight:700 }}>{b.pct}%</span>
                  </div>
                  <div style={{ height:7, borderRadius:99, background:'var(--border)' }}>
                    <div style={{ height:'100%', borderRadius:99, width:`${b.pct}%`, background: b.pct>90?'var(--red)':b.pct>80?'var(--amber)':'var(--g5)', transition:'width 0.5s' }}/>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card title="Recent Admissions — Today" subtitle="Blockchain-recorded encounters">
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr style={{ borderBottom:'2px solid var(--border)' }}>
              {['Time','Patient','Fayda ID','Ward','Diagnosis','Status'].map(h=>(
                <th key={h} style={{ padding:'0.5rem 0.75rem', textAlign:'left', fontSize:'0.7rem', fontWeight:700, color:'var(--muted)', fontFamily:'Sora' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{ADMISSIONS.map((a,i)=>(
              <tr key={i} style={{ borderBottom:'1px solid var(--border)', transition:'background 0.15s', cursor:'pointer' }}
                onMouseEnter={e=>e.currentTarget.style.background='var(--surface)'}
                onMouseLeave={e=>e.currentTarget.style.background='white'}>
                <td style={{ padding:'0.75rem', fontSize:'0.8rem', color:'var(--muted)', fontFamily:'Sora', fontWeight:600 }}>{a.time}</td>
                <td style={{ padding:'0.75rem', fontSize:'0.875rem', fontWeight:600, color:'var(--ink)', fontFamily:'Sora' }}>{a.name}</td>
                <td style={{ padding:'0.75rem', fontSize:'0.75rem', color:'var(--muted)', fontFamily:'monospace' }}>{a.id}</td>
                <td style={{ padding:'0.75rem', fontSize:'0.83rem', color:'var(--muted)' }}>{a.ward}</td>
                <td style={{ padding:'0.75rem', fontSize:'0.83rem', color:'var(--ink)' }}>{a.dx}</td>
                <td style={{ padding:'0.75rem' }}><Badge label={a.status==='critical'?'Critical':a.status==='preop'?'Pre-Op':'Admitted'} variant={a.status==='critical'?'red':a.status==='preop'?'amber':'green'}/></td>
              </tr>
            ))}</tbody>
          </table>
        </Card>
      </div>
    ),

    beds: (
      <Card title="Bed Management — Real Time">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1rem' }}>
          {BEDS.map((b,i)=>(
            <div key={i} style={{ borderRadius:14, padding:'1.25rem', border:'1px solid var(--border)', background:'white' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
                <h4 style={{ fontFamily:'Sora', fontWeight:700, fontSize:'0.95rem', color:'var(--ink)' }}>{b.ward}</h4>
                <Badge label={b.pct>90?'Critical':b.pct>80?'High':'Normal'} variant={b.pct>90?'red':b.pct>80?'amber':'green'}/>
              </div>
              <div style={{ display:'flex', gap:'1.5rem', marginBottom:'0.875rem' }}>
                <div><div style={{ fontFamily:'Sora',fontWeight:800,fontSize:'1.6rem',color:'var(--ink)',lineHeight:1 }}>{b.occupied}</div><div style={{ fontSize:'0.7rem',color:'var(--muted)',marginTop:2 }}>Occupied</div></div>
                <div><div style={{ fontFamily:'Sora',fontWeight:800,fontSize:'1.6rem',color:'var(--g5)',lineHeight:1 }}>{b.available}</div><div style={{ fontSize:'0.7rem',color:'var(--muted)',marginTop:2 }}>Available</div></div>
                <div><div style={{ fontFamily:'Sora',fontWeight:800,fontSize:'1.6rem',color:'var(--dim)',lineHeight:1 }}>{b.total}</div><div style={{ fontSize:'0.7rem',color:'var(--muted)',marginTop:2 }}>Total</div></div>
              </div>
              <div style={{ height:8, borderRadius:99, background:'var(--border)' }}>
                <div style={{ height:'100%', borderRadius:99, width:`${b.pct}%`, background: b.pct>90?'var(--red)':b.pct>80?'var(--amber)':'var(--g5)' }}/>
              </div>
              <div style={{ fontSize:'0.72rem', color:'var(--dim)', marginTop:6, textAlign:'right' }}>{b.pct}% occupancy</div>
            </div>
          ))}
        </div>
      </Card>
    ),

    supply: (
      <Card title="Supply Chain & Drug Inventory" subtitle="3 items require immediate attention"
        action={<Badge label="2 Critical" variant="red"/>}>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
          {SUPPLY.map((s,i)=>(
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'1rem 1.25rem', borderRadius:12, border:`1px solid ${s.status==='red'?'#fca5a5':s.status==='amber'?'#fcd34d':'var(--border)'}`, background: s.status==='red'?'#fff1f2':s.status==='amber'?'#fffbeb':'white' }}>
              <div style={{ width:40,height:40,borderRadius:10,background: s.status==='red'?'#fee2e2':s.status==='amber'?'#fef3c7':'var(--g0)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                <Package size={18} color={s.status==='red'?'var(--red)':s.status==='amber'?'var(--amber)':'var(--g6)'}/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:'Sora', fontWeight:600, fontSize:'0.9rem', color:'var(--ink)' }}>{s.item}</div>
                <div style={{ fontSize:'0.75rem', color:'var(--muted)', marginTop:2 }}>Min: {s.min} units · Expiry: {s.expiry}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontFamily:'Sora', fontWeight:800, fontSize:'1.2rem', color: s.status==='red'?'var(--red)':s.status==='amber'?'var(--amber)':'var(--g6)' }}>{s.stock}</div>
                <div style={{ fontSize:'0.7rem', color:'var(--dim)' }}>in stock</div>
              </div>
              <Badge label={s.status==='red'?'Reorder Now':s.status==='amber'?'Running Low':'Adequate'} variant={s.status}/>
            </div>
          ))}
        </div>
      </Card>
    ),

    staff: (
      <Card title="Staff Coverage by Department">
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead><tr style={{ borderBottom:'2px solid var(--border)' }}>
            {['Department','Doctors','Nurses','HEWs','Coverage','Status'].map(h=>(
              <th key={h} style={{ padding:'0.625rem 0.75rem',textAlign:'left',fontSize:'0.72rem',fontWeight:700,color:'var(--muted)',fontFamily:'Sora' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{STAFF.map((s,i)=>(
            <tr key={i} style={{ borderBottom:'1px solid var(--border)', transition:'background 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.background='var(--surface)'}
              onMouseLeave={e=>e.currentTarget.style.background='white'}>
              <td style={{ padding:'0.875rem 0.75rem',fontFamily:'Sora',fontWeight:600,fontSize:'0.875rem',color:'var(--ink)' }}>{s.dept}</td>
              <td style={{ padding:'0.875rem 0.75rem',fontSize:'0.83rem',color:'var(--ink)',fontWeight:600 }}>{s.doctors}</td>
              <td style={{ padding:'0.875rem 0.75rem',fontSize:'0.83rem',color:'var(--ink)',fontWeight:600 }}>{s.nurses}</td>
              <td style={{ padding:'0.875rem 0.75rem',fontSize:'0.83rem',color:'var(--ink)',fontWeight:600 }}>{s.hews}</td>
              <td style={{ padding:'0.875rem 0.75rem',fontSize:'0.83rem',fontWeight:700,color: s.coverage==='100%'?'var(--g6)':'var(--amber)' }}>{s.coverage}</td>
              <td style={{ padding:'0.875rem 0.75rem' }}><Badge label={s.status==='green'?'Fully Staffed':'Understaffed'} variant={s.status}/></td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    ),

    compliance: (
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem' }}>
        {[
          { title:'Monthly Reporting', status:'Submitted', date:'31 May 2026', icon:CheckCircle, color:'var(--g5)', bg:'var(--g0)' },
          { title:'Drug Inventory Audit', status:'Due Jun 15', date:'Next: 15 Jun 2026', icon:AlertTriangle, color:'var(--amber)', bg:'#fef3c7' },
          { title:'Staff Credential Renewal', status:'2 Pending', date:'Expires Jul 2026', icon:AlertTriangle, color:'var(--amber)', bg:'#fef3c7' },
          { title:'Blockchain Node Sync', status:'Live', date:'Last sync: 2 min ago', icon:CheckCircle, color:'var(--g5)', bg:'var(--g0)' },
          { title:'PDPP Data Compliance', status:'Compliant', date:'Audited Apr 2026', icon:CheckCircle, color:'var(--g5)', bg:'var(--g0)' },
          { title:'MOH Weekly Report', status:'Submitted', date:'Submitted 1 Jun 2026', icon:CheckCircle, color:'var(--g5)', bg:'var(--g0)' },
        ].map((c,i)=>{
          const Icon = c.icon
          return (
            <div key={i} style={{ display:'flex', gap:'1rem', padding:'1.25rem', background:'white', borderRadius:14, border:'1px solid var(--border)' }}>
              <div style={{ width:42,height:42,borderRadius:11,background:c.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                <Icon size={20} color={c.color}/>
              </div>
              <div>
                <div style={{ fontFamily:'Sora',fontWeight:700,fontSize:'0.9rem',color:'var(--ink)' }}>{c.title}</div>
                <div style={{ fontSize:'0.78rem',color:c.color,fontWeight:600,marginTop:3 }}>{c.status}</div>
                <div style={{ fontSize:'0.73rem',color:'var(--dim)',marginTop:2 }}>{c.date}</div>
              </div>
            </div>
          )
        })}
      </div>
    ),

    patients: (
      <Card title="Patient Flow — Today">
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead><tr style={{ borderBottom:'2px solid var(--border)' }}>
            {['Time','Patient','Fayda ID','Ward','Diagnosis','Status'].map(h=>(
              <th key={h} style={{ padding:'0.625rem 0.75rem',textAlign:'left',fontSize:'0.72rem',fontWeight:700,color:'var(--muted)',fontFamily:'Sora' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{ADMISSIONS.map((a,i)=>(
            <tr key={i} style={{ borderBottom:'1px solid var(--border)',transition:'background 0.15s',cursor:'pointer' }}
              onMouseEnter={e=>e.currentTarget.style.background='var(--surface)'}
              onMouseLeave={e=>e.currentTarget.style.background='white'}>
              <td style={{ padding:'0.875rem 0.75rem',fontSize:'0.8rem',color:'var(--muted)',fontFamily:'Sora',fontWeight:600 }}>{a.time}</td>
              <td style={{ padding:'0.875rem 0.75rem',fontFamily:'Sora',fontWeight:600,fontSize:'0.875rem',color:'var(--ink)' }}>{a.name}</td>
              <td style={{ padding:'0.875rem 0.75rem',fontSize:'0.75rem',color:'var(--muted)',fontFamily:'monospace' }}>{a.id}</td>
              <td style={{ padding:'0.875rem 0.75rem',fontSize:'0.83rem',color:'var(--muted)' }}>{a.ward}</td>
              <td style={{ padding:'0.875rem 0.75rem',fontSize:'0.83rem',color:'var(--ink)' }}>{a.dx}</td>
              <td style={{ padding:'0.875rem 0.75rem' }}><Badge label={a.status==='critical'?'Critical':a.status==='preop'?'Pre-Op':'Admitted'} variant={a.status==='critical'?'red':a.status==='preop'?'amber':'green'}/></td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    ),
  }

  return (
    <DashLayout items={NAV} active={active} setActive={setActive} role="hospital" go={go}
      topbar={
        <div style={{ display:'flex',alignItems:'center',gap:'0.75rem' }}>
          <div style={{ fontSize:'0.8rem',color:'var(--g6)',fontWeight:600,display:'flex',alignItems:'center',gap:6 }}>
            <div style={{ width:7,height:7,borderRadius:'50%',background:'var(--g4)' }}/>Node Active
          </div>
          <div style={{ position:'relative',cursor:'pointer' }}>
            <Bell size={18} color='var(--muted)'/>
            <div style={{ position:'absolute',top:-3,right:-3,width:9,height:9,borderRadius:'50%',background:'var(--red)',border:'2px solid white' }}/>
          </div>
        </div>
      }>
      {content[active] || content.overview}
    </DashLayout>
  )
}
