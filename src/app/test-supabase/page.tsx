import { createClient } from '@/lib/supabase/server'
import { TestSupabaseClient } from './test-client'

export default async function TestSupabasePage() {
  // Server Component - Test server client
  const supabase = await createClient()
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  const serverTest = {
    success: !error,
    hasSession: !!session,
    timestamp: new Date().toISOString(),
    error: error?.message,
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Supabase Integration Test
        </h1>

        {/* Server Component Test */}
        <div className="mb-8 p-6 rounded-lg border-2 border-neutral-200 bg-white">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span
              className={serverTest.success ? 'text-green-600' : 'text-red-600'}
            >
              {serverTest.success ? '✓' : '✗'}
            </span>
            Server Component Test
          </h2>
          <dl className="space-y-2">
            <div>
              <dt className="font-medium text-neutral-700">Status:</dt>
              <dd className="text-neutral-900">
                {serverTest.success ? 'Connected' : 'Failed'}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-700">Session:</dt>
              <dd className="text-neutral-900">
                {serverTest.hasSession ? 'Active' : 'No active session'}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-700">Timestamp:</dt>
              <dd className="text-neutral-900 font-mono text-sm">
                {serverTest.timestamp}
              </dd>
            </div>
            {serverTest.error && (
              <div>
                <dt className="font-medium text-red-700">Error:</dt>
                <dd className="text-red-900 font-mono text-sm">
                  {serverTest.error}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Client Component Test */}
        <TestSupabaseClient />

        {/* Environment Info */}
        <div className="mt-8 p-6 rounded-lg bg-neutral-50 border border-neutral-200">
          <h3 className="text-lg font-semibold mb-3">Environment Info</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-neutral-700">Supabase URL:</dt>
              <dd className="font-mono text-neutral-900">
                {process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30)}...
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-700">Anon Key:</dt>
              <dd className="font-mono text-neutral-900">
                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}
                ...
              </dd>
            </div>
          </dl>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </main>
  )
}
