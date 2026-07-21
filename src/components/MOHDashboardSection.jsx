import { lazy, Suspense } from 'react'
import { AlertTriangle } from 'lucide-react'
import SectionHeader from './SectionHeader'
import DashboardGrid from './DashboardGrid'
import DashboardCard from './DashboardCard'
import ChartCard from './ChartCard'
import ProgressRing from './ProgressRing'
import Skeleton from './Skeleton'
import {
  KPI_STATS, PRESCRIPTIONS_TREND, CLAIMS_STATUS, REGIONAL_COMPARISON,
  VACCINATION_COVERAGE, HOSPITAL_CAPACITY, DISEASE_ALERTS,
} from '../data/dashboard'

const DashboardCharts = lazy(() => import('./DashboardCharts'))

const axisTick = { fontSize: 11, fill: 'rgba(255,255,255,0.62)' }
const gridStroke = 'rgba(255,255,255,0.08)'
const tooltipStyle = { background: '#0a3d24', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, fontSize: 12, color: 'white' }

export default function MOHDashboardSection() {
  return (
    <section id="dashboard" style={{ padding: '7rem 1.5rem 6rem', background: '#052e16', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <SectionHeader
          eyebrow="MINISTRY OF HEALTH"
          title="National Health Intelligence Dashboard"
          subtitle="Empowering evidence-based decisions with real-time national health insights."
          dark
          maxWidth={620}
        />

        <div style={{ marginBottom: '1.25rem' }}>
          <DashboardGrid>
            {KPI_STATS.map((s, i) => (
              <DashboardCard key={s.id} icon={s.icon} label={s.label} value={s.value} decimals={s.decimals} suffix={s.suffix} sub={s.sub} trend={s.trend} delay={i * 0.04} />
            ))}
          </DashboardGrid>
          <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.62)', marginTop: '0.75rem', textAlign: 'center' }}>
            Demonstration data for this vision prototype — not a live feed.
          </p>
        </div>

        <Suspense fallback={<Skeleton height={520} label="Loading dashboard charts" />}>
          <DashboardCharts
            axisTick={axisTick}
            gridStroke={gridStroke}
            tooltipStyle={tooltipStyle}
            prescriptionsTrend={PRESCRIPTIONS_TREND}
            claimsStatus={CLAIMS_STATUS}
            regionalComparison={REGIONAL_COMPARISON}
          />
        </Suspense>

        <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '1.25rem', marginTop: '1.25rem' }}>
          <ChartCard title="Coverage & Capacity" subtitle="National averages, live">
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1.5rem' }}>
              <ProgressRing value={VACCINATION_COVERAGE.value} color="#4ade80" label={`${VACCINATION_COVERAGE.label} · target ${VACCINATION_COVERAGE.target}%`} />
              <ProgressRing value={HOSPITAL_CAPACITY.value} color="#fbbf24" label={`${HOSPITAL_CAPACITY.label} · target ${HOSPITAL_CAPACITY.target}%`} />
            </div>
          </ChartCard>

          <ChartCard title="Active Disease Alerts" subtitle="Automated from blockchain-verified facility reports">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {DISEASE_ALERTS.map((a, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem', borderRadius: 12,
                  background: a.severity === 'red' ? 'rgba(248,113,113,0.08)' : 'rgba(251,191,36,0.08)',
                  border: `1px solid ${a.severity === 'red' ? 'rgba(248,113,113,0.35)' : 'rgba(251,191,36,0.35)'}`,
                }}>
                  <AlertTriangle size={18} color={a.severity === 'red' ? '#f87171' : '#fbbf24'} style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem', color: 'white' }}>{a.disease} — {a.region}</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.62)', marginTop: 2 }}>{a.cases} cases</div>
                  </div>
                  <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '0.9rem', color: a.severity === 'red' ? '#f87171' : '#fbbf24', flexShrink: 0 }}>
                    {a.trend}
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .dashboard-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
