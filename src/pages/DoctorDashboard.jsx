import { useState } from 'react'
import { Stethoscope, Users, FileText, FlaskConical, Pill, Calendar, Bell, Search, ChevronRight, Clock, AlertTriangle, CheckCircle, Activity } from 'lucide-react'
import DashLayout from '../components/DashLayout'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import Badge from '../components/Badge'

const NAV = [
  { id:'overview',    label:'Dashboard',        icon:Activity },
  { id:'patients',    label:'My Patients',      icon:Users, badge:12 },
  { id:'records',     label:'Patient Records',  icon:FileText },
  { id:'labs',        label:'Lab Orders',       icon:FlaskConical, badge:4 },
  { id:'prescribe',   label:'Prescriptions',    icon:Pill },
  { id:'schedule',    label:'Today\'s Schedule',icon:Calendar },
]

const PATIENTS = [
  { name:'Henok Berhanu Kebede', id:'ETH-4821-9034', age:38, sex:'M', condition:'Hypertension',   last:'12 May 2026', status:'green'  },
  { name:'Almaz Bekele',    id:'ETH-2293-6711', age:52, sex:'F', condition:'Type 2 Diabetes', last:'10 May 2026', status:'amber'  },
  { name:'Dawit Tesfaye',   id:'ETH-5531-8820', age:29, sex:'M', condition:'Asthma',          last:'08 May 2026', status:'green'  },
  { name:'Hana Gebremariam',id:'ETH-7748-1234', age:45, sex:'F', condition:'Hypothyroidism',  last:'06 May 2026', status:'green'  },
  { name:'Solomon Girma',   id:'ETH-9902-4456', age:61, sex:'M', condition:'COPD',             last:'05 May 2026', status:'red'    },
  { name:'Tigist Alemu',    id:'ETH-3310-7789', age:34, sex:'F', condition:'Anemia',           last:'01 May 2026', status:'amber'  },
]

const LABS_PENDING = [
  { patient:'Almaz Bekele',    test:'HbA1c + Fasting Glucose',  ordered:'10 May 2026', lab:'Black Lion Lab',      status:'amber', result:'Pending' },
  { patient:'Solomon Girma',   test:'Spirometry + ABG',          ordered:'05 May 2026', lab:'St. Paul\'s Pulm.', status:'red',   result:'Overdue' },
  { patient:'Tigist Alemu',    test:'CBC + Iron Studies',        ordered:'01 May 2026', lab:'MCM Lab',            status:'green', result:'Ready' },
  { patient:'Dawit Tesfaye',   test:'Peak Flow + IgE Panel',     ordered:'08 May 2026', lab:'Tikur Anbessa Lab',  status:'amber', result:'Pending' },
]

const SCHEDULE = [
  { time:'08:30', patient:'Henok Berhanu Kebede', type:'Follow-up — Hypertension',    duration:'20 min', status:'done' },
  { time:'09:00', patient:'Almaz Bekele',     type:'Diabetes Review',              duration:'30 min', status:'done' },
  { time:'09:45', patient:'Tigist Alemu',     type:'Lab Results Review',           duration:'20 min', status:'now'  },
  { time:'10:30', patient:'New Patient',      type:'Initial Consultation',         duration:'45 min', status:'next' },
  { time:'11:30', patient:'Solomon Girma',    type:'COPD Management',              duration:'30 min', status:'upcoming' },
  { time:'14:00', patient:'Hana Gebremariam', type:'Thyroid Follow-up',            duration:'20 min', status:'upcoming' },
  { time:'15:00', patient:'Dawit Tesfaye',    type:'Asthma Check-up',              duration:'20 min', status:'upcoming' },
]

const RXFORM = { patient:'', drug:'', dose:'', freq:'', days:'', notes:'' }

