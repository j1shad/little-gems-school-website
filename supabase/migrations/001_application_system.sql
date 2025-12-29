-- ============================================
-- APPLICATION SYSTEM SCHEMA
-- Little Gems School - School Application System
-- ============================================

-- ============================================
-- PROFILES TABLE
-- ============================================
-- Links to Supabase auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'parent' CHECK (role IN ('parent', 'admin', 'staff', 'student')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'parent')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- APPLICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Reference number (e.g., APP-2025-001234)
  reference_number TEXT UNIQUE NOT NULL,

  -- Parent/Guardian Information
  parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  parent_full_name TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  parent_phone_alt TEXT,
  parent_address TEXT NOT NULL,
  parent_city TEXT NOT NULL,
  parent_region TEXT NOT NULL,
  parent_occupation TEXT,
  parent_employer TEXT,

  -- Second Parent/Guardian (optional)
  parent2_full_name TEXT,
  parent2_email TEXT,
  parent2_phone TEXT,
  parent2_relationship TEXT,
  parent2_occupation TEXT,

  -- Emergency Contacts (stored as JSONB array)
  emergency_contacts JSONB NOT NULL DEFAULT '[]'::JSONB,

  -- Application Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'under_review', 'approved', 'rejected', 'waitlisted', 'withdrawn')
  ),

  -- Admin Notes
  admin_notes TEXT,
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMPTZ,

  -- Metadata
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Parents can view own applications"
  ON public.applications FOR SELECT
  USING (auth.uid() = parent_id);

CREATE POLICY "Parents can insert own applications"
  ON public.applications FOR INSERT
  WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Parents can update own pending applications"
  ON public.applications FOR UPDATE
  USING (auth.uid() = parent_id AND status = 'pending');

-- Indexes
CREATE INDEX idx_applications_parent_id ON public.applications(parent_id);
CREATE INDEX idx_applications_reference_number ON public.applications(reference_number);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_created_at ON public.applications(created_at DESC);

-- ============================================
-- APPLICATION_CHILDREN TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.application_children (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Link to application
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,

  -- Child Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),

  -- Grade Level (Ghanaian structure)
  grade_level TEXT NOT NULL CHECK (
    grade_level IN (
      'creche',
      'nursery',
      'kg1', 'kg2',
      'primary1', 'primary2', 'primary3', 'primary4', 'primary5', 'primary6',
      'jhs1', 'jhs2', 'jhs3'
    )
  ),

  -- Enrollment preferences
  academic_year TEXT NOT NULL,
  preferred_start_date DATE,

  -- Medical Information
  allergies TEXT,
  medical_conditions TEXT,
  medications TEXT,
  special_needs TEXT,
  dietary_restrictions TEXT,
  blood_type TEXT,
  doctor_name TEXT,
  doctor_phone TEXT,

  -- Previous Education (conditional based on grade level)
  previous_school_name TEXT,
  previous_school_address TEXT,
  previous_school_phone TEXT,
  previous_grade_level TEXT,
  reason_for_leaving TEXT,

  -- Documents (file URLs in Supabase Storage)
  birth_certificate_url TEXT,
  previous_report_card_url TEXT,
  immunization_record_url TEXT,
  passport_photo_url TEXT,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.application_children ENABLE ROW LEVEL SECURITY;

-- RLS Policies (inherit from parent application)
CREATE POLICY "Parents can view own application children"
  ON public.application_children FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = application_children.application_id
      AND applications.parent_id = auth.uid()
    )
  );

CREATE POLICY "Parents can insert children to own applications"
  ON public.application_children FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = application_children.application_id
      AND applications.parent_id = auth.uid()
    )
  );

CREATE POLICY "Parents can update children in own pending applications"
  ON public.application_children FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = application_children.application_id
      AND applications.parent_id = auth.uid()
      AND applications.status = 'pending'
    )
  );

-- Indexes
CREATE INDEX idx_application_children_application_id ON public.application_children(application_id);
CREATE INDEX idx_application_children_grade_level ON public.application_children(grade_level);

-- ============================================
-- UTILITY FUNCTIONS
-- ============================================

-- Generate unique reference number
CREATE OR REPLACE FUNCTION generate_application_reference()
RETURNS TEXT AS $$
DECLARE
  ref_number TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    -- Format: APP-YYYY-NNNNNN (e.g., APP-2025-001234)
    ref_number := 'APP-' || TO_CHAR(NOW(), 'YYYY') || '-' ||
                  LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');

    -- Check if exists
    SELECT EXISTS(SELECT 1 FROM public.applications WHERE reference_number = ref_number)
    INTO exists_check;

    EXIT WHEN NOT exists_check;
  END LOOP;

  RETURN ref_number;
END;
$$ LANGUAGE plpgsql;

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_application_children_updated_at
  BEFORE UPDATE ON public.application_children
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
