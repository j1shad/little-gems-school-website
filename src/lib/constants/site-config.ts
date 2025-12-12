/**
 * Site-wide configuration constants
 * Centralized location for school information, links, and settings
 */

export const SITE_CONFIG = {
  name: "Little Gems School",
  tagline: "Shaping Future Leaders",
  description:
    "Providing quality education for holistic child development in Accra, Ghana. Nurturing young minds to reach their full potential.",
  url: "https://littlegemsschool.com",

  // Contact Information
  contact: {
    email: "info@littlegemsschool.com",
    phone: "+233 XX XXX XXXX",
    address: "Accra, Ghana",
    workingHours: "Monday - Friday: 7:00 AM - 3:00 PM",
  },

  // Social Media Links
  links: {
    facebook: "https://facebook.com/littlegemsschool",
    instagram: "https://instagram.com/littlegemsschool",
    twitter: "https://twitter.com/littlegemsschool",
    youtube: "https://youtube.com/@littlegemsschool",
  },

  // School Statistics (for Stats Section)
  stats: {
    yearsOfExcellence: 25,
    totalStudents: 500,
    successRate: 98,
    qualifiedTeachers: 50,
  },

  // Navigation Menu Items
  navigation: [
    {
      title: "About Us",
      items: [
        { title: "Our Story", href: "/about/story" },
        { title: "Mission & Vision", href: "/about/mission" },
        { title: "Leadership Team", href: "/about/team" },
      ],
    },
    {
      title: "Admissions",
      items: [
        { title: "Application Process", href: "/admissions/process" },
        { title: "Requirements", href: "/admissions/requirements" },
        { title: "Tuition & Fees", href: "/admissions/fees" },
      ],
    },
    {
      title: "Programs",
      items: [
        { title: "Curriculum", href: "/programs/curriculum" },
        { title: "Grade Levels", href: "/programs/grades" },
        { title: "Extra Activities", href: "/programs/activities" },
      ],
    },
    { title: "News & Events", href: "/news" },
    { title: "Contact", href: "/contact" },
  ],

  // Footer Quick Links
  footerLinks: {
    quickLinks: [
      { title: "About Us", href: "/about/story" },
      { title: "Admissions", href: "/admissions/process" },
      { title: "Contact", href: "/contact" },
      { title: "News & Events", href: "/news" },
    ],
    programs: [
      { title: "Curriculum", href: "/programs/curriculum" },
      { title: "Grade Levels", href: "/programs/grades" },
      { title: "Activities", href: "/programs/activities" },
    ],
    legal: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Sitemap", href: "/sitemap.xml" },
    ],
  },

  // Feature Cards Content
  features: [
    {
      title: "Why Choose Us?",
      description:
        "Quality education delivered by experienced staff in modern facilities designed for optimal learning",
      href: "/about/story",
    },
    {
      title: "Our Curriculum",
      description:
        "Comprehensive academic programs designed for holistic development and individual growth",
      href: "/programs/curriculum",
    },
    {
      title: "Student Life",
      description:
        "Vibrant community with diverse extracurricular activities, events, and student support",
      href: "/news",
    },
  ],
} as const

// Type exports for TypeScript
export type SiteConfig = typeof SITE_CONFIG
export type NavigationItem = (typeof SITE_CONFIG.navigation)[number]
export type FeatureCard = (typeof SITE_CONFIG.features)[number]
