import { Metadata } from 'next'
import Link from 'next/link'
import { SignupForm } from '@/components/apply/signup-form'

export const metadata: Metadata = {
  title: 'Apply to Little Gems School',
  description: 'Start your application to Little Gems School today. Create your account to begin the admissions process.',
}

export default function ApplySignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Little Gems
            </span>{' '}
            School
          </h1>
          <p className="text-neutral-600 text-sm">
            Apply for admission - Create your account to begin
          </p>
        </div>

        {/* Signup Form */}
        <SignupForm />

        {/* Footer Links */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-neutral-600">
            Have questions?{' '}
            <Link
              href="/contact"
              className="text-primary hover:underline font-medium"
            >
              Contact Us
            </Link>
          </p>
          <p className="text-sm text-neutral-600">
            <Link
              href="/"
              className="text-neutral-700 hover:text-primary transition-colors"
            >
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
