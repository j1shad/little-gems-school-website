import { z } from 'zod'
import { GRADE_LEVELS, GHANA_REGIONS } from '@/lib/constants/grade-levels'
import { GradeLevel } from '@/types/supabase'

// Ghana phone regex: +233 followed by 9 digits
const ghanaPhoneRegex = /^\+233\d{9}$/

// Grade levels for validation
export const gradeLevels = [
  'creche',
  'nursery',
  'kg1',
  'kg2',
  'primary1',
  'primary2',
  'primary3',
  'primary4',
  'primary5',
  'primary6',
  'jhs1',
  'jhs2',
  'jhs3',
] as const

// Step 1: Parent Information Schema
export const parentInfoSchema = z.object({
  parent_full_name: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

  parent_email: z
    .string()
    .email('Invalid email address')
    .toLowerCase(),

  parent_phone: z
    .string()
    .regex(ghanaPhoneRegex, 'Phone must be in format +233XXXXXXXXX'),

  parent_phone_alt: z
    .string()
    .regex(ghanaPhoneRegex, 'Phone must be in format +233XXXXXXXXX')
    .optional()
    .or(z.literal('')),

  parent_address: z
    .string()
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must not exceed 200 characters'),

  parent_city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must not exceed 50 characters'),

  parent_region: z.enum(GHANA_REGIONS as unknown as [string, ...string[]], {
    errorMap: () => ({ message: 'Please select a valid region' }),
  }),

  parent_occupation: z.string().max(100).optional().or(z.literal('')),
  parent_employer: z.string().max(100).optional().or(z.literal('')),

  // Second parent (optional)
  has_second_parent: z.boolean().default(false),
  parent2_full_name: z.string().max(100).optional().or(z.literal('')),
  parent2_email: z.string().email().optional().or(z.literal('')),
  parent2_phone: z
    .string()
    .regex(ghanaPhoneRegex)
    .optional()
    .or(z.literal('')),
  parent2_relationship: z
    .enum(['mother', 'father', 'guardian', 'other'])
    .optional(),
  parent2_occupation: z.string().max(100).optional().or(z.literal('')),
})

// Step 4: Medical Information Schema
export const medicalInfoSchema = z.object({
  allergies: z.string().max(500).optional().or(z.literal('')),
  medical_conditions: z.string().max(500).optional().or(z.literal('')),
  medications: z.string().max(500).optional().or(z.literal('')),
  special_needs: z.string().max(500).optional().or(z.literal('')),
  dietary_restrictions: z.string().max(500).optional().or(z.literal('')),
  blood_type: z
    .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'Unknown'])
    .optional(),
  doctor_name: z.string().max(100).optional().or(z.literal('')),
  doctor_phone: z
    .string()
    .regex(ghanaPhoneRegex)
    .optional()
    .or(z.literal('')),
})

// Step 5: Educational Background Schema (conditional)
export const educationInfoSchema = z.object({
  previous_school_name: z.string().max(200).optional().or(z.literal('')),
  previous_school_address: z.string().max(300).optional().or(z.literal('')),
  previous_school_phone: z
    .string()
    .regex(ghanaPhoneRegex)
    .optional()
    .or(z.literal('')),
  previous_grade_level: z.string().max(50).optional().or(z.literal('')),
  reason_for_leaving: z.string().max(500).optional().or(z.literal('')),
})

// Step 2: Children Information Schema with Age Validation (includes nested medical and education)
export const childSchema = z.object({
  id: z.string().uuid().optional(),
  first_name: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

  last_name: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

  date_of_birth: z
    .date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .refine((date) => {
      const age = Math.floor((Date.now() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
      return age >= 0 && age <= 18
    }, 'Child must be between 0 and 18 years old'),

  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say'], {
    errorMap: () => ({ message: 'Please select a gender' }),
  }),

  grade_level: z.enum(gradeLevels, {
    errorMap: () => ({ message: 'Please select a grade level' }),
  }),

  academic_year: z
    .string()
    .regex(/^\d{4}\/\d{4}$/, 'Academic year must be in format YYYY/YYYY'),

  preferred_start_date: z.date().optional(),

  medical_info: medicalInfoSchema.optional(),
  education_info: educationInfoSchema.optional(),
}).refine(
  (data) => {
    // Validate age against grade level
    const age = Math.floor(
      (Date.now() - data.date_of_birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    )
    const gradeInfo = GRADE_LEVELS[data.grade_level as GradeLevel]
    if (age > gradeInfo.maxAge) {
      return false
    }
    return true
  },
  (data) => {
    const age = Math.floor(
      (Date.now() - data.date_of_birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    )
    const gradeInfo = GRADE_LEVELS[data.grade_level as GradeLevel]
    return {
      message: `Child is too old for ${gradeInfo.label} (maximum age: ${gradeInfo.maxAge} years). Please verify the date of birth or select a different grade level.`,
      path: ['date_of_birth'],
    }
  }
)

// Step 3: Emergency Contacts Schema
export const emergencyContactSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must not exceed 100 characters'),

  relationship: z
    .string()
    .min(2, 'Relationship must be specified')
    .max(50, 'Relationship must not exceed 50 characters'),

  phone: z.string().regex(ghanaPhoneRegex, 'Phone must be in format +233XXXXXXXXX'),

  phone_alt: z
    .string()
    .regex(ghanaPhoneRegex)
    .optional()
    .or(z.literal('')),
})

// Complete Application Form Schema
export const applicationFormSchema = parentInfoSchema.extend({
  hasSecondParent: z.boolean().default(false),
  second_parent_full_name: z.string().max(100).optional().or(z.literal('')),
  second_parent_email: z.string().email().optional().or(z.literal('')),
  second_parent_phone: z
    .string()
    .regex(ghanaPhoneRegex)
    .optional()
    .or(z.literal('')),
  second_parent_relationship: z
    .enum(['mother', 'father', 'guardian', 'other'])
    .optional(),
  second_parent_occupation: z.string().max(100).optional().or(z.literal('')),

  children: z
    .array(childSchema)
    .min(1, 'At least one child is required')
    .max(5, 'Maximum 5 children per application'),

  emergency_contacts: z
    .array(emergencyContactSchema)
    .min(2, 'At least 2 emergency contacts are required')
    .max(5, 'Maximum 5 emergency contacts allowed'),

  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must confirm that all information is accurate',
  }),
})

// Type exports
export type ParentInfoFormData = z.infer<typeof parentInfoSchema>
export type ChildFormData = z.infer<typeof childSchema>
export type EmergencyContactFormData = z.infer<typeof emergencyContactSchema>
export type MedicalInfoFormData = z.infer<typeof medicalInfoSchema>
export type EducationInfoFormData = z.infer<typeof educationInfoSchema>
export type ApplicationFormData = z.infer<typeof applicationFormSchema>

// Helper function to calculate age
export function calculateAge(dateOfBirth: Date): number {
  return Math.floor((Date.now() - dateOfBirth.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
}

// Helper function to validate age against grade level
export function validateAgeForGrade(
  dateOfBirth: Date,
  gradeLevel: GradeLevel
): { valid: boolean; message?: string } {
  const age = calculateAge(dateOfBirth)
  const gradeInfo = GRADE_LEVELS[gradeLevel]

  if (age > gradeInfo.maxAge) {
    return {
      valid: false,
      message: `Child is too old for ${gradeInfo.label} (maximum age: ${gradeInfo.maxAge} years)`,
    }
  }

  return { valid: true }
}
