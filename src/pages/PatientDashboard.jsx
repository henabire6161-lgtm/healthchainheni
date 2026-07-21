import { useState } from 'react'
import { User, FileText, FlaskConical, Pill, Calendar, Bell, Heart, Shield, QrCode, ChevronRight, Activity } from 'lucide-react'
import DashLayout from '../components/DashLayout'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import Badge from '../components/Badge'

const NAV = [
  { id:'overview',      label:'Health Overview',    icon:Heart },
  { id:'records',       label:'Medical Records',     icon:FileText, badge:3 },
  { id:'labs',          label:'Lab Results',         icon:FlaskConical },
  { id:'prescriptions', label:'Prescriptions',       icon:Pill },
  { id:'appointments',  label:'Appointments',        icon:Calendar },
  { id:'emergency',     label:'Emergency Card',      icon:QrCode },
]

const RECORDS = [
  { date:'12 May 2026', facility:'Black Lion Hospital', doctor:'Dr. Alem Kebede', type:'General Consultation', dx:'Hypertension — Stage 1', status:'green' },
  { date:'28 Apr 2026', facility:'St. Paul\'s Hospital', doctor:'Dr. Sara Tadesse', type:'Lab Follow-up', dx:'CBC + Lipid Panel Results', status:'green' },
  { date:'10 Mar 2026', facility:'Tikur Anbessa', doctor:'Dr. Yonas Haile', type:'Specialist Referral', dx:'Cardiology — Echocardiogram', status:'blue' },
  { date:'02 Jan 2026', facility:'MCM General Hospital', doctor:'Dr. Meron Alemu', type:'Annual Checkup', dx:'Routine physical — all normal', status:'green' },
]

const LABS = [
  { name:'Blood Pressure', value:'128/82', unit:'mmHg', ref:'<120/80', status:'amber', date:'12 May 2026' },
  { name:'Blood Glucose (Fasting)', value:'98', unit:'mg/dL', ref:'70-100', status:'green', date:'28 Apr 2026' },
  { name:'Total Cholesterol', value:'210', unit:'mg/dL', ref:'<200', status:'amber', date:'28 Apr 2026' },
  { name:'Hemoglobin', value:'14.2', unit:'g/dL', ref:'13.5-17.5', status:'green', date:'28 Apr 2026' },
  { name:'Creatinine', value:'0.9', unit:'mg/dL', ref:'0.7-1.3', status:'green', date:'28 Apr 2026' },
]

const RX = [
  { name:'Amlodipine 5mg', dose:'1 tablet daily', refills:2, expires:'12 Aug 2026', status:'green', prescriber:'Dr. Alem Kebede' },
  { name:'Atorvastatin 10mg', dose:'1 tablet nightly', refills:1, expires:'28 Jul 2026', status:'amber', prescriber:'Dr. Alem Kebede' },
  { name:'Aspirin 81mg', dose:'1 tablet daily', refills:5, expires:'10 Dec 2026', status:'green', prescriber:'Dr. Yonas Haile' },
]

const APPTS = [
  { date:'20 Jun 2026', time:'9:00 AM', facility:'Black Lion Hospital', doctor:'Dr. Alem Kebede', type:'Follow-up — Hypertension', status:'green' },
  { date:'15 Jul 2026', time:'11:30 AM', facility:'Tikur Anbessa', doctor:'Dr. Yonas Haile', type:'Cardiology — Echo Results', status:'blue' },
]

