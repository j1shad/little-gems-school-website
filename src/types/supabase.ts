export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type GradeLevel =
  | 'creche'
  | 'nursery'
  | 'kg1'
  | 'kg2'
  | 'primary1'
  | 'primary2'
  | 'primary3'
  | 'primary4'
  | 'primary5'
  | 'primary6'
  | 'jhs1'
  | 'jhs2'
  | 'jhs3'

export type ApplicationStatus =
  | 'pending'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'waitlisted'
  | 'withdrawn'

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  phone_alt?: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: 'parent' | 'admin' | 'staff' | 'student'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          role?: 'parent' | 'admin' | 'staff' | 'student'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          role?: 'parent' | 'admin' | 'staff' | 'student'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          reference_number: string
          parent_id: string
          parent_full_name: string
          parent_email: string
          parent_phone: string
          parent_phone_alt: string | null
          parent_address: string
          parent_city: string
          parent_region: string
          parent_occupation: string | null
          parent_employer: string | null
          parent2_full_name: string | null
          parent2_email: string | null
          parent2_phone: string | null
          parent2_relationship: string | null
          parent2_occupation: string | null
          emergency_contacts: EmergencyContact[]
          status: ApplicationStatus
          admin_notes: string | null
          reviewed_by: string | null
          reviewed_at: string | null
          submitted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reference_number: string
          parent_id: string
          parent_full_name: string
          parent_email: string
          parent_phone: string
          parent_phone_alt?: string | null
          parent_address: string
          parent_city: string
          parent_region: string
          parent_occupation?: string | null
          parent_employer?: string | null
          parent2_full_name?: string | null
          parent2_email?: string | null
          parent2_phone?: string | null
          parent2_relationship?: string | null
          parent2_occupation?: string | null
          emergency_contacts: EmergencyContact[]
          status?: ApplicationStatus
          admin_notes?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          submitted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reference_number?: string
          parent_id?: string
          parent_full_name?: string
          parent_email?: string
          parent_phone?: string
          parent_phone_alt?: string | null
          parent_address?: string
          parent_city?: string
          parent_region?: string
          parent_occupation?: string | null
          parent_employer?: string | null
          parent2_full_name?: string | null
          parent2_email?: string | null
          parent2_phone?: string | null
          parent2_relationship?: string | null
          parent2_occupation?: string | null
          emergency_contacts?: EmergencyContact[]
          status?: ApplicationStatus
          admin_notes?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          submitted_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      application_children: {
        Row: {
          id: string
          application_id: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: 'male' | 'female' | 'other' | 'prefer_not_to_say'
          grade_level: GradeLevel
          academic_year: string
          preferred_start_date: string | null
          allergies: string | null
          medical_conditions: string | null
          medications: string | null
          special_needs: string | null
          dietary_restrictions: string | null
          blood_type: string | null
          doctor_name: string | null
          doctor_phone: string | null
          previous_school_name: string | null
          previous_school_address: string | null
          previous_school_phone: string | null
          previous_grade_level: string | null
          reason_for_leaving: string | null
          birth_certificate_url: string | null
          previous_report_card_url: string | null
          immunization_record_url: string | null
          passport_photo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          application_id: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: 'male' | 'female' | 'other' | 'prefer_not_to_say'
          grade_level: GradeLevel
          academic_year: string
          preferred_start_date?: string | null
          allergies?: string | null
          medical_conditions?: string | null
          medications?: string | null
          special_needs?: string | null
          dietary_restrictions?: string | null
          blood_type?: string | null
          doctor_name?: string | null
          doctor_phone?: string | null
          previous_school_name?: string | null
          previous_school_address?: string | null
          previous_school_phone?: string | null
          previous_grade_level?: string | null
          reason_for_leaving?: string | null
          birth_certificate_url?: string | null
          previous_report_card_url?: string | null
          immunization_record_url?: string | null
          passport_photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          application_id?: string
          first_name?: string
          last_name?: string
          date_of_birth?: string
          gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say'
          grade_level?: GradeLevel
          academic_year?: string
          preferred_start_date?: string | null
          allergies?: string | null
          medical_conditions?: string | null
          medications?: string | null
          special_needs?: string | null
          dietary_restrictions?: string | null
          blood_type?: string | null
          doctor_name?: string | null
          doctor_phone?: string | null
          previous_school_name?: string | null
          previous_school_address?: string | null
          previous_school_phone?: string | null
          previous_grade_level?: string | null
          reason_for_leaving?: string | null
          birth_certificate_url?: string | null
          previous_report_card_url?: string | null
          immunization_record_url?: string | null
          passport_photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_application_reference: {
        Args: Record<string, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
