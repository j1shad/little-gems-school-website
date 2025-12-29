# Supabase Database Setup

## Instructions

To set up the application system database tables, you need to run the migration SQL in your Supabase dashboard.

### Steps:

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/fzwvonefqtxfrxnfsuqc

2. Navigate to **SQL Editor** in the left sidebar

3. Click **New Query**

4. Copy and paste the entire contents of `migrations/001_application_system.sql` into the query editor

5. Click **Run** to execute the migration

### What This Creates:

- **profiles table**: User profiles linked to auth.users
- **applications table**: School application submissions
- **application_children table**: Children information for each application
- **RLS policies**: Row-level security to protect data
- **Functions**:
  - `generate_application_reference()` - Generates unique reference numbers (APP-2025-XXXXXX)
  - `handle_new_user()` - Auto-creates profile on user signup
  - `update_updated_at_column()` - Auto-updates timestamps
- **Triggers**: Auto-execute functions on insert/update

### Verification:

After running the migration, you can verify it worked by:

1. Go to **Table Editor** in Supabase
2. You should see three new tables: `profiles`, `applications`, `application_children`
3. Go to **Database** > **Functions** and verify the functions exist

### Testing the Reference Number Generator:

Run this query in SQL Editor:
```sql
SELECT generate_application_reference();
```

You should see output like: `APP-2025-123456`

Run it multiple times to verify each reference number is unique.
