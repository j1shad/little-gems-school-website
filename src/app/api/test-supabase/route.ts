import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Test connection by getting session
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: 'Supabase connection failed',
          error: error.message,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      session: data.session ? 'Session exists' : 'No active session',
      timestamp: new Date().toISOString(),
      environment: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unexpected error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
