import { CheckCircle2, FileText } from "lucide-react"
import { PageShell } from "@/components/layout/page-shell"

const requirements = [
  "Completed Application Form",
  "One recent passport size photograph",
  "Copy of birth certificate / Passport page",
  "Cumulative record from previous school",
  "Variable report card (if applicable)",
  "Immunization record / Medical report",
]

export default function AdmissionRequirementsPage() {
  return (
    <PageShell className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          Admission Requirements
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Please ensure you have the following documents ready to complete your enrollment.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-12 border border-neutral-100 shadow-xl shadow-neutral-100/50">
        <div className="grid gap-6">
          {requirements.map((req, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                  Document {index + 1}
                </h3>
                <p className="text-neutral-600">
                  {req}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
