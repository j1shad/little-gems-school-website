'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

interface VerifyEmailClientProps {
  userEmail: string
}

export function VerifyEmailClient({ userEmail }: VerifyEmailClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPolling, setIsPolling] = useState(true)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [manualToken, setManualToken] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [pollingDuration, setPollingDuration] = useState(0)

  const MAX_POLLING_DURATION = 300 // 5 minutes in seconds

  // Use ref to maintain stable Supabase client reference
  const supabaseRef = useRef(
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )
  const supabase = supabaseRef.current

  // Check for error from callback
  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      const errorMessages: Record<string, string> = {
        expired: 'Verification link has expired. Click "Resend" to get a new one.',
        verification_failed: 'Verification failed. Please try again or request a new verification email.',
        invalid_request: 'Invalid verification request. Please try again.',
        unexpected_error: 'An unexpected error occurred. Please try again.',
        session_error: 'Session error after verification. Please try again or request a new verification email.',
      }
      setErrorMessage(errorMessages[error] || 'An error occurred during verification.')
    }
  }, [searchParams])

  // Auth state change listener for real-time verification detection
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[Auth] State changed:', event, 'User:', session?.user?.email)

        if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
          console.log('[Auth] Email verified via SIGNED_IN event')

          // Broadcast to other tabs
          try {
            const channel = new BroadcastChannel('auth-channel')
            channel.postMessage({ type: 'EMAIL_VERIFIED' })
            channel.close()
          } catch (error) {
            console.error('[Auth] BroadcastChannel not supported:', error)
          }

          setIsPolling(false)
          router.push('/apply/form')
        }

        if (event === 'TOKEN_REFRESHED') {
          const { data: { user } } = await supabase.auth.getUser()
          if (user?.email_confirmed_at) {
            console.log('[Auth] Email verified after token refresh')
            setIsPolling(false)
            router.push('/apply/form')
          }
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  // Cross-tab communication listener
  useEffect(() => {
    let channel: BroadcastChannel | null = null

    try {
      channel = new BroadcastChannel('auth-channel')

      channel.onmessage = (event) => {
        if (event.data.type === 'EMAIL_VERIFIED') {
          console.log('[Auth] Email verified in another tab')
          setIsPolling(false)
          router.push('/apply/form')
        }
      }
    } catch (error) {
      console.error('[Auth] BroadcastChannel not supported:', error)
    }

    return () => {
      if (channel) {
        channel.close()
      }
    }
  }, [router])

  // Poll for email verification status with timeout
  useEffect(() => {
    if (!isPolling || pollingDuration >= MAX_POLLING_DURATION) {
      if (pollingDuration >= MAX_POLLING_DURATION) {
        setErrorMessage('Verification timeout. Please click "Resend" to get a new email.')
        setIsPolling(false)
      }
      return
    }

    const pollInterval = setInterval(async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (user?.email_confirmed_at) {
          console.log('[Polling] Email verified detected')
          setIsPolling(false)
          clearInterval(pollInterval)
          router.push('/apply/form')
        }

        setPollingDuration(prev => prev + 3)
      } catch (error) {
        console.error('[Polling] Error checking verification status:', error)
        // Don't stop polling on transient errors
      }
    }, 3000) // Poll every 3 seconds

    return () => clearInterval(pollInterval)
  }, [isPolling, pollingDuration, router, supabase])

  // Debug logging in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const debugInterval = setInterval(async () => {
        const { data: { session } } = await supabase.auth.getSession()
        const { data: { user } } = await supabase.auth.getUser()
        console.log('[DEBUG] Session state:', {
          hasSession: !!session,
          userId: user?.id,
          emailConfirmed: user?.email_confirmed_at,
          email: user?.email,
          pollingDuration: `${pollingDuration}s / ${MAX_POLLING_DURATION}s`,
        })
      }, 5000)

      return () => clearInterval(debugInterval)
    }
  }, [supabase, pollingDuration, MAX_POLLING_DURATION])

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return

    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [resendCooldown])

  const handleResendEmail = async () => {
    setResendStatus('sending')
    setErrorMessage(null)

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      })

      const result = await response.json()

      if (!response.ok) {
        setResendStatus('error')
        setErrorMessage(result.error || 'Failed to resend verification email')
        return
      }

      setResendStatus('success')
      setResendCooldown(60) // 60 second cooldown
    } catch (error) {
      setResendStatus('error')
      setErrorMessage('Failed to send email. Please check your connection and try again.')
      console.error('Error resending verification email:', error)
    } finally {
      setTimeout(() => {
        if (resendStatus !== 'idle') {
          setResendStatus('idle')
        }
      }, 3000)
    }
  }

  const handleManualVerification = async () => {
    if (!manualToken.trim()) {
      setErrorMessage('Please enter a verification token')
      return
    }

    setIsVerifying(true)
    setErrorMessage(null)

    try {
      const { error } = await supabase.auth.verifyOtp({
        email: userEmail,
        token: manualToken.trim(),
        type: 'email',
      })

      if (error) {
        setErrorMessage(error.message || 'Invalid or expired token')
        setIsVerifying(false)
        return
      }

      // Success - redirect to application form
      router.push('/apply/form')
    } catch (error) {
      setErrorMessage('Failed to verify token. Please try again.')
      console.error('Error verifying token:', error)
      setIsVerifying(false)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          {isPolling ? (
            <Mail className="w-8 h-8 text-primary animate-pulse" />
          ) : (
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          )}
        </div>
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
        <CardDescription className="text-base">
          We sent a verification email to
          <br />
          <span className="font-semibold text-neutral-900">{userEmail}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {resendStatus === 'success' && (
          <Alert className="bg-green-50 text-green-900 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription>Verification email sent successfully. Check your inbox.</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 text-sm text-neutral-600">
          <p>Click the link in the email to verify your account and continue with your application.</p>

          {isPolling && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-primary">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Checking verification status...</span>
              </div>
              {pollingDuration > 0 && (
                <div className="text-xs text-neutral-500 ml-6">
                  Time remaining: {Math.floor((MAX_POLLING_DURATION - pollingDuration) / 60)}:
                  {String((MAX_POLLING_DURATION - pollingDuration) % 60).padStart(2, '0')}
                </div>
              )}
            </div>
          )}

          <p className="text-xs">
            Didn't receive the email? Check your spam folder or click the button below to resend.
          </p>
        </div>

        <Button
          onClick={handleResendEmail}
          disabled={resendCooldown > 0 || resendStatus === 'sending'}
          className="w-full"
          variant={resendCooldown > 0 ? 'outline' : 'default'}
        >
          {resendStatus === 'sending' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : resendCooldown > 0 ? (
            `Resend available in ${resendCooldown}s`
          ) : (
            'Resend Verification Email'
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-neutral-500">Or paste your token</span>
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            value={manualToken}
            onChange={(e) => setManualToken(e.target.value)}
            placeholder="Enter verification token from email"
            className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isVerifying}
          />
          <Button
            onClick={handleManualVerification}
            disabled={isVerifying || !manualToken.trim()}
            className="w-full"
            variant="outline"
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Token'
            )}
          </Button>
        </div>

        <div className="text-center text-xs text-neutral-500 pt-2">
          <a href="/apply" className="hover:underline">
            Back to signup
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
