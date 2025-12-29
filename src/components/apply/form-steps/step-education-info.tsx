'use client'

import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { ApplicationFormData } from '@/types/application'

export function StepEducationInfo() {
  const { register, formState: { errors }, watch } = useFormContext<ApplicationFormData>()
  const children = watch('children')

  // Filter children who need educational background (not creche or nursery)
  const childrenNeedingEducation = children?.filter(
    (child) => child.grade_level !== 'creche' && child.grade_level !== 'nursery'
  ) || []

  if (childrenNeedingEducation.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Educational Background</h2>
          <p className="text-neutral-600">
            No educational background information is required for children applying to Creche or Nursery.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <p className="text-green-900">
            You can proceed to the next step.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Educational Background</h2>
        <p className="text-neutral-600">
          Provide previous school information for children not applying to Creche or Nursery
        </p>
      </div>

      {/* Educational Info for Each Applicable Child */}
      <div className="space-y-8">
        {children?.map((child, index) => {
          // Skip if child is applying for creche or nursery
          if (child.grade_level === 'creche' || child.grade_level === 'nursery') {
            return null
          }

          return (
            <div key={index} className="bg-white p-6 rounded-lg border-2 border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                {child.first_name} {child.last_name}
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`children.${index}.education_info.previous_school_name`}>
                      Previous School Name
                    </Label>
                    <Input
                      id={`children.${index}.education_info.previous_school_name`}
                      {...register(`children.${index}.education_info.previous_school_name`)}
                      placeholder="Enter previous school name"
                    />
                    {errors.children?.[index]?.education_info?.previous_school_name && (
                      <p className="text-sm text-red-500">
                        {errors.children[index]?.education_info?.previous_school_name?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`children.${index}.education_info.previous_school_address`}>
                      Previous School Address
                    </Label>
                    <Input
                      id={`children.${index}.education_info.previous_school_address`}
                      {...register(`children.${index}.education_info.previous_school_address`)}
                      placeholder="Enter school address"
                    />
                    {errors.children?.[index]?.education_info?.previous_school_address && (
                      <p className="text-sm text-red-500">
                        {errors.children[index]?.education_info?.previous_school_address?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`children.${index}.education_info.previous_school_phone`}>
                      Previous School Phone
                    </Label>
                    <Input
                      id={`children.${index}.education_info.previous_school_phone`}
                      {...register(`children.${index}.education_info.previous_school_phone`)}
                      placeholder="+233XXXXXXXXX"
                    />
                    {errors.children?.[index]?.education_info?.previous_school_phone && (
                      <p className="text-sm text-red-500">
                        {errors.children[index]?.education_info?.previous_school_phone?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`children.${index}.education_info.previous_grade_level`}>
                      Last Grade Level Completed
                    </Label>
                    <Input
                      id={`children.${index}.education_info.previous_grade_level`}
                      {...register(`children.${index}.education_info.previous_grade_level`)}
                      placeholder="e.g., Primary 4"
                    />
                    {errors.children?.[index]?.education_info?.previous_grade_level && (
                      <p className="text-sm text-red-500">
                        {errors.children[index]?.education_info?.previous_grade_level?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`children.${index}.education_info.reason_for_leaving`}>
                      Reason for Leaving Previous School
                    </Label>
                    <Textarea
                      id={`children.${index}.education_info.reason_for_leaving`}
                      {...register(`children.${index}.education_info.reason_for_leaving`)}
                      placeholder="Please briefly explain the reason for transferring"
                      rows={3}
                    />
                    {errors.children?.[index]?.education_info?.reason_for_leaving && (
                      <p className="text-sm text-red-500">
                        {errors.children[index]?.education_info?.reason_for_leaving?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> This information helps us understand your child's educational
          background and ensure a smooth transition to Little Gems School.
        </p>
      </div>
    </div>
  )
}
