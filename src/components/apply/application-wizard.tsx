'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ProgressIndicator } from './progress-indicator'
import { FormNavigation } from './form-navigation'
import { StepParentInfo } from './form-steps/step-parent-info'
import { StepChildrenInfo } from './form-steps/step-children-info'
import { StepEmergencyContacts } from './form-steps/step-emergency-contacts'
import { StepMedicalInfo } from './form-steps/step-medical-info'
import { StepEducationInfo } from './form-steps/step-education-info'
import { StepReviewSubmit } from './form-steps/step-review-submit'
import { applicationFormSchema } from '@/lib/validations/application'
import type { ApplicationFormData } from '@/types/application'

const STEPS = [
  { number: 1, title: 'Parent Information' },
  { number: 2, title: 'Children Information' },
  { number: 3, title: 'Emergency Contacts' },
  { number: 4, title: 'Medical Information' },
  { number: 5, title: 'Educational Background' },
  { number: 6, title: 'Review & Submit' },
]

export function ApplicationWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const methods = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    mode: 'onChange',
    defaultValues: {
      parent_full_name: '',
      parent_email: '',
      parent_phone: '',
      parent_phone_alt: '',
      parent_address: '',
      parent_city: '',
      parent_region: 'Greater Accra',
      parent_occupation: '',
      parent_employer: '',
      hasSecondParent: false,
      second_parent_full_name: '',
      second_parent_email: '',
      second_parent_phone: '',
      second_parent_relationship: '',
      second_parent_occupation: '',
      children: [
        {
          first_name: '',
          last_name: '',
          date_of_birth: new Date(),
          gender: 'male',
          grade_level: 'creche',
          academic_year: '2025/2026',
          preferred_start_date: new Date(),
          medical_info: {
            allergies: '',
            medical_conditions: '',
            medications: '',
            special_needs: '',
            dietary_restrictions: '',
            blood_type: 'Unknown',
            doctor_name: '',
            doctor_phone: '',
          },
          education_info: {
            previous_school_name: '',
            previous_school_address: '',
            previous_school_phone: '',
            previous_grade_level: '',
            reason_for_leaving: '',
          },
        },
      ],
      emergency_contacts: [
        { name: '', relationship: '', phone: '', phone_alt: '' },
        { name: '', relationship: '', phone: '', phone_alt: '' },
      ],
      termsAccepted: false,
    },
  })

  const { handleSubmit, trigger } = methods

  const handleNext = async () => {
    // Validate current step before moving forward
    const fieldsToValidate = getFieldsForStep(currentStep)
    const isValid = await trigger(fieldsToValidate as any)

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleEditStep = (step: number) => {
    setCurrentStep(step)
  }

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/apply/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit application')
      }

      const result = await response.json()

      // Redirect to success page with reference number
      router.push(`/apply/success?ref=${result.reference_number}`)
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canGoNext = () => {
    // Additional validation logic can be added here
    return true
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Progress Indicator */}
          <ProgressIndicator currentStep={currentStep} steps={STEPS} />

          {/* Form Steps */}
          <div className="mt-8">
            {currentStep === 1 && <StepParentInfo />}
            {currentStep === 2 && <StepChildrenInfo />}
            {currentStep === 3 && <StepEmergencyContacts />}
            {currentStep === 4 && <StepMedicalInfo />}
            {currentStep === 5 && <StepEducationInfo />}
            {currentStep === 6 && (
              <StepReviewSubmit
                onEditStep={handleEditStep}
                isSubmitting={isSubmitting}
              />
            )}
          </div>

          {/* Navigation */}
          {currentStep < STEPS.length && (
            <FormNavigation
              currentStep={currentStep}
              totalSteps={STEPS.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              isSubmitting={isSubmitting}
              canGoNext={canGoNext()}
            />
          )}
        </div>
      </form>
    </FormProvider>
  )
}

// Helper function to get fields that need validation for each step
function getFieldsForStep(step: number): string[] {
  switch (step) {
    case 1:
      return [
        'parent_full_name',
        'parent_email',
        'parent_phone',
        'parent_address',
        'parent_city',
        'parent_region',
        'parent_occupation',
      ]
    case 2:
      return ['children']
    case 3:
      return ['emergency_contacts']
    case 4:
      return [] // Medical info is optional
    case 5:
      return [] // Education info is conditional
    case 6:
      return ['termsAccepted']
    default:
      return []
  }
}
