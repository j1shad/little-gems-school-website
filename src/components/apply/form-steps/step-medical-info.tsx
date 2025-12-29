'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BLOOD_TYPES } from '@/lib/constants/grade-levels'
import type { ApplicationFormData } from '@/types/application'

export function StepMedicalInfo() {
  const { register, formState: { errors }, watch, control } = useFormContext<ApplicationFormData>()
  const children = watch('children')

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Medical Information</h2>
        <p className="text-neutral-600">
          Provide medical information for each child (optional but encouraged)
        </p>
      </div>

      {/* Medical Info for Each Child */}
      <div className="space-y-8">
        {children?.map((child, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border-2 border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              {child.first_name} {child.last_name}
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`children.${index}.medical_info.allergies`}>
                    Allergies
                  </Label>
                  <Textarea
                    id={`children.${index}.medical_info.allergies`}
                    {...register(`children.${index}.medical_info.allergies`)}
                    placeholder="List any allergies (e.g., food, medication)"
                    rows={3}
                  />
                  {errors.children?.[index]?.medical_info?.allergies && (
                    <p className="text-sm text-red-500">
                      {errors.children[index]?.medical_info?.allergies?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`children.${index}.medical_info.medical_conditions`}>
                    Medical Conditions
                  </Label>
                  <Textarea
                    id={`children.${index}.medical_info.medical_conditions`}
                    {...register(`children.${index}.medical_info.medical_conditions`)}
                    placeholder="List any medical conditions (e.g., asthma, diabetes)"
                    rows={3}
                  />
                  {errors.children?.[index]?.medical_info?.medical_conditions && (
                    <p className="text-sm text-red-500">
                      {errors.children[index]?.medical_info?.medical_conditions?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`children.${index}.medical_info.medications`}>
                    Current Medications
                  </Label>
                  <Textarea
                    id={`children.${index}.medical_info.medications`}
                    {...register(`children.${index}.medical_info.medications`)}
                    placeholder="List any current medications"
                    rows={3}
                  />
                  {errors.children?.[index]?.medical_info?.medications && (
                    <p className="text-sm text-red-500">
                      {errors.children[index]?.medical_info?.medications?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`children.${index}.medical_info.special_needs`}>
                    Special Needs
                  </Label>
                  <Textarea
                    id={`children.${index}.medical_info.special_needs`}
                    {...register(`children.${index}.medical_info.special_needs`)}
                    placeholder="Describe any special needs or accommodations required"
                    rows={3}
                  />
                  {errors.children?.[index]?.medical_info?.special_needs && (
                    <p className="text-sm text-red-500">
                      {errors.children[index]?.medical_info?.special_needs?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`children.${index}.medical_info.dietary_restrictions`}>
                    Dietary Restrictions
                  </Label>
                  <Textarea
                    id={`children.${index}.medical_info.dietary_restrictions`}
                    {...register(`children.${index}.medical_info.dietary_restrictions`)}
                    placeholder="List any dietary restrictions or preferences"
                    rows={3}
                  />
                  {errors.children?.[index]?.medical_info?.dietary_restrictions && (
                    <p className="text-sm text-red-500">
                      {errors.children[index]?.medical_info?.dietary_restrictions?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`children.${index}.medical_info.blood_type`}>
                    Blood Type
                  </Label>
                  <Controller
                    name={`children.${index}.medical_info.blood_type`}
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {BLOOD_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.children?.[index]?.medical_info?.blood_type && (
                    <p className="text-sm text-red-500">
                      {errors.children[index]?.medical_info?.blood_type?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Doctor Information */}
              <div className="pt-4 border-t">
                <h4 className="font-medium text-neutral-900 mb-3">Doctor Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`children.${index}.medical_info.doctor_name`}>
                      Doctor's Name
                    </Label>
                    <Input
                      id={`children.${index}.medical_info.doctor_name`}
                      {...register(`children.${index}.medical_info.doctor_name`)}
                      placeholder="Dr. John Doe"
                    />
                    {errors.children?.[index]?.medical_info?.doctor_name && (
                      <p className="text-sm text-red-500">
                        {errors.children[index]?.medical_info?.doctor_name?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`children.${index}.medical_info.doctor_phone`}>
                      Doctor's Phone
                    </Label>
                    <Input
                      id={`children.${index}.medical_info.doctor_phone`}
                      {...register(`children.${index}.medical_info.doctor_phone`)}
                      placeholder="+233XXXXXXXXX"
                    />
                    {errors.children?.[index]?.medical_info?.doctor_phone && (
                      <p className="text-sm text-red-500">
                        {errors.children[index]?.medical_info?.doctor_phone?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> All medical information is optional but highly encouraged.
          This helps us provide the best care and support for your child.
        </p>
      </div>
    </div>
  )
}
