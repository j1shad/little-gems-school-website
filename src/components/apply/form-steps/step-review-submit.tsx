'use client'

import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { GRADE_LEVELS } from '@/lib/constants/grade-levels'
import { format } from 'date-fns'
import type { ApplicationFormData } from '@/types/application'

interface StepReviewSubmitProps {
  onEditStep: (step: number) => void
  isSubmitting: boolean
}

export function StepReviewSubmit({ onEditStep, isSubmitting }: StepReviewSubmitProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<ApplicationFormData>()
  const formData = watch()
  const termsAccepted = watch('termsAccepted')

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Review & Submit</h2>
        <p className="text-neutral-600">
          Please review all information before submitting your application
        </p>
      </div>

      {/* Parent Information */}
      <div className="bg-white p-6 rounded-lg border-2 border-neutral-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900">Parent/Guardian Information</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEditStep(1)}
          >
            Edit
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-neutral-600">Name</p>
            <p className="font-medium">{formData.parent_full_name}</p>
          </div>
          <div>
            <p className="text-neutral-600">Email</p>
            <p className="font-medium">{formData.parent_email}</p>
          </div>
          <div>
            <p className="text-neutral-600">Phone</p>
            <p className="font-medium">{formData.parent_phone}</p>
          </div>
          <div>
            <p className="text-neutral-600">Occupation</p>
            <p className="font-medium">{formData.parent_occupation}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-neutral-600">Address</p>
            <p className="font-medium">
              {formData.parent_address}, {formData.parent_city}, {formData.parent_region}
            </p>
          </div>

          {formData.hasSecondParent && formData.second_parent_full_name && (
            <>
              <div className="md:col-span-2 pt-4 border-t">
                <p className="font-semibold text-neutral-900">Second Parent/Guardian</p>
              </div>
              <div>
                <p className="text-neutral-600">Name</p>
                <p className="font-medium">{formData.second_parent_full_name}</p>
              </div>
              <div>
                <p className="text-neutral-600">Email</p>
                <p className="font-medium">{formData.second_parent_email || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-neutral-600">Phone</p>
                <p className="font-medium">{formData.second_parent_phone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-neutral-600">Relationship</p>
                <p className="font-medium">{formData.second_parent_relationship || 'Not provided'}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Children Information */}
      <div className="bg-white p-6 rounded-lg border-2 border-neutral-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900">Children Information</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEditStep(2)}
          >
            Edit
          </Button>
        </div>
        <div className="space-y-4">
          {formData.children?.map((child, index) => (
            <div key={index} className="pb-4 border-b last:border-b-0">
              <h4 className="font-medium text-neutral-900 mb-2">
                Child {index + 1}: {child.first_name} {child.last_name}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-neutral-600">Date of Birth: </span>
                  <span className="font-medium">
                    {format(new Date(child.date_of_birth), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-600">Gender: </span>
                  <span className="font-medium capitalize">{child.gender}</span>
                </div>
                <div>
                  <span className="text-neutral-600">Grade Level: </span>
                  <span className="font-medium">
                    {GRADE_LEVELS[child.grade_level as keyof typeof GRADE_LEVELS]?.label}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-600">Academic Year: </span>
                  <span className="font-medium">{child.academic_year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white p-6 rounded-lg border-2 border-neutral-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900">Emergency Contacts</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEditStep(3)}
          >
            Edit
          </Button>
        </div>
        <div className="space-y-3">
          {formData.emergency_contacts?.map((contact, index) => (
            <div key={index} className="text-sm">
              <p className="font-medium">{contact.name}</p>
              <p className="text-neutral-600">
                {contact.relationship} - {contact.phone}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="termsAccepted"
            checked={termsAccepted}
            onCheckedChange={(checked) => setValue('termsAccepted', !!checked)}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor="termsAccepted" className="cursor-pointer text-neutral-900">
              I confirm that all information provided in this application is accurate and complete
              to the best of my knowledge. I understand that providing false information may result
              in the rejection of this application.
            </Label>
            {errors.termsAccepted && (
              <p className="text-sm text-red-500 mt-2">{errors.termsAccepted.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          size="lg"
          disabled={!termsAccepted || isSubmitting}
          className="px-12"
        >
          {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
        </Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Next Steps:</strong> After submitting, you will receive a confirmation email with
          your application reference number. We will review your application and contact you within
          5-7 business days.
        </p>
      </div>
    </div>
  )
}
