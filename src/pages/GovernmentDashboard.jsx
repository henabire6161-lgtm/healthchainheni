import { useState } from 'react'
import { Globe, Activity, Users, TrendingUp, Bell, Database, ShieldCheck, MapPin, AlertTriangle, BarChart3, FileText, Zap } from 'lucide-react'
import DashLayout from '../components/DashLayout'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import Badge from '../components/Badge'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts'

const NAV = [
  { id:'national',      label:'National Overview',    icon:Globe },
  { id:'surveillance',  label:'Disease Surveillance', icon:Activity, badge:'!' },
  { id:'facilities',    label:'Facility Network',     icon:Database },
  { id:'population',    label:'Population Health',    icon:Users },
  { id:'reports',       label:'Policy & Reports',     icon:FileText },
  { id:'blockchain',    label:'Blockchain Integrity', icon:ShieldCheck },
]

const REGIONS = [
  { name:'Addis Ababa',  facilities:312, coverage:98, patients:4200000, alerts:1, status:'green'  },
  { name:'Oromia',       facilities:4821,coverage:71, patients:42000000,alerts:3, status:'amber'  },
  { name:'Amhara',       facilities:3210,coverage:68, patients:22000000,alerts:2, status:'amber'  },
  { name:'SNNPR',        facilities:2891,coverage:61, patients:21000000,alerts:4, status:'amber'  },
  { name:'Tigray',       facilities:892, coverage:55, patients:5700000, alerts:1, status:'amber'  },
  { name:'Somali',       facilities:441, coverage:42, patients:8200000, alerts:5, status:'red'    },
  { name:'Afar',         facilities:218, coverage:38, patients:2000000, alerts:3, status:'red'    },
  { name:'Harari',       facilities:61,  coverage:88, patients:280000,  alerts:0, status:'green'  },
  { name:'Dire Dawa',    facilities:48,  coverage:91, patients:490000,  alerts:0, status:'green'  },
  { name:'Benishangul',  facilities:310, coverage:48, patients:1200000, alerts:2, status:'amber'  },
  { name:'Gambela',      facilities:89,  coverage:44, patients:480000,  alerts:1, status:'amber'  },
]

const DISEASE_TREND = [
  { month:'Jan', malaria:1240, tb:420, cholera:12, measles:88 },
  { month:'Feb', malaria:1180, tb:390, cholera:8,  measles:120 },
  { month:'Mar', malaria:980,  tb:410, cholera:5,  measles:95  },
  { month:'Apr', malaria:760,  tb:380, cholera:18, cholera2:22, measles:67 },
  { month:'May', malaria:820,  tb:360, cholera:45, measles:44  },
  { month:'Jun', malaria:910,  tb:340, cholera:88, measles:31  },
]

const REPORTING = [
  { week:'W18', rate:78 },{ week:'W19', rate:81 },{ week:'W20', rate:79 },
  { week:'W21', rate:85 },{ week:'W22', rate:88 },{ week:'W23', rate:91 },
]

const ALERTS = [
  { region:'Somali', disease:'Cholera', cases:88, trend:'+340%', severity:'red',    since:'3 days' },
  { region:'SNNPR',  disease:'Measles', cases:44, trend:'+120%', severity:'red',    since:'5 days' },
  { region:'Afar',   disease:'Malaria', cases:190,trend:'+45%',  severity:'amber',  since:'7 days' },
  { region:'Oromia', disease:'TB',      cases:31, trend:'+18%',  severity:'amber',  since:'10 days'},
]

const SDG_DATA = [
  { name:'Maternal Mortality', baseline:401, current:267, target:70  },
  { name:'Under-5 Mortality',  baseline:67,  current:50,  target:25  },
  { name:'HIV Prevalence',     baseline:0.9, current:0.7, target:0.1 },
  { name:'Immunisation Coverage',baseline:57,current:78,  target:95  },
  { name:'Facility Delivery',  baseline:26,  current:48,  target:80  },
]

const PIE_DATA = [
  { name:'Fully Reporting', value:63, color:'#16a34a' },
  { name:'Partial',         value:22, color:'#f59e0b' },
  { name:'Not Reporting',   value:15, color:'#ef4444' },
]

