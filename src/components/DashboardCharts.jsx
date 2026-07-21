import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts'
import ChartCard from './ChartCard'

function heatColor(coverage) {
  if (coverage >= 80) return '#4ade80'
  if (coverage >= 65) return '#fbbf24'
  return '#f87171'
}

export default function DashboardCharts({ axisTick, gridStroke, tooltipStyle, prescriptionsTrend, claimsStatus, regionalComparison }) {
  return (
    <>
      <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
        <ChartCard title="Prescriptions & Claims — 6 Months" subtitle="Millions, nationwide">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={prescriptionsTrend}>
              <defs>
                <linearGradient id="rxG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4ade80" stopOpacity={0.35} /><stop offset="95%" stopColor="#4ade80" stopOpacity={0} /></linearGradient>
                <linearGradient id="clG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} /><stop offset="95%" stopColor="#60a5fa" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
              <XAxis dataKey="month" tick={axisTick} axisLine={false} tickLine={false} />
              <YAxis tick={axisTick} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value, name) => [`${value}M`, name]} />
              <Area type="monotone" dataKey="prescriptions" stroke="#4ade80" fill="url(#rxG)" strokeWidth={2.5} name="Prescriptions" />
              <Area type="monotone" dataKey="claims" stroke="#60a5fa" fill="url(#clG)" strokeWidth={2} name="Claims" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Claims Status" subtitle="Current month">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <ResponsiveContainer width={130} height={130}>
              <PieChart>
                <Pie data={claimsStatus} cx={60} cy={60} innerRadius={38} outerRadius={58} dataKey="value" paddingAngle={3}>
                  {claimsStatus.map((e, i) => <Cell key={i} fill={e.color} stroke="none" />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
              {claimsStatus.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 9, height: 9, borderRadius: 3, background: d.color }} />
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>{d.name}</span>
                  </div>
                  <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem', color: 'white' }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Regional Coverage Comparison" subtitle="Facility reporting coverage by region">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={regionalComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
            <XAxis dataKey="region" tick={axisTick} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
            <YAxis domain={[0, 100]} tick={axisTick} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} formatter={v => [`${v}%`, 'Coverage']} />
            <Bar dataKey="coverage" radius={[6, 6, 0, 0]}>
              {regionalComparison.map((r, i) => <Cell key={i} fill={heatColor(r.coverage)} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: '1rem' }}>
          {regionalComparison.map(r => (
            <span key={r.region} style={{
              padding: '0.3rem 0.7rem', borderRadius: 99, fontSize: '0.7rem', fontWeight: 700,
              background: `${heatColor(r.coverage)}1a`,
              border: `1px solid ${heatColor(r.coverage)}55`,
              color: heatColor(r.coverage),
            }}>
              {r.region} {r.coverage}%
            </span>
          ))}
        </div>
      </ChartCard>
    </>
  )
}
