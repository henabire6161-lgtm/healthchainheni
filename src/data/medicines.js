export const CITIES = [
  { id: 'addis-ababa', name: 'Addis Ababa', x: 47, y: 52 },
  { id: 'adama', name: 'Adama', x: 54, y: 57 },
  { id: 'bahir-dar', name: 'Bahir Dar', x: 30, y: 30 },
  { id: 'hawassa', name: 'Hawassa', x: 45, y: 74 },
  { id: 'mekelle', name: 'Mekelle', x: 49, y: 11 },
  { id: 'dire-dawa', name: 'Dire Dawa', x: 74, y: 47 },
]

const statusMeta = {
  available: { label: 'Available', color: '#4ade80' },
  moderate: { label: 'Moderate Stock', color: '#fbbf24' },
  low: { label: 'Low Stock', color: '#f87171' },
}

export function stockStatusMeta(status) {
  return statusMeta[status] || statusMeta.available
}

export const MEDICINES = [
  {
    id: 'paracetamol',
    name: 'Paracetamol',
    category: 'Analgesic / Antipyretic',
    priceRange: 'ETB 15 – 35 per pack',
    lastUpdate: '12 minutes ago',
    alternatives: ['Ibuprofen', 'Aspirin'],
    stockByCity: {
      'addis-ababa': { status: 'available', units: 1250 },
      'adama': { status: 'available', units: 580 },
      'bahir-dar': { status: 'low', units: 85 },
      'hawassa': { status: 'available', units: 790 },
      'mekelle': { status: 'available', units: 640 },
      'dire-dawa': { status: 'moderate', units: 310 },
    },
  },
  {
    id: 'amoxicillin',
    name: 'Amoxicillin',
    category: 'Antibiotic',
    priceRange: 'ETB 60 – 120 per pack',
    lastUpdate: '28 minutes ago',
    alternatives: ['Cephalexin', 'Azithromycin'],
    stockByCity: {
      'addis-ababa': { status: 'available', units: 940 },
      'adama': { status: 'moderate', units: 220 },
      'bahir-dar': { status: 'available', units: 410 },
      'hawassa': { status: 'moderate', units: 260 },
      'mekelle': { status: 'low', units: 70 },
      'dire-dawa': { status: 'available', units: 505 },
    },
  },
  {
    id: 'insulin',
    name: 'Insulin',
    category: 'Diabetes Management',
    priceRange: 'ETB 350 – 620 per vial',
    lastUpdate: '5 minutes ago',
    alternatives: ['Metformin (oral alternative for some patients)'],
    stockByCity: {
      'addis-ababa': { status: 'available', units: 610 },
      'adama': { status: 'low', units: 40 },
      'bahir-dar': { status: 'moderate', units: 150 },
      'hawassa': { status: 'low', units: 55 },
      'mekelle': { status: 'moderate', units: 180 },
      'dire-dawa': { status: 'low', units: 60 },
    },
  },
  {
    id: 'ors',
    name: 'ORS (Oral Rehydration Salts)',
    category: 'Rehydration Therapy',
    priceRange: 'ETB 8 – 20 per sachet pack',
    lastUpdate: '9 minutes ago',
    alternatives: ['Zinc Sulfate (co-administered)'],
    stockByCity: {
      'addis-ababa': { status: 'available', units: 2100 },
      'adama': { status: 'available', units: 960 },
      'bahir-dar': { status: 'available', units: 880 },
      'hawassa': { status: 'available', units: 1140 },
      'mekelle': { status: 'moderate', units: 340 },
      'dire-dawa': { status: 'available', units: 1020 },
    },
  },
  {
    id: 'metformin',
    name: 'Metformin',
    category: 'Diabetes Management',
    priceRange: 'ETB 45 – 90 per pack',
    lastUpdate: '17 minutes ago',
    alternatives: ['Glibenclamide', 'Insulin (for advanced cases)'],
    stockByCity: {
      'addis-ababa': { status: 'available', units: 870 },
      'adama': { status: 'available', units: 430 },
      'bahir-dar': { status: 'moderate', units: 190 },
      'hawassa': { status: 'available', units: 520 },
      'mekelle': { status: 'available', units: 460 },
      'dire-dawa': { status: 'moderate', units: 240 },
    },
  },
]

export function totalUnits(medicine) {
  return Object.values(medicine.stockByCity).reduce((sum, c) => sum + c.units, 0)
}

export function overallStatus(medicine) {
  const statuses = Object.values(medicine.stockByCity).map(c => c.status)
  if (statuses.every(s => s === 'available')) return 'available'
  if (statuses.some(s => s === 'low')) return 'moderate'
  return 'available'
}
