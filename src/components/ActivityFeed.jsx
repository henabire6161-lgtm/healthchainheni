import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ActivityItem from './ActivityItem'
import { ACTIVITY_TEMPLATES, INITIAL_ACTIVITY } from '../data/activity'

const MAX_ITEMS = 7
const ADD_INTERVAL_MS = 5000

export default function ActivityFeed() {
  const [items, setItems] = useState(INITIAL_ACTIVITY)
  const counterRef = useRef(0)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const interval = setInterval(() => {
      const template = ACTIVITY_TEMPLATES[Math.floor(Math.random() * ACTIVITY_TEMPLATES.length)]
      counterRef.current += 1
      setItems(prev => [
        { id: `live-${counterRef.current}`, ...template, time: 'Just now' },
        ...prev,
      ].slice(0, MAX_ITEMS))
    }, ADD_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s infinite' }} />
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4ade80', letterSpacing: '0.07em' }}>LIVE · DEMO DATA</span>
      </div>
      <div aria-live="polite" aria-label="Live platform activity feed">
        <AnimatePresence initial={false}>
          {items.map(item => (
            <ActivityItem key={item.id} icon={item.icon} color={item.color} text={item.text} time={item.time} />
          ))}
        </AnimatePresence>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
    </div>
  )
}
