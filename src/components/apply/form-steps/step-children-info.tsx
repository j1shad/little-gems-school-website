'use client'

import { useFormContext, useFieldArray } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { ChildFormCard } from '../child-form-card'
import type { ApplicationFormData } from '@/types/application'

export function StepChildrenInfo() {
  const { control, formState: { errors } } = useFormContext<ApplicationFormData>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'children',
  })

  const addChild = () => {
    if (fields.length < 5) {
      append({
        first_name: '',
        last_name: '',
        date_of_birth: new Date(),
        gender: 'male',
        grade_level: 'creche',
        academic_year: '2025/2026',
        preferred_start_date: new Date(),
      })
    }
  }

  const removeChild = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Children Information</h2>
        <p className="text-neutral-600">
          Add information for each child you're applying for (minimum 1, maximum 5)
        </p>
      </div>

      {/* Children Cards */}
      <div className="space-y-6">
        {fields.map((field, index) => (
          <ChildFormCard
            key={field.id}
            index={index}
            onRemove={() => removeChild(index)}
            canRemove={fields.length > 1}
          />
        ))}
      </div>

      {/* Array-level Error */}
      {errors.children?.message && (
        <p className="text-sm text-red-500">{errors.children.message}</p>
      )}

      {/* Add Child Button */}
      {fields.length < 5 && (
        <Button
          type="button"
          variant="outline"
          onClick={addChild}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Child ({fields.length}/5)
        </Button>
      )}

      {fields.length >= 5 && (
        <p className="text-sm text-neutral-600 text-center">
          Maximum of 5 children per application
        </p>
      )}
    </div>
  )
}