export default function PatientDashboard({ go }) {
  const [active, setActive] = useState('overview')

  const content = {
    overview: (
      <div>
        <div style={{ marginBottom:'1.5rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, padding:'1.25rem 1.5rem', background:'linear-gradient(135deg,#052e16,#0a6640)', borderRadius:16, color:'white', marginBottom:'1.5rem' }}>
            <div style={{ width:52,height:52,borderRadius:'50%',background:'rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Sora',fontWeight:800,fontSize:'1.1rem',flexShrink:0 }}>HK</div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:'Sora',fontWeight:700,fontSize:'1.1rem' }}>Henok Berhanu Kebede</div>
              <div style={{ fontSize:'0.78rem',color:'rgba(255,255,255,0.55)',marginTop:2 }}>Fayda ID: ETH-4821-9034  ·  DOB: 14 Mar 1988  ·  Blood Type: A+</div>
            </div>
            <div style={{ display:'flex',alignItems:'center',gap:6,background:'rgba(74,222,128,0.15)',border:'1px solid rgba(74,222,128,0.3)',borderRadius:'99px',padding:'0.3rem 0.75rem' }}>
              <div style={{ width:6,height:6,borderRadius:'50%',background:'#4ade80' }}/>
              <span style={{ fontSize:'0.72rem',fontWeight:700,color:'#4ade80' }}>VERIFIED</span>
            </div>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1.5rem' }}>
          <StatCard icon={FileText} label="Medical Visits" value="18" sub="All time" color='var(--g6)'/>
          <StatCard icon={FlaskConical} label="Lab Tests" value="7" sub="Last 12 months" color='var(--blue)'/>
          <StatCard icon={Pill} label="Active Rx" value="3" sub="Prescriptions" color='var(--amber)'/>
          <StatCard icon={Calendar} label="Next Appointment" value="Jun 20" sub="Black Lion Hospital" color='var(--g5)'/>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'1.25rem' }}>
          <Card title="Recent Visits" subtitle="Blockchain-verified health records">
            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {RECORDS.slice(0,3).map((r,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.875rem', padding:'0.75rem', borderRadius:10, background:'var(--surface)' }}>
                  <div style={{ width:36,height:36,borderRadius:9,background:'var(--g0)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                    <FileText size={16} color='var(--g6)'/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:'Sora',fontWeight:600,fontSize:'0.875rem',color:'var(--ink)' }}>{r.dx}</div>
                    <div style={{ fontSize:'0.75rem',color:'var(--muted)',marginTop:2 }}>{r.facility} · {r.date}</div>
                  </div>
                  <Badge label="Verified" variant="green"/>
                </div>
              ))}
            </div>
          </Card>
          <div style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>
            <Card title="Upcoming Appointment">
              <div style={{ textAlign:'center', padding:'0.5rem 0' }}>
                <div style={{ fontFamily:'Sora',fontWeight:800,fontSize:'1.8rem',color:'var(--g6)' }}>Jun 20</div>
                <div style={{ fontSize:'0.8rem',color:'var(--muted)',marginTop:4 }}>9:00 AM</div>
                <div style={{ fontSize:'0.83rem',fontWeight:600,color:'var(--ink)',marginTop:8 }}>Dr. Alem Kebede</div>
                <div style={{ fontSize:'0.75rem',color:'var(--muted)' }}>Black Lion Hospital</div>
                <div style={{ marginTop:10 }}><Badge label="Confirmed" variant="green" dot/></div>
              </div>
            </Card>
            <Card title="Health Alerts">
              <div style={{ display:'flex',flexDirection:'column',gap:'0.5rem' }}>
                <div style={{ display:'flex',gap:8,padding:'0.625rem',background:'#fef3c7',borderRadius:8 }}>
                  <Activity size={15} color='#d97706' style={{ flexShrink:0,marginTop:1 }}/>
                  <div style={{ fontSize:'0.78rem',color:'#92400e',lineHeight:1.5 }}>Blood pressure slightly elevated — follow up with Dr. Kebede</div>
                </div>
                <div style={{ display:'flex',gap:8,padding:'0.625rem',background:'#fef3c7',borderRadius:8 }}>
                  <Pill size={15} color='#d97706' style={{ flexShrink:0,marginTop:1 }}/>
                  <div style={{ fontSize:'0.78rem',color:'#92400e',lineHeight:1.5 }}>Atorvastatin prescription — 1 refill remaining</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    ),

    records: (
      <Card title="Medical Records" subtitle="Complete blockchain-verified history">
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ borderBottom:'2px solid var(--border)' }}>
              {['Date','Facility','Doctor','Type','Diagnosis','Status'].map(h=>(
                <th key={h} style={{ padding:'0.625rem 0.75rem',textAlign:'left',fontSize:'0.75rem',fontWeight:700,color:'var(--muted)',fontFamily:'Sora' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECORDS.map((r,i) => (
              <tr key={i} style={{ borderBottom:'1px solid var(--border)',transition:'background 0.15s',cursor:'pointer' }}
                onMouseEnter={e=>e.currentTarget.style.background='var(--surface)'}
                onMouseLeave={e=>e.currentTarget.style.background='white'}>
                <td style={{ padding:'0.875rem 0.75rem',fontSize:'0.83rem',color:'var(--muted)' }}>{r.date}</td>
                <td style={{ padding:'0.875rem 0.75rem',fontSize:'0.83rem',fontWeight:500,color:'var(--ink)' }}>{r.facility}</td>
                <td style={{ padding:'0.875rem 0.75rem',fontSize:'0.83rem',color:'var(--muted)' }}>{r.doctor}</td>
                <td style={{ padding:'0.875rem 0.75rem',fontSize:'0.83rem',color:'var(--muted)' }}>{r.type}</td>
                <td style={{ padding:'0.875rem 0.75rem',fontSize:'0.83rem',fontWeight:500,color:'var(--ink)' }}>{r.dx}</td>
                <td style={{ padding:'0.875rem 0.75rem' }}><Badge label="Verified" variant={r.status}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    ),

    labs: (
      <div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1rem', marginBottom:'1.25rem' }}>
          {LABS.map((l,i) => (
            <div key={i} style={{ background:'white',borderRadius:14,padding:'1.25rem',border:'1px solid var(--border)' }}>
              <div style={{ fontSize:'0.75rem',color:'var(--muted)',fontWeight:500,marginBottom:6 }}>{l.name}</div>
              <div style={{ fontFamily:'Sora',fontWeight:800,fontSize:'1.6rem',color:l.status==='green'?'var(--g6)':l.status==='amber'?'var(--amber)':'var(--red)',lineHeight:1 }}>{l.value} <span style={{ fontSize:'0.9rem',fontWeight:400 }}>{l.unit}</span></div>
              <div style={{ fontSize:'0.72rem',color:'var(--dim)',marginTop:4 }}>Ref: {l.ref}</div>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10 }}>
                <Badge label={l.status==='green'?'Normal':'Borderline'} variant={l.status}/>
                <span style={{ fontSize:'0.7rem',color:'var(--dim)' }}>{l.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    prescriptions: (
      <div style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>
        {RX.map((r,i) => (
          <div key={i} style={{ background:'white',borderRadius:14,padding:'1.25rem 1.5rem',border:'1px solid var(--border)',display:'flex',alignItems:'center',gap:'1rem' }}>
            <div style={{ width:44,height:44,borderRadius:12,background:r.status==='green'?'var(--g0)':'#fef3c7',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
              <Pill size={20} color={r.status==='green'?'var(--g6)':'var(--amber)'}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:'Sora',fontWeight:700,fontSize:'1rem',color:'var(--ink)' }}>{r.name}</div>
              <div style={{ fontSize:'0.8rem',color:'var(--muted)',marginTop:2 }}>{r.dose} · Prescribed by {r.prescriber}</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <Badge label={r.refills+' refills left'} variant={r.status}/>
              <div style={{ fontSize:'0.72rem',color:'var(--dim)',marginTop:4 }}>Expires {r.expires}</div>
            </div>
          </div>
        ))}
      </div>
    ),

    appointments: (
      <div style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem' }}>
          {APPTS.map((a,i) => (
            <div key={i} style={{ background:'white',borderRadius:16,padding:'1.5rem',border:'1px solid var(--border)' }}>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'1rem' }}>
                <div style={{ fontFamily:'Sora',fontWeight:800,fontSize:'1.3rem',color:'var(--g7)' }}>{a.date}</div>
                <Badge label="Confirmed" variant={a.status} dot/>
              </div>
              <div style={{ fontFamily:'Sora',fontWeight:600,fontSize:'0.95rem',color:'var(--ink)',marginBottom:4 }}>{a.doctor}</div>
              <div style={{ fontSize:'0.8rem',color:'var(--muted)',marginBottom:4 }}>{a.facility}</div>
              <div style={{ fontSize:'0.8rem',color:'var(--muted)',marginBottom:8 }}>{a.time} · {a.type}</div>
            </div>
          ))}
        </div>
      </div>
    ),

    emergency: (
      <div style={{ maxWidth:480, margin:'0 auto', textAlign:'center' }}>
        <Card>
          <div style={{ padding:'1rem 0' }}>
            <Shield size={40} color='var(--g6)' style={{ marginBottom:'1rem' }}/>
            <h3 style={{ fontFamily:'Sora',fontWeight:800,fontSize:'1.25rem',marginBottom:'0.5rem' }}>Emergency Health Card</h3>
            <p style={{ fontSize:'0.83rem',color:'var(--muted)',marginBottom:'1.5rem',lineHeight:1.6 }}>
              Share this QR code with any healthcare provider in Ethiopia for instant access to your verified health record.
            </p>
            <div style={{ width:200,height:200,background:'var(--g0)',borderRadius:16,margin:'0 auto 1.5rem',display:'flex',alignItems:'center',justifyContent:'center',border:'2px solid var(--g3)' }}>
              <QrCode size={120} color='var(--g7)'/>
            </div>
            <div style={{ background:'var(--surface)',borderRadius:12,padding:'1rem',textAlign:'left' }}>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem',fontSize:'0.83rem' }}>
                {[['Name','Henok Berhanu Kebede'],['Blood Type','A+'],['Fayda ID','ETH-4821-9034'],['Allergies','Penicillin'],['Conditions','Hypertension'],['Emergency Contact','+251 912 345678']].map(([k,v])=>(
                  <div key={k}><div style={{ fontSize:'0.68rem',color:'var(--dim)',fontWeight:600,letterSpacing:'0.04em' }}>{k.toUpperCase()}</div><div style={{ fontWeight:600,color:'var(--ink)',marginTop:2 }}>{v}</div></div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    ),
  }

  return (
    <DashLayout items={NAV} active={active} setActive={setActive} role="patient" go={go}
      topbar={
        <div style={{ display:'flex',alignItems:'center',gap:'0.75rem' }}>
          <div style={{ display:'flex',alignItems:'center',gap:6,fontSize:'0.8rem',color:'var(--g6)',fontWeight:600 }}>
            <div style={{ width:7,height:7,borderRadius:'50%',background:'var(--g4)' }}/>
            Fayda Verified
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
