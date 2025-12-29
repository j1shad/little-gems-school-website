'use client'

import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2 } from 'lucide-react'
import { RELATIONSHIP_OPTIONS } from '@/lib/constants/grade-levels'
import type { ApplicationFormData } from '@/types/application'

export function StepEmergencyContacts() {
  const { control, register, formState: { errors } } = useFormContext<ApplicationFormData>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'emergency_contacts',
  })

  const addContact = () => {
    if (fields.length < 5) {
      append({
        name: '',
        relationship: '',
        phone: '',
        phone_alt: '',
      })
    }
  }

  const removeContact = (index: number) => {
    if (fields.length > 2) {
      remove(index)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Emergency Contacts</h2>
        <p className="text-neutral-600">
          Provide at least 2 emergency contacts (minimum 2, maximum 5)
        </p>
      </div>

      {/* Emergency Contact Cards */}
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="bg-white p-6 rounded-lg border-2 border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">
                Emergency Contact {index + 1}
              </h3>
              {fields.length > 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeContact(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`emergency_contacts.${index}.name`}>Full Name *</Label>
                <Input
                  id={`emergency_contacts.${index}.name`}
                  {...register(`emergency_contacts.${index}.name`)}
                  placeholder="Enter full name"
                  className={errors.emergency_contacts?.[index]?.name ? 'border-red-500' : ''}
                />
                {errors.emergency_contacts?.[index]?.name && (
                  <p className="text-sm text-red-500">
                    {errors.emergency_contacts[index]?.name?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`emergency_contacts.${index}.relationship`}>Relationship *</Label>
                <Controller
                  name={`emergency_contacts.${index}.relationship`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={errors.emergency_contacts?.[index]?.relationship ? 'border-red-500' : ''}
                      >
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        {RELATIONSHIP_OPTIONS.map((relationship) => (
                          <SelectItem key={relationship} value={relationship.toLowerCase()}>
                            {relationship}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.emergency_contacts?.[index]?.relationship && (
                  <p className="text-sm text-red-500">
                    {errors.emergency_contacts[index]?.relationship?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`emergency_contacts.${index}.phone`}>Phone Number *</Label>
                <Input
                  id={`emergency_contacts.${index}.phone`}
                  {...register(`emergency_contacts.${index}.phone`)}
                  placeholder="+233XXXXXXXXX"
                  className={errors.emergency_contacts?.[index]?.phone ? 'border-red-500' : ''}
                />
                {errors.emergency_contacts?.[index]?.phone && (
                  <p className="text-sm text-red-500">
                    {errors.emergency_contacts[index]?.phone?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`emergency_contacts.${index}.phone_alt`}>
                  Alternative Phone
                </Label>
                <Input
                  id={`emergency_contacts.${index}.phone_alt`}
                  {...register(`emergency_contacts.${index}.phone_alt`)}
                  placeholder="+233XXXXXXXXX (optional)"
                />
                {errors.emergency_contacts?.[index]?.phone_alt && (
                  <p className="text-sm text-red-500">
                    {errors.emergency_contacts[index]?.phone_alt?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Array-level Error */}
      {errors.emergency_contacts?.message && (
        <p className="text-sm text-red-500">{errors.emergency_contacts.message}</p>
      )}

      {/* Add Contact Button */}
      {fields.length < 5 && (
        <Button
          type="button"
          variant="outline"
          onClick={addContact}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Emergency Contact ({fields.length}/5)
        </Button>
      )}

      {fields.length >= 5 && (
        <p className="text-sm text-neutral-600 text-center">
          Maximum of 5 emergency contacts
        </p>
      )}

      {fields.length < 2 && (
        <p className="text-sm text-amber-600">
          Please add at least 2 emergency contacts before proceeding
        </p>
      )}
    </div>
  )
}
