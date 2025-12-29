'use client'

import { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import { GRADE_LEVELS } from '@/lib/constants/grade-levels'
import { ProspectusModal } from './prospectus-modal'
import type { ApplicationFormData } from '@/types/application'
import type { GradeLevel } from '@/types/supabase'

interface GradeLevelSelectorProps {
  index: number
  error?: string
}

export function GradeLevelSelector({ index, error }: GradeLevelSelectorProps) {
  const { control, watch } = useFormContext<ApplicationFormData>()
  const [isProspectusOpen, setIsProspectusOpen] = useState(false)
  const selectedGradeLevel = watch(`children.${index}.grade_level`)

  const handleOpenProspectus = () => {
    if (selectedGradeLevel) {
      setIsProspectusOpen(true)
    }
  }

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={`children.${index}.grade_level`}>Grade Level *</Label>
          {selectedGradeLevel && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleOpenProspectus}
              className="h-auto p-1 text-primary hover:text-primary/80"
            >
              <FileText className="h-4 w-4 mr-1" />
              <span className="text-xs">View Prospectus</span>
            </Button>
          )}
        </div>

        <Controller
          name={`children.${index}.grade_level`}
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className={error ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select grade level" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(GRADE_LEVELS).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      {selectedGradeLevel && (
        <ProspectusModal
          isOpen={isProspectusOpen}
          onClose={() => setIsProspectusOpen(false)}
          gradeLevel={selectedGradeLevel as GradeLevel}
        />
      )}
    </>
  )
}
