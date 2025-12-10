// Shared TypeScript types

export interface NavLink {
  name: string
  href: string
}

export interface SocialLink {
  name: string
  href: string
  icon?: string
}

// Supabase types (Feature 1.2)
import type { Database } from './supabase'
export type { Database }

// Type helper for extracting table types
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]

// More types will be added in future features
