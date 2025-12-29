import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CheckCircle, Home, Mail, Phone, Clock, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Application Submitted - Little Gems School',
  description: 'Your application has been successfully submitted',
}

interface SuccessPageProps {
  searchParams: Promise<{ ref?: string }>
}

export default async function ApplicationSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams
  const referenceNumber = params.ref

  if (!referenceNumber) {
    redirect('/apply')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl">
        {/* Success Icon and Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
            Application Submitted Successfully
          </h1>
          <p className="text-neutral-600 text-lg">
            Thank you for applying to Little Gems School
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-10 space-y-8">
          {/* Reference Number */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-2 border-primary/30 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-5 w-5 text-primary mr-2" />
              <p className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
                Application Reference Number
              </p>
            </div>
            <p className="text-3xl md:text-4xl font-bold text-primary tracking-wider mb-3">
              {referenceNumber}
            </p>
            <p className="text-sm text-neutral-600">
              Please save this reference number for tracking your application
            </p>
          </div>

          {/* Important Information */}
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Mail className="h-5 w-5 text-secondary" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-neutral-900 mb-1">
                  Confirmation Email Sent
                </h3>
                <p className="text-neutral-600 text-sm">
                  We've sent a confirmation email to the email address you provided.
                  Please check your inbox for application details and next steps.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Clock className="h-5 w-5 text-secondary" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-neutral-900 mb-1">
                  Review Timeline
                </h3>
                <p className="text-neutral-600 text-sm">
                  Our admissions team will review your application within 5-7 business days.
                  You will receive an email notification once your application has been reviewed.
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="font-semibold text-amber-900 mb-3 flex items-center">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-200 rounded-full mr-2 text-sm">
                i
              </span>
              What Happens Next?
            </h3>
            <ol className="space-y-2 ml-8">
              <li className="text-amber-900 text-sm">
                <span className="font-medium">Step 1:</span> Application review (5-7 business days)
              </li>
              <li className="text-amber-900 text-sm">
                <span className="font-medium">Step 2:</span> You'll receive an email with our decision
              </li>
              <li className="text-amber-900 text-sm">
                <span className="font-medium">Step 3:</span> If selected, we'll contact you to schedule an interview
              </li>
              <li className="text-amber-900 text-sm">
                <span className="font-medium">Step 4:</span> Final admission decision and enrollment process
              </li>
            </ol>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">
              Questions or Need to Update Your Application?
            </h3>
            <p className="text-blue-800 text-sm mb-4">
              Please contact us with your reference number:
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-blue-900">
                <Mail className="h-4 w-4 mr-2" />
                <a
                  href="mailto:admissions@littlegemsschool.edu.gh"
                  className="text-sm hover:underline"
                >
                  admissions@littlegemsschool.edu.gh
                </a>
              </div>
              <div className="flex items-center text-blue-900">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">+233 XXX XXX XXX</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg" className="flex-1">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-neutral-600 mt-6">
          You can now close this page. We'll keep you updated via email.
        </p>
      </div>
    </div>
  )
}
