import {
  Users, Building2, Building, FileText, ShieldCheck, FlaskConical, Briefcase, Pill,
} from 'lucide-react'

export const KPI_STATS = [
  { id: 'patients', icon: Users, label: 'National Registered Patients', value: 42.8, decimals: 1, suffix: 'M', sub: 'Fayda-linked records', trend: 18 },
  { id: 'hospitals', icon: Building2, label: 'Hospitals Connected', value: 1240, suffix: '', sub: 'Reporting to blockchain', trend: 6 },
  { id: 'health-centers', icon: Building, label: 'Health Centers Connected', value: 18940, suffix: '', sub: 'Nationwide coverage', trend: 9 },
  { id: 'prescriptions', icon: FileText, label: 'Digital Prescriptions', value: 3.2, decimals: 1, suffix: 'M', sub: 'This month', trend: 24 },
  { id: 'claims', icon: ShieldCheck, label: 'Insurance Claims Processed', value: 890, suffix: 'K', sub: '48-hour avg turnaround', trend: 14 },
  { id: 'lab-reports', icon: FlaskConical, label: 'Laboratory Reports', value: 1.6, decimals: 1, suffix: 'M', sub: 'Digitally logged', trend: 11 },
  { id: 'workforce', icon: Briefcase, label: 'Healthcare Workforce', value: 128400, suffix: '', sub: 'Active credentialed staff', trend: 4 },
  { id: 'medicine-availability', icon: Pill, label: 'Medicine Availability', value: 91, suffix: '%', sub: 'National average', trend: 3 },
]

export const PRESCRIPTIONS_TREND = [
  { month: 'Feb', prescriptions: 2.1, claims: 1.4 },
  { month: 'Mar', prescriptions: 2.4, claims: 1.6 },
  { month: 'Apr', prescriptions: 2.6, claims: 1.8 },
  { month: 'May', prescriptions: 2.8, claims: 2.0 },
  { month: 'Jun', prescriptions: 3.0, claims: 2.3 },
  { month: 'Jul', prescriptions: 3.2, claims: 2.5 },
]

export const CLAIMS_STATUS = [
  { name: 'Approved', value: 78, color: '#4ade80' },
  { name: 'Pending', value: 16, color: '#fbbf24' },
  { name: 'Rejected', value: 6, color: '#f87171' },
]

export const REGIONAL_COMPARISON = [
  { region: 'Addis Ababa', coverage: 96 },
  { region: 'Oromia', coverage: 84 },
  { region: 'Amhara', coverage: 79 },
  { region: 'SNNPR', coverage: 73 },
  { region: 'Tigray', coverage: 68 },
  { region: 'Somali', coverage: 57 },
]

export const VACCINATION_COVERAGE = { value: 78, target: 95, label: 'Vaccination Coverage' }
export const HOSPITAL_CAPACITY = { value: 68, target: 85, label: 'Hospital Bed Capacity' }

export const DISEASE_ALERTS = [
  { disease: 'Cholera', region: 'Somali Region', severity: 'red', cases: 214, trend: '+340%' },
  { disease: 'Measles', region: 'Afar Region', severity: 'amber', cases: 62, trend: '+12%' },
  { disease: 'Malaria', region: 'Gambela Region', severity: 'amber', cases: 340, trend: '+8%' },
]
