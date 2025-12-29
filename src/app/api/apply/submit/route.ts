import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { applicationFormSchema } from '@/lib/validations/application'
import { sendApplicationConfirmation } from '@/lib/utils/email'
import { format } from 'date-fns'
import type { ApplicationFormData } from '@/types/application'
import type { Database } from '@/types/supabase'

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const cookieStore = await cookies()
    const supabase = createServerClient<Database>(
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

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = applicationFormSchema.parse(body) as ApplicationFormData

    // Insert application
    const { data: application, error: applicationError } = await supabase
      .from('applications')
      .insert({
        user_id: user.id,
        parent_full_name: validatedData.parent_full_name,
        parent_email: validatedData.parent_email,
        parent_phone: validatedData.parent_phone,
        parent_phone_alt: validatedData.parent_phone_alt || null,
        parent_address: validatedData.parent_address,
        parent_city: validatedData.parent_city,
        parent_region: validatedData.parent_region,
        parent_occupation: validatedData.parent_occupation,
        parent_employer: validatedData.parent_employer || null,
        second_parent_full_name: validatedData.second_parent_full_name || null,
        second_parent_email: validatedData.second_parent_email || null,
        second_parent_phone: validatedData.second_parent_phone || null,
        second_parent_relationship: validatedData.second_parent_relationship || null,
        second_parent_occupation: validatedData.second_parent_occupation || null,
        emergency_contacts: validatedData.emergency_contacts,
        status: 'pending',
        submitted_at: new Date().toISOString(),
      })
      .select('id, reference_number')
      .single()

    if (applicationError || !application) {
      console.error('Error inserting application:', applicationError)
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      )
    }

    // Insert children
    const childrenData = validatedData.children.map((child) => ({
      application_id: application.id,
      first_name: child.first_name,
      last_name: child.last_name,
      date_of_birth: new Date(child.date_of_birth).toISOString().split('T')[0],
      gender: child.gender,
      grade_level: child.grade_level,
      academic_year: child.academic_year,
      preferred_start_date: child.preferred_start_date
        ? new Date(child.preferred_start_date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      // Medical info
      allergies: child.medical_info?.allergies || null,
      medical_conditions: child.medical_info?.medical_conditions || null,
      medications: child.medical_info?.medications || null,
      special_needs: child.medical_info?.special_needs || null,
      dietary_restrictions: child.medical_info?.dietary_restrictions || null,
      blood_type: child.medical_info?.blood_type || null,
      doctor_name: child.medical_info?.doctor_name || null,
      doctor_phone: child.medical_info?.doctor_phone || null,
      // Education info (only for non-creche/nursery)
      previous_school_name:
        child.grade_level !== 'creche' && child.grade_level !== 'nursery'
          ? child.education_info?.previous_school_name || null
          : null,
      previous_school_address:
        child.grade_level !== 'creche' && child.grade_level !== 'nursery'
          ? child.education_info?.previous_school_address || null
          : null,
      previous_school_phone:
        child.grade_level !== 'creche' && child.grade_level !== 'nursery'
          ? child.education_info?.previous_school_phone || null
          : null,
      previous_grade_level:
        child.grade_level !== 'creche' && child.grade_level !== 'nursery'
          ? child.education_info?.previous_grade_level || null
          : null,
      reason_for_leaving:
        child.grade_level !== 'creche' && child.grade_level !== 'nursery'
          ? child.education_info?.reason_for_leaving || null
          : null,
    }))

    const { error: childrenError } = await supabase
      .from('application_children')
      .insert(childrenData)

    if (childrenError) {
      console.error('Error inserting children:', childrenError)
      // Rollback: Delete the application
      await supabase.from('applications').delete().eq('id', application.id)
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      )
    }

    // Send confirmation email
    const childrenNames = validatedData.children.map(
      (child) => `${child.first_name} ${child.last_name}`
    )

    const emailSent = await sendApplicationConfirmation({
      to: validatedData.parent_email,
      parentName: validatedData.parent_full_name,
      referenceNumber: application.reference_number,
      childrenNames,
      submissionDate: format(new Date(), 'MMMM dd, yyyy'),
    })

    if (!emailSent) {
      console.warn('Failed to send confirmation email, but application was submitted')
    }

    return NextResponse.json(
      {
        success: true,
        reference_number: application.reference_number,
        message: 'Application submitted successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting application:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid form data', details: error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
