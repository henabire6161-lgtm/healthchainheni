import { useState } from 'react'
import { Shield, Activity, Users, Lock, ChevronRight, CheckCircle,
         Globe, Database, Zap, Fingerprint, HeartPulse } from 'lucide-react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ChallengeSection from '../components/ChallengeSection'
import EcosystemSection from '../components/EcosystemSection'
import PlatformExplorer from '../components/PlatformExplorer'
import CitizenJourney from '../components/CitizenJourney'
import NPIPSection from '../components/NPIPSection'
import MOHDashboardSection from '../components/MOHDashboardSection'
import ActivityFeedSection from '../components/ActivityFeedSection'
import TrustWorkflow from '../components/TrustWorkflow'
import EnterpriseArchitecture from '../components/EnterpriseArchitecture'
import InteroperabilityDiagram from '../components/InteroperabilityDiagram'
import HyperledgerTrustSection from '../components/HyperledgerTrustSection'
import SecuritySection from '../components/SecuritySection'
import TechnologyStackSection from '../components/TechnologyStackSection'
import RoadmapSection from '../components/RoadmapSection'
import PartnershipSection from '../components/PartnershipSection'
import FinalCTASection from '../components/FinalCTASection'
import Footer from '../components/Footer'
import { PLATFORMS } from '../data/platforms'

const ROLES = [
  { id:'patient', icon:Users, title:'Patient', color:'#16a34a', bg:'#f0fdf4',
    desc:'Your complete health history — anywhere in Ethiopia with just your Fayda ID.',
    features:['Full medical history & timeline','Lab results & prescriptions','Appointment booking','Emergency health QR card'] },
  { id:'doctor', icon:Activity, title:'Doctor / Clinician', color:'#059669', bg:'#ecfdf5',
    desc:'Verified patient records, digital prescriptions, lab ordering — one blockchain-secured workspace.',
    features:['Complete patient record access','Digital prescriptions & e-referrals','Lab order & result management','Clinical decision support'] },
  { id:'hospital', icon:Database, title:'Hospital / Facility', color:'#0a6640', bg:'#d1fae5',
    desc:'Live facility operations, patient flow, supply chain, and national compliance reporting.',
    features:['Facility operations dashboard','Drug & supply chain tracking','Staff management & scheduling','Automated compliance reporting'] },
  { id:'government', icon:Globe, title:'Government / MOH', color:'#052e16', bg:'#bbf7d0', dark:true,
    desc:'Real-time national health intelligence: surveillance, outbreak detection, resource allocation.',
    features:['National disease surveillance','Real-time health analytics','Budget & resource tracking','Policy data & SDG reporting'] },
]

const FEATURES = [
  { icon:Shield, title:'Blockchain Verified', desc:'Every patient record cryptographically signed and immutably stored — tamper-proof by design.' },
  { icon:Fingerprint, title:'Fayda Integrated', desc:'One Fayda ID = one complete health record. No duplicates, no ghost patients, no identity fraud.' },
  { icon:Zap, title:'Real-Time Intelligence', desc:'Ministry of Health sees live disease surveillance — outbreak signals detected in hours, not weeks.' },
  { icon:HeartPulse, title:'Offline First', desc:'Rural health posts work without internet. Records sync to blockchain when connectivity returns.' },
  { icon:Lock, title:'Insurance Ready', desc:'CBHI/SHI claims verified from immutable health records — 48-hour processing, zero fraud.' },
  { icon:CheckCircle, title:'Universal Access', desc:'Every Ethiopian from Addis Ababa to the remotest kebele is connected to one health system.' },
]

