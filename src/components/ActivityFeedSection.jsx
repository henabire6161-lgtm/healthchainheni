import SectionHeader from './SectionHeader'
import ActivityFeed from './ActivityFeed'

export default function ActivityFeedSection() {
  return (
    <section id="activity" style={{ padding: '6rem 1.5rem', background: 'linear-gradient(180deg,#052e16,#0a3d24)' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="LIVE PLATFORM ACTIVITY"
          title="The ecosystem, working right now."
          subtitle="A live look at the kind of activity HealthChain processes every moment, nationwide."
          dark
        />
        <ActivityFeed />
      </div>
    </section>
  )
}