export default function GovernmentDashboard({ go }) {
  const [active, setActive] = useState('national')

  const content = {
    national: (
      <div>
        <div style={{ padding:'1.25rem 1.5rem', background:'linear-gradient(135deg,#052e16,#0a5c2e)', borderRadius:16, color:'white', marginBottom:'1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontFamily:'Sora',fontWeight:800,fontSize:'1.15rem' }}>Federal Ministry of Health — National Command Center</div>
            <div style={{ fontSize:'0.8rem',color:'rgba(255,255,255,0.5)',marginTop:3 }}>HealthChain Ethiopia · Real-Time National Health Intelligence · {new Date().toLocaleDateString('en-ET', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</div>
          </div>
          <div style={{ display:'flex',alignItems:'center',gap:8,background:'rgba(74,222,128,0.15)',border:'1px solid rgba(74,222,128,0.3)',borderRadius:'99px',padding:'0.35rem 0.875rem' }}>
            <div style={{ width:7,height:7,borderRadius:'50%',background:'#4ade80',animation:'pulse 2s infinite' }}/>
            <span style={{ fontSize:'0.72rem',fontWeight:700,color:'#4ade80' }}>21,581 NODES ACTIVE</span>
          </div>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',marginBottom:'1.5rem' }}>
          <StatCard icon={Users}      label="Registered Patients"   value="42.8M"  sub="Fayda-linked records"   color='var(--g6)'   trend={18}/>
          <StatCard icon={Database}   label="Active Facilities"      value="21,581" sub="Reporting to blockchain" color='var(--blue)' trend={6}/>
          <StatCard icon={Activity}   label="Encounters This Month"  value="8.4M"   sub="Verified on-chain"       color='var(--g5)'  trend={11}/>
          <StatCard icon={AlertTriangle} label="Active Outbreak Alerts" value="4"  sub="2 critical · 2 watch"   color='var(--red)'/>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:'1.25rem',marginBottom:'1.25rem' }}>
          <Card title="National Disease Trend — 6 Months">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={DISEASE_TREND}>
                <defs>
                  <linearGradient id="malG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%"  stopColor="#0a6640" stopOpacity={0.3}/><stop offset="95%" stopColor="#0a6640" stopOpacity={0}/></linearGradient>
                  <linearGradient id="cholG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%"  stopColor="#ef4444" stopOpacity={0.3}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke='#f1f5f9' vertical={false}/>
                <XAxis dataKey="month" tick={{ fontSize:12, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ borderRadius:10, border:'1px solid #e2e8f0', fontSize:12 }}/>
                <Area type="monotone" dataKey="malaria" stroke='#0a6640' fill='url(#malG)' strokeWidth={2} name="Malaria"/>
                <Area type="monotone" dataKey="tb"      stroke='#3b82f6' fill='none'        strokeWidth={2} name="TB" strokeDasharray="4 2"/>
                <Area type="monotone" dataKey="cholera" stroke='#ef4444' fill='url(#cholG)' strokeWidth={2.5} name="Cholera"/>
                <Area type="monotone" dataKey="measles" stroke='#f59e0b' fill='none'        strokeWidth={2} name="Measles" strokeDasharray="4 2"/>
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Facility Reporting Rate">
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={REPORTING}>
                <XAxis dataKey="week" tick={{ fontSize:11,fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
                <YAxis domain={[60,100]} tick={{ fontSize:10,fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ borderRadius:8,border:'1px solid #e2e8f0',fontSize:12 }} formatter={v=>[v+'%','Rate']}/>
                <Bar dataKey="rate" fill='#16a34a' radius={[6,6,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display:'flex',justifyContent:'space-between',marginTop:'0.75rem' }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontFamily:'Sora',fontWeight:800,fontSize:'1.4rem',color:'var(--g6)' }}>91%</div>
                <div style={{ fontSize:'0.7rem',color:'var(--muted)' }}>Current week</div>
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontFamily:'Sora',fontWeight:800,fontSize:'1.4rem',color:'var(--g5)' }}>+13pp</div>
                <div style={{ fontSize:'0.7rem',color:'var(--muted)' }}>vs 6 weeks ago</div>
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontFamily:'Sora',fontWeight:800,fontSize:'1.4rem',color:'var(--amber)' }}>95%</div>
                <div style={{ fontSize:'0.7rem',color:'var(--muted)' }}>2026 target</div>
              </div>
            </div>
          </Card>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.25rem' }}>
          <Card title="Active Outbreak Alerts" action={<Badge label="4 Active" variant="red"/>}>
            <div style={{ display:'flex',flexDirection:'column',gap:'0.75rem' }}>
              {ALERTS.map((a,i)=>(
                <div key={i} style={{ display:'flex',alignItems:'center',gap:'0.875rem',padding:'0.875rem',borderRadius:11,background:a.severity==='red'?'#fff1f2':'#fffbeb',border:`1px solid ${a.severity==='red'?'#fca5a5':'#fcd34d'}` }}>
                  <AlertTriangle size={18} color={a.severity==='red'?'var(--red)':'var(--amber)'} style={{ flexShrink:0 }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:'Sora',fontWeight:700,fontSize:'0.875rem',color:'var(--ink)' }}>{a.disease} — {a.region}</div>
                    <div style={{ fontSize:'0.75rem',color:'var(--muted)',marginTop:2 }}>{a.cases} cases · Active {a.since}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontFamily:'Sora',fontWeight:800,fontSize:'0.9rem',color: a.severity==='red'?'var(--red)':'var(--amber)' }}>{a.trend}</div>
                    <div style={{ fontSize:'0.68rem',color:'var(--dim)' }}>7-day trend</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Reporting Status Breakdown">
            <div style={{ display:'flex',alignItems:'center',gap:'2rem' }}>
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={PIE_DATA} cx={65} cy={65} innerRadius={42} outerRadius={65} dataKey="value" paddingAngle={3}>
                    {PIE_DATA.map((e,i)=><Cell key={i} fill={e.color}/>)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex:1,display:'flex',flexDirection:'column',gap:'0.625rem' }}>
                {PIE_DATA.map((d,i)=>(
                  <div key={i} style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
                    <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                      <div style={{ width:10,height:10,borderRadius:3,background:d.color,flexShrink:0 }}/>
                      <span style={{ fontSize:'0.8rem',color:'var(--muted)' }}>{d.name}</span>
                    </div>
                    <span style={{ fontFamily:'Sora',fontWeight:700,fontSize:'0.9rem',color:'var(--ink)' }}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    ),

    surveillance: (
      <div>
        <div style={{ display:'flex',gap:'0.75rem',marginBottom:'1.5rem',flexWrap:'wrap' }}>
          {ALERTS.map((a,i)=>(
            <div key={i} style={{ flex:'1 1 220px',padding:'1rem 1.25rem',borderRadius:14,background:a.severity==='red'?'#fff1f2':'#fffbeb',border:`1.5px solid ${a.severity==='red'?'#fca5a5':'#fcd34d'}` }}>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'0.5rem' }}>
                <Badge label={a.severity==='red'?'CRITICAL':'WATCH'} variant={a.severity}/>
                <span style={{ fontFamily:'Sora',fontWeight:800,fontSize:'1.3rem',color: a.severity==='red'?'var(--red)':'var(--amber)' }}>{a.trend}</span>
              </div>
              <div style={{ fontFamily:'Sora',fontWeight:700,fontSize:'1rem',color:'var(--ink)',marginBottom:2 }}>{a.disease}</div>
              <div style={{ fontSize:'0.8rem',color:'var(--muted)' }}>{a.region} · {a.cases} cases · {a.since} ago</div>
            </div>
          ))}
        </div>

        <Card title="National Disease Surveillance — 6-Month Trend" subtitle="Automated from blockchain-verified facility reports">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={DISEASE_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke='#f1f5f9' vertical={false}/>
              <XAxis dataKey="month" tick={{ fontSize:12,fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize:11,fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ borderRadius:10,border:'1px solid #e2e8f0',fontSize:12 }}/>
              <Line type="monotone" dataKey="malaria" stroke='#16a34a' strokeWidth={2.5} dot={{ r:4 }} name="Malaria"/>
              <Line type="monotone" dataKey="tb"      stroke='#3b82f6' strokeWidth={2}   dot={{ r:3 }} strokeDasharray="5 2" name="TB"/>
              <Line type="monotone" dataKey="cholera" stroke='#ef4444' strokeWidth={3}   dot={{ r:5 }} name="Cholera (outbreak)"/>
              <Line type="monotone" dataKey="measles" stroke='#f59e0b' strokeWidth={2}   dot={{ r:3 }} strokeDasharray="5 2" name="Measles"/>
            </LineChart>
          </ResponsiveContainer>
          <div style={{ marginTop:'1rem',padding:'0.875rem',background:'#fff1f2',borderRadius:10,border:'1px solid #fca5a5',display:'flex',gap:10 }}>
            <AlertTriangle size={16} color='var(--red)' style={{ flexShrink:0,marginTop:1 }}/>
            <div style={{ fontSize:'0.82rem',color:'#991b1b',lineHeight:1.5 }}>
              <strong>Cholera outbreak detected — Somali Region.</strong> Cases increased 340% in 7 days. Automated alert sent to Regional Health Bureau. Response team mobilized. WHO notification triggered.
            </div>
          </div>
        </Card>
      </div>
    ),

    facilities: (
      <Card title="Regional Facility Network" subtitle="All 11 regions · Real-time blockchain reporting">
        <table style={{ width:'100%',borderCollapse:'collapse' }}>
          <thead><tr style={{ borderBottom:'2px solid var(--border)' }}>
            {['Region','Facilities','Coverage','Patients','Active Alerts','Status'].map(h=>(
              <th key={h} style={{ padding:'0.625rem 0.75rem',textAlign:'left',fontSize:'0.72rem',fontWeight:700,color:'var(--muted)',fontFamily:'Sora' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{REGIONS.map((r,i)=>(
            <tr key={i} style={{ borderBottom:'1px solid var(--border)',transition:'background 0.15s',cursor:'pointer' }}
              onMouseEnter={e=>e.currentTarget.style.background='var(--surface)'}
              onMouseLeave={e=>e.currentTarget.style.background='white'}>
              <td style={{ padding:'0.875rem 0.75rem' }}>
                <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                  <MapPin size={14} color='var(--g6)' style={{ flexShrink:0 }}/>
                  <span style={{ fontFamily:'Sora',fontWeight:600,fontSize:'0.875rem',color:'var(--ink)' }}>{r.name}</span>
                </div>
              </td>
              <td style={{ padding:'0.875rem 0.75rem',fontSize:'0.83rem',color:'var(--ink)',fontWeight:600 }}>{r.facilities.toLocaleString()}</td>
              <td style={{ padding:'0.875rem 0.75rem' }}>
                <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                  <div style={{ flex:1,height:6,borderRadius:99,background:'var(--border)',minWidth:60 }}>
                    <div style={{ height:'100%',borderRadius:99,width:`${r.coverage}%`,background: r.coverage>80?'var(--g5)':r.coverage>60?'var(--amber)':'var(--red)' }}/>
                  </div>
                  <span style={{ fontSize:'0.78rem',fontWeight:700,color: r.coverage>80?'var(--g6)':r.coverage>60?'var(--amber)':'var(--red)',width:36 }}>{r.coverage}%</span>
                </div>
              </td>
              <td style={{ padding:'0.875rem 0.75rem',fontSize:'0.83rem',color:'var(--muted)' }}>{(r.patients/1000000).toFixed(1)}M</td>
              <td style={{ padding:'0.875rem 0.75rem' }}>
                {r.alerts>0 ? <Badge label={r.alerts+' alerts'} variant={r.alerts>=4?'red':'amber'}/> : <Badge label="Clear" variant="green"/>}
              </td>
              <td style={{ padding:'0.875rem 0.75rem' }}><Badge label={r.status==='red'?'Needs Attention':r.status==='amber'?'Monitoring':'On Track'} variant={r.status}/></td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    ),

    population: (
      <div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',marginBottom:'1.5rem' }}>
          <StatCard icon={Users}       label="Registered on Platform"  value="42.8M"  sub="of 130M population"   color='var(--g6)'  trend={18}/>
          <StatCard icon={TrendingUp}  label="Immunisation Coverage"   value="78%"    sub="Target: 95%"          color='var(--blue)' trend={5}/>
          <StatCard icon={Activity}    label="Facility Delivery Rate"  value="48%"    sub="Target: 80%"          color='var(--amber)'/>
          <StatCard icon={Zap}         label="ANC Coverage (4+ visits)"value="61%"    sub="Maternal health"      color='var(--g5)'  trend={8}/>
        </div>

        <Card title="SDG 3 Progress Tracker" subtitle="Health targets aligned with Digital Ethiopia 2030">
          <div style={{ display:'flex',flexDirection:'column',gap:'1.125rem' }}>
            {SDG_DATA.map((s,i)=>{
              const pct = Math.round(((s.baseline-s.current)/(s.baseline-s.target))*100)
              const safe = Math.max(0,Math.min(100,pct))
              return (
                <div key={i}>
                  <div style={{ display:'flex',justifyContent:'space-between',marginBottom:6 }}>
                    <span style={{ fontSize:'0.875rem',fontWeight:600,color:'var(--ink)' }}>{s.name}</span>
                    <div style={{ display:'flex',gap:'1rem',fontSize:'0.78rem',color:'var(--muted)' }}>
                      <span>Baseline: <strong style={{ color:'var(--red)' }}>{s.baseline}</strong></span>
                      <span>Current: <strong style={{ color:'var(--amber)' }}>{s.current}</strong></span>
                      <span>Target: <strong style={{ color:'var(--g6)' }}>{s.target}</strong></span>
                    </div>
                  </div>
                  <div style={{ height:10,borderRadius:99,background:'var(--border)',position:'relative' }}>
                    <div style={{ height:'100%',borderRadius:99,width:`${safe}%`,background:`linear-gradient(90deg,var(--g7),var(--g4))`,transition:'width 0.6s' }}/>
                  </div>
                  <div style={{ fontSize:'0.7rem',color:'var(--muted)',marginTop:3,textAlign:'right' }}>{safe}% of the way to target</div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    ),

    reports: (
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.25rem' }}>
        {[
          { title:'Monthly National Health Summary',  date:'May 2026',         size:'2.4 MB', status:'green',  type:'PDF + Blockchain Hash' },
          { title:'Q1 2026 Disease Surveillance Report',date:'Q1 2026',        size:'5.1 MB', status:'green',  type:'PDF + Blockchain Hash' },
          { title:'Facility Reporting Compliance Audit',date:'Apr 2026',       size:'1.8 MB', status:'green',  type:'PDF' },
          { title:'SDG 3 Progress Report',             date:'2025 Annual',     size:'3.7 MB', status:'green',  type:'PDF' },
          { title:'Cholera Outbreak Response Brief',   date:'31 May 2026',     size:'0.9 MB', status:'amber',  type:'Emergency Brief' },
          { title:'Digital Health Blueprint 2030 — Q2 Update',date:'Jun 2026', size:'4.2 MB', status:'blue',   type:'Strategy Update' },
        ].map((r,i)=>(
          <div key={i} style={{ display:'flex',alignItems:'center',gap:'1rem',padding:'1.125rem',background:'white',borderRadius:14,border:'1px solid var(--border)',cursor:'pointer',transition:'all 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.07)';e.currentTarget.style.borderColor='var(--g3)'}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--border)'}}>
            <div style={{ width:42,height:42,borderRadius:11,background:'var(--g0)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
              <FileText size={20} color='var(--g6)'/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:'Sora',fontWeight:600,fontSize:'0.875rem',color:'var(--ink)',marginBottom:3 }}>{r.title}</div>
              <div style={{ fontSize:'0.75rem',color:'var(--muted)' }}>{r.type} · {r.date} · {r.size}</div>
            </div>
            <Badge label="Download" variant={r.status}/>
          </div>
        ))}
      </div>
    ),

    blockchain: (
      <div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',marginBottom:'1.5rem' }}>
          <StatCard icon={Database}   label="Total Records On-Chain" value="284M"  sub="All time" color='var(--g6)'  trend={14}/>
          <StatCard icon={ShieldCheck}label="Integrity Verifications" value="100%" sub="No tampering detected" color='var(--g5)'/>
          <StatCard icon={Activity}   label="Blockchain Nodes Active" value="21,581" sub="All regions synced" color='var(--blue)'/>
          <StatCard icon={Zap}        label="Avg Sync Latency"       value="1.2s"  sub="Target: <3s" color='var(--g4)'/>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.25rem' }}>
          <Card title="Recent Blockchain Transactions" subtitle="Last 10 entries">
            <div style={{ display:'flex',flexDirection:'column',gap:'0.5rem' }}>
              {[
                { hash:'0x4a2b...f9e1', type:'Patient Record Update', region:'Addis Ababa', time:'2 sec ago'  },
                { hash:'0x8c1d...3a77', type:'Lab Result Recorded',   region:'Oromia',      time:'5 sec ago'  },
                { hash:'0x2f9e...b320', type:'Prescription Issued',   region:'Amhara',      time:'8 sec ago'  },
                { hash:'0x7d3a...44cc', type:'Facility Report',       region:'SNNPR',       time:'12 sec ago' },
                { hash:'0x1b8f...902d', type:'Patient Registration',  region:'Tigray',      time:'15 sec ago' },
                { hash:'0x5e4c...71ab', type:'Lab Result Recorded',   region:'Harari',      time:'19 sec ago' },
                { hash:'0x9a2d...c13f', type:'Insurance Claim Filed', region:'Dire Dawa',   time:'22 sec ago' },
              ].map((t,i)=>(
                <div key={i} style={{ display:'flex',alignItems:'center',gap:'0.875rem',padding:'0.625rem 0.75rem',borderRadius:9,background:'var(--surface)',fontSize:'0.8rem' }}>
                  <div style={{ width:8,height:8,borderRadius:'50%',background:'var(--g4)',flexShrink:0 }}/>
                  <code style={{ color:'var(--g7)',fontWeight:600,flexShrink:0 }}>{t.hash}</code>
                  <span style={{ flex:1,color:'var(--ink)' }}>{t.type}</span>
                  <span style={{ color:'var(--muted)',flexShrink:0 }}>{t.region}</span>
                  <span style={{ color:'var(--dim)',flexShrink:0,fontSize:'0.72rem' }}>{t.time}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Node Status by Region">
            <div style={{ display:'flex',flexDirection:'column',gap:'0.5rem' }}>
              {REGIONS.slice(0,8).map((r,i)=>(
                <div key={i} style={{ display:'flex',alignItems:'center',gap:'0.875rem',padding:'0.5rem 0.625rem',borderRadius:8 }}>
                  <div style={{ width:8,height:8,borderRadius:'50%',background:r.status==='red'?'var(--red)':r.status==='amber'?'var(--amber)':'var(--g4)',flexShrink:0 }}/>
                  <span style={{ flex:1,fontSize:'0.83rem',color:'var(--ink)',fontWeight:500 }}>{r.name}</span>
                  <span style={{ fontSize:'0.75rem',color:'var(--muted)' }}>{r.facilities.toLocaleString()} nodes</span>
                  <Badge label="Synced" variant="green"/>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    ),
  }

  return (
    <DashLayout items={NAV} active={active} setActive={setActive} role="government" go={go}
      topbar={
        <div style={{ display:'flex',alignItems:'center',gap:'0.75rem' }}>
          <div style={{ fontSize:'0.8rem',color:'var(--g6)',fontWeight:600,display:'flex',alignItems:'center',gap:6 }}>
            <div style={{ width:7,height:7,borderRadius:'50%',background:'var(--g4)',animation:'pulse 2s infinite' }}/>
            National Grid Live
          </div>
          <div style={{ position:'relative',cursor:'pointer' }}>
            <Bell size={18} color='var(--muted)'/>
            <div style={{ position:'absolute',top:-3,right:-3,width:9,height:9,borderRadius:'50%',background:'var(--red)',border:'2px solid white' }}/>
          </div>
        </div>
      }>
      {content[active] || content.national}
    </DashLayout>
  )
}
