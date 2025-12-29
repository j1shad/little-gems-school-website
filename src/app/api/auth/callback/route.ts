import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type')
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

  // Handle error from Supabase
  if (error) {
    console.error('Auth callback error:', error, errorDescription)
    return NextResponse.redirect(
      new URL(`/apply/verify-email?error=${encodeURIComponent(error)}`, request.url)
    )
  }

  try {
    const supabase = await createClient()

    // Handle token_hash verification (email confirmation links)
    if (token_hash && type) {
      console.log('Verifying email with token_hash, type:', type)

      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        token_hash,
        type: type as any,
      })

      if (verifyError) {
        console.error('Error verifying email token:', verifyError)

        const errorParam = verifyError.message.includes('expired')
          ? 'expired'
          : 'verification_failed'

        return NextResponse.redirect(
          new URL(`/apply/verify-email?error=${errorParam}`, request.url)
        )
      }

      if (!data.session) {
        console.error('No session returned after email verification')
        return NextResponse.redirect(
          new URL('/apply/verify-email?error=verification_failed', request.url)
        )
      }

      console.log('Email verification successful for user:', data.user?.email)

      // Explicitly refresh session to ensure cookies are properly set
      const { data: { session: refreshedSession } } = await supabase.auth.getSession()

      if (!refreshedSession) {
        console.error('Session not found after verification')
        return NextResponse.redirect(
          new URL('/apply/verify-email?error=session_error', request.url)
        )
      }

      // Create redirect response and ensure session cookies are set
      const redirectUrl = new URL('/apply/form', request.url)
      const response = NextResponse.redirect(redirectUrl)

      // Session cookies are already managed by Supabase SSR middleware
      // but we log for debugging
      console.log('Redirecting to application form with session:', {
        userId: refreshedSession.user.id,
        email: refreshedSession.user.email,
        expiresAt: new Date(refreshedSession.expires_at! * 1000).toISOString()
      })

      return response
    }

    // Handle PKCE code exchange (fallback)
    if (code) {
      console.log('Exchanging PKCE code for session')

      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        console.error('Error exchanging code for session:', exchangeError)

        const errorParam = exchangeError.message.includes('expired')
          ? 'expired'
          : 'verification_failed'

        return NextResponse.redirect(
          new URL(`/apply/verify-email?error=${errorParam}`, request.url)
        )
      }

      if (!data.session) {
        console.error('No session returned after code exchange')
        return NextResponse.redirect(
          new URL('/apply/verify-email?error=verification_failed', request.url)
        )
      }

      console.log('Email verification successful for user:', data.user?.email)

      // Explicitly refresh session to ensure cookies are properly set
      const { data: { session: refreshedSession } } = await supabase.auth.getSession()

      if (!refreshedSession) {
        console.error('Session not found after code exchange')
        return NextResponse.redirect(
          new URL('/apply/verify-email?error=session_error', request.url)
        )
      }

      // Create redirect response and ensure session cookies are set
      const redirectUrl = new URL('/apply/form', request.url)
      const response = NextResponse.redirect(redirectUrl)

      console.log('Redirecting to application form with session:', {
        userId: refreshedSession.user.id,
        email: refreshedSession.user.email,
        expiresAt: new Date(refreshedSession.expires_at! * 1000).toISOString()
      })

      return response
    }

    // No valid parameters
    console.error('No valid verification parameters provided')
    return NextResponse.redirect(
      new URL('/apply/verify-email?error=invalid_request', request.url)
    )
  } catch (error) {
    console.error('Unexpected error in auth callback:', error)
    return NextResponse.redirect(
      new URL('/apply/verify-email?error=unexpected_error', request.url)
    )
  }
}
