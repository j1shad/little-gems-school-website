import { GradeLevel } from '@/types/supabase'
import { GradeLevelInfo } from '@/types/application'

export const GRADE_LEVELS: Record<GradeLevel, GradeLevelInfo> = {
  creche: {
    value: 'creche',
    label: 'Creche (0-2 years)',
    ageRange: '0-2',
    maxAge: 3,
    pdf: '/prospectus/creche-nursery.pdf',
  },
  nursery: {
    value: 'nursery',
    label: 'Nursery (2-3 years)',
    ageRange: '2-3',
    maxAge: 4,
    pdf: '/prospectus/creche-nursery.pdf',
  },
  kg1: {
    value: 'kg1',
    label: 'KG 1 (4 years)',
    ageRange: '4',
    maxAge: 6,
    pdf: '/prospectus/kindergarten.pdf',
  },
  kg2: {
    value: 'kg2',
    label: 'KG 2 (5 years)',
    ageRange: '5',
    maxAge: 7,
    pdf: '/prospectus/kindergarten.pdf',
  },
  primary1: {
    value: 'primary1',
    label: 'Primary 1 (6 years)',
    ageRange: '6',
    maxAge: 8,
    pdf: '/prospectus/primary.pdf',
  },
  primary2: {
    value: 'primary2',
    label: 'Primary 2 (7 years)',
    ageRange: '7',
    maxAge: 9,
    pdf: '/prospectus/primary.pdf',
  },
  primary3: {
    value: 'primary3',
    label: 'Primary 3 (8 years)',
    ageRange: '8',
    maxAge: 10,
    pdf: '/prospectus/primary.pdf',
  },
  primary4: {
    value: 'primary4',
    label: 'Primary 4 (9 years)',
    ageRange: '9',
    maxAge: 11,
    pdf: '/prospectus/primary.pdf',
  },
  primary5: {
    value: 'primary5',
    label: 'Primary 5 (10 years)',
    ageRange: '10',
    maxAge: 12,
    pdf: '/prospectus/primary.pdf',
  },
  primary6: {
    value: 'primary6',
    label: 'Primary 6 (11 years)',
    ageRange: '11',
    maxAge: 13,
    pdf: '/prospectus/primary.pdf',
  },
  jhs1: {
    value: 'jhs1',
    label: 'JHS 1 (12 years)',
    ageRange: '12',
    maxAge: 14,
    pdf: '/prospectus/jhs.pdf',
  },
  jhs2: {
    value: 'jhs2',
    label: 'JHS 2 (13 years)',
    ageRange: '13',
    maxAge: 15,
    pdf: '/prospectus/jhs.pdf',
  },
  jhs3: {
    value: 'jhs3',
    label: 'JHS 3 (14 years)',
    ageRange: '14',
    maxAge: 16,
    pdf: '/prospectus/jhs.pdf',
  },
}

export const GRADE_LEVEL_OPTIONS = Object.values(GRADE_LEVELS)

export const GHANA_REGIONS = [
  'Greater Accra',
  'Ashanti',
  'Western',
  'Central',
  'Eastern',
  'Northern',
  'Upper East',
  'Upper West',
  'Volta',
  'Brong-Ahafo',
  'Savannah',
  'Bono East',
  'Ahafo',
  'Oti',
  'North East',
  'Western North',
] as const

export const ACADEMIC_YEARS = [
  '2025/2026',
  '2026/2027',
] as const

export const BLOOD_TYPES = [
  'A+',
  'A-',
  'B+',
  'B-',
  'O+',
  'O-',
  'AB+',
  'AB-',
  'Unknown',
] as const

export const RELATIONSHIP_OPTIONS = [
  'Mother',
  'Father',
  'Grandparent',
  'Aunt',
  'Uncle',
  'Sibling',
  'Legal Guardian',
  'Family Friend',
  'Other',
] as const
