export const APP_NAME = "Little Gems School"
export const APP_DESCRIPTION = "The official website for Little Gems School. Featuring curriculum details, admissions, school news and more."

export const CONTACT_EMAIL = "info@littlegemsschool.edu" // Update with real email
export const CONTACT_PHONE = "+233 XXX XXX XXX" // Update with real phone

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/littlegemsschool",
  instagram: "https://instagram.com/littlegemsschool",
  twitter: "https://twitter.com/littlegemssch",
} as const

export const NAVIGATION_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Curriculum", href: "/curriculum" },
  { name: "News", href: "/news" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
] as const

export const CURRENCY = {
  code: "GHS",
  symbol: "₵",
  locale: "en-GH",
} as const