export default function DoctorDashboard({ go }) {
  const [active, setActive] = useState('overview')
  const [search, setSearch] = useState('')
  const [rx, setRx] = useState(RXFORM)
  const [rxSent, setRxSent] = useState(false)

  const filtered = PATIENTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.includes(search)
  )

  const statusColor = { done:'var(--dim)', now:'var(--g5)', next:'var(--amber)', upcoming:'var(--muted)' }
  const statusBg    = { done:'var(--surface)', now:'#f0fdf4', next:'#fef3c7', upcoming:'white' }

  const content = {
    overview: (
      <div>
        {/* Doctor greeting */}
        <div style={{ padding:'1.25rem 1.5rem', background:'linear-gradient(135deg,#052e16,#0a6640)', borderRadius:16, color:'white', marginBottom:'1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontFamily:'Sora', fontWeight:800, fontSize:'1.15rem' }}>Good morning, Dr. Tigabu Wondimu</div>
            <div style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.55)', marginTop:3 }}>Black Lion Hospital · Internal Medicine · License: ETH-MD-003821</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontFamily:'Sora', fontWeight:800, fontSize:'1.6rem', color:'#4ade80' }}>7</div>
            <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.5)' }}>Patients today</div>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1.5rem' }}>
          <StatCard icon={Users}       label="Active Patients"   value="12"    sub="In my care"          color='var(--g6)' />
          <StatCard icon={Calendar}    label="Today's Appts"     value="7"     sub="3 completed"         color='var(--blue)' />
          <StatCard icon={FlaskConical}label="Pending Lab Orders" value="4"    sub="2 overdue"           color='var(--amber)' trend={-12}/>
          <StatCard icon={FileText}    label="Records Updated"   value="28"    sub="This week"           color='var(--g5)' />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:'1.25rem' }}>
          <Card title="Today's Schedule" subtitle="Real-time appointment board">
            {SCHEDULE.map((s,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.875rem', padding:'0.75rem', borderRadius:10, background:statusBg[s.status], marginBottom:'0.5rem', border: s.status==='now'?'1.5px solid var(--g3)':'1px solid transparent' }}>
                <div style={{ fontFamily:'Sora', fontWeight:700, fontSize:'0.83rem', color:statusColor[s.status], width:40, flexShrink:0 }}>{s.time}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'Sora', fontWeight:600, fontSize:'0.875rem', color:'var(--ink)' }}>{s.patient}</div>
                  <div style={{ fontSize:'0.75rem', color:'var(--muted)', marginTop:1 }}>{s.type} · {s.duration}</div>
                </div>
                {s.status==='now' && <Badge label="Now" variant="green" dot/>}
                {s.status==='next' && <Badge label="Next" variant="amber"/>}
                {s.status==='done' && <Badge label="Done" variant="gray"/>}
              </div>
            ))}
          </Card>

          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            <Card title="Alerts & Actions" action={<Badge label="4 new" variant="red"/>}>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.625rem' }}>
                <div style={{ display:'flex', gap:10, padding:'0.75rem', background:'#fee2e2', borderRadius:10 }}>
                  <AlertTriangle size={16} color='var(--red)' style={{ flexShrink:0, marginTop:1 }}/>
                  <div style={{ fontSize:'0.8rem', color:'#991b1b', lineHeight:1.5 }}>Solomon Girma — COPD lab results overdue 3 days</div>
                </div>
                <div style={{ display:'flex', gap:10, padding:'0.75rem', background:'#fef3c7', borderRadius:10 }}>
                  <Clock size={16} color='var(--amber)' style={{ flexShrink:0, marginTop:1 }}/>
                  <div style={{ fontSize:'0.8rem', color:'#92400e', lineHeight:1.5 }}>Almaz Bekele — HbA1c result available for review</div>
                </div>
                <div style={{ display:'flex', gap:10, padding:'0.75rem', background:'#fef3c7', borderRadius:10 }}>
                  <Clock size={16} color='var(--amber)' style={{ flexShrink:0, marginTop:1 }}/>
                  <div style={{ fontSize:'0.8rem', color:'#92400e', lineHeight:1.5 }}>2 prescription refill requests awaiting approval</div>
                </div>
              </div>
            </Card>

            <Card title="Lab Results Ready">
              <div style={{ display:'flex', gap:10, padding:'0.875rem', background:'var(--g0)', borderRadius:10, border:'1px solid var(--g1)' }}>
                <CheckCircle size={16} color='var(--g6)' style={{ flexShrink:0, marginTop:1 }}/>
                <div>
                  <div style={{ fontSize:'0.83rem', fontWeight:600, color:'var(--ink)' }}>Tigist Alemu — CBC + Iron Studies</div>
                  <div style={{ fontSize:'0.75rem', color:'var(--muted)', marginTop:2 }}>MCM Lab · Results verified on blockchain</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    ),

    patients: (
      <Card title="Patient List" subtitle={`${filtered.length} patients in your care`}
        action={
          <div style={{ position:'relative' }}>
            <Search size={15} color='var(--dim)' style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)' }}/>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search patients..."
              style={{ padding:'0.45rem 0.75rem 0.45rem 2rem', borderRadius:99, border:'1px solid var(--border)', fontSize:'0.83rem', width:200, outline:'none', background:'var(--surface)' }}/>
          </div>
        }>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ borderBottom:'2px solid var(--border)' }}>
              {['Patient','Fayda ID','Age','Condition','Last Visit','Status',''].map(h=>(
                <th key={h} style={{ padding:'0.625rem 0.75rem', textAlign:'left', fontSize:'0.72rem', fontWeight:700, color:'var(--muted)', fontFamily:'Sora', letterSpacing:'0.03em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p,i)=>(
              <tr key={i} style={{ borderBottom:'1px solid var(--border)', transition:'background 0.15s', cursor:'pointer' }}
                onMouseEnter={e=>e.currentTarget.style.background='var(--surface)'}
                onMouseLeave={e=>e.currentTarget.style.background='white'}>
                <td style={{ padding:'0.875rem 0.75rem' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                    <div style={{ width:32,height:32,borderRadius:'50%',background:'var(--g0)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Sora',fontWeight:700,fontSize:'0.78rem',color:'var(--g7)',flexShrink:0 }}>{p.name.split(' ').map(n=>n[0]).join('')}</div>
                    <span style={{ fontFamily:'Sora', fontWeight:600, fontSize:'0.875rem', color:'var(--ink)' }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ padding:'0.875rem 0.75rem', fontSize:'0.8rem', color:'var(--muted)', fontFamily:'monospace' }}>{p.id}</td>
                <td style={{ padding:'0.875rem 0.75rem', fontSize:'0.83rem', color:'var(--ink)' }}>{p.age} {p.sex}</td>
                <td style={{ padding:'0.875rem 0.75rem', fontSize:'0.83rem', color:'var(--ink)' }}>{p.condition}</td>
                <td style={{ padding:'0.875rem 0.75rem', fontSize:'0.8rem', color:'var(--muted)' }}>{p.last}</td>
                <td style={{ padding:'0.875rem 0.75rem' }}><Badge label={p.status==='red'?'Critical':p.status==='amber'?'Monitor':'Stable'} variant={p.status}/></td>
                <td style={{ padding:'0.875rem 0.75rem' }}><ChevronRight size={16} color='var(--dim)'/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    ),

    labs: (
      <Card title="Lab Orders" subtitle="Pending and recent lab results">
        <div style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
          {LABS_PENDING.map((l,i)=>(
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'1rem 1.25rem', borderRadius:12, border:'1px solid var(--border)', background:'white', transition:'all 0.2s' }}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.07)';e.currentTarget.style.borderColor='var(--g3)'}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--border)'}}>
              <div style={{ width:40,height:40,borderRadius:11,background:l.status==='red'?'#fee2e2':l.status==='amber'?'#fef3c7':'var(--g0)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                <FlaskConical size={18} color={l.status==='red'?'var(--red)':l.status==='amber'?'var(--amber)':'var(--g6)'}/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:'Sora', fontWeight:600, fontSize:'0.9rem', color:'var(--ink)' }}>{l.test}</div>
                <div style={{ fontSize:'0.78rem', color:'var(--muted)', marginTop:2 }}>{l.patient} · {l.lab} · Ordered {l.ordered}</div>
              </div>
              <Badge label={l.result} variant={l.status}/>
            </div>
          ))}
        </div>
      </Card>
    ),

    prescribe: (
      <div style={{ maxWidth:560 }}>
        <Card title="Write Digital Prescription" subtitle="Blockchain-recorded & pharmacy-verified">
          {rxSent ? (
            <div style={{ textAlign:'center', padding:'2rem 0' }}>
              <CheckCircle size={48} color='var(--g5)' style={{ marginBottom:'1rem' }}/>
              <h4 style={{ fontFamily:'Sora', fontWeight:700, fontSize:'1.1rem', marginBottom:'0.5rem' }}>Prescription Sent</h4>
              <p style={{ fontSize:'0.85rem', color:'var(--muted)', marginBottom:'1.5rem' }}>Recorded on HealthChain blockchain. Patient notified via Fayda ID.</p>
              <button onClick={()=>setRxSent(false)} style={{ padding:'0.6rem 1.5rem', borderRadius:99, border:'none', background:'var(--g0)', color:'var(--g7)', fontWeight:600, fontSize:'0.875rem', cursor:'pointer' }}>Write Another</button>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
              {[['Patient Fayda ID','text','ETH-XXXX-XXXX','patient'],['Drug Name','text','e.g. Amlodipine 5mg','drug'],['Dose & Instructions','text','e.g. 1 tablet daily with water','dose'],['Frequency','text','e.g. Once daily / Twice daily','freq'],['Duration (days)','number','e.g. 30','days']].map(([label,type,ph,key])=>(
                <div key={key}>
                  <label style={{ display:'block', fontSize:'0.78rem', fontWeight:600, color:'var(--ink)', marginBottom:'0.35rem' }}>{label}</label>
                  <input type={type} value={rx[key]} onChange={e=>setRx({...rx,[key]:e.target.value})} placeholder={ph}
                    style={{ width:'100%', padding:'0.65rem 0.875rem', borderRadius:10, border:'1.5px solid var(--border)', fontSize:'0.875rem', outline:'none', transition:'border-color 0.2s', background:'var(--surface)' }}
                    onFocus={e=>e.target.style.borderColor='var(--g5)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
                </div>
              ))}
              <div>
                <label style={{ display:'block', fontSize:'0.78rem', fontWeight:600, color:'var(--ink)', marginBottom:'0.35rem' }}>Clinical Notes</label>
                <textarea value={rx.notes} onChange={e=>setRx({...rx,notes:e.target.value})} placeholder="Optional notes for pharmacist or patient..."
                  rows={3} style={{ width:'100%', padding:'0.65rem 0.875rem', borderRadius:10, border:'1.5px solid var(--border)', fontSize:'0.875rem', outline:'none', resize:'vertical', fontFamily:'DM Sans', background:'var(--surface)' }}
                  onFocus={e=>e.target.style.borderColor='var(--g5)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
              </div>
              <button onClick={()=>setRxSent(true)} style={{ padding:'0.8rem', borderRadius:12, border:'none', background:'linear-gradient(135deg,var(--g7),var(--g5))', color:'white', fontFamily:'Sora', fontWeight:700, fontSize:'0.9rem', cursor:'pointer', boxShadow:'0 4px 14px rgba(16,163,74,0.3)' }}>
                Sign & Send Prescription to Blockchain
              </button>
            </div>
          )}
        </Card>
      </div>
    ),

    records: (
      <div style={{ textAlign:'center', padding:'4rem 2rem', color:'var(--muted)' }}>
        <FileText size={48} color='var(--g3)' style={{ marginBottom:'1rem' }}/>
        <h4 style={{ fontFamily:'Sora', fontWeight:700, marginBottom:'0.5rem' }}>Search Patient Records</h4>
        <p style={{ fontSize:'0.875rem', marginBottom:'1.5rem' }}>Search by Fayda ID or patient name to access blockchain-verified medical records.</p>
        <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center', maxWidth:400, margin:'0 auto' }}>
          <input placeholder="ETH-XXXX-XXXX or patient name..." style={{ flex:1, padding:'0.7rem 1rem', borderRadius:10, border:'1.5px solid var(--border)', fontSize:'0.875rem', outline:'none' }}/>
          <button style={{ padding:'0.7rem 1.25rem', borderRadius:10, border:'none', background:'linear-gradient(135deg,var(--g7),var(--g5))', color:'white', fontFamily:'Sora', fontWeight:600, fontSize:'0.875rem', cursor:'pointer' }}>Search</button>
        </div>
      </div>
    ),

    schedule: (
      <Card title="Today's Schedule — 2 June 2026">
        {SCHEDULE.map((s,i)=>(
          <div key={i} style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'1rem 1.25rem', borderRadius:12, background:statusBg[s.status], border: s.status==='now'?'1.5px solid var(--g3)':'1px solid transparent', marginBottom:'0.625rem', transition:'all 0.2s' }}>
            <div style={{ fontFamily:'Sora', fontWeight:800, fontSize:'0.95rem', color:statusColor[s.status], width:50, flexShrink:0 }}>{s.time}</div>
            <div style={{ width:2, height:32, background: s.status==='now'?'var(--g4)':s.status==='next'?'var(--amber)':'var(--border)', borderRadius:99, flexShrink:0 }}/>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:'Sora', fontWeight:600, fontSize:'0.9rem', color:'var(--ink)' }}>{s.patient}</div>
              <div style={{ fontSize:'0.78rem', color:'var(--muted)', marginTop:2 }}>{s.type} · {s.duration}</div>
            </div>
            {s.status==='now'   && <Badge label="In Progress" variant="green" dot/>}
            {s.status==='next'  && <Badge label="Up Next"     variant="amber"/>}
            {s.status==='done'  && <Badge label="Completed"   variant="gray"/>}
            {s.status==='upcoming' && <Badge label="Upcoming"  variant="blue"/>}
          </div>
        ))}
      </Card>
    ),
  }

  return (
    <DashLayout items={NAV} active={active} setActive={setActive} role="doctor" go={go}
      topbar={
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
          <div style={{ fontSize:'0.8rem', color:'var(--g6)', fontWeight:600, display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--g4)' }}/> Black Lion Hospital
          </div>
          <div style={{ position:'relative', cursor:'pointer' }}>
            <Bell size={18} color='var(--muted)'/>
            <div style={{ position:'absolute', top:-3, right:-3, width:9, height:9, borderRadius:'50%', background:'var(--red)', border:'2px solid white' }}/>
          </div>
        </div>
      }>
      {content[active] || content.overview}
    </DashLayout>
  )
}
