'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { GRADE_LEVELS } from '@/lib/constants/grade-levels'
import type { GradeLevel } from '@/types/supabase'

interface ProspectusModalProps {
  isOpen: boolean
  onClose: () => void
  gradeLevel: GradeLevel
}

export function ProspectusModal({ isOpen, onClose, gradeLevel }: ProspectusModalProps) {
  const gradeLevelInfo = GRADE_LEVELS[gradeLevel]

  if (!gradeLevelInfo) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            Prospectus - {gradeLevelInfo.label}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <iframe
            src={gradeLevelInfo.pdf}
            className="w-full h-full border-0"
            title={`Prospectus for ${gradeLevelInfo.label}`}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
