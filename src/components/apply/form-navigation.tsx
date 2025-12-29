'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface FormNavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
  isSubmitting?: boolean
  canGoNext?: boolean
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isSubmitting = false,
  canGoNext = true,
}: FormNavigationProps) {
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstStep || isSubmitting}
        className={isFirstStep ? 'invisible' : ''}
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>

      <div className="text-sm text-neutral-600">
        Step {currentStep} of {totalSteps}
      </div>

      <Button
        type="button"
        onClick={onNext}
        disabled={isSubmitting || !canGoNext}
      >
        {isLastStep ? 'Review' : 'Next'}
        {!isLastStep && <ChevronRight className="h-4 w-4 ml-2" />}
      </Button>
    </div>
  )
}
