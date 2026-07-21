import {
  Fingerprint, Building2, FlaskConical, Pill, Landmark,
  MapPin, ShieldCheck, Package, BadgeCheck, Smartphone,
} from 'lucide-react'

export const EXTERNAL_SYSTEMS = [
  { id: 'fayda', icon: Fingerprint, name: 'Fayda Digital ID', status: 'core', note: 'Core identity integration point' },
  { id: 'his', icon: Building2, name: 'Hospital Information Systems', status: 'core', note: 'Designed for standards-based integration' },
  { id: 'lab-systems', icon: FlaskConical, name: 'Laboratory Systems', status: 'core', note: 'Designed for standards-based integration' },
  { id: 'pharmacy-systems', icon: Pill, name: 'Pharmacy Systems', status: 'core', note: 'Designed for standards-based integration' },
  { id: 'insurance-providers', icon: Landmark, name: 'Insurance Providers', status: 'core', note: 'Designed for standards-based integration' },
  { id: 'regional-bureaus', icon: MapPin, name: 'Regional Health Bureaus', status: 'planned', note: 'Future integration target' },
  { id: 'moh', icon: ShieldCheck, name: 'Federal Ministry of Health', status: 'planned', note: 'Future integration target' },
  { id: 'epss', icon: Package, name: 'EPSS', status: 'planned', note: 'Future integration target' },
  { id: 'efda', icon: BadgeCheck, name: 'EFDA', status: 'planned', note: 'Future integration target' },
  { id: 'mobile-apps', icon: Smartphone, name: 'Future Mobile Applications', status: 'planned', note: 'Planned future capability' },
]

export const STANDARDS = [
  { name: 'HL7 FHIR', desc: 'Clinical data exchange standard' },
  { name: 'REST APIs', desc: 'Standard web integration interface' },
  { name: 'OAuth2', desc: 'Secure authorization framework' },
  { name: 'OpenID Connect', desc: 'Federated identity layer' },
  { name: 'OpenHIE', desc: 'Health information exchange architecture' },
]
