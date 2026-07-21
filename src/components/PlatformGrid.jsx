import { useState } from 'react'
import { Network } from 'lucide-react'
import PlatformCard from './PlatformCard'
import FloatingNode from './FloatingNode'
import AnimatedConnection from './AnimatedConnection'
import { HUB } from '../data/platforms'

const RADIUS = 320
const CARD_W = 178

export default function PlatformGrid({ platforms, onSelect }) {
  const [hovered, setHovered] = useState(null)
  const count = platforms.length

  return (
    <div className="ecosystem-cards" style={{ position: 'relative', width: '100%', maxWidth: 1020, height: 820, margin: '0 auto' }}>
      <svg className="ecosystem-lines" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {platforms.map((p, i) => {
          const angle = (-90 + (360 / count) * i) * (Math.PI / 180)
          const x2 = 50 + (Math.cos(angle) * RADIUS) / (1020 / 100)
          const y2 = 50 + (Math.sin(angle) * RADIUS) / (820 / 100)
          return (
            <AnimatedConnection
              key={p.id}
              x1={50} y1={50} x2={x2} y2={y2}
              delay={i * 0.06}
              active={hovered === p.id}
            />
          )
        })}
      </svg>

      <div className="ecosystem-hub-wrap" style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      }}>
        <FloatingNode icon={Network} label="HealthChain" size={124} iconSize={34} />
        <span style={{
          fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500,
          maxWidth: 160, textAlign: 'center', lineHeight: 1.4,
        }}>
          {HUB.subtitle}
        </span>
      </div>

      {platforms.map((p, i) => {
        const angle = -90 + (360 / count) * i
        const rad = angle * (Math.PI / 180)
        const x = Math.cos(rad) * RADIUS
        const y = Math.sin(rad) * RADIUS
        return (
          <div
            key={p.id}
            className="ecosystem-card-slot"
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: `translate(-50%,-50%) translate(${x}px, ${y}px)`,
              width: CARD_W,
            }}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <PlatformCard platform={p} onSelect={onSelect} delay={i * 0.04} />
          </div>
        )
      })}

      <style>{`
        @media (max-width: 1150px) {
          .ecosystem-cards {
            height: auto !important;
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 1rem;
          }
          .ecosystem-card-slot { position: static !important; transform: none !important; width: auto !important; }
          .ecosystem-card-slot .platform-card { width: 100% !important; }
          .ecosystem-hub-wrap, .ecosystem-lines { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ecosystem-lines { display: none !important; }
        }
      `}</style>
    </div>
  )
}
