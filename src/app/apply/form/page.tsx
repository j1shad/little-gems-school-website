import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ApplicationWizard } from '@/components/apply/application-wizard'

export const metadata: Metadata = {
  title: 'Application Form - Little Gems School',
  description: 'Complete your application to Little Gems School',
}

export default async function ApplicationFormPage() {
  // Check if user is authenticated
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/apply')
  }

  // Check if email is verified
  if (!user.email_confirmed_at) {
    redirect('/apply/verify-email')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
            Application Form
          </h1>
          <p className="text-neutral-600">
            Complete the following steps to submit your application
          </p>
        </div>

        {/* Application Wizard */}
        <ApplicationWizard />
      </div>
    </div>
  )
}
