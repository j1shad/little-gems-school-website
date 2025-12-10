import { format as dateFnsFormat } from "date-fns"
import { CURRENCY } from "./constants"

/**
 * Format date to readable string
 * @param date - Date to format
 * @param formatStr - Format string (default: 'PPP')
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, formatStr: string = "PPP"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateFnsFormat(dateObj, formatStr)
}

/**
 * Format currency amount
 * @param amount - Amount to format
 * @param currency - Currency code (default: GHS)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = CURRENCY.code): string {
  return new Intl.NumberFormat(CURRENCY.locale, {
    style: "currency",
    currency: currency,
  }).format(amount)
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + "..."
}
