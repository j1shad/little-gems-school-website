import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"
import { PageShell } from "@/components/layout/page-shell"

export default function TuitionFeesPage() {
  return (
    <PageShell className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          Tuition & Fees
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          We are committed to providing value through affordable and transparent fee structures.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-12 border border-neutral-100 shadow-xl text-center">
        <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
          Fee Structure Available Upon Request
        </h2>
        <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
          To ensure we provide the most accurate information for your child's specific grade level and needs,
          please contact our admissions office or request a fee schedule via email.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/contact" className="gap-2">
              <Mail className="w-4 h-4" /> Request Fee Schedule
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact" className="gap-2">
              <Phone className="w-4 h-4" /> Call Admissions
            </Link>
          </Button>
        </div>
      </div>
      <p className="mt-8 text-sm text-neutral-500">
        * Fees typically cover tuition, books, lunch, and selected extracurricular activities.
      </p>
    </PageShell>
  )
}
