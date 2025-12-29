'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { GradeLevelSelector } from './grade-level-selector'
import { ACADEMIC_YEARS } from '@/lib/constants/grade-levels'
import type { ApplicationFormData } from '@/types/application'

interface ChildFormCardProps {
  index: number
  onRemove: () => void
  canRemove: boolean
}

export function ChildFormCard({ index, onRemove, canRemove }: ChildFormCardProps) {
  const { register, formState: { errors }, control } = useFormContext<ApplicationFormData>()

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-neutral-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">Child {index + 1}</h3>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`children.${index}.first_name`}>First Name *</Label>
            <Input
              id={`children.${index}.first_name`}
              {...register(`children.${index}.first_name`)}
              placeholder="Enter first name"
              className={errors.children?.[index]?.first_name ? 'border-red-500' : ''}
            />
            {errors.children?.[index]?.first_name && (
              <p className="text-sm text-red-500">
                {errors.children[index]?.first_name?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`children.${index}.last_name`}>Last Name *</Label>
            <Input
              id={`children.${index}.last_name`}
              {...register(`children.${index}.last_name`)}
              placeholder="Enter last name"
              className={errors.children?.[index]?.last_name ? 'border-red-500' : ''}
            />
            {errors.children?.[index]?.last_name && (
              <p className="text-sm text-red-500">
                {errors.children[index]?.last_name?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`children.${index}.date_of_birth`}>Date of Birth *</Label>
            <Input
              id={`children.${index}.date_of_birth`}
              type="date"
              {...register(`children.${index}.date_of_birth`, {
                valueAsDate: true,
              })}
              className={errors.children?.[index]?.date_of_birth ? 'border-red-500' : ''}
            />
            {errors.children?.[index]?.date_of_birth && (
              <p className="text-sm text-red-500">
                {errors.children[index]?.date_of_birth?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`children.${index}.gender`}>Gender *</Label>
            <Controller
              name={`children.${index}.gender`}
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className={errors.children?.[index]?.gender ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.children?.[index]?.gender && (
              <p className="text-sm text-red-500">
                {errors.children[index]?.gender?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <GradeLevelSelector
              index={index}
              error={errors.children?.[index]?.grade_level?.message}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`children.${index}.academic_year`}>Academic Year *</Label>
            <Controller
              name={`children.${index}.academic_year`}
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className={errors.children?.[index]?.academic_year ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select academic year" />
                  </SelectTrigger>
                  <SelectContent>
                    {ACADEMIC_YEARS.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.children?.[index]?.academic_year && (
              <p className="text-sm text-red-500">
                {errors.children[index]?.academic_year?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`children.${index}.preferred_start_date`}>Preferred Start Date *</Label>
            <Input
              id={`children.${index}.preferred_start_date`}
              type="date"
              {...register(`children.${index}.preferred_start_date`, {
                valueAsDate: true,
              })}
              className={errors.children?.[index]?.preferred_start_date ? 'border-red-500' : ''}
            />
            {errors.children?.[index]?.preferred_start_date && (
              <p className="text-sm text-red-500">
                {errors.children[index]?.preferred_start_date?.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
