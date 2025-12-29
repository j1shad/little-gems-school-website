import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

// In-memory rate limiting
// In production, consider using Redis or database
const rateLimitMap = new Map<string, number[]>()
const MAX_REQUESTS = 100 // Increased for development/testing
const WINDOW_MS = 60 * 60 * 1000 // 1 hour

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const requests = rateLimitMap.get(identifier) || []

  // Remove timestamps older than the window
  const recentRequests = requests.filter((timestamp) => now - timestamp < WINDOW_MS)

  if (recentRequests.length >= MAX_REQUESTS) {
    return false // Rate limit exceeded
  }

  // Add current timestamp
  recentRequests.push(now)
  rateLimitMap.set(identifier, recentRequests)

  return true
}

const resendSchema = z.object({
  email: z.string().email().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email: emailFromBody } = resendSchema.parse(body)

    const supabase = await createClient()

    // Try to get authenticated user
    const { data: { user } } = await supabase.auth.getUser()

    // Get email from either user session or request body
    const email = user?.email || emailFromBody

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if email is already verified (only if user has session)
    if (user?.email_confirmed_at) {
      return NextResponse.json(
        { error: 'Email is already verified' },
        { status: 400 }
      )
    }

    // Check rate limit using email as identifier
    if (!checkRateLimit(email)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before trying again.' },
        { status: 429 }
      )
    }

    // Resend verification email
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
      },
    })

    if (resendError) {
      console.error('Error resending verification email:', resendError)
      return NextResponse.json(
        { error: resendError.message || 'Failed to resend verification email' },
        { status: 400 }
      )
    }

    console.log('Verification email resent to:', email)
    return NextResponse.json({
      success: true,
      message: 'Verification email sent successfully',
    })
  } catch (error) {
    console.error('Unexpected error in resend verification:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