export default function LandingPage({ go }) {
  const [explorerPlatformId, setExplorerPlatformId] = useState(PLATFORMS[0].id)
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })
  const scrollToPlatform = () => document.getElementById('platform')?.scrollIntoView({ behavior:'smooth' })
  const scrollToExplorer = (platformId) => {
    setExplorerPlatformId(platformId)
    document.getElementById('platform-explorer')?.scrollIntoView({ behavior:'smooth' })
  }
  const scrollToArchitecture = () => document.getElementById('architecture')?.scrollIntoView({ behavior:'smooth' })

  return (
    <div style={{ minHeight:'100vh', background:'white' }}>
      <Navbar onRequestDemo={scrollToContact} />
      <Hero onExplore={scrollToPlatform} onRequestDemo={scrollToContact} />
      <ChallengeSection />
      <EcosystemSection onExploreFull={scrollToExplorer} />
      <PlatformExplorer selectedId={explorerPlatformId} onSelectId={setExplorerPlatformId} />
      <CitizenJourney />
      <NPIPSection />
      <MOHDashboardSection />
      <ActivityFeedSection />
      <TrustWorkflow />

      {/* ── PORTALS ── */}
      <section id="who-its-for" className="portals" style={{ padding:'6rem 2rem', background:'#f8fafc' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <span style={{ display:'inline-block', padding:'0.3rem 1rem', borderRadius:'99px', background:'#f0fdf4', color:'#0a6640', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.07em', marginBottom:'0.875rem' }}>WHO IS IT FOR</span>
            <h2 style={{ fontFamily:'Sora', fontWeight:800, fontSize:'clamp(1.8rem,4vw,2.8rem)', color:'#0f1a0f', letterSpacing:'-0.02em' }}>
              Every Stakeholder.<br/>One Unified Platform.
            </h2>
            <p style={{ color:'#475569', marginTop:'0.75rem', fontSize:'1rem', maxWidth:500, margin:'0.75rem auto 0', lineHeight:1.7 }}>
              From community health posts to the Federal Ministry of Health — all connected, all verified.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1.25rem' }}>
            {ROLES.map(role => {
              const Icon = role.icon
              return (
                <div key={role.id} onClick={() => go('login')}
                  style={{
                    background: role.dark ? 'linear-gradient(135deg,#052e16,#0a5c2e)' : 'white',
                    borderRadius:22, padding:'2rem',
                    border: `1.5px solid ${role.dark?'#22c55e40':'#e2e8f0'}`,
                    cursor:'pointer', position:'relative', overflow:'hidden', transition:'all 0.25s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow=`0 20px 60px ${role.color}22` }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}>
                  <div style={{ position:'absolute', top:0, right:0, width:100, height:100, borderRadius:'0 22px 0 100px', background:role.color, opacity:0.07 }}/>
                  <div style={{ width:52, height:52, borderRadius:14, background:role.dark?'rgba(255,255,255,0.1)':role.bg, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.25rem' }}>
                    <Icon size={24} color={role.dark?'#4ade80':role.color}/>
                  </div>
                  <h3 style={{ fontFamily:'Sora', fontWeight:700, fontSize:'1.2rem', color:role.dark?'white':'#0f1a0f', marginBottom:'0.5rem' }}>{role.title}</h3>
                  <p style={{ fontSize:'0.875rem', color:role.dark?'rgba(255,255,255,0.55)':'#475569', lineHeight:1.65, marginBottom:'1.25rem' }}>{role.desc}</p>
                  <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:7, marginBottom:'1.5rem' }}>
                    {role.features.map(f => (
                      <li key={f} style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <CheckCircle size={13} color={role.dark?'#4ade80':role.color}/>
                        <span style={{ fontSize:'0.8rem', color:role.dark?'rgba(255,255,255,0.5)':'#475569' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display:'flex', alignItems:'center', gap:6, color:role.dark?'#4ade80':role.color, fontSize:'0.85rem', fontWeight:700 }}>
                    Sign in as {role.title} <ChevronRight size={15}/>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="how-it-works" style={{ padding:'6rem 2rem', background:'#052e16', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:0.03, backgroundImage:'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize:'40px 40px' }}/>
        <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:2 }}>
          <div style={{ marginBottom:'3rem' }}>
            <span style={{ display:'inline-block', padding:'0.3rem 1rem', borderRadius:'99px', background:'rgba(255,255,255,0.1)', color:'#4ade80', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.07em', marginBottom:'0.875rem' }}>HOW IT WORKS</span>
            <h2 style={{ fontFamily:'Sora', fontWeight:800, fontSize:'clamp(1.8rem,4vw,2.8rem)', color:'white', letterSpacing:'-0.02em' }}>
              Six steps from patient<br/>to national intelligence.
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem' }}>
            {[
              { n:'01', t:'Patient authenticates with Fayda ID', d:'Biometric scan at any facility instantly pulls up the complete national health record — no cards, no paper, no duplicates.' },
              { n:'02', t:'Clinician records the encounter', d:'Doctor documents diagnosis, prescriptions, and referrals. Every entry cryptographically signed with the clinician\'s verified credential.' },
              { n:'03', t:'Blockchain verifies and stores', d:'Record hashed and written to the national permissioned blockchain — immutable, tamper-proof, distributed across all 11 regional nodes.' },
              { n:'04', t:'Facility dashboard updates live', d:'Hospital operations, drug inventory, bed occupancy update in real time — managers act on live intelligence, not last week\'s paper reports.' },
              { n:'05', t:'Insurance claims auto-verified', d:'CBHI/SHI claims verified directly from immutable health records — processing drops from weeks to 48 hours, fraud eliminated by design.' },
              { n:'06', t:'MOH sees the national picture', d:'Anonymized data flows to the Ministry dashboard — outbreak signals detected in hours, every policy decision backed by real verified data.' },
            ].map((s,i) => (
              <div key={i} style={{
                background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)',
                borderRadius:20, padding:'1.75rem'
              }}>
                <div style={{ width:34, height:34, borderRadius:9, background:'#0a6640', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Sora', fontWeight:800, fontSize:'0.8rem', color:'white', marginBottom:'1.125rem' }}>{s.n}</div>
                <h4 style={{ fontFamily:'Sora', fontWeight:700, fontSize:'0.95rem', color:'white', marginBottom:'0.5rem' }}>{s.t}</h4>
                <p style={{ fontSize:'0.83rem', color:'rgba(255,255,255,0.42)', lineHeight:1.65 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section id="vision" className="impact" style={{ padding:'6rem 2rem', background:'white' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <span style={{ display:'inline-block', padding:'0.3rem 1rem', borderRadius:'99px', background:'#f0fdf4', color:'#0a6640', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.07em', marginBottom:'0.875rem' }}>NATIONAL IMPACT</span>
            <h2 style={{ fontFamily:'Sora', fontWeight:800, fontSize:'clamp(1.8rem,4vw,2.8rem)', color:'#0f1a0f', letterSpacing:'-0.02em' }}>Changing how Ethiopia<br/>delivers healthcare.</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem' }}>
            {[
              { n:'80%', l:'Reduction in manual health reporting time for facilities' },
              { n:'48hrs', l:'CBHI insurance claim processing — down from weeks' },
              { n:'0', l:'Duplicate patient records — one Fayda ID, one record' },
              { n:'95%', l:'Target facility reporting rate — up from 34% today' },
              { n:'Hours', l:'Outbreak detection response — not days or weeks' },
              { n:'$8.3B', l:'National health expenditure accountability by 2030' },
            ].map((c,i) => (
              <div key={i} style={{
                borderRadius:20, padding:'1.75rem', border:'1px solid #e2e8f0', background:'white', transition:'all 0.2s'
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='#22c55e';e.currentTarget.style.background='#f0fdf4'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='#e2e8f0';e.currentTarget.style.background='white'}}>
                <div style={{ fontFamily:'Sora', fontWeight:800, fontSize:'2.4rem', color:'#0d7a4a', lineHeight:1, marginBottom:'0.4rem' }}>{c.n}</div>
                <div style={{ fontSize:'0.85rem', color:'#475569', lineHeight:1.6 }}>{c.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding:'6rem 2rem', background:'#f8fafc' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <h2 style={{ fontFamily:'Sora', fontWeight:800, fontSize:'clamp(1.8rem,4vw,2.8rem)', color:'#0f1a0f', letterSpacing:'-0.02em' }}>
              Built for Ethiopia.<br/><span style={{ color:'#0d7a4a' }}>Built for the Future.</span>
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1.25rem' }}>
            {FEATURES.map((f,i) => {
              const Icon = f.icon
              return (
                <div key={i} style={{
                  display:'flex', gap:'1rem', padding:'1.5rem',
                  borderRadius:16, border:'1px solid #e2e8f0', background:'white', transition:'all 0.2s'
                }}
                onMouseEnter={e=>{e.currentTarget.style.background='#f0fdf4';e.currentTarget.style.borderColor='#86efac'}}
                onMouseLeave={e=>{e.currentTarget.style.background='white';e.currentTarget.style.borderColor='#e2e8f0'}}>
                  <div style={{ width:44,height:44,borderRadius:12,flexShrink:0,background:'linear-gradient(135deg,#0a6640,#22c55e)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 12px rgba(16,163,74,0.25)' }}>
                    <Icon size={20} color="white"/>
                  </div>
                  <div>
                    <h4 style={{ fontFamily:'Sora', fontWeight:700, fontSize:'0.95rem', color:'#0f1a0f', marginBottom:'0.375rem' }}>{f.title}</h4>
                    <p style={{ fontSize:'0.845rem', color:'#475569', lineHeight:1.65 }}>{f.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <EnterpriseArchitecture />
      <InteroperabilityDiagram />
      <HyperledgerTrustSection />
      <SecuritySection />
      <TechnologyStackSection />
      <RoadmapSection />
      <PartnershipSection />
      <FinalCTASection onRequestDemo={scrollToContact} onExploreVision={scrollToArchitecture} />
      <Footer />
    </div>
  )
}
