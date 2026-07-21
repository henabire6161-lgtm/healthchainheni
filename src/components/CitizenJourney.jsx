import { useState } from 'react'
import SectionHeader from './SectionHeader'
import InteractiveTimeline from './InteractiveTimeline'
import JourneyDetailPanel from './JourneyDetailPanel'
import { JOURNEY_STEPS } from '../data/journey'

export default function CitizenJourney() {
  const [selectedStep, setSelectedStep] = useState(null)

  return (
    <section id="journey" style={{ padding: '7rem 1.5rem 6rem', background: '#052e16', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <SectionHeader
          eyebrow="THE JOURNEY"
          title={<>One Citizen.<br />One Connected Healthcare Journey.</>}
          subtitle="From identification to treatment, HealthChain securely connects every step of the healthcare experience. Select a step to see how it works."
          dark
          maxWidth={620}
        />

        <InteractiveTimeline steps={JOURNEY_STEPS} onSelect={setSelectedStep} />
      </div>

      <JourneyDetailPanel step={selectedStep} onClose={() => setSelectedStep(null)} />
    </section>
  )
}
