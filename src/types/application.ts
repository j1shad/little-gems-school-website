import { GradeLevel, EmergencyContact } from './supabase'

export interface GradeLevelInfo {
  value: GradeLevel
  label: string
  ageRange: string
  maxAge: number
  pdf: string
}

export interface MedicalInfoData {
  allergies?: string
  medical_conditions?: string
  medications?: string
  special_needs?: string
  dietary_restrictions?: string
  blood_type?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-' | 'Unknown'
  doctor_name?: string
  doctor_phone?: string
}

export interface EducationInfoData {
  previous_school_name?: string
  previous_school_address?: string
  previous_school_phone?: string
  previous_grade_level?: string
  reason_for_leaving?: string
}

export interface ChildFormData {
  id?: string
  first_name: string
  last_name: string
  date_of_birth: Date
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say'
  grade_level: GradeLevel
  academic_year: string
  preferred_start_date?: Date
  medical_info?: MedicalInfoData
  education_info?: EducationInfoData
}

export interface ApplicationFormData {
  parent_full_name: string
  parent_email: string
  parent_phone: string
  parent_phone_alt?: string
  parent_address: string
  parent_city: string
  parent_region: string
  parent_occupation?: string
  parent_employer?: string
  hasSecondParent: boolean
  second_parent_full_name?: string
  second_parent_email?: string
  second_parent_phone?: string
  second_parent_relationship?: 'mother' | 'father' | 'guardian' | 'other'
  second_parent_occupation?: string
  children: ChildFormData[]
  emergency_contacts: EmergencyContact[]
  termsAccepted: boolean
}
