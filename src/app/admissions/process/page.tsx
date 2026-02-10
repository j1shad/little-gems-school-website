import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { PageShell } from "@/components/layout/page-shell"

const steps = [
  {
    number: "01",
    title: "Inquiry & Tour",
    description: "Contact us to schedule a visit. Experience our campus, meet our teachers, and see classes in action.",
  },
  {
    number: "02",
    title: "Submit Application",
    description: "Complete the online application form. You will need to provide basic student and parent information.",
  },
  {
    number: "03",
    title: "Assessment",
    description: "Prospective students may participate in a relaxed age-appropriate assessment to understand their learning needs.",
  },
  {
    number: "04",
    title: "Interview",
    description: "A meeting with the parents to discuss the child's needs, school values, and expectations.",
  },
  {
    number: "05",
    title: "Enrollment",
    description: "Upon acceptance, pay the admission fee and complete the enrollment documents to secure the slot.",
  },
]

export default function AdmissionProcessPage() {
  return (
    <PageShell className="container mx-auto px-4 py-24 md:py-32 max-w-5xl">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          Admission Process
        </h1>
        <p className="text-xl text-neutral-600">
          Joining the Little Gems family is a simple and transparent journey. Here is how it works.
        </p>
      </div>

      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 md:before:ml-[50%] before:-translate-x-px md:before:w-0.5 before:bg-gradient-to-b before:from-primary/0 before:via-primary/20 before:to-primary/0">
        {steps.map((step, index) => (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-lg font-bold">
              {index + 1}
            </div>

            <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm md:group-odd:mr-auto md:group-even:ml-auto hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl font-heading font-bold text-neutral-100">{step.number}</span>
                <h3 className="font-heading text-2xl font-bold text-neutral-900">{step.title}</h3>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center bg-primary/5 rounded-3xl p-12">
        <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-4">
          Ready to Apply?
        </h2>
        <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
          Start your child's journey with us today. Our online application is quick and easy.
        </p>
        <Button asChild size="lg" className="px-8 text-lg">
          <Link href="/apply">
            Start Application <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </div>
    </PageShell>
  )
}
