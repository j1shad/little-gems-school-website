'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ClientTestResult {
  success: boolean
  hasSession: boolean
  timestamp: string
  error?: string
}

export function TestSupabaseClient() {
  const [result, setResult] = useState<ClientTestResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createClient()
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        setResult({
          success: !error,
          hasSession: !!session,
          timestamp: new Date().toISOString(),
          error: error?.message,
        })
      } catch (error) {
        setResult({
          success: false,
          hasSession: false,
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      } finally {
        setLoading(false)
      }
    }

    testConnection()
  }, [])

  if (loading) {
    return (
      <div className="p-6 rounded-lg border-2 border-neutral-200 bg-white">
        <h2 className="text-2xl font-semibold mb-4">Client Component Test</h2>
        <p className="text-neutral-600">Testing connection...</p>
      </div>
    )
  }

  return (
    <div className="p-6 rounded-lg border-2 border-neutral-200 bg-white">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <span className={result?.success ? 'text-green-600' : 'text-red-600'}>
          {result?.success ? '✓' : '✗'}
        </span>
        Client Component Test
      </h2>
      {result && (
        <dl className="space-y-2">
          <div>
            <dt className="font-medium text-neutral-700">Status:</dt>
            <dd className="text-neutral-900">
              {result.success ? 'Connected' : 'Failed'}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-neutral-700">Session:</dt>
            <dd className="text-neutral-900">
              {result.hasSession ? 'Active' : 'No active session'}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-neutral-700">Timestamp:</dt>
            <dd className="text-neutral-900 font-mono text-sm">
              {result.timestamp}
            </dd>
          </div>
          {result.error && (
            <div>
              <dt className="font-medium text-red-700">Error:</dt>
              <dd className="text-red-900 font-mono text-sm">{result.error}</dd>
            </div>
          )}
        </dl>
      )}
    </div>
  )
}
