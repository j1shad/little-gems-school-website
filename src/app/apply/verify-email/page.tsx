import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { VerifyEmailClient } from '@/components/apply/verify-email-client'

export const metadata: Metadata = {
  title: 'Verify Your Email - Little Gems School',
  description: 'Verify your email address to continue with your application',
}

interface VerifyEmailPageProps {
  searchParams: Promise<{ email?: string }>
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const params = await searchParams
  const emailFromParams = params.email

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

  // If email is already verified (user has session), redirect to application form
  if (user?.email_confirmed_at) {
    redirect('/apply/form')
  }

  // Get email from either query params or user session
  const userEmail = user?.email || emailFromParams

  // If no email available, redirect to signup
  if (!userEmail) {
    redirect('/apply')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center py-16 px-4">
      <VerifyEmailClient userEmail={userEmail} />
    </div>
  )
}
