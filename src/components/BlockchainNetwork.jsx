import { motion } from 'framer-motion'
import { Landmark, MapPin, Building2, ClipboardList, Link2 } from 'lucide-react'

const NETWORK_TIERS = [
  { icon: Landmark, label: 'MOH Organization' },
  { icon: MapPin, label: 'Regional Health Bureau' },
  { icon: Building2, label: 'Hospital' },
  { icon: ClipboardList, label: 'Ordering Service' },
  { icon: Link2, label: 'Shared Ledger' },
]

export default function BlockchainNetwork() {
  return (
    <div
      role="list"
      aria-label="Hyperledger network topology"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 340, margin: '0 auto' }}
    >
      {NETWORK_TIERS.map((tier, i) => {
        const Icon = tier.icon
        const isLedger = i === NETWORK_TIERS.length - 1
        return (
          <div key={tier.label} role="listitem" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                padding: '0.85rem 1.25rem', borderRadius: 14,
                background: isLedger ? 'linear-gradient(135deg,#16a34a,#4ade80)' : 'rgba(255,255,255,0.05)',
                border: isLedger ? 'none' : '1px solid rgba(255,255,255,0.12)',
                boxShadow: isLedger ? '0 0 30px rgba(74,222,128,0.4)' : 'none',
              }}
            >
              <Icon size={18} color={isLedger ? '#052e16' : '#4ade80'} />
              <span style={{
                fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem',
                color: isLedger ? '#052e16' : 'white',
              }}>
                {tier.label}
              </span>
            </motion.div>

            {i < NETWORK_TIERS.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.35, delay: i * 0.12 + 0.15 }}
                style={{
                  width: 2, height: 28, transformOrigin: 'top',
                  background: 'linear-gradient(180deg,rgba(74,222,128,0.6),rgba(74,222,128,0.15))',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
