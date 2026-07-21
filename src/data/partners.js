import { Landmark, HeartPulse, Cpu, Globe } from 'lucide-react'

export const PARTNER_CATEGORIES = [
  {
    id: 'government',
    icon: Landmark,
    label: 'Government',
    items: ['Federal Ministry of Health', 'Regional Health Bureaus', 'Fayda', 'EPSS', 'EFDA'],
  },
  {
    id: 'healthcare',
    icon: HeartPulse,
    label: 'Healthcare',
    items: ['Hospitals', 'Health Centers', 'Private Clinics', 'Pharmacies', 'Insurance Providers'],
  },
  {
    id: 'technology',
    icon: Cpu,
    label: 'Technology',
    items: ['Universities', 'Research Institutions', 'Cloud Providers', 'Development Partners'],
  },
  {
    id: 'global',
    icon: Globe,
    label: 'Global Development Partners',
    items: ['WHO', 'UNICEF', 'World Bank', 'African Development Bank'],
  },
]
