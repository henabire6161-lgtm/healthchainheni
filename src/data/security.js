import {
  KeyRound, Lock, ClipboardCheck, FileText, Fingerprint,
  EyeOff, Activity, LifeBuoy, ShieldCheck,
} from 'lucide-react'

export const SECURITY_ITEMS = [
  {
    id: 'rbac',
    icon: KeyRound,
    title: 'Role-Based Access Control',
    shortDesc: 'Every user sees only what their role allows.',
    detail: 'Access is scoped by role — a pharmacist, a clinician, and a Ministry analyst each see a different, precisely-limited slice of the system, enforced at every layer.',
  },
  {
    id: 'encryption',
    icon: Lock,
    title: 'End-to-End Encryption',
    shortDesc: 'Data is encrypted in transit and at rest.',
    detail: 'All patient and system data is encrypted both while moving between services and while stored, so intercepted or leaked data remains unreadable without authorization.',
  },
  {
    id: 'consent',
    icon: ClipboardCheck,
    title: 'Patient Consent',
    shortDesc: 'Citizens control who can see their record.',
    detail: 'Every access to a patient record is tied to an explicit, revocable consent grant — citizens can see and manage exactly who has access through the Digital Health Wallet.',
  },
  {
    id: 'audit-logging',
    icon: FileText,
    title: 'Audit Logging',
    shortDesc: 'Every action is permanently logged.',
    detail: 'Every read, write, and access attempt is logged and hashed to the Hyperledger network — a complete, tamper-evident history for every record in the system.',
  },
  {
    id: 'identity-verification',
    icon: Fingerprint,
    title: 'Identity Verification',
    shortDesc: 'Biometric-backed identity at every login.',
    detail: 'Citizens and staff are verified through Fayda-integrated biometric or credential checks before any sensitive action, preventing impersonation and identity fraud.',
  },
  {
    id: 'data-privacy',
    icon: EyeOff,
    title: 'Data Privacy',
    shortDesc: 'Personal data is minimized and anonymized.',
    detail: 'Analytics and surveillance data are aggregated and anonymized before leaving the clinical context — the Ministry sees patterns, not personal identities.',
  },
  {
    id: 'high-availability',
    icon: Activity,
    title: 'High Availability',
    shortDesc: 'Designed to stay online nationwide.',
    detail: 'The architecture is designed around redundant regional nodes so that a single facility or region losing connectivity doesn\'t take the national platform down with it.',
  },
  {
    id: 'disaster-recovery',
    icon: LifeBuoy,
    title: 'Disaster Recovery',
    shortDesc: 'Built to recover, not just to run.',
    detail: 'Distributed ledger replication across regional nodes means data isn\'t lost even if a facility, region, or single data center is compromised or offline.',
  },
  {
    id: 'zero-trust',
    icon: ShieldCheck,
    title: 'Zero Trust',
    shortDesc: 'Nothing is trusted by default.',
    detail: 'Every request — internal or external — is authenticated and authorized independently. No service, device, or network location is trusted automatically.',
  },
]
