import {
  UserPlus, CheckCircle2, Pill, FlaskConical, ShieldCheck, Link2,
} from 'lucide-react'

export const ACTIVITY_TEMPLATES = [
  { icon: UserPlus, color: '#4ade80', text: 'Patient registered at Black Lion Hospital' },
  { icon: CheckCircle2, color: '#4ade80', text: 'Prescription verified successfully' },
  { icon: Pill, color: '#fbbf24', text: 'Medicine stock updated in Hawassa' },
  { icon: FlaskConical, color: '#60a5fa', text: 'Laboratory result uploaded' },
  { icon: ShieldCheck, color: '#4ade80', text: 'Insurance claim approved' },
  { icon: Link2, color: '#c9a84c', text: 'Blockchain audit recorded' },
  { icon: UserPlus, color: '#4ade80', text: 'Patient registered at Adama General Hospital' },
  { icon: CheckCircle2, color: '#4ade80', text: 'Digital prescription issued in Bahir Dar' },
  { icon: FlaskConical, color: '#60a5fa', text: 'Lab sample tracked to Mekelle Referral Hospital' },
  { icon: ShieldCheck, color: '#4ade80', text: 'CBHI eligibility verified in Dire Dawa' },
  { icon: Pill, color: '#fbbf24', text: 'Low-stock alert flagged in Bahir Dar pharmacy' },
  { icon: Link2, color: '#c9a84c', text: 'Consent record signed and hashed' },
  { icon: UserPlus, color: '#4ade80', text: 'Newborn enrolled in National Patient Registry' },
  { icon: FlaskConical, color: '#60a5fa', text: 'Critical lab result flagged for review' },
]

export const INITIAL_ACTIVITY = [
  { id: 'seed-1', ...ACTIVITY_TEMPLATES[0], time: '2 min ago' },
  { id: 'seed-2', ...ACTIVITY_TEMPLATES[1], time: '4 min ago' },
  { id: 'seed-3', ...ACTIVITY_TEMPLATES[2], time: '6 min ago' },
  { id: 'seed-4', ...ACTIVITY_TEMPLATES[3], time: '9 min ago' },
  { id: 'seed-5', ...ACTIVITY_TEMPLATES[4], time: '11 min ago' },
  { id: 'seed-6', ...ACTIVITY_TEMPLATES[5], time: '14 min ago' },
]
