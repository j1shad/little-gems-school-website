'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface Step {
  number: number
  title: string
}

interface ProgressIndicatorProps {
  currentStep: number
  steps: Step[]
}

export function ProgressIndicator({ currentStep, steps }: ProgressIndicatorProps) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep
          const isCurrent = step.number === currentStep
          const isUpcoming = step.number > currentStep

          return (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                {/* Step Circle */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all',
                    isCompleted && 'bg-primary border-primary text-white',
                    isCurrent && 'bg-primary border-primary text-white',
                    isUpcoming && 'bg-neutral-100 border-neutral-300 text-neutral-400'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-bold">{step.number}</span>
                  )}
                </div>

                {/* Step Title */}
                <p
                  className={cn(
                    'mt-2 text-xs md:text-sm font-medium text-center hidden md:block',
                    (isCompleted || isCurrent) && 'text-neutral-900',
                    isUpcoming && 'text-neutral-400'
                  )}
                >
                  {step.title}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'h-0.5 flex-1 mx-2 transition-all',
                    isCompleted && 'bg-primary',
                    !isCompleted && 'bg-neutral-300'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile: Show current step title */}
      <div className="md:hidden mt-4 text-center">
        <p className="text-sm font-medium text-neutral-900">
          {steps.find((s) => s.number === currentStep)?.title}
        </p>
      </div>
    </div>
  )
}
